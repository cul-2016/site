var async = require('async');
var _ = require('lodash');

module.exports = {

  construct: function(self, options) {

    // self.piecesCssName = self.apos.utils.cssName(self.pieces.name);

    self.setSubmitSchema = function() {
      if (self.options.fields) {
        var fields = self.options.fields;
        self.submitSchema = self.apos.schemas.subset(self.pieces.schema, fields);
        // It would be better if this used arrangeFields
        // and refine, but there seems to be a bug there,
        // moving on for today. -Tom and Austin
        var ordered = [];
        _.each(fields, function(name) {
          var field = _.find(self.submitSchema, { name: name });
          if (field) {
            ordered.push(field);
          }
        });
        self.submitSchema = ordered;
      } else {
        self.submitSchema = self.pieces.schema;
      }
    };

    self.beforeInsert = function(req, piece, callback) {
      return callback(null);
    };

    self.submit = function(req, callback) {
      var piece = {};
      return async.series([
        convert,
        insert
      ], callback);
      function convert(callback) {
        return self.apos.schemas.convert(req, self.submitSchema, 'form', req.body, piece, callback);
      }
      function insert(callback) {

        // Approval = necessary!
        piece.published = true;
        piece.submitted = true;

        return self.beforeInsert(req, piece, function(err) {
          if (err) {
            return callback(err);
          }
          return self.pieces.insert(req, piece, { permissions: false }, callback);
        });
      }
    };

    self.output = function(widget, options) {
      // We need to bless the schema so that joins etc.
      // will be honored by the server when they AJAX back
      // to autocomplete and choose things. -Tom
      self.apos.schemas.bless(self.apos.templates.contextReq, self.submitSchema);
      return self.partial(self.template, {
        widget: widget,
        options: options,
        manager: self,
        label: self.options.label,
        schema: self.submitSchema
      });
    };

    self.pushAsset('script', 'user', { when: 'user' });
    self.pushAsset('stylesheet', 'user', { when: 'user' });

    self.route('post', 'submit', function(req, res) {
      return self.submit(req, function(err) {
        if (err) {
          console.error(err);
        }
        return res.send({ status: err ? 'error' : 'ok' });
      });
    });

    var superGetCreateSingletonOptions = self.getCreateSingletonOptions;
    self.getCreateSingletonOptions = function(req) {
      var options = superGetCreateSingletonOptions(req);
      options.submitSchema = self.submitSchema;
      options.piece = self.pieces.newInstance();
      return options;
    };
  }

}

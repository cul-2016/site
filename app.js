var path = require('path');

var apos = require('apostrophe')({
  shortName: 'quodl-site',

  bundlers: ['apostrophe-blog', 'apostrophe-events'],
  modules: {
    'apostrophe-events': {
      addFields: [
        {
          name: 'title',
          label: 'Name',
          type: 'string',
          group: 'text',
          required: true
        },
        {
          name: 'subject',
          type: 'string',
          group: 'text',
          required: true
        },
        // Let's add an attachment field so the user can upload an image
        {
          name: 'image',
          type: 'attachment',
          group: 'images'
        },
        {
          name: 'content',
          type: 'string',
          group: 'text',
          required: true
        }
      ]
    },
    'apostrophe-events-pages': {},
    'apostrophe-events-widgets': {},
    'apostrophe-blog': {},
    'apostrophe-blog-pages': {},
    'apostrophe-blog-widgets': {},
    'apostrophe-images-widgets': {},
    'as-helpers': {},
    'link-widgets': {},
    'page-link-widgets': {},
    'apostrophe-templates': {
      viewsFolderFallback: path.join(__dirname, 'views'),
    },
    // ** The name you give this module is significant. **
    // It should begin with the name of the pieces module you want
    // to add the submissions feature to, and end with -submit-widgets
    'apostrophe-events-submit-widgets': {
      // Your module extends this one, and adds capabilities
      // to your pieces module
      extend: 'apostrophe-pieces-submit-widgets',
      // Always spell out the schema field names the user is allowed to edit.
      // You almost certainly don't want them to have control
      // of the "published" field, for instance
      fields: [ 'title', 'subject', 'image', 'content']
    },
    // Optional: if you want to let the public attach files.
    // See the `addFields` call above
    'apostrophe-permissions': {
      construct: function(self, options) {
        self.addPublic('edit-attachment');
      }
    }
  },
});

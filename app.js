var path = require('path');

var apos = require('apostrophe')({
  shortName: 'quodl-site',

  modules: {
    'apostrophe-templates': { viewsFolderFallback: path.join(__dirname, 'views') }
  }
});

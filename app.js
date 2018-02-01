var path = require('path');

var apos = require('apostrophe')({
  shortName: 'quodl-site',

  bundlers: ['apostrophe-blog', 'apostrophe-events'],
  modules: {
    'apostrophe-blog': {},
    'apostrophe-blog-pages': {},
    'apostrophe-blog-widgets': {},
    'apostrophe-images-widgets': {},
    'as-helpers': {},
    'link-widgets': {},
    'messages': {},
    'page-link-widgets': {},
    'apostrophe-templates': {
      viewsFolderFallback: path.join(__dirname, 'views'),
    },
    // ** The name you give this module is significant. **
    // It should begin with the name of the pieces module you want
    // to add the submissions feature to, and end with -submit-widgets
    'messages-submit-widgets': {
      // Your module extends this one, and adds capabilities
      // to your pieces module
      extend: 'apostrophe-pieces-submit-widgets',
      // Always spell out the schema field names the user is allowed to edit.
      // You almost certainly don't want them to have control
      // of the "published" field, for instance
      fields: [ 'title', 'email', 'subject', 'details']
    },
    'apostrophe-attachments': {
      uploadfs: {
        backend: 's3',
        secret: process.env.AWS_SECRET,
        key: process.env.AWS_ID,
        bucket: process.env.AWS_BUCKET,
        region: 'eu-west-1',
      },
    },
  },
});

module.exports = {
  modules: {
    'apostrophe-db': {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/quodl-site',
    },
  },
};

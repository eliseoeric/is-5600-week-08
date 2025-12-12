module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '7.0.3' // REQUIRED for Debian 12 (Codespaces)
    },
    instance: {
      dbName: 'jest'
    }
  }
};

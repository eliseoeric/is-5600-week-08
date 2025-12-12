// jest-mongodb-config.js
module.exports = {
  mongodbMemoryServerOptions: {
    instance: { dbName: 'jest' },
    binary: {
      // If you hit binary download issues, try swapping to '6.0.13' or '7.0.14'
      version: '7.0.14',
      skipMD5: true
    },
    autoStart: false
  }
};
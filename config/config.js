const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'backend'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://admin:donasi123@ds211718.mlab.com:11718/donasi_app',
    secret_key: 'doesprogrammer'
  },

  test: {
    root: rootPath,
    app: {
      name: 'backend'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://admin:donasi123@ds211718.mlab.com:11718/donasi_app'
  },

  production: {
    root: rootPath,
    app: {
      name: 'backend'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://admin:donasi123@ds211718.mlab.com:11718/donasi_app',
    secret_key: process.env.secret_key
  }
};

module.exports = config[env];


// qw6WcbjcaAFU2P9
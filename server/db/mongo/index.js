const mongoose = require('mongoose');
const config = require('../../../config');

module.exports = class DBConfig {
  static init() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.mongo_addr, err => {
      if (err) console.error('ERROR CONNECTING MONGODB');
    });
  }
};

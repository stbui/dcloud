'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '',
      database: 'f2etest',
      user: 'root',
      password: 'root',
      prefix: '',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};
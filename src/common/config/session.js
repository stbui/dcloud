'use strict';

/**
 * session configs
 */
export default {
  name: 'dCloud',
  type: 'file',
  secret: 'OX@$WZI%',
  timeout: 24 * 3600,
  //timeout: 60,
  cookie: { // cookie options
    length: 32,
    httponly: true
  },
  adapter: {
    file: {
      path: think.RUNTIME_PATH + '/session'
    }
  }
};
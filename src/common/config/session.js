'use strict';

/**
 * session configs
 */
export default {
  name: 'dCloud',
  type: 'file',
  secret: 'OX@$WZI%',
  timeout: 0.1 * 3600,
  cookie: { // cookie options
    length: 32,
    httponly: true
  },
  adapter: {
    file: {
      path: think.RUNTIME_PATH + '/session',
    }
  }
};
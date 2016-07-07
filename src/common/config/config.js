'use strict';
/**
 * config
 */
export default {
  //key: value
  //default_module: "admin"
    port: 8361,

    api: {
        remoteProgramUrl:'http://${ip}:3000/app/add',
        remoteUserUrl:'http://${ip}:3000/user/add'
    }
};
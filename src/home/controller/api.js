'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    let json = {
      userId: '1',
      ApiKey:'54339b2c75b3059afbb0d2ecee0fea3d',
      version:'1.0.0'
    };

    return this.success(json);
  }

  versionAction(){
    let json = {
      name: 'dCloud',
      version:'1.0.0',
      author: 'stbui.com'
    };

    return this.success(json);
  }

  getallappAction() {
    let json = [{
      id: '1',
      name:'IE 6',
      server: '192.168.159.137',
      icon: ''
    },{
      id: '2',
      name:'IE 6',
      server: '192.168.159.137'
    }];

    return this.success(json);
  }


  createuserAction() {
    return this.success();
  }

  sethostsAction() {
    return this.success();
  }

  gethostAction() {
    let json = {
      host:'172.16.97.13',
      port:'8888',
      mode:'forward',
      hosts:''
    };

    return this.success(json);
  }

  gethostpacAction() {

    return this.success();
  }

}
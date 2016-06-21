'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    return this.display();
  }

  async autologinAction() {
    await this.session('userInfo',{userId:'User1465810183368', userName:'guest', password: '5824efff2039b11ac6487d5a283f82ca'});

    this.redirect('/desktop');

    return this.success();
  }
}
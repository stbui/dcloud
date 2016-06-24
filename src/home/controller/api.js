'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    const userInfo = await this.session('userInfo');

    let json = {
      userId: userInfo.UserId,
      ApiKey: userInfo.ApiKey,
      version:'1.0.0'
    };

    return this.success(json);
  }


  async getallappAction() {
    const program = await this.model('program').select();

    return this.success(program);
  }


  createuserAction() {
    return this.success();
  }

  sethostsAction() {
    return this.success();
  }

  async gethostAction() {
    const server = await this.model('server').select();

    return this.success(server);
  }

  gethostpacAction() {

    return this.success();
  }

  getapikeyAction() {

    return this.success({apiKey:think.uuid()});
  }

  syncallremoteusersAction() {
    return this.action('signin','syncallremoteusers');
  }

  pathlistAction() {
    return this.action('desktop','pathlist');
  }


}
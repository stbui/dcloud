'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  /**
   * index action logic
   * @return {} []
   */
  indexAction(){

  }

  registerAction () {
    this.allowMethods = "post";

    this.rules = {
      UserId:"required",
      RemotePassword:"byteLength:6,32|required"
    };
  }

  async syncallremoteusersAction() {
    const userInfo = await this.session('userInfo');

    if(think.isEmpty(userInfo)) {
      return this.fail(1001,this.locale('user_islogin'));
    }
  }

}
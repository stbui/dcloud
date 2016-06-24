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

  registerAction() {
    this.allowMethods = "post";

    this.rules = {
      UserId:"required",
      RemotePassword:"byteLength:6,32|required"
    };

  }

}
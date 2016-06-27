'use strict';
/**
 * relation model
 */
export default class extends think.model.relation {
  /**
   * init
   * @param  {} args []
   * @return {}         []
   */
  init(...args){
    super.init(...args);

    this.relation = {
      applogs: {
        type: think.model.HAS_MANY,
        field: 'UserId'
      }
    }

  }


  async getAppLogs() {
    let data = await this.model('applogs').join({
      table: 'appusers',
      on:['UserId','UserId']
    })
  }



}
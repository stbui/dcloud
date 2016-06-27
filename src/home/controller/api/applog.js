'use strict';

import Base from '../base.js';

export default class extends think.controller.base {

  async indexAction(){
    const _get = this.get();
    const _post = this.post();


    return this.success(_post);
  }
}
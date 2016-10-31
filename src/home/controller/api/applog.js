'use strict';

import Base from '../base.js';

export default class extends think.controller.base {

  async indexAction(){
    return this.success();
  }
}
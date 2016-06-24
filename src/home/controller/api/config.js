'use strict';

import Base from '../base.js';

export default class extends Base {

  async indexAction(){
    const program = await this.model('config').where({id:1}).find();

    delete program['id'];

    return this.success(program);
  }
}
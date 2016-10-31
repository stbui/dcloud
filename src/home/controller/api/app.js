'use strict';

import Base from '../base.js';

export default class extends think.controller.base {

    async indexAction() {
        global.setCorsHeader(this);

        const program = await this.model('program').getAllList();
        return this.success(program, this.locale('query_success'));
    }
}
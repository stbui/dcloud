'use strict';

import Base from '../base.js';

export default class extends think.controller.base {

    async indexAction() {
        this.setCorsHeader();

        const program = await this.model('program').getList({'program.status': 1});

        return this.success(program, this.locale('query_success'));
    }

    setCorsHeader() {
        this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
        this.header("Access-Control-Allow-Headers", "x-requested-with");
        this.header("Access-Control-Request-Method", "GET,POST,PUT,DELETE");
        this.header("Access-Control-Allow-Credentials", "true");
    }
}
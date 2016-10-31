'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {

        return this.display();
    }

    async getappslistAction() {
        global.setCorsHeader(this);

        const program = await this.model('program').getList({'program.status': 1});

        return this.success(program, this.locale('query_success'));
    }


    /*
     * 查询所有应用程序列表
     * @return {json}
     * */
    async getallappAction() {
        const program = await this.model('program').select();

        return this.success(program, this.locale('query_success'));
    }


    /*
     * 查询
     * @return {json}
     * */
    getapikeyAction() {

        return this.success({apiKey: think.uuid()});
    }


    pathlistAction() {
        return this.action('desktop', 'pathlist');
    }
}
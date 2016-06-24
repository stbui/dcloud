'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        let program = await this.model('program').getList();

        this.assign('app', program);

        return this.display();
    }

    addAction() {
        if (this.isPost()) {
            const data = this.post();
            this.model('program').add(data);
        }

        return this.display();
    }

    async editAction() {
        let _program = this.get();

        if (this.isPost()) {
            const data = this.post();
            console.log(data);
            this.model('program').where(_program).update(data);

            this.redirect('/admin/app/index');
        }

        _program = await this.model('program').getSingleList({'program.id':_program.id});
        this.assign('app', _program);

        _program = await this.model('server').select();
        this.assign('server', _program);

        return this.display();
    }

    delAction() {
        return this.display();
    }
}
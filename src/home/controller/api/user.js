'use strict';

export default class extends think.controller.base {

    async indexAction() {
        const _session = await this.session('userInfo');

        return this.success(_session, this.locale('query_success'));
    }

    modifyAction() {

        if (this.isPost()) {
            const _post = this.post();

            this.model('appusers').where(_post).update(_post);
        }

        return this.success(undefined, this.locale('query_success'));
    }


    async registerAction() {
        this.action('home/user', 'register');
    }

}
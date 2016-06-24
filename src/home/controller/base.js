'use strict';



export default class extends think.controller.base {
    /**
     * some base method in here
     */

    async __before() {

        let is_login = await this.islogin();

        if (!is_login) {
            return this.redirect('/signin');
        }

        this.userInfo = await this.session('userInfo');

        this.assign('username', this.userInfo.UserId);
    }

    __after() {
        let config = this.model('config').where({id: 1}).select();
        this.assign('config', config);
    }

    async islogin() {
        let userInfo = await this.session('userInfo');
        let result = think.isEmpty(userInfo) ? false : true;

        return result;
    }

}
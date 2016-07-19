'use strict';

import request from 'request';

export default class extends think.controller.base {

    async indexAction() {
        let is_login = await this.islogin();

        // 用户已经登陆，跳转到应用页面
        if (is_login) {
            this.redirect('/desktop');
        }


        if (this.isPost()) {

            const _post = this.post();
            const appusers = await this.model('appusers').where(_post).find();

            if (appusers) {
                this.model('appusers').where(_post).update({LastTime: think.datetime(), LastIp: this.ip()});

                this.session('userInfo', appusers);
            }


            const {UserId,NickName} = appusers;
            let userInfo = {
                UserId,
                NickName
            }

            if(think.isEmpty(appusers)) {
                return this.fail(this.locale('user_isloginFail'));
            }

            return this.success(userInfo, this.locale('query_success'));
        }

        if (!this.isAjax()) {
            return this.display();
        }
    }

    /*
     * 新用户注册
     *
     * */
    async registerAction() {
        const _post = this.post();
        const appusers = await this.model('appusers').thenAdd(_post, _post);
        if (appusers.type != "exist") {
            // 客户端服务器账号同步
            let userInfo = {UserId: _post.UserId, RemotePassword: _post.RemotePassword};
            let result = await this.syncallremoteusers(userInfo);

            return this.success(result, this.locale('query_success'));
        }

        return this.fail(5000, this.locale('user_isExist'));
    }

    /*
     * 自动登录
     *
     * */
    async autologinAction() {
        const appusers = await this.model('appusers').autoLogin();
        await this.session('userInfo', appusers);

        const {UserId,NickName} = appusers;
        let userInfo = {
            UserId,
            NickName
        }

        if(think.isEmpty(appusers)) {
            return this.fail(this.locale('user_isloginFail'));
        }

        return this.success(userInfo, this.locale('query_success'));
    }

    /*
     * 退出登录
     *
     * */
    async logoutAction() {
        let is_login = await this.islogin();
        if (is_login) {
            this.session('userInfo', null);
        }

        this.redirect('/signin');
    }

    /*
     * 是否已经登陆
     *
     * */
    async islogin() {
        let userInfo = await this.session('userInfo');
        let result = think.isEmpty(userInfo) ? false : true;

        return result;
    }


    /*
     * 同步当前用户，用户需要登陆
     *
     * */
    async syncallremoteusers(userInfo) {

        let formData = {
            username: '',
            password: ''
        };

        if (think.isEmpty(userInfo)) {
            let _data = this.post() || this.get();

            formData = {
                username: _data,
                password: _data
            };
        } else {
            formData = {
                username: userInfo.UserId,
                password: userInfo.RemotePassword
            };
        }


        const server = await this.model('server').select();
        const {remoteUserUrl} = this.config('api');


        let resultData = [];
        for (let key in server) {
            let {ip} = server[key];
            let url = remoteUserUrl.replace('${ip}', ip);

            let result = await global.request(url, formData).catch(e=> e);

            if (result.body) {
                result = JSON.parse(result.body);

                if (result.resultCode == 0) {
                    resultData.push({
                        code: result.resultCode,
                        msg: result.resultMsg,
                        ip: ip
                    });
                } else {
                    resultData.push({
                        code: result.resultCode,
                        msg: result.resultMsg,
                        ip: ip
                    });
                }

                think.log('客户端服务器账号同步：' + ip + this.locale('sync_success'), 'WARNING');
            } else {
                resultData.push({
                    code: result.code,
                    msg: result.code,
                    ip: ip
                });

                think.log('客户端服务器账号同步：' + ip + this.locale('sync_fail'), 'WARNING');
            }


        }

        return resultData;

    }

}
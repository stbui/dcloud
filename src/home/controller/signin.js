'use strict';

import request from 'request';

export default class extends think.controller.base {

    async indexAction() {
        let is_login = await this.islogin();

        if (is_login) {
            this.redirect('/desktop');
        }

        if (this.isPost()) {

            const _post = this.post();
            const appusers = await this.model('appusers').where(_post).find();

            if(appusers) {
                this.model('appusers').where(_post).update({LastTime:think.datetime(), LastIp:this.ip()});

                this.session('userInfo', appusers);
            }

            return this.redirect('/desktop');
        }

        let userInfo = {
            UserId: '',
            RemotePassword: ''
        };


        this.assign('userInfo', userInfo);
        return this.display();
    }

    /*
    * 新用户注册
    *
    * */
    async registerAction() {
        const _post = this.post();
        const appusers = await this.model('appusers').thenAdd(_post, _post);
        if(appusers.type != "exist") {
            // 客户端服务器账号同步
            think.log('客户端服务器账号同步','WARNING');
            let userInfo = {UserId:_post.UserId,RemotePassword:_post.RemotePassword};
            await this.syncallremoteusers(userInfo);

            think.log('注册完成','WARNING');
            return this.success(appusers,this.locale('query_success'));
        }

        return this.error(5000,this.locale('query_fail'));
    }

    /*
     * 自动登录
     *
     * */
    async autologinAction() {
        const appusers = await this.model('appusers').autoLogin();
        await this.session('userInfo', appusers);

        delete appusers.RemotePassword;

        return this.success(appusers,this.locale('query_success'));
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


    async syncallremoteusersAction() {
        const _userInfo = await this.session('userInfo');
        const _syncallremoteusers = await this.syncallremoteusers(_userInfo);

        return this.json(_syncallremoteusers);
    }

    /*
    * 同步当前用户，用户需要登陆
    *
    * */
    async syncallremoteusers(userInfo) {
        const server = await this.model('server').select();
        const config = await this.model('config').where({id: 1}).select();

        let resultRemote = [];
        let params = {
            key: config[0].apiKey,
            username: userInfo.UserId,
            password: userInfo.RemotePassword
        };


        for(var i in server) {

            let url = 'http://' + server[i].ip + ':'+ server[i].port+'/setuser.asp?' + this.setUrlParam(params);
            let resultData = await this.getApiData(url);

            if (resultData.statusCode == 404) {
                resultRemote.push({
                    ip:server[i].ip,
                    msg:'同步失败'
                });

                think.log('客户端服务器账号同步：'+server[i].ip+' 同步失败','WARNING');
            }

            if (resultData.statusCode == 200) {
                resultRemote.push({
                    ip:server[i].ip,
                    msg:'同步成功'
                });

                think.log('客户端服务器账号同步：'+server[i].ip+' 同步成功','WARNING');
            }
        }

        let json = {
            config:params,
            server:resultRemote
        };

        return json;
    }


    setUrlParam(obj) {
        let str = [];

        for (var i in obj) {
            str.push(i + '=' + encodeURIComponent(obj[i]));
        }

        return str.join('&');
    }

    getApiData(url) {
        let fn = think.promisify(request.get);
        return fn({
            url: url,
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) Chrome/47.0.2526.111 Safari/537.36"
            }
        });
    }

}
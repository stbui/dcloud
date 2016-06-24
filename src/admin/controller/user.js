'use strict';

import Base from './base.js';
import request from 'request';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction(){
        let user = this.model('appusers').select();

        this.assign('user', user);

        return this.display('index');
    }

    delAction() {
        const _get = this.get();
        this.model('appusers').where(_get).delete();

        this.redirect('/admin/user');
    }

    /*
    * todo：所有用户同步
    * 单用户同步
    * */
    async syncallremoteusersAction() {
        const _server = this.get();
        const user = await this.model('appusers').select();

        const config = await this.model('config').where({id:1}).select();


        let params = {
            key:config[0].apiKey,
            username:user[0].UserId,
            password:user[0].RemotePassword

        };

        let url = 'http://'+_server.ip+'/setuser.asp?'+this.setUrlParam(params);
        let resultData = await this.getApiData(url);

        if(resultData.statusCode == 404) {
            return this.error(5002,'404 Not Found');
        }

        if(resultData.statusCode == 200) {
            return this.success(null,'注册成功');
        }

    }

    setUrlParam(obj) {
        let str = [];

        for(var i in obj) {
            str.push(i+'='+encodeURIComponent(obj[i]));
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
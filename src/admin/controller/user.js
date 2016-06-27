'use strict';

import Base from './base.js';
import request from 'request';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
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
     * 单台客户端服务器用户同步
     * @param ip
     * @return json
     */
    async syncallremoteusersAction() {
        const _server = this.get();
        const user = await this.model('appusers').select();
        const config = await this.model('config').find();

        let resultRemoteUsers = [];

        for (var i in user) {
            let params = {
                key: config.apiKey,
                username: user[i].UserId,
                password: user[i].RemotePassword

            };

            let url = 'http://' + _server.ip + '/setuser.asp?' + this.setUrlParam(params);

            let resultData = await this.getApiData(url);

            if (resultData.statusCode == 200) {
                resultRemoteUsers.push({
                    userId: user[i].UserId,
                    key: config.apiKey,
                    ip: _server.ip,
                    status: true
                });

            } else {
                resultRemoteUsers.push({
                    userId: user[i].UserId,
                    key: config.apiKey,
                    ip: _server.ip,
                    status: false
                });
            }
        }

        this.model('server').where({ip:_server.ip}).update({syncUserDate:think.datetime()});

        return this.success(resultRemoteUsers, this.locale('query_success'));
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
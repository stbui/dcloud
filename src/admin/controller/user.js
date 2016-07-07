'use strict';

import Base from './base.js';


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
        const {ip} = this.get();
        const appusersData = await this.model('appusers').select();

        const {remoteUserUrl} = this.config('api');
        let url = remoteUserUrl.replace('${ip}', ip);

        appusersData.forEach((item)=> {
            // win2003 密码字符不能大于14
            let {UserId,RemotePassword} = item;
            let formData = {username: UserId, password: RemotePassword};
            global.request(url, formData);
        });

        // 最后同步时间
        this.model('server').where({ip: ip}).update({syncUserDate: think.datetime()});


        return this.success(undefined, this.locale('query_success'));
    }

}
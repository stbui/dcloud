'use strict';

import Base from './base.js';
import http from 'http';
import url from 'url';

export default class extends Base {
    /*
     * todo 从远程获取数据，并在当前地址展示
     *
     * */
    async indexAction() {
        const _get = this.get();
        const config = await this.model('config').find();
        let programData = await this.model('program').getFindSingleServer(_get.id);

        let path = `${programData.serverProbePath}\\app\\${programData.id}.bat`;
        path = `${path} proxy "default" "about:blank" ${config.apiKey}`;

        let params = {
            id: 'c/' + programData.serverAccessToken,
            username: this.userInfo.UserId,
            password: this.userInfo.RemotePassword,
            title: programData.name,
            icon: 'http://' + this.http.host + programData.icon,
            program: path
        };

        let url = config.guacamoleApi + '?' + global.setUrlParam(params);

        this.redirect(url);
    }

}
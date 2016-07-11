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
        let programData = await this.model('program').getList({'program.id': _get.id, 'program.status': 1});
        programData = programData[0];


        programData.path = 'c:\\release\\app\\1.bat'

        let program = `${programData.path} proxy "default" "about:blank" ${config.apiKey}`;

        let params = {
            id: 'c/' + programData.serverAccessToken,
            username: this.userInfo.UserId,
            password: this.userInfo.RemotePassword,
            title: programData.name,
            icon: programData.icon,
            program: program
        };

        let url = config.guacamoleApi + '?' + global.setUrlParam(params);

        this.redirect(url);


        return this.json(params);
    }

}
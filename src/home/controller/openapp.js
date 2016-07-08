'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction(){
        const _get = this.get();
        const programData = await this.model('program').getList({'program.id': _get.id,'program.status': 1});
        const config = await this.model('config').find();


        let program = '';
        program += programData.path;
        program += ' proxy';
        program += ' "default"';
        program += ' "about:blank"';
        program += ' '+config.apiKey;

        let params = {
            id:'c/'+programData.serverAccessToken,
            username: this.userInfo.UserId,
            password: this.userInfo.RemotePassword,
            title:programData.name,
            icon: programData.icon,
            program:program
        };

        let url = config.guacamoleApi+'?'+global.setUrlParam(params);

        this.redirect(url);

        return this.success(url);
    }
}
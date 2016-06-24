'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction(){
        const data = this.get();

        let config = await this.model('config').where({id:1}).select();
        config = config[0];

        let program = '';
        program += data.path;
        program += ' proxy';
        program += ' "default"';
        program += ' "about:blank"';
        program += ' '+config.apiKey;

        let params = {
            id:'c/'+data.group,
            username: this.userInfo.UserId,
            password: this.userInfo.RemotePassword,
            title:data.name,
            icon: data.icon,
            program:program
        };

        let url = config.guacamoleApi+'?'+this.setUrlParam(params);

        this.redirect(url);

        return this.success(params);
    }

    setUrlParam(obj) {
        let str = [];

        for(var i in obj) {
            str.push(i+'='+encodeURIComponent(obj[i]));
        }

        return str.join('&');
    }

}
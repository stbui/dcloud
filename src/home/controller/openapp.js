'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction(){
        const data = this.get();
        
        const userInfo = await this.session('userInfo');
        let config = this.model('config').where({id:1}).select();

        let guacamoleApi = 'http://172.16.97.13:20000/guacamole/client.xhtml';

        //let url = guacamoleApi+'?id=c%2Ff2etest-ie10&username=&password=&title=icon&program=c:\app\firefox.bat proxy "default" "about:blank" 54339b2c75b3059afbb0d2ecee0fea3d';

        let program = '';

        program += data.path;
        program += ' proxy';
        program += ' "default"';
        program += ' "about:blank"';
        program += ' '+config;

        let params = {
            id:data.group,
            username: userInfo.userId,
            password: userInfo.password,
            title:'Firefox',
            icon: '//'+this.http.host+'/static/home/images/app/firefox.png',
            program:program

        };

        let url = guacamoleApi;

        //this.redirect(url);

        return this.json(params);
    }
}
'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction(){
        const data = this.get();

        let guacamoleApi = 'http://172.16.97.13:20000/guacamole/client.xhtml';

        //let url = guacamoleApi+'?id=c%2Ff2etest-ie10&username=&password=&title=icon&program=c:\app\firefox.bat proxy "default" "about:blank" 54339b2c75b3059afbb0d2ecee0fea3d';


        let program = '';

        program += ' c:\app\firefox.bat';
        program += ' proxy';
        program += ' "default"';
        program += ' "about:blank"';
        program += ' 54339b2c75b3059afbb0d2ecee0fea3d';

        let params = {
            id:'c%2Ff2etest-ie10',
            username: 'User1466011150920',
            password:'5824efff2039b11ac6487d5a283f82ca',
            title:'Firefox',
            icon:'http://172.16.97.13:20001/imgs/app/firefox.png',
            program:program

        };

        let url = guacamoleApi;

        this.redirect(url);

    }
}
'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        return this.display('apps/index');
    }


    async pathlistAction() {
        this.setCorsHeader();

        const program = await this.model('program').getList({'program.status': 1});

        return this.success(program, this.locale('query_success'));
    }

    commonjsAction() {
        let LNG = this.locale();

        let AUTH = {};

        let G = {
            "lang": "zh_CN",
            "is_root": 1,
            "user_name": "admin",
            "web_root": think.ROOT_PATH,
            "web_host": this.http.host,
            "static_path": "\/static\/home\/",
            "basic_path": think.ROOT_PATH,
            "app_host": this.http.host,
            "myhome": think.ROOT_PATH,
            "upload_max": 2097152,
            "version": "1.0.0",
            "version_desc": "product",
            "json_data": "",
            "theme": "metro\/",
            "list_type": "icon",
            "sort_field": "name",
            "sort_order": "up",
            "musictheme": "mp3player",
            "movietheme": "webplayer"
        };

        let json = 'LNG=' + JSON.stringify(LNG) + ';AUTH=' + JSON.stringify(AUTH) + ';G=' + JSON.stringify(G);


        return this.json(json);
    }


    setCorsHeader(){
        this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
        this.header("Access-Control-Allow-Headers", "x-requested-with");
        this.header("Access-Control-Request-Method", "GET,POST,PUT,DELETE");
        this.header("Access-Control-Allow-Credentials", "true");
    }
}
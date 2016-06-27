'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction(){
        return this.display();
    }



    async pathlistAction() {
        const program = await this.model('program').getList();

        let filelist = [];

        program.forEach((v,k)=>{
            filelist.push({
                name: v.name,
                path: v.path,
                group:v.serverName,
                ext: 'oexe',
                type: 'url',
                icon: v.icon
            })
        });


        let json ={
            "code": true,
            "use_time":this.locale(),
            "data": {
                "folderlist": [],
                "filelist": [],
                "info": {
                    "path_type": "",
                    "role": "",
                    "id": "",
                    "name": ""
                },
                "path_read_write": "writeable",
                "user_space": {
                    "size_max": 0.1,
                    "size_use": 1048576
                }
            }
        };

        json.data.filelist = filelist;

        return this.json(json);

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
            "version": "3.21",
            "version_desc": "product",
            "json_data": "",
            "theme": "metro\/",
            "list_type": "icon",
            "sort_field": "name",
            "sort_order": "up",
            "musictheme": "mp3player",
            "movietheme": "webplayer"
        };

        let json = 'LNG='+JSON.stringify(LNG)+';AUTH=' + JSON.stringify(AUTH)+';G=' + JSON.stringify(G);



        return this.json(json);
    }
}
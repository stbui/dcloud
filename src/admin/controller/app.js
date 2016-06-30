'use strict';

import Base from './base.js';
import request from 'request';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        let program = await this.model('program').getList();

        this.assign('app', program);

        return this.display();
    }

    addAction() {
        if (this.isPost()) {
            const data = this.post();
            this.model('program').add(data);
        }

        return this.display();
    }

    async editAction() {
        const _get = this.get();
        const _post = this.post();

        let programData, serverData;


        if (this.isPost()) {
            this.model('program').where(_get).update(_post);

            // 在客户端服务器生成bat文件
            let options = _post;
            //options = {name: 3, path: 3, ip: 4};

            programData = await this.model('program').getSingleList({'program.id': _get.id});
            options.name = _get.id;
            options.ip = programData.serverIp;

            let result = await this.remoteServerCreateFile(options);

            this.redirect('/admin/app/index');
        }

        programData = await this.model('program').getSingleList({'program.id': _get.id});
        this.assign('app', programData);

        serverData = await this.model('server').select();
        this.assign('server', serverData);

        return this.display();
    }

    delAction() {
        return this.display();
    }

    async shownAction() {
        const _get = this.get();

        const programData = this.model('program');
        const row = await programData.where({id: _get.id}).find();

        if (row.status == 1) {
            await programData.where({id: _get.id}).update({status: 0});
        } else {
            await programData.where({id: _get.id}).update({status: 1});
        }

        return this.success(row)
    }

    async proxyAction() {
        const _get = this.get();

        const programData = this.model('program');
        const row = await programData.where({id: _get.id}).find();

        if (row.proxy == 1) {
            await programData.where({id: _get.id}).update({proxy: 0});
        } else {
            await programData.where({id: _get.id}).update({proxy: 1});
        }

        return this.success(row)
    }

    async remoteservercreatefileAction() {
        const _get = this.get();
        const _post = this.post();

        let options = {id: 2, name: 3, path: 3, ip: 4};

        if (think.isEmpty(_post)) {
            options = _post;
        }

        options = _get;

        let programData = await this.model('program').getSingleList({'program.id': options.id});

        options.ip = programData.serverIp;

        let result = await this.remoteServerCreateFile(options);

        this.json(result);
    }

    remoteServerCreateFile(options) {
        // 在客户端服务器生成文件
        // http://xxx/setuser.asp?shellName=ie&shellPath=c:\\2.bat
        let {name,path,ip} = options;

        name = name.replace(/\s+/g, '');

        let url = 'http://' + ip + '/setuser.asp?shellName=' + encodeURIComponent(name) + '&shellPath=' + encodeURIComponent(path);
        const result = this.getApiData(url);

        return result;
    }

    getApiData(url) {
        let fn = think.promisify(request.get);
        return fn({url: url});
    }
}
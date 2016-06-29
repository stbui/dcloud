'use strict';

import Base from './base.js';
import request from 'request';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        let server = this.model('server').select();
        this.assign('server', server);

        return this.display();
    }

    /**
     * add action
     * @return {Promise} []
     */
    addAction() {

        if(this.isPost()) {
            const _post = this.post();

            _post.accessToken = think.uuid();
            this.model('server').add(_post);

            this.redirect('/admin/server/index');
        }

        return this.display();
    }

    editAction() {
        const _get = this.get();

        if(this.isPost()) {
            const _post = this.post();

            if (!think.isEmpty(_get.id)) {
                this.model('server').where(_get).update(_post);
            }

            this.redirect('/admin/server/index');
        }

        const serverData = this.model('server').where(_get).find();

        this.assign('server', serverData);

        return this.display();
    }

    /*
     * del action
     *
     * */
    delAction() {
        let data = this.get();

        let result = this.model('server').where(data).delete();

        this.action('server', 'index');
    }

    async runstatusAction() {
        const _get = this.get();
        let server = await this.model('server').where(_get).find();

        let json = {
            name: server.name,
            ip: server.ip,
            port: server.port
        };

        let url = 'http://' + json.ip + ':' + json.port + '/setuser.asp';

        let resultData = await this.getApiData(url).catch((e)=> {
            return e
        });

        if (resultData.statusCode == 200) {
            this.model('server').where(_get).update({status: 1});
            return this.success(json, this.locale('query_success'));
        } else {
            this.model('server').where(_get).update({status: 0});
            return this.error(5000, this.locale('query_success'), json);
        }
    }

    getApiData(url) {
        let fn = think.promisify(request.get);
        return fn({
            url: url
        });
    }
}
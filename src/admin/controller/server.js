'use strict';

import Base from './base.js';
import http from 'http';


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

        if (this.isPost()) {
            const _post = this.post();

            //服务器身份标识
            _post.accessToken = think.uuid();
            this.model('server').add(_post);

            this.redirect('/admin/server/index');
        }

        return this.display();
    }

    editAction() {
        const _get = this.get();

        if (this.isPost()) {
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
        let _get = this.get();

        this.model('server').where(_get).delete();

        this.action('server', 'index');
    }

    /*
     * 检测客户端服务器运行状态
     *
     * */
    async checkremoteserverstateAction() {
        const _get = this.get();
        const serverData = await this.model('server').where(_get).find();
        const {ip,port} = serverData;


        let url = 'http://' + ip + ':' + port;
        let resultData = await global.request(url).catch((e)=> {
            return e
        });


        if (resultData.code == 'ETIMEDOUT') {
            this.model('server').where(_get).update({status: 1});
            return this.fail(this.locale('query_fail'), undefined);
        } else {
            this.model('server').where(_get).update({status: 0});
            return this.success(undefined, this.locale('query_success'));
        }
    }

}
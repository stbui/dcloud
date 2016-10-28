'use strict';

import Base from './base.js';


export default class extends Base {
    __before() {
        this.navType = 'server';
    }

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

            this.redirect('/admin/server/index.html');
        }

        return this.display();
    }

    editAction() {
        const _get = this.get();
        let {id} = _get;

        if (this.isPost()) {
            const _post = this.post();

            if (!think.isEmpty(id)) {
                this.model('server').where({id}).update(_post);
            }

            this.redirect('/admin/server/index.html');
        }

        const serverData = this.model('server').where({id}).find();

        this.assign('server', serverData);

        return this.display();
    }

    /**
     * del action
     * @return
     */
    delAction() {
        let _get = this.get();
        let {id} = _get;

        this.model('server').where({id}).delete();
        this.redirect('/admin/server/index.html');
    }

    /**
     * 检测客户端服务器运行状态
     *
     */
    async checkremoteserverstateAction() {
        const _get = this.get();
        let {id} = _get;
        const serverData = await this.model('server').where({id}).find();
        const {ip, port} = serverData;

        let url = 'http://' + ip + ':' + port;
        let resultData = await global.request(url).catch((e)=> {
            return e
        });

        if (resultData.code == 'ETIMEDOUT') {
            this.model('server').where({id}).update({status: 0});
            return this.fail(this.locale('query_fail'), undefined);
        } else {
            this.model('server').where({id}).update({status: 1});
            return this.success(undefined, this.locale('query_success'));
        }
    }

}
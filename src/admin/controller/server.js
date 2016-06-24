'use strict';

import Base from './base.js';
import request from 'request';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction(){
        let server = this.model('server').select();
        this.assign('server',server);

        return this.display();
    }

    /**
     * add action
     * @return {Promise} []
     */
    addAction(){
        let data = null;

        if(this.isPost()) {
            data = this.post();
            if(think.isEmpty(this.get('id'))) {
                this.model('server').add(data);
            } else {
                this.model('server').where(this.get()).update(data);
            }

            this.assign('server','');
        } else {
            data = this.get();
            let server = this.model('server').where(data).find();
            this.assign('server',server);

        }

        return this.display();
    }

    /*
    * del action
    *
    * */
    delAction(){
        let data = this.get();

        let result = this.model('server').where(data).delete();

        this.action('server','index');
    }

    async runstatusAction() {
        const _this = this;
        const _get = this.get();
        let server = await this.model('server').where(_get).find();

        let url = 'http://'+server.ip+':'+ server.port +'/setuser.asp';

        think.log('检测客户端服务器通信状态','WARNING');
        let resultData = await this.getApiData(url).then(function(content){
            think.log('检测客户端服务器通信状态：'+ content.statusCode,'WARNING');
            if(content.statusCode == 200) {
                // 更新数据状态
                _this.model('server').where(_get).update({status:1});

                return _this.success(null,_this.locale('query_success'));
            }else {
                // 更新数据状态
                this.model('server').where(_get).update({status:0});

                return _this.error(5002,_this.locale('query_fail'));
            }

        }).catch(function(err){
            think.log('检测客户端服务器通信状态：'+ _this.locale('query_fail'),'WARNING');
            // 更新数据状态
            _this.model('server').where(_get).update({status:0});

            return _this.error(5002,_this.locale('query_fail'));
        });

    }

    getApiData(url) {
        let fn = think.promisify(request.get);
        return fn({
            url: url,
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) Chrome/47.0.2526.111 Safari/537.36"
            }
        });
    }
}
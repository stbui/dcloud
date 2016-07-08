'use strict';

import Base from './base.js';

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

        let programData, serverData;

        if (this.isPost()) {
            const _post = this.post();
            // 更新数据
            this.model('program').where(_get).update(_post);

            // 在客户端服务器生成命令文件
            this.action('home/proxy', 'remotegeneratecmdsingle');
            this.redirect('/admin/app/index');
        }

        programData = await this.model('program').getSingleList({'program.id': _get.id});
        this.assign('app', programData);

        serverData = await this.model('server').select();
        this.assign('server', serverData);

        return this.display();
    }

    delAction() {
        const _get = this.get();
        this.model('program').where(_get).delete();

        this.redirect('/admin/app/index');
    }

    /*
     *  应用显示状态
     * */
    async shownAction() {
        const _get = this.get();

        if (think.isEmpty(_get)) {
            return this.fail()
        }

        const programData = this.model('program');
        const row = await programData.where({id: _get.id}).find();

        if (row.status == 1) {
            await programData.where({id: _get.id}).update({status: 0});
        } else {
            await programData.where({id: _get.id}).update({status: 1});
        }

        return this.success(row.status, this.locale('query_success'));
    }


}
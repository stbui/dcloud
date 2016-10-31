'use strict';

import Base from '../base.js';
import fs from 'fs';

export default class extends Base {

    async indexAction() {
        global.setCorsHeader(this);

        let userInfo = await this.session('userInfo');
        if (think.isEmpty(userInfo)) {
            return this.fail(this.locale('user_islogin'))
        }
        let {UserId} = userInfo;
        let result = await this.model('proxy').where({userId: UserId}).select();

        return this.success(result, this.locale('query_success'));
    }

    async addAction() {
        global.setCorsHeader(this);
        const {target, source} = this.post();
        const userInfo = await this.session('userInfo');

        if (think.isEmpty(userInfo)) {
            return this.fail(this.locale('user_islogin'));
        }

        if (think.isEmpty(target) || think.isEmpty(source)) {
            return this.fail('参数错误');
        }

        let data = {
            userId: userInfo.UserId,
            target,
            source
        }

        const result = await this.model('proxy').thenAdd(data, {target, source});

        if (result.type == 'exist') {
            return this.fail(this.locale('user_isExist'));
        }

        this.success(data, this.locale('query_success'));
    }

    async delAction() {
        global.setCorsHeader(this);

        const {id} = this.get();
        // 当前用户信息
        const userInfo = await this.session('userInfo');

        if (think.isEmpty(userInfo)) {
            return this.fail(this.locale('user_islogin'))
        }

        let data = {
            userId: userInfo.UserId,
            id
        }

        const proxyData = await this.model('proxy').where(data).delete();
        if(proxyData == 0) {
            return this.fail(this.locale('query_fail'))
        }

        return this.success(proxyData, this.locale('query_success'));
    }
}
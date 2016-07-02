'use strict';
/**
 * model
 */
export default class extends think.model.base {

    async autoLogin(){
        const userInfo = await this.select();

        let random = parseInt(Math.random() * userInfo.length);
        let user = userInfo[random];

        return user;
    }

    async signin(data) {
        const user = await this.where(data).find();

        return user;
    }

}
'use strict';
/**
 * model
 */
export default class extends think.model.base {

    getList(data) {

        return this.field(['proxy.*', 'appusers.UserId as userId']).join({
            table: 'appusers',
            join: 'left',
            on: ['UserId', 'UserId']
        }).where(data).select();
    }

    getSingleList(data) {
        return this.field(['program.*', 'appusers.UserId as userId']).join({
            table: 'appusers',
            join: 'left',
            on: ['UserId', 'UserId']
        }).where(data).find();
    }

}
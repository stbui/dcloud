'use strict';
/**
 * model
 */
export default class extends think.model.base {

    getList(data) {
        let table = this.getTableName() + '.*';
        let appusersTablePrefix = 'appusers.';
        let userId = appusersTablePrefix + 'UserId as userId';

        return this.field([table, userId]).join({
            table: 'appusers',
            join: 'left',
            on: ['UserId', 'UserId']
        }).where(data).select();
    }

    getSingleList(data) {
        let table = this.getTableName() + '.*';

        let appusersTablePrefix = 'appusers.';
        let userId = appusersTablePrefix + 'UserId as userId';

        return this.field([table, userId]).join({
            table: 'appusers',
            join: 'left',
            on: ['UserId', 'UserId']
        }).where(data).find();
    }

}
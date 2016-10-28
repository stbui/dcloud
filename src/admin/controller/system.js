'use strict';

import Base from './base.js';

export default class extends Base {
    __before() {
        this.navType = 'system';
    }

    indexAction() {

        if (this.isPost()) {
            const data = this.post();
            this.model('config').where({id: 1}).update(data);
        }

        const configData = this.model('config').find();
        this.assign('config', configData);

        return this.display();
    }
}
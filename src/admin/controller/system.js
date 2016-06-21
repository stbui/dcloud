'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction(){

        if(this.isPost()) {
            const data = this.post();
            this.model('config').where({id:1}).update(data);
        }

        let config = this.model('config').where({id:1}).select();
        this.assign('config',config);

        return this.display();
    }
}
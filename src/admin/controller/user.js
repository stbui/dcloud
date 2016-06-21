'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction(){
        let user = this.model('appusers').select();

        this.assign('user', user);

        return this.display();
    }




}
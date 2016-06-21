'use strict';

import Base from './base.js';

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
            let server = this.model('server').where(data).find(data);
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
}
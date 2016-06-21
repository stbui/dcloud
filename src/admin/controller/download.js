'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction(){
    }

    clientAction() {
        let filePath = think.RESOURCE_PATH + '/probe.js';

        this.download(filePath,'probe.asp');
    }

}
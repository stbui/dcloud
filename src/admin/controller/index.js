'use strict';

import Base from './base.js';

export default class extends Base {
    __before() {
        this.navType = 'index';
    }

    indexAction() {
        //auto render template file index_index.html
        return this.display();
    }
}
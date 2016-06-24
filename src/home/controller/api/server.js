'use strict';

import Base from '../base.js';

export default class extends Base {

  runstatusAction() {

    return this.action('admin/server','runstatus');
  }
}
'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){

    return this.display();
  }

  appAction(){
    let json = [{"id":"hostsshare","name":"hosts"},{"id":"ie6","name":"IE 6"},{"id":"ie7","name":"IE 7"},{"id":"ie8","name":"IE 8"},{"id":"ie9","name":"IE 9"},{"id":"ie10","name":"IE 10"},{"id":"ie11","name":"IE 11"},{"id":"chrome","name":"Chrome"},{"id":"firefox","name":"Firefox"},{"id":"opera","name":"Opera"},{"id":"360se","name":"360浏览器"},{"id":"360chrome","name":"360极速浏览器"},{"id":"liebao","name":"猎豹浏览器"},{"id":"maxthon","name":"傲游浏览器"},{"id":"qqbrowser","name":"QQ浏览器"},{"id":"ucbrowser","name":"UC浏览器"},{"id":"sogou","name":"搜狗浏览器"},{"id":"2345","name":"2345浏览器"},{"id":"theworld","name":"世界之窗"},{"id":"safari","name":"safari浏览器"},{"id":"desktop","name":"我的桌面"},{"id":"431103.com","name":"我的服务器"},{"id":"20","name":"20服务器"},{"id":"19","name":"19服务器"},{"id":"18","name":"18服务器"},{"id":"129","name":"129服务器"}];

    return this.json();
  }
}
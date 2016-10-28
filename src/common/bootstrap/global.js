/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 *
 * global.fn1 = function(){
 *
 * }
 */

import request from 'request';

global.request = (url, formData, method) => {
    let fn = think.promisify(request);
    return fn({
        method: method || 'POST',
        url: url,
        timeout:200,
        form: formData
    });
};

global.setUrlParam = (obj)=> {
    let str = [];

    for (var i in obj) {
        str.push(i + '=' + encodeURI(obj[i]));
    }

    return str.join('&');
};

//global.setCorsHeade= (self) =>{
//    this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
//    this.header("Access-Control-Allow-Headers", "x-requested-with");
//    this.header("Access-Control-Request-Method", "GET,POST,PUT,DELETE");
//    this.header("Access-Control-Allow-Credentials", "true");
//};
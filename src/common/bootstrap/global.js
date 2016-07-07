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

global.test = obj => {
    return 'global'
};

global.request = (url, formData, method) => {
    let fn = think.promisify(request);
    return fn({
        method: method || 'POST',
        url: url,
        form: formData
    });
};

global.setUrlParam = (obj)=> {
    let str = [];

    for (var i in obj) {
        str.push(i + '=' + encodeURIComponent(obj[i]));
    }

    return str.join('&');
};
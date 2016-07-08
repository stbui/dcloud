'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.test = function (obj) {
    return 'global';
}; /**
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

global.request = function (url, formData, method) {
    var fn = think.promisify(_request2.default);
    return fn({
        method: method || 'POST',
        url: url,
        timeout: 200,
        form: formData
    });
};

global.setUrlParam = function (obj) {
    var str = [];

    for (var i in obj) {
        str.push(i + '=' + encodeURI(obj[i]));
    }

    return str.join('&');
};
//# sourceMappingURL=global.js.map
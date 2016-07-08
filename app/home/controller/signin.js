'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$controller$bas) {
    (0, _inherits3.default)(_class, _think$controller$bas);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
    }

    _class.prototype.indexAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var is_login, _post, appusers, userInfo;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return this.islogin();

                        case 2:
                            is_login = _context.sent;


                            if (is_login) {
                                this.redirect('/desktop');
                            }

                            if (!this.isPost()) {
                                _context.next = 11;
                                break;
                            }

                            _post = this.post();
                            _context.next = 8;
                            return this.model('appusers').where(_post).find();

                        case 8:
                            appusers = _context.sent;


                            if (appusers) {
                                this.model('appusers').where(_post).update({ LastTime: think.datetime(), LastIp: this.ip() });

                                this.session('userInfo', appusers);
                            }

                            return _context.abrupt('return', this.redirect('/desktop'));

                        case 11:
                            userInfo = {
                                UserId: '',
                                RemotePassword: ''
                            };


                            this.assign('userInfo', userInfo);
                            return _context.abrupt('return', this.display());

                        case 14:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function indexAction() {
            return ref.apply(this, arguments);
        }

        return indexAction;
    }();

    /*
     * 新用户注册
     *
     * */


    _class.prototype.registerAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
            var _post, appusers, userInfo, result;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _post = this.post();
                            _context2.next = 3;
                            return this.model('appusers').thenAdd(_post, _post);

                        case 3:
                            appusers = _context2.sent;

                            if (!(appusers.type != "exist")) {
                                _context2.next = 10;
                                break;
                            }

                            // 客户端服务器账号同步
                            userInfo = { UserId: _post.UserId, RemotePassword: _post.RemotePassword };
                            _context2.next = 8;
                            return this.syncallremoteusers(userInfo);

                        case 8:
                            result = _context2.sent;
                            return _context2.abrupt('return', this.success(result, this.locale('query_success')));

                        case 10:
                            return _context2.abrupt('return', this.fail(5000, this.locale('user_isExist')));

                        case 11:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function registerAction() {
            return ref.apply(this, arguments);
        }

        return registerAction;
    }();

    /*
     * 自动登录
     *
     * */


    _class.prototype.autologinAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
            var appusers;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return this.model('appusers').autoLogin();

                        case 2:
                            appusers = _context3.sent;
                            _context3.next = 5;
                            return this.session('userInfo', appusers);

                        case 5:
                            return _context3.abrupt('return', this.success(appusers, this.locale('query_success')));

                        case 6:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function autologinAction() {
            return ref.apply(this, arguments);
        }

        return autologinAction;
    }();

    /*
     * 退出登录
     *
     * */


    _class.prototype.logoutAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
            var is_login;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return this.islogin();

                        case 2:
                            is_login = _context4.sent;

                            if (is_login) {
                                this.session('userInfo', null);
                            }

                            this.redirect('/signin');

                        case 5:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function logoutAction() {
            return ref.apply(this, arguments);
        }

        return logoutAction;
    }();

    /*
     * 是否已经登陆
     *
     * */


    _class.prototype.islogin = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
            var userInfo, result;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return this.session('userInfo');

                        case 2:
                            userInfo = _context5.sent;
                            result = think.isEmpty(userInfo) ? false : true;
                            return _context5.abrupt('return', result);

                        case 5:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function islogin() {
            return ref.apply(this, arguments);
        }

        return islogin;
    }();

    /*
     * 同步当前用户，用户需要登陆
     *
     * */


    _class.prototype.syncallremoteusers = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(userInfo) {
            var formData, _data, server, _config, remoteUserUrl, resultData, key, ip, url, result;

            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            formData = {
                                username: '',
                                password: ''
                            };


                            if (think.isEmpty(userInfo)) {
                                _data = this.post() || this.get();


                                formData = {
                                    username: _data,
                                    password: _data
                                };
                            } else {
                                formData = {
                                    username: userInfo.UserId,
                                    password: userInfo.RemotePassword
                                };
                            }

                            _context6.next = 4;
                            return this.model('server').select();

                        case 4:
                            server = _context6.sent;
                            _config = this.config('api');
                            remoteUserUrl = _config.remoteUserUrl;
                            resultData = [];
                            _context6.t0 = _regenerator2.default.keys(server);

                        case 9:
                            if ((_context6.t1 = _context6.t0()).done) {
                                _context6.next = 19;
                                break;
                            }

                            key = _context6.t1.value;
                            ip = server[key].ip;
                            url = remoteUserUrl.replace('${ip}', ip);
                            _context6.next = 15;
                            return global.request(url, formData).catch(function (e) {
                                return e;
                            });

                        case 15:
                            result = _context6.sent;


                            if (result.body) {
                                result = JSON.parse(result.body);

                                if (result.resultCode == 0) {
                                    resultData.push({
                                        code: result.resultCode,
                                        msg: result.resultMsg,
                                        ip: ip
                                    });
                                } else {
                                    resultData.push({
                                        code: result.resultCode,
                                        msg: result.resultMsg,
                                        ip: ip
                                    });
                                }

                                think.log('客户端服务器账号同步：' + ip + this.locale('sync_success'), 'WARNING');
                            } else {
                                resultData.push({
                                    code: result.code,
                                    msg: result.code,
                                    ip: ip
                                });

                                think.log('客户端服务器账号同步：' + ip + this.locale('sync_fail'), 'WARNING');
                            }

                            _context6.next = 9;
                            break;

                        case 19:
                            return _context6.abrupt('return', resultData);

                        case 20:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function syncallremoteusers(_x) {
            return ref.apply(this, arguments);
        }

        return syncallremoteusers;
    }();

    return _class;
}(think.controller.base);

exports.default = _class;
//# sourceMappingURL=signin.js.map
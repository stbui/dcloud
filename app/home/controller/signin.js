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
            var _post, appusers, userInfo;

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
                                _context2.next = 11;
                                break;
                            }

                            // 客户端服务器账号同步
                            // debug 在服务器没有开启时，json数据没有返回
                            think.log('客户端服务器账号同步', 'WARNING');
                            userInfo = { UserId: _post.UserId, RemotePassword: _post.RemotePassword };
                            _context2.next = 9;
                            return this.syncallremoteusers(userInfo);

                        case 9:

                            think.log('注册完成', 'WARNING');
                            return _context2.abrupt('return', this.success(appusers, this.locale('query_success')));

                        case 11:
                            return _context2.abrupt('return', this.error(5000, this.locale('query_fail')));

                        case 12:
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

    _class.prototype.syncallremoteusersAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
            var _userInfo, _syncallremoteusers;

            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return this.session('userInfo');

                        case 2:
                            _userInfo = _context6.sent;
                            _context6.next = 5;
                            return this.syncallremoteusers(_userInfo);

                        case 5:
                            _syncallremoteusers = _context6.sent;
                            return _context6.abrupt('return', this.json(_syncallremoteusers));

                        case 7:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function syncallremoteusersAction() {
            return ref.apply(this, arguments);
        }

        return syncallremoteusersAction;
    }();

    /*
     * 同步当前用户，用户需要登陆
     *
     * */


    _class.prototype.syncallremoteusers = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(userInfo) {
            var server, config, resultRemote, params, i, url, resultData;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.next = 2;
                            return this.model('server').select();

                        case 2:
                            server = _context7.sent;
                            _context7.next = 5;
                            return this.model('config').find();

                        case 5:
                            config = _context7.sent;
                            resultRemote = [];
                            params = {
                                key: config.apiKey,
                                username: userInfo.UserId,
                                password: userInfo.RemotePassword
                            };
                            _context7.t0 = _regenerator2.default.keys(server);

                        case 9:
                            if ((_context7.t1 = _context7.t0()).done) {
                                _context7.next = 18;
                                break;
                            }

                            i = _context7.t1.value;
                            url = 'http://' + server[i].ip + ':' + server[i].port + '/setuser.asp?' + this.setUrlParam(params);
                            _context7.next = 14;
                            return this.getApiData(url);

                        case 14:
                            resultData = _context7.sent;


                            if (resultData.statusCode == 200) {
                                resultRemote.push({
                                    key: config.apiKey,
                                    username: userInfo.UserId,
                                    ip: server[i].ip,
                                    status: false,
                                    msg: this.locale('sync_success')
                                });

                                think.log('客户端服务器账号同步：' + server[i].ip + this.locale('sync_success'), 'WARNING');
                            } else {
                                resultRemote.push({
                                    key: config.apiKey,
                                    username: userInfo.UserId,
                                    ip: server[i].ip,
                                    status: false,
                                    msg: this.locale('sync_fail')
                                });

                                think.log('客户端服务器账号同步：' + server[i].ip + this.locale('sync_fail'), 'WARNING');
                            }
                            _context7.next = 9;
                            break;

                        case 18:
                            return _context7.abrupt('return', this.success(resultRemote, this.locale('query_success')));

                        case 19:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        function syncallremoteusers(_x) {
            return ref.apply(this, arguments);
        }

        return syncallremoteusers;
    }();

    _class.prototype.setUrlParam = function setUrlParam(obj) {
        var str = [];

        for (var i in obj) {
            str.push(i + '=' + encodeURIComponent(obj[i]));
        }

        return str.join('&');
    };

    _class.prototype.getApiData = function getApiData(url) {
        var fn = think.promisify(_request2.default.get);
        return fn({
            url: url,
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) Chrome/47.0.2526.111 Safari/537.36"
            }
        });
    };

    return _class;
}(think.controller.base);

exports.default = _class;
//# sourceMappingURL=signin.js.map
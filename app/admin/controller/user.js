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

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
    (0, _inherits3.default)(_class, _Base);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
    }

    /**
     * index action
     * @return {Promise} []
     */

    _class.prototype.indexAction = function indexAction() {
        var user = this.model('appusers').select();

        this.assign('user', user);

        return this.display('index');
    };

    _class.prototype.delAction = function delAction() {
        var _get = this.get();
        this.model('appusers').where(_get).delete();

        this.redirect('/admin/user');
    };

    /*
     * 单台客户端服务器用户同步
     * @param ip
     * @return json
     */


    _class.prototype.syncallremoteusersAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var _server, user, config, resultRemoteUsers, i, params, url, resultData;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _server = this.get();
                            _context.next = 3;
                            return this.model('appusers').select();

                        case 3:
                            user = _context.sent;
                            _context.next = 6;
                            return this.model('config').find();

                        case 6:
                            config = _context.sent;
                            resultRemoteUsers = [];
                            _context.t0 = _regenerator2.default.keys(user);

                        case 9:
                            if ((_context.t1 = _context.t0()).done) {
                                _context.next = 19;
                                break;
                            }

                            i = _context.t1.value;
                            params = {
                                key: config.apiKey,
                                username: user[i].UserId,
                                password: user[i].RemotePassword

                            };
                            url = 'http://' + _server.ip + '/setuser.asp?' + this.setUrlParam(params);
                            _context.next = 15;
                            return this.getApiData(url);

                        case 15:
                            resultData = _context.sent;


                            if (resultData.statusCode == 200) {
                                resultRemoteUsers.push({
                                    userId: user[i].UserId,
                                    key: config.apiKey,
                                    ip: _server.ip,
                                    status: true
                                });
                            } else {
                                resultRemoteUsers.push({
                                    userId: user[i].UserId,
                                    key: config.apiKey,
                                    ip: _server.ip,
                                    status: false
                                });
                            }
                            _context.next = 9;
                            break;

                        case 19:

                            this.model('server').where({ ip: _server.ip }).update({ syncUserDate: think.datetime() });

                            return _context.abrupt('return', this.success(resultRemoteUsers, this.locale('query_success')));

                        case 21:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function syncallremoteusersAction() {
            return ref.apply(this, arguments);
        }

        return syncallremoteusersAction;
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
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=user.js.map
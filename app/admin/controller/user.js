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
            var _get2, ip, appusersData, _config, remoteUserUrl, url;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _get2 = this.get();
                            ip = _get2.ip;
                            _context.next = 4;
                            return this.model('appusers').select();

                        case 4:
                            appusersData = _context.sent;
                            _config = this.config('api');
                            remoteUserUrl = _config.remoteUserUrl;
                            url = remoteUserUrl.replace('${ip}', ip);


                            appusersData.forEach(function (item) {
                                // win2003 密码字符不能大于14
                                var UserId = item.UserId;
                                var RemotePassword = item.RemotePassword;

                                var formData = { username: UserId, password: RemotePassword };
                                global.request(url, formData);
                            });

                            // 最后同步时间
                            this.model('server').where({ ip: ip }).update({ syncUserDate: think.datetime() });

                            return _context.abrupt('return', this.success(undefined, this.locale('query_success')));

                        case 11:
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

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=user.js.map
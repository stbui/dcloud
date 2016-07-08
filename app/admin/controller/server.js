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

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

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
        var server = this.model('server').select();
        this.assign('server', server);

        return this.display();
    };

    /**
     * add action
     * @return {Promise} []
     */


    _class.prototype.addAction = function addAction() {

        if (this.isPost()) {
            var _post = this.post();

            //服务器身份标识
            _post.accessToken = think.uuid();
            this.model('server').add(_post);

            this.redirect('/admin/server/index');
        }

        return this.display();
    };

    _class.prototype.editAction = function editAction() {
        var _get = this.get();

        if (this.isPost()) {
            var _post = this.post();

            if (!think.isEmpty(_get.id)) {
                this.model('server').where(_get).update(_post);
            }

            this.redirect('/admin/server/index');
        }

        var serverData = this.model('server').where(_get).find();

        this.assign('server', serverData);

        return this.display();
    };

    /*
     * del action
     *
     * */


    _class.prototype.delAction = function delAction() {
        var _get = this.get();

        this.model('server').where(_get).delete();

        this.action('server', 'index');
    };

    /*
     * 检测客户端服务器运行状态
     *
     * */


    _class.prototype.checkremoteserverstateAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var _get, serverData, ip, port, url, resultData;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _get = this.get();
                            _context.next = 3;
                            return this.model('server').where(_get).find();

                        case 3:
                            serverData = _context.sent;
                            ip = serverData.ip;
                            port = serverData.port;
                            url = 'http://' + ip + ':' + port;
                            _context.next = 9;
                            return global.request(url).catch(function (e) {
                                return e;
                            });

                        case 9:
                            resultData = _context.sent;

                            if (!(resultData.code == 'ETIMEDOUT')) {
                                _context.next = 15;
                                break;
                            }

                            this.model('server').where(_get).update({ status: 1 });
                            return _context.abrupt('return', this.fail(this.locale('query_fail'), undefined));

                        case 15:
                            this.model('server').where(_get).update({ status: 0 });
                            return _context.abrupt('return', this.success(undefined, this.locale('query_success')));

                        case 17:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function checkremoteserverstateAction() {
            return ref.apply(this, arguments);
        }

        return checkremoteserverstateAction;
    }();

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=server.js.map
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
        var data = this.get();

        var result = this.model('server').where(data).delete();

        this.action('server', 'index');
    };

    _class.prototype.runstatusAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var _get, server, json, url, resultData;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _get = this.get();
                            _context.next = 3;
                            return this.model('server').where(_get).find();

                        case 3:
                            server = _context.sent;
                            json = {
                                name: server.name,
                                ip: server.ip,
                                port: server.port
                            };
                            url = 'http://' + json.ip + ':' + json.port + '/setuser.asp';
                            _context.next = 8;
                            return this.getApiData(url).catch(function (e) {
                                return e;
                            });

                        case 8:
                            resultData = _context.sent;

                            if (!(resultData.statusCode == 200)) {
                                _context.next = 14;
                                break;
                            }

                            this.model('server').where(_get).update({ status: 1 });
                            return _context.abrupt('return', this.success(json, this.locale('query_success')));

                        case 14:
                            this.model('server').where(_get).update({ status: 0 });
                            return _context.abrupt('return', this.error(5000, this.locale('query_success'), json));

                        case 16:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function runstatusAction() {
            return ref.apply(this, arguments);
        }

        return runstatusAction;
    }();

    _class.prototype.getApiData = function getApiData(url) {
        var fn = think.promisify(_request2.default.get);
        return fn({
            url: url
        });
    };

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=server.js.map
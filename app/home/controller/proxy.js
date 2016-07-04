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

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

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

    _class.prototype.indexAction = function indexAction(self) {};

    _class.prototype.regaddAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var proxyUrl, cmdStr, result;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            proxyUrl = 'http://dcloud.stbui.com';
                            cmdStr = 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v AutoConfigURL /d ' + proxyUrl + ' /f >nul';
                            _context.next = 4;
                            return this.exec(cmdStr).catch(function (e) {
                                return e;
                            });

                        case 4:
                            result = _context.sent;


                            if (think.isEmpty(result)) result = cmdStr;

                            this.success(result, this.locale('query_success'));

                        case 7:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function regaddAction() {
            return ref.apply(this, arguments);
        }

        return regaddAction;
    }();

    _class.prototype.proxyAction = function proxyAction(self) {
        var server = _http2.default.createServer().on('request', function (req, res) {
            var u = _url2.default.parse(req.url);

            var options = {
                hostname: u.hostname,
                port: u.port || 80,
                path: u.path,
                method: req.method,
                headers: req.headers
            };

            var pReq = _http2.default.request(options, function (pRes) {
                res.writeHead(pRes.statusCode, pRes.headers);
                pRes.pipe(res);
            });

            pReq.on('error', function (e) {
                res.end();
            });

            req.pipe(pReq);

            console.log(options);
        });

        server.listen(88, '0.0.0.0');

        var pacContent = 'function FindProxyForURL(url, host){return "PROXY 172.16.97.13:88";}';
        this.json(pacContent);
    };

    _class.prototype.tcpserverAction = function tcpserverAction() {
        var server = _net2.default.createServer(function (socket) {
            console.log('server connection');

            socket.write('server success');
            //socket.pipe(socket);

            socket.on('data', function (data) {
                console.log('server print:', data.toString());
            });
        });

        server.listen(8124, function () {
            console.log('server listen');
        });
    };

    _class.prototype.tcpclientAction = function tcpclientAction() {
        var client = _net2.default.connect({ port: 8124 }, function () {
            console.log('client connected');
            client.write('client success');
        });

        client.on('data', function (data) {
            console.log('data:', data.toString());
            client.end();
        });

        client.on('end', function () {
            console.log('client disconnection');
        });
    };

    _class.prototype.exec = function exec(cmd) {
        var exec = _child_process2.default.exec;


        var fn = think.promisify(exec);

        return fn(cmd);
    };

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=proxy.js.map
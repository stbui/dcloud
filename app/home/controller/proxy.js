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

var _url2 = require('url');

var _url3 = _interopRequireDefault(_url2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var proxyServer = false;

var _class = function (_think$controller$bas) {
    (0, _inherits3.default)(_class, _think$controller$bas);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
    }

    _class.prototype.indexAction = function indexAction() {

        this.success();
    };

    /**
     * 远程部署[ 所有 ]记录启动应用命令
     *
     * @return {Promise} []
     */


    _class.prototype.remotegeneratecmdAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var _config, remoteProgramUrl, programData, result, _key, _programData$_key, id, path, serverIp, serverProbePath, options, remotePath, formData, _url, _result;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _config = this.config('api');
                            remoteProgramUrl = _config.remoteProgramUrl;
                            _context.next = 4;
                            return this.model('program').getList();

                        case 4:
                            programData = _context.sent;
                            result = [];
                            _context.t0 = _regenerator2.default.keys(programData);

                        case 7:
                            if ((_context.t1 = _context.t0()).done) {
                                _context.next = 24;
                                break;
                            }

                            _key = _context.t1.value;
                            _programData$_key = programData[_key];
                            id = _programData$_key.id;
                            path = _programData$_key.path;
                            serverIp = _programData$_key.serverIp;
                            serverProbePath = _programData$_key.serverProbePath;
                            options = {
                                domain: 'http://' + this.http.host,
                                appid: id,
                                appPath: path
                            };
                            remotePath = serverProbePath + '/app/' + id + '.bat';
                            formData = { cmd: this.getShellContent(options), path: remotePath };
                            _url = remoteProgramUrl.replace('${ip}', serverIp);
                            _context.next = 20;
                            return this.getApiData(_url, formData).catch(function (e) {
                                think.log(e, 'WARNING');
                                return e;
                            });

                        case 20:
                            _result = _context.sent;


                            if (_result.code == 'ENOTFOUND') {
                                _result.id = programData[_key].id;
                                result.push(_result);
                            } else {
                                result.push({
                                    code: 200,
                                    errno: 0,
                                    hostname: _result.request.hostname,
                                    host: _result.request.host,
                                    port: _result.request.port,
                                    id: programData[_key].id
                                });
                            }

                            _context.next = 7;
                            break;

                        case 24:

                            this.success(result, this.locale('query_success'));

                        case 25:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function remotegeneratecmdAction() {
            return ref.apply(this, arguments);
        }

        return remotegeneratecmdAction;
    }();

    /**
     * 远程部署[ 单条 ]记录启动应用命令
     *
     * @return {Promise} []
     */


    _class.prototype.remotegeneratecmdsingleAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
            var _get, _config2, remoteProgramUrl, programData, id, path, serverIp, serverProbePath, result, remotePath, options, formData, url, _result;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _get = this.get();
                            _config2 = this.config('api');
                            remoteProgramUrl = _config2.remoteProgramUrl;
                            _context2.next = 5;
                            return this.model('program').getSingleList({ 'program.id': _get.id });

                        case 5:
                            programData = _context2.sent;
                            id = programData.id;
                            path = programData.path;
                            serverIp = programData.serverIp;
                            serverProbePath = programData.serverProbePath;
                            result = [];
                            remotePath = serverProbePath + '/app/' + id + '.bat';
                            options = {
                                domain: 'http://' + this.http.host,
                                appid: id,
                                appPath: path
                            };
                            formData = { cmd: this.getShellContent(options), path: remotePath };
                            url = remoteProgramUrl.replace('${ip}', serverIp);
                            _context2.next = 17;
                            return this.getApiData(url, formData).catch(function (e) {
                                think.log(e, 'WARNING');
                                return e;
                            });

                        case 17:
                            _result = _context2.sent;


                            if (_result.code == 'ENOTFOUND') {
                                _result.id = programData[key].id;
                                result.push(_result);
                            } else {
                                result.push({
                                    code: 200,
                                    errno: 0,
                                    hostname: _result.request.hostname,
                                    host: _result.request.host,
                                    port: _result.request.port,
                                    id: id
                                });
                            }

                            this.success(result, this.locale('query_success'));

                        case 20:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function remotegeneratecmdsingleAction() {
            return ref.apply(this, arguments);
        }

        return remotegeneratecmdsingleAction;
    }();

    _class.prototype.pacAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
            var pacContent;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:

                            if (proxyServer == false) {
                                this.pac(_http2.default);
                                proxyServer = true;
                            }

                            pacContent = 'function FindProxyForURL(url, host){return "PROXY 172.16.97.13:8362";}';

                            this.json(pacContent);

                        case 3:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function pacAction() {
            return ref.apply(this, arguments);
        }

        return pacAction;
    }();

    _class.prototype.getUserHosts = function getUserHosts(hostname) {

        var hosts = [{ '192.168.159.137': 'dcloud.stbui.com' }, { '127.0.0.1': 'www.stbui.com' }];

        var host = hostname;

        for (var _key2 in hosts) {
            for (var k in hosts[_key2]) {
                if (hosts[_key2][k] == hostname) {
                    host = k;
                }
            }
        }

        return host;
    };

    _class.prototype.pac = function pac(http) {
        var _this2 = this;

        var server = http.createServer().on('request', function (req, res) {
            var u = _url3.default.parse(req.url);

            //let options = {
            //    hostname: u.hostname,
            //    port: u.port || 80,
            //    path: u.path,
            //    method: req.method,
            //    headers: req.headers
            //};

            var options = {
                hostname: _this2.getUserHosts(u.hostname),
                port: u.port || 80,
                path: u.path,
                method: req.method,
                headers: req.headers
            };

            var pReq = http.request(options, function (pRes) {
                res.writeHead(pRes.statusCode, pRes.headers);
                pRes.pipe(res);
            });

            pReq.on('error', function (e) {
                res.end();
            });

            req.pipe(pReq);
        });

        server.listen(8362, '0.0.0.0');

        return server;
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

    _class.prototype.getApiData = function getApiData(url, formData, method) {
        var fn = think.promisify(_request2.default);
        return fn({
            method: method || 'POST',
            url: url,
            form: formData
        });
    };

    _class.prototype.getShellContent = function getShellContent(options) {
        var str = '\n@echo off\n\nset domain=' + options.domain + '\nset appid=' + options.appid + '\n\nrem 命令行参数\nset proxyurl=%2\nset url=%3\n\n\nrem 设置代理\nset proxypath="HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings"\nreg add %proxypath% /v "ProxyEnable" /t REG_DWORD /d 0 /f>nul\nset proxyurl="http://%f2etestDomain%/proxy?name=%USERNAME%"\nreg add %proxypath% /v "AutoConfigURL" /d %proxyurl% /f >nul\n\nrem 打开应用\nstart /MAX "" "' + options.appPath + '" %url% %proxyParam%\n\n        ';

        return str;
    };

    return _class;
}(think.controller.base);

exports.default = _class;
//# sourceMappingURL=proxy.js.map
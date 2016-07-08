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

var _base = require('../base.js');

var _base2 = _interopRequireDefault(_base);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$controller$bas) {
    (0, _inherits3.default)(_class, _think$controller$bas);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
    }

    _class.prototype.indexAction = function indexAction() {
        return this.success(undefined, this.locale('query_success'));
    };

    /*
     * 查询所有服务器列表
     * @return {json}
     * */


    _class.prototype.gethostAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var server;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return this.model('server').select();

                        case 2:
                            server = _context.sent;
                            return _context.abrupt('return', this.success(server, this.locale('query_success')));

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function gethostAction() {
            return ref.apply(this, arguments);
        }

        return gethostAction;
    }();

    _class.prototype.runstatusAction = function runstatusAction() {

        return this.action('admin/server', 'runstatus');
    };

    _class.prototype.restartAction = function restartAction() {
        this.cli('server', ['tomcat', 'restart']);
        this.cli('server', ['guacd', 'restart']);

        return this.success(undefined, this.locale('query_success'));
    };

    _class.prototype.startAction = function startAction() {
        this.cli('server', ['tomcat', 'start']);
        this.cli('server', ['guacd', 'start']);

        return this.success(undefined, this.locale('query_success'));
    };

    _class.prototype.stopAction = function stopAction() {
        this.cli('server', ['tomcat', 'stop']);
        this.cli('server', ['guacd', 'stop']);

        return this.success(undefined, this.locale('query_success'));
    };

    /*
     * 生成 Guacamole 服务端配置文件
     * @return {string} 返回配置文件数据
     * */


    _class.prototype.configAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
            var _get, server, config, buffer, _configStr, i, configs;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _get = this.get();
                            _context2.next = 3;
                            return this.model('server').select();

                        case 3:
                            server = _context2.sent;
                            _context2.next = 6;
                            return this.model('config').where({ id: 1 }).find();

                        case 6:
                            config = _context2.sent;
                            buffer = void 0;
                            _configStr = '';


                            for (i in server) {
                                _configStr += '\n    <config name="' + server[i].accessToken + '" protocol="rdp">\n        <param name="hostname" value="' + server[i].ip + '" />\n        <param name="port" value="3389" />\n        <param name="enable-drive" value="true" />\n        <param name="drive-path" value="/home/guacdshare" />\n    </config>';
                            }

                            configs = '<configs>\r' + _configStr + '\r</configs>';
                            _context2.prev = 11;

                            if (_get.type == 'write') {
                                _fs2.default.writeFileSync(config.guacamoleConfig, configs, 'utf-8');
                            }

                            buffer = _fs2.default.readFileSync(config.guacamoleConfig, 'utf-8');

                            return _context2.abrupt('return', this.success(buffer, this.locale('query_success')));

                        case 17:
                            _context2.prev = 17;
                            _context2.t0 = _context2['catch'](11);

                            _fs2.default.writeFileSync(think.ROOT_PATH + '/bin/noauth-config.xml', configs, 'utf-8');
                            buffer = '配置文件写入失败，请手动修改 ' + config.guacamoleConfig + ' 配置文件\r\n或者在项目根目录中的 bin/noauth-config.xml 配置文件覆盖\r\n\r\n' + configs;

                            return _context2.abrupt('return', this.json(buffer));

                        case 22:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[11, 17]]);
        }));

        function configAction() {
            return ref.apply(this, arguments);
        }

        return configAction;
    }();

    _class.prototype.readconfigAction = function readconfigAction(path) {
        if (think.isEmpty(path)) {
            return this.error(1000);
        }

        var buffer = _fs2.default.readFileSync(path, 'utf-8');

        this.json(buffer);
    };

    _class.prototype.writeconfigAction = function writeconfigAction(path) {
        if (think.isEmpty(path)) {
            return this.error(1000);
        }

        var buffer = _fs2.default.writeFileSync(path, 'utf-8');

        this.json(buffer);
    };

    _class.prototype.cliAction = function cliAction() {
        var _get = this.get();

        this.cli('server', [_get.server, _get.type]);

        return this.success(null, this.locale('query_success'));
    };

    _class.prototype.cli = function cli(command, option) {
        var _this2 = this;

        var spawn = _child_process2.default.spawn;


        var cmd = process.platform === "win32" ? "service.cmd" : "service";
        var cli = spawn(cmd, option);

        cli.stdout.setEncoding('UTF-8');
        cli.stdout.on('data', function (data) {
            return _this2.success(data);
        });

        cli.stderr.setEncoding('UTF-8');
        cli.stderr.on('data', function (data) {
            return _this2.error(6001, data);
        });

        cli.on('close', function () {});
    };

    _class.prototype.addAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
            var _post, serverData;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            // 后期考虑加入accessToken校验
                            _post = this.post();

                            //服务器身份标识

                            _post.accessToken = think.uuid();
                            _context3.next = 4;
                            return this.model('server').thenAdd(_post, { ip: _post.ip });

                        case 4:
                            serverData = _context3.sent;

                            if (!(serverData.type == "exist")) {
                                _context3.next = 7;
                                break;
                            }

                            return _context3.abrupt('return', this.fail(1001, '添加失败'));

                        case 7:
                            return _context3.abrupt('return', this.success(undefined, '添加成功'));

                        case 8:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function addAction() {
            return ref.apply(this, arguments);
        }

        return addAction;
    }();

    return _class;
}(think.controller.base);

exports.default = _class;
//# sourceMappingURL=server.js.map
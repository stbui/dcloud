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

var _class = function (_Base) {
    (0, _inherits3.default)(_class, _Base);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
    }

    _class.prototype.runstatusAction = function runstatusAction() {

        return this.action('admin/server', 'runstatus');
    };

    _class.prototype.restartAction = function restartAction() {
        this.cli('server', ['tomcat', 'restart']);
        this.cli('server', ['guacd', 'restart']);

        return this.success(null, this.locale('query_success'));
    };

    _class.prototype.startAction = function startAction() {
        this.cli('server', ['tomcat', 'start']);
        this.cli('server', ['guacd', 'start']);

        return this.success(null, this.locale('query_success'));
    };

    _class.prototype.stopAction = function stopAction() {
        this.cli('server', ['tomcat', 'stop']);
        this.cli('server', ['guacd', 'stop']);

        return this.success(null, this.locale('query_success'));
    };

    /*
     * 生成 Guacamole 服务端配置文件
     * @return {string} 返回配置文件数据
     * */


    _class.prototype.configAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var _get, server, config, buffer, _configStr, i, configs;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _get = this.get();
                            _context.next = 3;
                            return this.model('server').select();

                        case 3:
                            server = _context.sent;
                            _context.next = 6;
                            return this.model('config').where({ id: 1 }).find();

                        case 6:
                            config = _context.sent;
                            buffer = void 0;
                            _configStr = '';


                            for (i in server) {
                                _configStr += '\n    <config name="' + server[i].accessToken + '" protocol="rdp">\n        <param name="hostname" value="' + server[i].ip + '" />\n        <param name="port" value="3389" />\n        <param name="enable-drive" value="true" />\n        <param name="drive-path" value="/home/guacdshare" />\n    </config>';
                            }

                            configs = '<configs>\r' + _configStr + '\r</configs>';


                            try {
                                if (_get.type == 'write') {
                                    _fs2.default.writeFileSync(config.guacamoleConfig, configs, 'utf-8');
                                }

                                buffer = _fs2.default.readFileSync(config.guacamoleConfig, 'utf-8');
                            } catch (err) {
                                _fs2.default.writeFileSync(think.ROOT_PATH + '/bin/noauth-config.xml', configs, 'utf-8');
                                buffer = '配置文件写入失败，请在项目根目录中的 bin/noauth-config.xml 找到配置文件，并手动覆盖配置文件\r\n' + configs;
                            }

                            return _context.abrupt('return', this.json(buffer));

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
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

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=server.js.map
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

    _class.prototype.indexAction = function indexAction(appType) {

        return this.display();
    };

    /**
     * guacamole action
     * @return {json}
     */


    _class.prototype.guacamoleAction = function guacamoleAction() {
        return this.guacamole();
    };

    /**
     * tomcat action
     * @return {json}
     */


    _class.prototype.tomcatAction = function tomcatAction() {
        return this.tomcat();
    };

    _class.prototype.guacamole = function guacamole() {
        var cmd = 'sh',
            options = ['guacamole.sh'];
        var result = this.cli(cmd, options);

        return result;
    };

    _class.prototype.tomcat = function tomcat() {
        var cmd = 'sh',
            options = ['tomcat.sh'];
        var result = this.cli(cmd, options);

        return result;
    };

    _class.prototype.mysql = function mysql() {
        var cmd = 'sh',
            options = ['mysql.sh'];
        var result = this.cli(cmd, options);

        return result;
    };

    /*
     * @param {string} command �����ؼ���
     * @param {array} option ��������
     * @return {json}
     */


    _class.prototype.cli = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(command, option) {
            var _this2 = this;

            var spawn, cmd, cli;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            spawn = _child_process2.default.spawn;
                            cmd = process.platform === "win322" ? command + ".cmd" : command;
                            cli = spawn(cmd, option);


                            cli.stdout.setEncoding('UTF-8');
                            cli.stdout.on('data', function (data) {
                                return _this2.success(data);
                            });

                            cli.stderr.setEncoding('UTF-8');
                            cli.stderr.on('data', function (data) {
                                return _this2.error(6001, data);
                            });

                            cli.on('close', function () {});

                        case 8:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function cli(_x, _x2) {
            return ref.apply(this, arguments);
        }

        return cli;
    }();

    /*
     * socket
     */


    _class.prototype.openAction = function openAction(self) {
        var socket = self.http.socket;


        this.broadcast("dCloud", "connected");
    };

    _class.prototype.launcherAction = function launcherAction(self) {
        var _this3 = this;

        var _self$http = self.http;
        var socket = _self$http.socket;
        var data = _self$http.data;
        var spawn = _child_process2.default.spawn;

        var cwd = think.ROOT_PATH + '/bin';

        var cmd = 'sh',
            options = [data.cmd + '.sh'];

        var cli = spawn(cmd, options, { cwd: cwd });

        cli.stdout.setEncoding('UTF-8');
        cli.stdout.on('data', function (data) {
            _this3.emit('launcher', data);
        });

        cli.stderr.setEncoding('UTF-8');
        cli.stderr.on('data', function (data) {
            _this3.emit('launcher', data);
        });

        cli.on('close', function () {
            _this3.emit('launcher', 'complete dCloud');
        });
    };

    _class.prototype.closeAction = function closeAction(self) {
        this.broadcast("dCloud", "disconnected");
    };

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=install.js.map
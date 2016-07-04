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

    _class.prototype.indexAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var program;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return this.model('program').getList();

                        case 2:
                            program = _context.sent;


                            this.assign('app', program);

                            return _context.abrupt('return', this.display());

                        case 5:
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

    _class.prototype.addAction = function addAction() {
        if (this.isPost()) {
            var data = this.post();
            this.model('program').add(data);
        }

        return this.display();
    };

    _class.prototype.editAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
            var _get, _post, programData, serverData, options, result;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _get = this.get();
                            _post = this.post();
                            programData = void 0, serverData = void 0;

                            if (!this.isPost()) {
                                _context2.next = 15;
                                break;
                            }

                            this.model('program').where(_get).update(_post);

                            // �ڿͻ��˷���������bat�ļ�
                            options = _post;
                            //options = {name: 3, path: 3, ip: 4};

                            _context2.next = 8;
                            return this.model('program').getSingleList({ 'program.id': _get.id });

                        case 8:
                            programData = _context2.sent;

                            options.name = _get.id;
                            options.ip = programData.serverIp;

                            _context2.next = 13;
                            return this.remoteServerCreateFile(options);

                        case 13:
                            result = _context2.sent;


                            this.redirect('/admin/app/index');

                        case 15:
                            _context2.next = 17;
                            return this.model('program').getSingleList({ 'program.id': _get.id });

                        case 17:
                            programData = _context2.sent;

                            this.assign('app', programData);

                            _context2.next = 21;
                            return this.model('server').select();

                        case 21:
                            serverData = _context2.sent;

                            this.assign('server', serverData);

                            return _context2.abrupt('return', this.display());

                        case 24:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function editAction() {
            return ref.apply(this, arguments);
        }

        return editAction;
    }();

    _class.prototype.delAction = function delAction() {
        return this.display();
    };

    _class.prototype.shownAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
            var _get, programData, row;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _get = this.get();
                            programData = this.model('program');
                            _context3.next = 4;
                            return programData.where({ id: _get.id }).find();

                        case 4:
                            row = _context3.sent;

                            if (!(row.status == 1)) {
                                _context3.next = 10;
                                break;
                            }

                            _context3.next = 8;
                            return programData.where({ id: _get.id }).update({ status: 0 });

                        case 8:
                            _context3.next = 12;
                            break;

                        case 10:
                            _context3.next = 12;
                            return programData.where({ id: _get.id }).update({ status: 1 });

                        case 12:
                            return _context3.abrupt('return', this.success(row));

                        case 13:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function shownAction() {
            return ref.apply(this, arguments);
        }

        return shownAction;
    }();

    _class.prototype.proxyAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
            var _get, programData, row;

            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _get = this.get();
                            programData = this.model('program');
                            _context4.next = 4;
                            return programData.where({ id: _get.id }).find();

                        case 4:
                            row = _context4.sent;

                            if (!(row.proxy == 1)) {
                                _context4.next = 10;
                                break;
                            }

                            _context4.next = 8;
                            return programData.where({ id: _get.id }).update({ proxy: 0 });

                        case 8:
                            _context4.next = 12;
                            break;

                        case 10:
                            _context4.next = 12;
                            return programData.where({ id: _get.id }).update({ proxy: 1 });

                        case 12:
                            return _context4.abrupt('return', this.success(row));

                        case 13:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function proxyAction() {
            return ref.apply(this, arguments);
        }

        return proxyAction;
    }();

    _class.prototype.remoteservercreatefileAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
            var _get, _post, options, programData, result;

            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _get = this.get();
                            _post = this.post();
                            options = { id: 2, name: 3, path: 3, ip: 4 };


                            if (think.isEmpty(_post)) {
                                options = _post;
                            }

                            options = _get;

                            _context5.next = 7;
                            return this.model('program').getSingleList({ 'program.id': options.id });

                        case 7:
                            programData = _context5.sent;


                            options.ip = programData.serverIp;

                            _context5.next = 11;
                            return this.remoteServerCreateFile(options);

                        case 11:
                            result = _context5.sent;


                            this.json(result);

                        case 13:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function remoteservercreatefileAction() {
            return ref.apply(this, arguments);
        }

        return remoteservercreatefileAction;
    }();

    _class.prototype.remoteServerCreateFile = function remoteServerCreateFile(options) {
        // �ڿͻ��˷����������ļ�
        // http://xxx/setuser.asp?shellName=ie&shellPath=c:\\2.bat
        var name = options.name;
        var path = options.path;
        var ip = options.ip;


        name = name.replace(/\s+/g, '');

        var url = 'http://' + ip + '/setuser.asp?shellName=' + encodeURIComponent(name) + '&shellPath=' + encodeURIComponent(path);
        var result = this.getApiData(url);

        return result;
    };

    _class.prototype.getApiData = function getApiData(url) {
        var fn = think.promisify(_request2.default.get);
        return fn({ url: url });
    };

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=app.js.map
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
            var _get, programData, serverData, _post;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _get = this.get();
                            programData = void 0, serverData = void 0;


                            if (this.isPost()) {
                                _post = this.post();
                                // ��������

                                this.model('program').where(_get).update(_post);

                                // �ڿͻ��˷��������������ļ�
                                this.action('home/proxy', 'remotegeneratecmdsingle');
                                this.redirect('/admin/app/index');
                            }

                            _context2.next = 5;
                            return this.model('program').getSingleList({ 'program.id': _get.id });

                        case 5:
                            programData = _context2.sent;

                            this.assign('app', programData);

                            _context2.next = 9;
                            return this.model('server').select();

                        case 9:
                            serverData = _context2.sent;

                            this.assign('server', serverData);

                            return _context2.abrupt('return', this.display());

                        case 12:
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
        var _get = this.get();
        this.model('program').where(_get).delete();

        this.redirect('/admin/app/index');
    };

    /*
     *  Ӧ����ʾ״̬
     * */


    _class.prototype.shownAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
            var _get, programData, row;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _get = this.get();

                            if (!think.isEmpty(_get)) {
                                _context3.next = 3;
                                break;
                            }

                            return _context3.abrupt('return', this.fail());

                        case 3:
                            programData = this.model('program');
                            _context3.next = 6;
                            return programData.where({ id: _get.id }).find();

                        case 6:
                            row = _context3.sent;

                            if (!(row.status == 1)) {
                                _context3.next = 12;
                                break;
                            }

                            _context3.next = 10;
                            return programData.where({ id: _get.id }).update({ status: 0 });

                        case 10:
                            _context3.next = 14;
                            break;

                        case 12:
                            _context3.next = 14;
                            return programData.where({ id: _get.id }).update({ status: 1 });

                        case 14:
                            return _context3.abrupt('return', this.success(row.status, this.locale('query_success')));

                        case 15:
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

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=app.js.map
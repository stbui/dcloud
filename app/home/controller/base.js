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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$controller$bas) {
    (0, _inherits3.default)(_class, _think$controller$bas);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _think$controller$bas.apply(this, arguments));
    }

    /**
     * some base method in here
     */

    _class.prototype.__before = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var is_login;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return this.islogin();

                        case 2:
                            is_login = _context.sent;

                            if (is_login) {
                                _context.next = 5;
                                break;
                            }

                            return _context.abrupt('return', this.redirect('/signin'));

                        case 5:
                            _context.next = 7;
                            return this.session('userInfo');

                        case 7:
                            this.userInfo = _context.sent;


                            this.assign('username', this.userInfo.UserId);

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function __before() {
            return ref.apply(this, arguments);
        }

        return __before;
    }();

    _class.prototype.__after = function __after() {
        var config = this.model('config').where({ id: 1 }).select();
        this.assign('config', config);
    };

    _class.prototype.islogin = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
            var userInfo, result;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return this.session('userInfo');

                        case 2:
                            userInfo = _context2.sent;
                            result = think.isEmpty(userInfo) ? false : true;
                            return _context2.abrupt('return', result);

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function islogin() {
            return ref.apply(this, arguments);
        }

        return islogin;
    }();

    return _class;
}(think.controller.base);

exports.default = _class;
//# sourceMappingURL=base.js.map
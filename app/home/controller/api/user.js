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

  _class.prototype.indexAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var _session;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.session('userInfo');

            case 2:
              _session = _context.sent;
              return _context.abrupt('return', this.success(_session));

            case 4:
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

  _class.prototype.modifyAction = function modifyAction() {

    if (this.isPost()) {
      var _post = this.post();

      this.model('appusers').where(_post).update(_post);
    }

    return this.success(null, '操作成功');
  };

  _class.prototype.registerAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var _post, appusers;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _post = this.post();
              _context2.next = 3;
              return this.model('appusers').thenAdd(_post, _post);

            case 3:
              appusers = _context2.sent;

              if (!(appusers.type != "exist")) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt('return', this.success(appusers, '操作成功'));

            case 6:
              return _context2.abrupt('return', this.error(5000, '操作失败'));

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function registerAction() {
      return ref.apply(this, arguments);
    }

    return registerAction;
  }();

  return _class;
}(think.controller.base);

exports.default = _class;
//# sourceMappingURL=user.js.map
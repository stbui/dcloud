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
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', this.display());

            case 1:
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

  _class.prototype.getallappAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var program;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.model('program').select();

            case 2:
              program = _context2.sent;
              return _context2.abrupt('return', this.success(program));

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getallappAction() {
      return ref.apply(this, arguments);
    }

    return getallappAction;
  }();

  _class.prototype.createuserAction = function createuserAction() {
    return this.success();
  };

  _class.prototype.sethostsAction = function sethostsAction() {
    return this.success();
  };

  _class.prototype.gethostAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var server;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.model('server').select();

            case 2:
              server = _context3.sent;
              return _context3.abrupt('return', this.success(server));

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function gethostAction() {
      return ref.apply(this, arguments);
    }

    return gethostAction;
  }();

  _class.prototype.gethostpacAction = function gethostpacAction() {

    return this.success();
  };

  _class.prototype.getapikeyAction = function getapikeyAction() {

    return this.success({ apiKey: think.uuid() });
  };

  _class.prototype.syncallremoteusersAction = function syncallremoteusersAction() {
    return this.action('signin', 'syncallremoteusers');
  };

  _class.prototype.pathlistAction = function pathlistAction() {
    return this.action('desktop', 'pathlist');
  };

  return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=api.js.map
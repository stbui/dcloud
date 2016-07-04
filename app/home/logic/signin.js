'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */

exports.__esModule = true;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$logic$base) {
  (0, _inherits3.default)(_class, _think$logic$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$logic$base.apply(this, arguments));
  }

  /**
   * index action logic
   * @return {} []
   */

  _class.prototype.indexAction = function indexAction() {};

  _class.prototype.registerAction = function registerAction() {
    this.allowMethods = "post";

    this.rules = {
      UserId: "required",
      RemotePassword: "byteLength:6,32|required"
    };
  };

  _class.prototype.syncallremoteusersAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var userInfo;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.session('userInfo');

            case 2:
              userInfo = _context.sent;

              if (!think.isEmpty(userInfo)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", this.fail(1001, this.locale('user_islogin')));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function syncallremoteusersAction() {
      return ref.apply(this, arguments);
    }

    return syncallremoteusersAction;
  }();

  return _class;
}(think.logic.base);

exports.default = _class;
//# sourceMappingURL=signin.js.map
'use strict';
/**
 * relation model
 */

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

var _class = function (_think$model$relation) {
    (0, _inherits3.default)(_class, _think$model$relation);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _think$model$relation.apply(this, arguments));
    }

    /**
     * init
     * @param  {} args []
     * @return {}         []
     */

    _class.prototype.init = function init() {
        var _think$model$relation2;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        (_think$model$relation2 = _think$model$relation.prototype.init).call.apply(_think$model$relation2, [this].concat(args));

        this.relation = {
            applogs: {
                type: think.model.HAS_MANY,
                field: 'UserId'
            }
        };
    };

    _class.prototype.getAppLogs = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var data;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return this.model('applogs').join({
                                table: 'appusers',
                                on: ['UserId', 'UserId']
                            });

                        case 2:
                            data = _context.sent;

                        case 3:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function getAppLogs() {
            return ref.apply(this, arguments);
        }

        return getAppLogs;
    }();

    return _class;
}(think.model.relation);

exports.default = _class;
//# sourceMappingURL=user.js.map
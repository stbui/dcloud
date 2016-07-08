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
            var _get, programData, config, program, params, url;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _get = this.get();
                            _context.next = 3;
                            return this.model('program').getList({ 'program.id': _get.id, 'program.status': 1 });

                        case 3:
                            programData = _context.sent;
                            _context.next = 6;
                            return this.model('config').find();

                        case 6:
                            config = _context.sent;
                            program = '';

                            program += programData.path;
                            program += ' proxy';
                            program += ' "default"';
                            program += ' "about:blank"';
                            program += ' ' + config.apiKey;

                            params = {
                                id: 'c/' + programData.serverAccessToken,
                                username: this.userInfo.UserId,
                                password: this.userInfo.RemotePassword,
                                title: programData.name,
                                icon: programData.icon,
                                program: program
                            };
                            url = config.guacamoleApi + '?' + global.setUrlParam(params);


                            this.redirect(url);

                            return _context.abrupt('return', this.success(url));

                        case 17:
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

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=openapp.js.map
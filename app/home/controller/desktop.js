'use strict';

exports.__esModule = true;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

    _class.prototype.indexAction = function indexAction() {
        return this.display();
    };

    _class.prototype.pathlistAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var program, filelist, json;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return this.model('program').getList({ 'program.status': 1 });

                        case 2:
                            program = _context.sent;
                            filelist = [];


                            program.forEach(function (v, k) {
                                filelist.push({
                                    name: v.name,
                                    //path: v.path,
                                    path: v.serverProbePath + '\\app\\' + v.id + '.bat',
                                    //group:v.serverName,
                                    group: v.serverAccessToken,
                                    ext: 'oexe',
                                    type: 'url',
                                    icon: v.icon
                                });
                            });

                            json = {
                                "code": true,
                                "use_time": this.locale(),
                                "data": {
                                    "folderlist": [],
                                    "filelist": [],
                                    "info": {
                                        "path_type": "",
                                        "role": "",
                                        "id": "",
                                        "name": ""
                                    },
                                    "path_read_write": "writeable",
                                    "user_space": {
                                        "size_max": 0.1,
                                        "size_use": 1048576
                                    }
                                }
                            };


                            json.data.filelist = filelist;

                            return _context.abrupt('return', this.json(json));

                        case 8:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function pathlistAction() {
            return ref.apply(this, arguments);
        }

        return pathlistAction;
    }();

    _class.prototype.commonjsAction = function commonjsAction() {
        var LNG = this.locale();

        var AUTH = {};

        var G = {
            "lang": "zh_CN",
            "is_root": 1,
            "user_name": "admin",
            "web_root": think.ROOT_PATH,
            "web_host": this.http.host,
            "static_path": "\/static\/home\/",
            "basic_path": think.ROOT_PATH,
            "app_host": this.http.host,
            "myhome": think.ROOT_PATH,
            "upload_max": 2097152,
            "version": "3.21",
            "version_desc": "product",
            "json_data": "",
            "theme": "metro\/",
            "list_type": "icon",
            "sort_field": "name",
            "sort_order": "up",
            "musictheme": "mp3player",
            "movietheme": "webplayer"
        };

        var json = 'LNG=' + (0, _stringify2.default)(LNG) + ';AUTH=' + (0, _stringify2.default)(AUTH) + ';G=' + (0, _stringify2.default)(G);

        return this.json(json);
    };

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=desktop.js.map
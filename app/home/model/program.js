'use strict';
/**
 * model
 */

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$model$base) {
    (0, _inherits3.default)(_class, _think$model$base);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _think$model$base.apply(this, arguments));
    }

    _class.prototype.getList = function getList(data) {
        //SELECT * FROM `program` LEFT JOIN server ON program.serverId=server.id
        //return this.join("server ON program.serverId=server.id").select();

        return this.field(['program.*', 'server.id as serverId,server.name as serverName,server.ip as serverIp, server.accessToken as serverAccessToken, server.probePath as serverProbePath']).join({
            table: 'server',
            join: 'left',
            on: ['serverId', 'id']
        }).where(data).select();
    };

    _class.prototype.getSingleList = function getSingleList(data) {
        return this.field(['program.*', 'server.id as serverId,server.name as serverName,server.ip as serverIp, server.accessToken as serverAccessToken, server.probePath as serverProbePath']).join({
            table: 'server',
            join: 'left',
            on: ['serverId', 'id']
        }).where(data).find();
    };

    return _class;
}(think.model.base);

exports.default = _class;
//# sourceMappingURL=program.js.map
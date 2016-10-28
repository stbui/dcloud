'use strict';
/**
 * model
 */
export default class extends think.model.base {

    getList(data) {
        //SELECT * FROM `program` LEFT JOIN server ON program.serverId=server.id
        //return this.join("server ON program.serverId=server.id").select();

        return this.field(['program.*', 'server.id as serverId,server.name as serverName,server.ip as serverIp, server.accessToken as serverAccessToken, server.probePath as serverProbePath']).join({
            table: 'server',
            join: 'left',
            on: ['serverId', 'id']
        }).where(data).select();
    }

    getSingleList(data) {
        return this.field(['program.*', 'server.id as serverId,server.name as serverName,server.ip as serverIp, server.accessToken as serverAccessToken, server.probePath as serverProbePath']).join({
            table: 'server',
            join: 'left',
            on: ['serverId', 'id']
        }).where(data).find();
    }

    getProxySingleList(programId) {
        let table = this.getTableName() + '.*';
        let id = this.getTableName() + '.id';
        let path = this.getTableName() + '.path';
        // 关联表重命名
        let serverTablePrefix = this.getTablePrefix() + 'server.';
        let serverId = serverTablePrefix + 'id as serverId';
        let serverIp = serverTablePrefix + 'ip as serverIp';
        let serverProbePath = serverTablePrefix + 'probePath as serverProbePath';
        // 关联查询
        let res = this.field([id, serverId, serverIp, path, serverProbePath]).join({
            table: 'server',
            join: 'left',
            on: ['serverId', 'id']
        });

        return res.where({[id]: programId}).find();
    }

}
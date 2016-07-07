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

}
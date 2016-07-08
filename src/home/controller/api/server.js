'use strict';

import Base from '../base.js';
import fs from 'fs';
import child_process from 'child_process';

export default class extends think.controller.base {

    indexAction() {
        return this.success(undefined, this.locale('query_success'));
    }

    /*
     * 查询所有服务器列表
     * @return {json}
     * */
    async gethostAction() {
        const server = await this.model('server').select();

        return this.success(server, this.locale('query_success'));
    }

    runstatusAction() {

        return this.action('admin/server', 'runstatus');
    }

    restartAction() {
        this.cli('server', ['tomcat', 'restart']);
        this.cli('server', ['guacd', 'restart']);

        return this.success(undefined, this.locale('query_success'));
    }

    startAction() {
        this.cli('server', ['tomcat', 'start']);
        this.cli('server', ['guacd', 'start']);

        return this.success(undefined, this.locale('query_success'));
    }

    stopAction() {
        this.cli('server', ['tomcat', 'stop']);
        this.cli('server', ['guacd', 'stop']);

        return this.success(undefined, this.locale('query_success'));
    }

    /*
     * 生成 Guacamole 服务端配置文件
     * @return {string} 返回配置文件数据
     * */
    async configAction() {
        const _get = this.get();
        const server = await this.model('server').select();
        const config = await this.model('config').where({id: 1}).find();

        let buffer;
        let _configStr = '';

        for (var i in server) {
            _configStr += `
    <config name="${server[i].accessToken}" protocol="rdp">
        <param name="hostname" value="${server[i].ip}" />
        <param name="port" value="3389" />
        <param name="enable-drive" value="true" />
        <param name="drive-path" value="/home/guacdshare" />
    </config>`;
        }

        let configs = `<configs>\r${_configStr}\r</configs>`;

        try {
            if (_get.type == 'write') {
                fs.writeFileSync(config.guacamoleConfig, configs, 'utf-8');
            }

            buffer = fs.readFileSync(config.guacamoleConfig, 'utf-8');

            return this.success(buffer, this.locale('query_success'));
        } catch (err) {
            fs.writeFileSync(think.ROOT_PATH + '/bin/noauth-config.xml', configs, 'utf-8');
            buffer = `配置文件写入失败，请手动修改 ${config.guacamoleConfig} 配置文件\r\n或者在项目根目录中的 bin/noauth-config.xml 配置文件覆盖\r\n\r\n${configs}`;

            return this.json(buffer);
        }

    }


    readconfigAction(path) {
        if (think.isEmpty(path)) {
            return this.error(1000);
        }

        let buffer = fs.readFileSync(path, 'utf-8');

        this.json(buffer);
    }


    writeconfigAction(path) {
        if (think.isEmpty(path)) {
            return this.error(1000);
        }

        let buffer = fs.writeFileSync(path, 'utf-8');

        this.json(buffer);
    }


    cliAction() {
        const _get = this.get();

        this.cli('server', [_get.server, _get.type]);

        return this.success(null, this.locale('query_success'));

    }


    cli(command, option) {
        const {spawn} = child_process;

        let cmd = process.platform === "win32" ? "service.cmd" : "service";
        let cli = spawn(cmd, option);

        cli.stdout.setEncoding('UTF-8');
        cli.stdout.on('data', (data) => {
            return this.success(data);
        });

        cli.stderr.setEncoding('UTF-8');
        cli.stderr.on('data', (data) => {
            return this.error(6001, data);
        });

        cli.on('close', () => {

        });
    }


    async addAction() {
        // 后期考虑加入accessToken校验
        const _post = this.post();

        //服务器身份标识
        _post.accessToken = think.uuid();
        let serverData = await this.model('server').thenAdd(_post, {ip: _post.ip});

        if (serverData.type == "exist") {
            return this.fail(1001, '添加失败');
        }

        return this.success(undefined, '添加成功');
    }
}
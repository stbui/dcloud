'use strict';

import Base from './base.js';
import child_process from 'child_process'

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction(appType) {

        return this.display();
    }

    /**
     * guacamole action
     * @return {json}
     */
    guacamoleAction() {
        return this.guacamole();
    }

    /**
     * tomcat action
     * @return {json}
     */
    tomcatAction() {
        return this.tomcat();
    }

    guacamole() {
        let cmd = 'sh', options = ['guacamole.sh'];
        let result = this.cli(cmd, options);

        return result;
    }

    tomcat() {
        let cmd = 'sh', options = ['tomcat.sh'];
        let result = this.cli(cmd, options);

        return result;
    }

    mysql() {
        let cmd = 'sh', options = ['mysql.sh'];
        let result = this.cli(cmd, options);

        return result;
    }

    /*
     * @param {string} command ÃüÁî¹Ø¼ü×Ö
     * @param {array} option ÃüÁî²ÎÊý
     * @return {json}
     */
    async cli(command, option) {
        const {spawn} = child_process;

        let cmd = process.platform === "win322" ? command + ".cmd" : command;
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

    /*
     * socket
     */
    openAction(self) {
        const {socket} = self.http;

        this.broadcast("dCloud", "connected");
    }

    launcherAction(self) {
        const {socket,data} = self.http;
        const {spawn} = child_process;
        const cwd = think.ROOT_PATH + '/bin';

        let cmd = 'sh', options = [data.cmd + '.sh'];

        let cli = spawn(cmd, options, {cwd: cwd});

        cli.stdout.setEncoding('UTF-8');
        cli.stdout.on('data', (data) => {
            this.emit('launcher', data);
        });

        cli.stderr.setEncoding('UTF-8');
        cli.stderr.on('data', (data) => {
            this.emit('launcher', data);
        });

        cli.on('close', () => {
            this.emit('launcher', 'complete dCloud');
        });
    }

    closeAction(self) {
        this.broadcast("dCloud", "disconnected");
    }
}
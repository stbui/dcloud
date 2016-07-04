'use strict';

import Base from './base.js';
import child_process from 'child_process';
import net from 'net';
import http from 'http';
import url from 'url';
import fs from 'fs';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction(self) {

    }

    async regaddAction() {
        let proxyUrl = 'http://dcloud.stbui.com';
        let cmdStr = `reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v AutoConfigURL /d ${proxyUrl} /f >nul`;

        let result = await this.exec(cmdStr).catch((e)=> {
            return e
        });

        if (think.isEmpty(result)) result = cmdStr;


        this.success(result, this.locale('query_success'));
    }

    proxyAction(self) {
        let server = http.createServer().on('request', (req, res)=> {
            let u = url.parse(req.url);


            let options = {
                hostname: u.hostname,
                port: u.port || 80,
                path: u.path,
                method: req.method,
                headers: req.headers
            };

            let pReq = http.request(options, (pRes)=> {
                res.writeHead(pRes.statusCode, pRes.headers);
                pRes.pipe(res);
            });

            pReq.on('error', (e)=> {
                res.end();
            });

            req.pipe(pReq);

            console.log(options);

        });

        server.listen(88, '0.0.0.0');

        let pacContent = 'function FindProxyForURL(url, host){return "PROXY 172.16.97.13:88";}';
        this.json(pacContent);
    }


    tcpserverAction() {
        let server = net.createServer(function (socket) {
            console.log('server connection');

            socket.write('server success');
            //socket.pipe(socket);

            socket.on('data', function (data) {
                console.log('server print:', data.toString());
            });

        });

        server.listen(8124, function () {
            console.log('server listen');
        });

    }

    tcpclientAction() {
        let client = net.connect({port: 8124}, function () {
            console.log('client connected');
            client.write('client success');
        });

        client.on('data', function (data) {
            console.log('data:', data.toString());
            client.end();
        });

        client.on('end', function () {
            console.log('client disconnection');
        })
    }


    exec(cmd) {
        const {exec} = child_process;

        let fn = think.promisify(exec);

        return fn(cmd);
    }


}
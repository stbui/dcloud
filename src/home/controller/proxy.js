'use strict';

import Base from './base.js';
import child_process from 'child_process';
import net from 'net';
import http from 'http';
import url from 'url';
import fs from 'fs';
import request from 'request';

var proxyServer = false;
export default class extends think.controller.base {

    indexAction() {

        this.success();
    }


    /**
     * 远程部署[ 所有 ]记录启动应用命令
     *
     * @return {Promise} []
     */
    async remotegeneratecmdAction() {
        const {remoteProgramUrl} = this.config('api');
        const programData = await this.model('program').getList();
        let result = [];

        for (let key in programData) {
            const {id,path,serverIp,serverProbePath} = programData[key];

            let options = {
                domain: 'http://' + this.http.host,
                appid: id,
                appPath: path
            };

            let remotePath = serverProbePath + '/app/' + id + '.bat';
            let formData = {cmd: this.getShellContent(options), path: remotePath};
            let url = remoteProgramUrl.replace('${ip}', serverIp);

            let _result = await this.getApiData(url, formData).catch((e)=> {
                think.log(e, 'WARNING');
                return e;
            });


            if (_result.code == 'ENOTFOUND') {
                _result.id = programData[key].id;
                result.push(_result);
            } else {
                result.push({
                    code: 200,
                    errno: 0,
                    hostname: _result.request.hostname,
                    host: _result.request.host,
                    port: _result.request.port,
                    id: programData[key].id
                });
            }

        }


        this.success(result, this.locale('query_success'));
    }

    /**
     * 远程部署[ 单条 ]记录启动应用命令
     *
     * @return {Promise} []
     */
    async remotegeneratecmdsingleAction() {
        const _get = this.get();

        const {remoteProgramUrl} = this.config('api');
        const programData = await this.model('program').getSingleList({'program.id': _get.id});

        const {id,path,serverIp,serverProbePath} = programData;

        let result = [];
        let remotePath = serverProbePath + '/app/' + id + '.bat';
        let options = {
            domain: 'http://' + this.http.host,
            appid: id,
            appPath: path
        };
        let formData = {cmd: this.getShellContent(options), path: remotePath};
        let url = remoteProgramUrl.replace('${ip}', serverIp);

        let _result = await this.getApiData(url, formData).catch((e)=> {
            think.log(e, 'WARNING');
            return e;
        });


        if (_result.code == 'ENOTFOUND') {
            _result.id = programData[key].id;
            result.push(_result);
        } else {
            result.push({
                code: 200,
                errno: 0,
                hostname: _result.request.hostname,
                host: _result.request.host,
                port: _result.request.port,
                id: id
            });
        }


        this.success(result, this.locale('query_success'));
    }


    async pacAction() {

        if (proxyServer == false) {
            this.pac(http);
            proxyServer = true;
        }


        let pacContent = 'function FindProxyForURL(url, host){return "PROXY 172.16.97.13:8362";}';
        this.json(pacContent);
    }

    getUserHosts(hostname) {

        let hosts = [
            {'192.168.159.137': 'dcloud.stbui.com'},
            {'127.0.0.1': 'www.stbui.com'}
        ];

        let host = hostname;

        for (let key in hosts) {
            for (let k in hosts[key]) {
                if (hosts[key][k] == hostname) {
                    host = k
                }
            }

        }

        return host;

    }

    pac(http) {
        let server = http.createServer().on('request', (req, res)=> {
            let u = url.parse(req.url);


            //let options = {
            //    hostname: u.hostname,
            //    port: u.port || 80,
            //    path: u.path,
            //    method: req.method,
            //    headers: req.headers
            //};

            let options = {
                hostname: this.getUserHosts(u.hostname),
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

        });


        server.listen(8362, '0.0.0.0');

        return server;
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


    getApiData(url, formData, method) {
        let fn = think.promisify(request);
        return fn({
            method: method || 'POST',
            url: url,
            form: formData
        });
    }

    getShellContent(options) {
        let str = `
@echo off

set domain=${options.domain}
set appid=${options.appid}

rem 命令行参数
set proxyurl=%2
set url=%3


rem 设置代理
set proxypath="HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings"
reg add %proxypath% /v "ProxyEnable" /t REG_DWORD /d 0 /f>nul
set proxyurl="http://%f2etestDomain%/proxy?name=%USERNAME%"
reg add %proxypath% /v "AutoConfigURL" /d %proxyurl% /f >nul

rem 打开应用
start /MAX "" "${options.appPath}" %url% %proxyParam%

        `;

        return str;
    }
}
'use strict';

import Base from './base.js';
import child_process from 'child_process';
import net from 'net';
import http from 'http';
import https from 'https';
import url from 'url';
import fs from 'fs';
import request from 'request';

var proxyServer = false;
let config = {
    port: 4311
}
export default class extends think.controller.base {

    async indexAction() {
        this.setCorsHeader();

        // 当前用户信息
        const userInfo = await this.session('userInfo');

        if (think.isEmpty(userInfo)) {
            return this.fail(this.locale('user_islogin'))
        }

        const proxyData = await this.model('proxy').getList({['proxy.userId']: userInfo.UserId});

        this.success(proxyData, this.locale('query_success'));
    }

    async addAction() {
        this.setCorsHeader();

        const {hosts} = this.post();

        // 当前用户信息
        const userInfo = await this.session('userInfo');

        if (think.isEmpty(userInfo) || think.isEmpty(hosts)) {
            return this.fail(this.locale('user_islogin'))
        }

        let data = {
            userId: userInfo.UserId,
            hosts
        }

        const proxyData = await this.model('proxy').thenAdd(data, {hosts});

        if (proxyData.type == 'exist') {
            return this.fail(this.locale('user_isExist'));
        }

        this.success(proxyData, this.locale('query_success'));
    }

    async delAction() {
        this.setCorsHeader();

        const {id} = this.get();
        // 当前用户信息
        const userInfo = await this.session('userInfo');

        if (think.isEmpty(userInfo)) {
            return this.fail(this.locale('user_islogin'))
        }

        let data = {
            userId: userInfo.UserId,
            id
        }

        const proxyData = await this.model('proxy').where(data).delete();

        this.success(proxyData, this.locale('query_success'));
    }

    /**
     * 在[ 所有 ]远程服务器生成批处理文件
     * todo socket
     * @依赖 dCloud-probe客户端，提供的接口
     * @return {Promise} []
     */
    async remotegeneratecmdAction() {
        const {remoteProgramUrl, remoteProbePath} = this.config('api');
        const programData = await this.model('program').getList();
        let result = [];

        for (let key in programData) {
            const {id, path, serverIp, serverProbePath} = programData[key];

            let options = {
                domain: 'http://' + this.http.host,
                appid: id,
                appPath: path
            };

            let remotePath = remoteProbePath.replace('${dir}', serverProbePath).replace('${name}', id);
            let url = remoteProgramUrl.replace('${ip}', serverIp);
            let formData = {cmd: this.getShellContent(options), path: remotePath};

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
     * 在[ 单个 ]远程服务器生成批处理文件
     * @依赖 dCloud-probe客户端，提供的接口
     * @return {JSON} []
     */
    async remotegeneratecmdsingleAction() {
        const _get = this.get();
        const {remoteProgramUrl} = this.config('api');
        const programData = await this.model('program').getProxySingleList(_get.id);
        const {id, path, serverIp, serverProbePath} = programData;

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
            return {
                code: 'ENOTFOUND',
                hostname: serverIp,
                host: serverIp,
                port: '3000'
            };
        });


        if (_result.code == 'ENOTFOUND') {
            _result.id = id;
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


        this.success(_result, this.locale('query_success'));
    }

    /**
     * IE代理pac脚本
     * @return JSON []
     * */
    async pacAction() {
        //
        let userInfo = await this.session('userInfo');
        let {UserId} = userInfo;
        let result = await this.model('proxy').where({userId: UserId}).select();

        let proxy = `${think.RUNTIME_PATH}/proxy`;
        think.mkdir(proxy)
        fs.writeFile(proxy + '/pac.json', JSON.stringify(result), 'utf-8');


        think.log('server start: ' + config.port, 'Proxy')
        if (proxyServer == false) {
            this.pac();
            proxyServer = true;
        }


        let port = config.port;
        let host = this.http.hostname;

        // let port = 1080;
        // let host = '192.168.155.1';

        let content = `if() return "DIRECT"`;

        let pacContent = `function FindProxyForURL(url, host){return "PROXY ${host}:${port}";}`;
        this.end(pacContent);
    }

    /*
     *
     * */
    pac() {
        // var server = http.createServer();
        // server.on('request',(cReq, cSock)=>{
        //     this.request(cReq, cSock);
        // });
        // server.on('connect',(cReq, cSock)=>{
        //     this.connect(cReq, cSock);
        // });
        // server.listen(config.port,'0.0.0.0');

        http.createServer()
            .on('request', this.request.bind(this))
            .on('connect', this.connect.bind(this))
            .listen(config.port, '0.0.0.0');
    }

    request(cReq, cRes) {
        let u = url.parse(cReq.url);
        let userHost = this.getUserHosts(u.hostname);

        var options = {
            // hostname: u.hostname,
            hostname: userHost,
            port: u.port || 80,
            path: u.path,
            method: cReq.method,
            headers: cReq.headers
        };

        var pReq = http.request(options, function (pRes) {
            cRes.writeHead(pRes.statusCode, pRes.headers);
            pRes.pipe(cRes);
        }).on('error', function (e) {
            cRes.end();
        });

        cReq.pipe(pReq);
    }

    connect(cReq, cSock) {
        var u = url.parse('http://' + cReq.url);

        var pSock = net.connect(u.port, u.hostname, function () {
            cSock.write('HTTP/1.1 200 Connection Established\r\n\r\n');
            // cSock.on('data', function (chunk) {
            //    console.log(chunk.toString());
            // });
            pSock.pipe(cSock);
        }).on('error', function (e) {
            cSock.end();
        });

        cSock.pipe(pSock);
    }

    getUserHosts(hostname) {
        let pac = fs.readFileSync(think.RUNTIME_PATH + '/proxy/pac.json', 'utf-8');
        let result = JSON.parse(pac);

        let host = hostname;
        result.forEach((value, key)=> {
            if (hostname == value.source) {
                host = value.target;
            }
        });

        return host;
    }

    /*
     * 打开代理服务
     * */
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


    setCorsHeader() {
        this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
        this.header("Access-Control-Allow-Headers", "x-requested-with");
        this.header("Access-Control-Request-Method", "GET,POST,PUT,DELETE");
        this.header("Access-Control-Allow-Credentials", "true");
    }
}
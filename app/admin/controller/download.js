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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
    (0, _inherits3.default)(_class, _Base);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
    }

    _class.prototype.clientAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var filePath, probe;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            filePath = think.ROOT_PATH + '/bin/probe.js';
                            _context.next = 3;
                            return this.probe();

                        case 3:
                            probe = _context.sent;


                            // 生成配置文件
                            _fs2.default.writeFileSync(filePath, probe, 'utf-8');

                            this.download(filePath, 'probe.asp');

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function clientAction() {
            return ref.apply(this, arguments);
        }

        return clientAction;
    }();

    _class.prototype.probeAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
            var probe;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return this.probe();

                        case 2:
                            probe = _context2.sent;
                            return _context2.abrupt('return', this.json(probe));

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function probeAction() {
            return ref.apply(this, arguments);
        }

        return probeAction;
    }();

    _class.prototype.shellAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
            var programData, buffer;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return this.model('program').where({ id: 2 }).find();

                        case 2:
                            programData = _context3.sent;
                            buffer = this.getShellContent({
                                domain: 'http://:' + this.http.host,
                                appid: programData.id,
                                appName: '',
                                appPath: programData.path,
                                appUrl: programData.config,
                                proxy: false
                            });
                            return _context3.abrupt('return', this.json(buffer));

                        case 5:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function shellAction() {
            return ref.apply(this, arguments);
        }

        return shellAction;
    }();

    _class.prototype.probe = function probe() {
        var configData = this.model('config').find();

        var options = {
            apiKey: configData.apiKey,
            domain: 'http://172.16.97.13:8361',
            url: 'http://www.baidu.com',
            param: ''
        };

        return this.getProbeContent(options);
    };

    _class.prototype.getProbeContent = function getProbeContent(options) {
        var apiKey = options.apiKey;
        var domain = options.domain;
        var url = options.url;
        var param = options.param;


        var str = '\n<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>\n<%\nResponse.CharSet= "UTF-8"\n\ndim apiKey, domain\napiKey = "' + apiKey + '"\ndomain = "' + domain + '"    \'http://172.16.97.13:8361/api/applog\n\ndim shellName, shellPath\n\n\ndim key, username, password, appId\n\nkey = request.QueryString("key")\nusername = request.QueryString("username")\npassword = request.QueryString("password")\nshellName = request.QueryString("shellName")\nshellPath = request.QueryString("shellPath")\nappId = request.QueryString("appId")\n\nif apiKey <> "" and key = apiKey and username <> "" then\n    setUserPassword username,password\n    if err <> 0 then\n        response.write "{""resultCode"":""5000"",""resultMsg"":""注册失败""}"\n    else\n        response.write "{""resultCode"":""0"",""resultMsg"":""注册成功""}"\n    end if\n\nelseif appid <> "" then\n    response.write file_get_contents(domain&"?userId="&username&"&appId="&appid, "userId="&username&"&appId="&appid)\n\nelseif shellName <> "" and shellPath <> "" then\n    shell_content shellName,shellPath\n    response.write "{""resultCode"":""0"",""resultMsg"":""创建成功""}"\nelse\n    response.write "{""resultCode"":""5000"",""resultMsg"":""校验失败""}"\nend if\n\nfunction setUserPassword(username, password)\n    On Error Resume Next\n    dim oSystem,oUser,oGroup\n\n    Set oSystem=GetObject("WinNT://127.0.0.1")\n\n    Set oUser=oSystem.GetObject("user",username)\n\n    if err <> 0 then\n        err = 0\n        Set oUser=oSystem.Create("user",username)\n        oUser.SetPassword password\n        oUser.Put "userFlags", &h10040\n        oUser.Setinfo\n\n        Set oGroup=oSystem.GetObject("Group","Users")\n        oGroup.Add ("winnt://"&username)\n    else\n        oUser.SetPassword password\n        oUser.Setinfo\n    end if\nend function\n\nFunction file_get_contents(url,data)\n Dim objXML:Set   objXML   =   server.CreateObject( "Microsoft.XMLHTTP")\n\t\'objXML.open   "GET ",   url,   False\n\tobjXML.open   "POST",   url,   False\n\tobjXML.send(data)\n\tIf objXml.Readystate=4 Then\n\t file_get_contents=     objXML.responSetext\n\tElse\n\t file_get_contents=0\n\tEnd If\n Set objXML=Nothing\nEnd Function\n\nFunction shell_content(name, path)\n    dim fileName\n    dim content\n\n    fileName = name&".bat"\n\n\n    content =":: Author:  dCloud <bright>"&vbcrlf\n    content =content&":: WebSite:  http://dcloud.stbui.com"&vbcrlf\n    content =content&":: 2016.06.30"&vbcrlf\n    content =content&" "&vbcrlf\n    content =content&" "&vbcrlf\n\n    content =content&"set f2etestDomain=' + domain + '"&vbcrlf\n    content =content&"set appid=ie6"&vbcrlf\n    content =content&""&vbcrlf\n    content =content&""&vbcrlf\n    content =content&"start /MAX """" "&""""&path&"""" &" ""' + url + '"" ""' + param + '"" "&vbcrlf\n    content =content&""&vbcrlf\n    content =content&""&vbcrlf\n\n    CreateFile fileName, content\nend Function\n\nFunction CreateFile(FileName,Content)\n    on error resume next\n\n    FileName=Server.Mappath(FileName)\n    Set FSO = Server.CreateObject("Scripting.FileSystemObject")\n    set fd=FSO.createtextfile(FileName,true)\n    fd.writeline Content\n\n    if err>0 then\n      err.clear\n      CreateFile=False\n    else\n      CreateFile=True\n    end if\nEnd function\n%>\n        ';

        return str;
    };

    _class.prototype.getShellContent = function getShellContent(options) {
        var str = '\n@echo off\n\nset domain=' + options.domain + '\nset appid=' + options.appid + '\n\nrem 命令行参数\nset proxymode="%1"\nset proxyurl=%2\nset url=%3\nset apiKey=%4\n\nrem 探测桌面模式\nset isWeb=1\nif %url% equ desktop (\n\tset url="about:blank"\n\tset isWeb=0\n)\n\nrem 设置代理\nset proxypath="HKCUSoftwareMicrosoftWindowsCurrentVersionInternet Settings"\nreg add %proxypath% /v "ProxyEnable" /t REG_DWORD /d 0 /f>nul\nset proxydef=\nif %proxyurl% equ "" set proxydef=1\nif %proxyurl% equ default set proxydef=1\nif %proxyurl% equ "default" set proxydef=1\nif defined proxydef set proxyurl="http://%domain%/getHostsPac?name=%USERNAME%"\nif %proxymode% equ "noproxy" (\n\tset proxyurl=""\n)\nif %proxyurl% neq "" (\n\trem 开启代理\n\treg add %proxypath% /v "AutoConfigURL" /d %proxyurl% /f >nul\n) else (\n\trem 关闭代理\n\treg delete %proxypath% /v "AutoConfigURL" /f > nul\n)\n\nrem 打开应用\nstart /MAX "" "' + options.appPath + '" %url% %proxyParam%\n\nrem 打点统计\nstart "" curl "http://%domain%/applog?userid=%USERNAME%&appid=%appid%&isweb=%isWeb%"\n        ';

        return str;
    };

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=download.js.map
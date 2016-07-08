'use strict';

import Base from './base.js';
import fs from 'fs';

export default class extends Base {

    async clientAction() {
        let filePath = think.ROOT_PATH + '/bin/probe.asp';
        let probe = await this.probe();

        // 生成配置文件
        fs.writeFileSync(filePath, probe, 'utf-8');

        this.download(filePath,'probe.asp');
    }

    async probeAction() {
        let probe = await this.probe();

        return this.json(probe);
    }


    probe() {
        const configData = this.model('config').find();

        let options = {
            apiKey:configData.apiKey,
            domain:think.http.host,
            url:'http://www.baidu.com',
            param:''
        };

        return this.getProbeContent(options);
    }


    getProbeContent(options) {
        let {apiKey,domain,url,param} = options;


        let str = `
<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<%
Response.CharSet= "UTF-8"

dim apiKey, domain
apiKey = "${apiKey}"
domain = "${domain}"

dim shellName, shellPath


dim key, username, password, appId

key = request.QueryString("key")
username = request.QueryString("username")
password = request.QueryString("password")
shellName = request.QueryString("shellName")
shellPath = request.QueryString("shellPath")
appId = request.QueryString("appId")

if apiKey <> "" and key = apiKey and username <> "" then
    setUserPassword username,password
    if err <> 0 then
        response.write "{""resultCode"":""5000"",""resultMsg"":""注册失败""}"
    else
        response.write "{""resultCode"":""0"",""resultMsg"":""注册成功""}"
    end if

elseif appid <> "" then
    response.write file_get_contents(domain&"?userId="&username&"&appId="&appid, "userId="&username&"&appId="&appid)

elseif shellName <> "" and shellPath <> "" then
    shell_content shellName,shellPath
    response.write "{""resultCode"":""0"",""resultMsg"":""创建成功""}"
else
    response.write "{""resultCode"":""5000"",""resultMsg"":""校验失败""}"
end if

function setUserPassword(username, password)
    On Error Resume Next
    dim oSystem,oUser,oGroup

    Set oSystem=GetObject("WinNT://127.0.0.1")

    Set oUser=oSystem.GetObject("user",username)

    if err <> 0 then
        err = 0
        Set oUser=oSystem.Create("user",username)
        oUser.SetPassword password
        oUser.Put "userFlags", &h10040
        oUser.Setinfo

        Set oGroup=oSystem.GetObject("Group","Users")
        oGroup.Add ("winnt://"&username)
    else
        oUser.SetPassword password
        oUser.Setinfo
    end if
end function

Function file_get_contents(url,data)
 Dim objXML:Set   objXML   =   server.CreateObject( "Microsoft.XMLHTTP")
	'objXML.open   "GET ",   url,   False
	objXML.open   "POST",   url,   False
	objXML.send(data)
	If objXml.Readystate=4 Then
	 file_get_contents=     objXML.responSetext
	Else
	 file_get_contents=0
	End If
 Set objXML=Nothing
End Function

Function shell_content(name, path)
    dim fileName
    dim content

    fileName = name&".bat"


    content =":: Author:  dCloud <bright>"&vbcrlf
    content =content&":: WebSite:  http://dcloud.stbui.com"&vbcrlf
    content =content&":: 2016.06.30"&vbcrlf
    content =content&" "&vbcrlf
    content =content&" "&vbcrlf

    content =content&"set f2etestDomain=${domain}"&vbcrlf
    content =content&"set appid=ie6"&vbcrlf
    content =content&""&vbcrlf
    content =content&""&vbcrlf
    content =content&"start /MAX """" "&""""&path&"""" &" ""${url}"" ""${param}"" "&vbcrlf
    content =content&""&vbcrlf
    content =content&""&vbcrlf

    CreateFile fileName, content
end Function

Function CreateFile(FileName,Content)
    on error resume next

    FileName=Server.Mappath(FileName)
    Set FSO = Server.CreateObject("Scripting.FileSystemObject")
    set fd=FSO.createtextfile(FileName,true)
    fd.writeline Content

    if err>0 then
      err.clear
      CreateFile=False
    else
      CreateFile=True
    end if
End function
%>
        `;

        return str;
    }

}
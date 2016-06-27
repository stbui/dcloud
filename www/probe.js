
<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<%
Response.CharSet= "UTF-8"

dim apiKey, domain
apiKey = "undefined"
domain = ""    'http://172.16.97.13:8361/api/applog

dim shellName, shellPath


dim key, username, password, appId

key = request.QueryString("key")
username = request.QueryString("username")
password = request.QueryString("password")
shellName = request.QueryString("shellName")
shellPath = request.QueryString("shellPath")

if apiKey <> "" and key = apiKey and username <> "" then
    setUserPassword username,password
    if err <> 0 then
        response.write "{""resultCode"":""5000"",""resultMsg"":""注册失败""}"
    else
        response.write "{""resultCode"":""0"",""resultMsg"":""注册成功""}"
    end if

elseif appid <> "" then
    response.write file_get_contents(domin&"?userId="&username&"&appId="&appid, "userId="&username&"&appId="&appid)

elseif shellName <> "" and shellPath <> "" then
    shell_content shellName,shellPath
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

    content ="@echo off"
    content ="set f2etestDomain=172.16.97.13:20001"
    content ="set appid=ie6"
    content =""
    content ="set proxymode="%1""
    content ="set proxyurl=%2"
    content ="set url=%3"
    content ="set apiKey=%4"
    content =""
    content ="start /MAX "" "&path&" """
    content =""

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
        
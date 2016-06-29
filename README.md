# web云桌面

远程桌面解决方案的开源项目，通过浏览器就能操作虚拟机，适用于Chrome、Firefox、IE9+等浏览器（浏览器需要支持HTML5）， 由于使
用 HTML5只要在一个服务器安装成功，你访问你的桌面就是访问一个 web 浏览器

### 效果图

### Demo

### 数据库配置

修改数据库配置文件
```
src/common/config/db.js

```

### 安装依赖

```
npm install
```

### 启动服务

```
npm start
```

### 访问地址

```
http://127.0.0.1:8361
```

## pm2 管理
```
pm2 startOrReload pm2.json
```


### 开源项目
guacamole
thinkjs
socket.io
xterm
pm2

### 打赏我

### 关于我


### 即将实现
代理软件改为```electron```开发
通过安装引导页自动安装guacamole tomcat apache

### 待完善
完善服务端管理
jslint 未实现
webdrive 未实现


### 参考
- https://thinkjs.org/
- https://github.com/quietshu/cssosx
- https://github.com/os-js/OS.js
- http://www.kancloud.cn/kancloud/create-voting-app/63976
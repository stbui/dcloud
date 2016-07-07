# web云桌面

HTML5 远程桌面解决方案，通过浏览器就能操作远程服务器，适用于Chrome、Firefox、IE9+等浏览器（浏览器需要支持HTML5）， 由于使
用 HTML5只要在一个服务器安装成功，你访问你的桌面就是访问一个 web 浏览器

### 效果图
![image](https://raw.githubusercontent.com/stbui/dcloud/master/bin/desktop.jpg)
![image](https://raw.githubusercontent.com/stbui/dcloud/master/bin/browse.jpg)
![image](https://raw.githubusercontent.com/stbui/dcloud/master/bin/server.jpg)
![image](https://raw.githubusercontent.com/stbui/dcloud/master/bin/program.jpg)

### Demo
```bash
http://dcloud.stbui.com
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

### 关联项目

服务器探针
```
https://github.com/stbui/dcloud-probe
```

### 开源项目
- [x] socketio
- [x] bootstrap
- [x] seajs
- [x] jquery
- [x] nw


### 打赏我

### 关于我


### 即将实现
- [x] 初始化安装
- [x] 服务器账号同步
- [x] 应用程序远程执行
- [x] Guacamole 服务管理
- [x] Guacamole 配置文件管理
- [ ] 服务器探针
- [ ] jslint
- [ ] webdrive
- [ ] ssh


### help
查看
intro.md


### 参考
- https://thinkjs.org/
- https://github.com/quietshu/cssosx
- https://github.com/os-js/OS.js
- http://www.kancloud.cn/kancloud/create-voting-app/63976

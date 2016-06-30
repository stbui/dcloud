# /bin/bash

# centos 32

# 导入第三方软件源

# 安装依赖软件包

yum install cairo-devel libpng-devel uuid-devel freerdp* libvncserver-devel openssl-devel

ln -s /usr/local/lib/freerdp/guacsnd.so /usr/lib/freerdp/
ln -s /usr/local/lib/freerdp/guacdr.so /usr/lib/freerdp/

mkdir -p /home/guacdshare
chmod 777 /home/guacdshare

# server
wget http://jaist.dl.sourceforge.net/project/guacamole/current/source/guacamole-server-0.9.7.tar.gz
tar -xzf guacamole-server-0.9.3.tar.gz
cd guacamole-server-0.9.3
./configure --with-init-dir=/etc/init.d
make
make install
ldconfig

chkconfig --add guacd
chkconfig guacd on

# 下载Guacamole客户端

wget http://jaist.dl.sourceforge.net/project/guacamole/current/binary/guacamole-0.9.7.war
mkdir /var/lib/guacamole
mv /root/Downloads/guacamole-0.9.7.war /var/lib/guacamole/guacamole.war

# 新建Guacamole配置文件
mkdir /etc/guacamole
mkdir /root/.guacamole
cp /root/Downloads/guacamole/doc/example/guacamole.properties /etc/guacamole/guacamole.properties
cp /root/Downloads/guacamole/doc/example/user-mapping.xml /etc/guacamole/user-mapping.xml
ln -s /etc/guacamole/guacamole.properties /root/.guacamole/

# 配置guacamole.properties文件
# vi /etc/guacamole/noauth-config.xml
# <configs>
#    <config name="f2etest-ie6" protocol="rdp">
#        <param name="hostname" value="10.0.0.1" />
#        <param name="port" value="3389" />
#        <param name="enable-drive" value="true" />
#        <param name="drive-path" value="/home/guacdshare" />
#    </config>
# </configs>

# 部署Guacamole客户端
ln -s /var/lib/guacamole/guacamole.war /usr/local/Tomcat/webapps

# 重启Tomcat

# 启动guacd

# 验证Guacamole安装

echo "http://127.0.0.1:8080/guacamole/"
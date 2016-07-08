/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : dcloud

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2016-07-08 17:05:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for applogs
-- ----------------------------
DROP TABLE IF EXISTS `applogs`;
CREATE TABLE `applogs` (
  `logId` bigint(20) NOT NULL AUTO_INCREMENT,
  `UserId` varchar(100) DEFAULT '',
  `appId` varchar(50) DEFAULT '',
  `isWeb` tinyint(4) DEFAULT '1',
  `LogTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`logId`),
  KEY `UserId` (`LogTime`,`UserId`) USING BTREE,
  KEY `appOrder` (`LogTime`,`appId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of applogs
-- ----------------------------

-- ----------------------------
-- Table structure for appusers
-- ----------------------------
DROP TABLE IF EXISTS `appusers`;
CREATE TABLE `appusers` (
  `UserId` varchar(100) NOT NULL,
  `RemotePassword` varchar(64) DEFAULT NULL,
  `ApiKey` varchar(64) DEFAULT NULL,
  `ActiveTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `LastTime` datetime DEFAULT NULL,
  `LastIp` varchar(50) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `NickName` varchar(255) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Job` varchar(255) DEFAULT NULL,
  `Company` varchar(255) DEFAULT NULL,
  `Department` varchar(255) DEFAULT NULL,
  `Location` varchar(255) DEFAULT NULL,
  `syncServerDate` datetime DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  KEY `ActiveTime` (`ActiveTime`) USING BTREE,
  KEY `Company` (`Company`),
  KEY `Location` (`Location`),
  KEY `Department` (`Department`),
  KEY `Job` (`Job`),
  KEY `Gender` (`Gender`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of appusers
-- ----------------------------
INSERT INTO `appusers` VALUES ('12301', '123456', null, '2016-06-24 20:26:29', '2016-06-24 20:26:30', '127.0.0.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12302', '123465', null, '2016-06-24 20:26:48', '2016-06-24 20:26:49', '127.0.0.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12303', '123456', null, '2016-06-24 20:27:48', '2016-06-27 12:33:44', '127.0.0.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12305', '123465', null, '2016-06-24 20:29:16', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12306', '123465', null, '2016-06-24 20:29:54', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12307', '123456', null, '2016-06-24 20:36:51', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12308', '123456', null, '2016-06-24 20:37:40', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12309', '123456', null, '2016-06-24 20:38:01', '2016-06-24 13:47:11', '192.168.159.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12310', '123456', null, '2016-06-24 20:38:06', '2016-06-27 12:34:03', '127.0.0.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12311', '123456', null, '2016-06-24 20:38:09', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12312', '123456', null, '2016-06-24 20:38:12', '2016-06-24 20:38:18', '127.0.0.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12313', '123465', null, '2016-06-24 20:39:37', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12314', '123465', null, '2016-06-24 20:39:46', '2016-06-24 20:39:47', '127.0.0.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12315', '123456', null, '2016-06-24 20:55:00', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12316', '123456', null, '2016-06-24 20:55:24', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12317', '123456', null, '2016-06-24 20:55:28', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12318', '123465', null, '2016-06-24 20:56:26', '2016-06-24 13:56:27', '192.168.159.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12319', '123456', null, '2016-06-24 20:57:24', '2016-06-24 13:57:25', '192.168.159.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('12320', '123456', null, '2016-06-24 20:58:06', '2016-06-24 21:01:28', '127.0.0.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1467362486321', '748fb6a72579d27b5ea53b8d0939c39c', '2db107c5f586d5d8b78311a04dc774c1', '2016-07-01 16:41:26', '2016-07-01 20:03:43', '127.0.0.1', 'stbui', null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for config
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(11) NOT NULL,
  `apiKey` varchar(255) NOT NULL,
  `guacamoleApi` varchar(255) NOT NULL,
  `guacamoleConfig` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of config
-- ----------------------------
INSERT INTO `config` VALUES ('1', 'dCloud', '9c4fa840209097f905542173304f6b8d', 'http://172.16.97.13:20000/guacamole/client.xhtml', '/etc/guacamole/noauth-config.xml');

-- ----------------------------
-- Table structure for program
-- ----------------------------
DROP TABLE IF EXISTS `program`;
CREATE TABLE `program` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `serverId` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of program
-- ----------------------------
INSERT INTO `program` VALUES ('1', 'IE 6', 'iexplore', '/static/home/images/app/ie6.png', '11', '1');
INSERT INTO `program` VALUES ('2', 'IE 7', '', '/static/home/images/app/ie7.png', '11', '0');
INSERT INTO `program` VALUES ('3', 'IE 8', '', '/static/home/images/app/ie8.png', '11', '0');
INSERT INTO `program` VALUES ('4', 'IE 9', '', '/static/home/images/app/ie9.png', '11', '0');
INSERT INTO `program` VALUES ('5', 'IE 10', '', '/static/home/images/app/ie10.png', '11', '0');
INSERT INTO `program` VALUES ('6', 'IE 11', '', '/static/home/images/app/ie11.png', '11', '0');
INSERT INTO `program` VALUES ('7', 'chrome', '', '/static/home/images/app/chrome.png', '11', '0');
INSERT INTO `program` VALUES ('8', 'firefox', 'C:\\Program Files\\Mozilla Firefox\\firefox.exe', '/static/home/images/app/firefox.png', '11', '1');
INSERT INTO `program` VALUES ('9', 'opera', '', '/static/home/images/app/opera.png', '11', '1');
INSERT INTO `program` VALUES ('10', '360浏览器', 'C:\\Documents and Settings\\Administrator\\Local Settings\\Application Data\\360Chrome\\Chrome\\Application\\360chrome.exe', '/static/home/images/app/360se.png', '11', '1');
INSERT INTO `program` VALUES ('11', '360极速浏览器', 'C:\\Program Files\\360Chrome\\Chrome\\Application\\360chrome.exe', '/static/home/images/app/360chrome.png', '11', '1');
INSERT INTO `program` VALUES ('12', '猎豹浏览器', 'C:\\Program Files\\liebao\\liebao.exe', '/static/home/images/app/liebao.png', '11', '1');
INSERT INTO `program` VALUES ('13', '傲游浏览器', 'C:\\Program Files\\Maxthon\\Bin\\Maxthon.exe', '/static/home/images/app/maxthon.png', '11', '1');
INSERT INTO `program` VALUES ('14', 'QQ浏览器', 'C:\\Program Files\\Tencent\\QQBrowser\\QQBrowser.exe', '/static/home/images/app/qqbrowser.png', '11', '1');
INSERT INTO `program` VALUES ('15', 'UC浏览器', 'C:\\Documents and Settings\\Administrator\\Local Settings\\Application Data\\SogouExplorer\\SogouExplorer.exe', '/static/home/images/app/ucbrowser.png', '11', '1');
INSERT INTO `program` VALUES ('16', '搜狗浏览器', 'C:\\Documents and Settings\\Administrator\\Local Settings\\Application Data\\SogouExplorer\\SogouExplorer.exe', '/static/home/images/app/sogou.png', '11', '1');
INSERT INTO `program` VALUES ('17', '2345浏览器', 'C:\\Program Files\\2345Soft\\2345Explorer\\2345Explorer.exe', '/static/home/images/app/2345.png', '11', '1');
INSERT INTO `program` VALUES ('18', '世界之窗', 'C:\\Documents and Settings\\Administrator\\Local Settings\\Application Data\\TheWorld6\\Application\\TheWorld.exe', '/static/home/images/app/theworld.png', '11', '1');
INSERT INTO `program` VALUES ('19', '我的桌面', '', '', '0', '0');

-- ----------------------------
-- Table structure for server
-- ----------------------------
DROP TABLE IF EXISTS `server`;
CREATE TABLE `server` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `ip` varchar(15) NOT NULL,
  `port` int(5) NOT NULL DEFAULT '80',
  `accessToken` varchar(255) NOT NULL,
  `probePath` varchar(255) DEFAULT NULL,
  `syncUserDate` datetime DEFAULT NULL,
  `status` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of server
-- ----------------------------
INSERT INTO `server` VALUES ('11', 'netname-86dfa86', '192.168.159.137', '3000', 'YFtTew6WoBU5BWuFBQwOKg9zTN2GD6UY', 'C:\\release', '2016-07-07 19:07:12', '1');
INSERT INTO `server` VALUES ('41', 'DESKTOP-SE7CR98', '172.16.97.13', '3000', '7BCNs_6zlE16jC02G5YBwvhKJLnMt3gy', 'C:\\Users\\431103.com\\AppData\\Roaming\\npm\\node_modules\\nw\\nwjs', null, '1');
INSERT INTO `server` VALUES ('16', 'demo', '127.0.0.1', '3000', 't_NX20erY_6y5aLYESXSJIcFjh1J19li', 'E:\\', '2016-07-07 14:50:20', '0');

-- ----------------------------
-- Table structure for wd_browsers
-- ----------------------------
DROP TABLE IF EXISTS `wd_browsers`;
CREATE TABLE `wd_browsers` (
  `browser_id` int(11) NOT NULL AUTO_INCREMENT,
  `browser_name` varchar(20) DEFAULT '',
  `browser_version` varchar(10) DEFAULT '',
  `node_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`browser_id`),
  UNIQUE KEY `node_id` (`node_id`,`browser_name`,`browser_version`)
) ENGINE=MyISAM AUTO_INCREMENT=89 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of wd_browsers
-- ----------------------------

-- ----------------------------
-- Table structure for wd_jsunit
-- ----------------------------
DROP TABLE IF EXISTS `wd_jsunit`;
CREATE TABLE `wd_jsunit` (
  `task_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) DEFAULT NULL,
  `client_ip` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `url` varchar(2000) DEFAULT NULL,
  `browser_name` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `browser_version` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `coverage_include` varchar(2000) CHARACTER SET latin1 DEFAULT NULL,
  `coverage_exclude` varchar(2000) CHARACTER SET latin1 DEFAULT NULL,
  `coverage_beautify` tinyint(10) DEFAULT NULL,
  `hosts` longtext,
  `browser_id` int(11) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL,
  `run_status` tinyint(4) DEFAULT '0',
  `end_time` datetime DEFAULT NULL,
  `actual_browser_name` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `actual_browser_version` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `test_type` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `test_success` tinyint(4) DEFAULT '0',
  `test_all_count` int(11) DEFAULT '0',
  `test_failed_count` int(11) DEFAULT '0',
  `test_passed_count` int(11) DEFAULT '0',
  `test_ratio` decimal(5,2) DEFAULT NULL,
  `line_cover` decimal(5,2) DEFAULT '0.00',
  `branch_cover` decimal(5,2) DEFAULT '0.00',
  `function_cover` decimal(5,2) DEFAULT '0.00',
  `test_result_data` longtext,
  PRIMARY KEY (`task_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1120 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wd_jsunit
-- ----------------------------

-- ----------------------------
-- Table structure for wd_logs
-- ----------------------------
DROP TABLE IF EXISTS `wd_logs`;
CREATE TABLE `wd_logs` (
  `log_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `userid` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `data` varchar(1000) DEFAULT NULL,
  `log_time` datetime DEFAULT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2535 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wd_logs
-- ----------------------------

-- ----------------------------
-- Table structure for wd_nodes
-- ----------------------------
DROP TABLE IF EXISTS `wd_nodes`;
CREATE TABLE `wd_nodes` (
  `node_id` int(11) NOT NULL AUTO_INCREMENT,
  `work_status` tinyint(4) DEFAULT '0',
  `node_ip` varchar(20) DEFAULT NULL,
  `node_name` varchar(2) DEFAULT NULL,
  `rdp_support` tinyint(4) DEFAULT '1',
  `last_report_time` datetime DEFAULT NULL,
  `last_apply_userid` varchar(255) DEFAULT NULL,
  `last_apply_time` datetime DEFAULT NULL,
  PRIMARY KEY (`node_id`),
  UNIQUE KEY `node_ip` (`node_ip`,`node_name`)
) ENGINE=MyISAM AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of wd_nodes
-- ----------------------------

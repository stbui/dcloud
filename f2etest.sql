/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : f2etest

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2016-07-04 09:47:09
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
INSERT INTO `applogs` VALUES ('1', 'User1466011150920', 'ie6', '1', '2016-06-15 18:29:16');
INSERT INTO `applogs` VALUES ('2', 'User1466011150920', 'ie6', '1', '2016-06-15 18:29:24');
INSERT INTO `applogs` VALUES ('3', 'User1466011150920', 'ie6', '1', '2016-06-15 18:29:59');
INSERT INTO `applogs` VALUES ('4', 'User1466011150920', 'ie6', '1', '2016-06-15 18:30:36');
INSERT INTO `applogs` VALUES ('5', 'User1466011150920', 'ie6', '1', '2016-06-15 18:31:11');
INSERT INTO `applogs` VALUES ('6', 'User1466011150920', 'chrome', '1', '2016-06-15 18:31:29');
INSERT INTO `applogs` VALUES ('7', 'User1466011150920', 'ie6', '1', '2016-06-15 18:31:52');
INSERT INTO `applogs` VALUES ('8', 'User1466011150920', 'chrome', '1', '2016-06-15 18:32:44');
INSERT INTO `applogs` VALUES ('9', 'User1466011150920', 'ie6', '1', '2016-06-15 18:44:07');
INSERT INTO `applogs` VALUES ('10', 'User1466011150920', 'chrome', '1', '2016-06-15 18:44:14');
INSERT INTO `applogs` VALUES ('11', 'User1466011150920', 'ie6', '1', '2016-06-15 18:44:18');
INSERT INTO `applogs` VALUES ('12', 'User1466011150920', 'ie6', '1', '2016-06-15 18:44:42');
INSERT INTO `applogs` VALUES ('13', 'User1466011150920', 'ie6', '1', '2016-06-15 18:45:28');
INSERT INTO `applogs` VALUES ('14', 'User1466011150920', 'ie6', '1', '2016-06-15 18:45:38');
INSERT INTO `applogs` VALUES ('15', 'User1466011150920', 'ie6', '1', '2016-06-15 18:46:13');
INSERT INTO `applogs` VALUES ('16', 'User1466011150920', 'safari', '1', '2016-06-16 11:32:15');
INSERT INTO `applogs` VALUES ('17', 'User1466011150920', 'safari', '1', '2016-06-16 15:53:18');
INSERT INTO `applogs` VALUES ('18', 'User1466011150920', 'hostsshare', '1', '2016-06-16 18:07:15');
INSERT INTO `applogs` VALUES ('19', 'User1466011150920', 'hostsshare', '1', '2016-06-16 18:09:59');
INSERT INTO `applogs` VALUES ('20', 'User1466011150920', 'hostsshare', '1', '2016-06-16 18:10:34');
INSERT INTO `applogs` VALUES ('21', 'User1466011150920', 'hostsshare', '1', '2016-06-16 18:11:39');
INSERT INTO `applogs` VALUES ('22', 'User1466011150920', 'hostsshare', '1', '2016-06-16 18:14:25');
INSERT INTO `applogs` VALUES ('23', 'User1466011150920', 'hostsshare', '1', '2016-06-16 18:14:38');
INSERT INTO `applogs` VALUES ('24', 'User1466011150920', 'hostsshare', '1', '2016-06-16 18:21:53');
INSERT INTO `applogs` VALUES ('25', 'User1466011150920', 'hostsshare', '1', '2016-06-16 18:23:08');
INSERT INTO `applogs` VALUES ('26', 'User1466011150920', 'hostsshare', '1', '2016-06-17 15:08:21');
INSERT INTO `applogs` VALUES ('27', 'User1466011150920', 'firefox', '1', '2016-06-17 18:47:08');
INSERT INTO `applogs` VALUES ('28', 'User1466011150920', 'ie6', '1', '2016-06-17 18:50:16');
INSERT INTO `applogs` VALUES ('29', 'User1466011150920', 'ie6', '1', '2016-06-17 18:51:43');
INSERT INTO `applogs` VALUES ('30', 'User1466011150920', '360se', '1', '2016-06-21 12:02:51');
INSERT INTO `applogs` VALUES ('31', 'User1466011150920', '360chrome', '1', '2016-06-21 12:02:57');
INSERT INTO `applogs` VALUES ('32', 'User1466011150920', 'ie6', '1', '2016-06-21 12:03:07');
INSERT INTO `applogs` VALUES ('33', 'User1466011150920', 'ie6', '0', '2016-06-21 14:55:20');
INSERT INTO `applogs` VALUES ('34', '12310', 'hostsshare', '1', '2016-06-27 13:39:53');

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
INSERT INTO `appusers` VALUES ('12300', '13465e', null, '2016-06-24 20:25:51', '2016-06-24 20:25:51', '127.0.0.1', null, null, null, null, null, null, null, null);
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
INSERT INTO `appusers` VALUES ('1681', '134651', null, '2016-06-24 20:16:54', '2016-06-24 20:16:55', '127.0.0.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('45613', '13465e', null, '2016-06-24 20:24:31', '2016-06-24 20:24:31', '127.0.0.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('6463', '134562', null, '2016-06-24 20:19:02', '2016-06-24 20:19:02', '127.0.0.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('64965', '123465', null, '2016-06-24 20:19:41', '2016-06-24 20:19:41', '127.0.0.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1465810183368', '179b63ab321f31582aaab048f0a4fe5a', '5aea7f553acd85112db39f6ced2bb58c', '2016-06-13 17:51:48', '2016-06-15 19:01:50', '127.0.0.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1465812595175', 'cdd99d25ae9180faf1427cb9f4cd0d8d', '9c4fa840209097f905542173304f6b8d', '2016-06-13 18:09:55', '2016-06-15 15:01:33', '172.16.97.13', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1465988599434', '52aff1c870eb6090ed70a10f70452613', '1feeaabe099f63d777f5ae46811081f4', '2016-06-15 19:03:34', '2016-06-16 11:31:52', '127.0.0.1', 'stbui', null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1465999571495', null, null, '2016-06-15 14:09:38', '2016-06-27 14:19:41', '192.168.159.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466002060639', null, null, '2016-06-15 14:47:39', '2016-06-15 14:49:05', '172.16.97.16', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466002060773', null, null, '2016-06-15 14:47:40', '2016-06-15 14:47:40', '172.16.97.11', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466002062167', null, null, '2016-06-15 14:47:41', '2016-06-15 15:23:44', '172.16.97.20', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466002064292', null, null, '2016-06-15 14:47:43', '2016-06-15 14:47:44', '172.16.97.12', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466002095881', null, null, '2016-06-15 14:48:15', '2016-06-15 14:48:15', '172.16.97.17', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466002107122', '87d095d0a2d57cae494a23da3eaac636', '278d53ff9f57f974d0faf57e21a6b73b', '2016-06-15 14:48:26', '2016-06-15 15:11:13', '172.16.97.14', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466002118144', null, null, '2016-06-15 14:48:37', '2016-06-15 14:48:37', '172.16.97.19', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466002162131', null, null, '2016-06-15 14:49:21', '2016-06-15 14:50:24', '172.16.97.17', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466002445575', null, null, '2016-06-15 14:54:05', '2016-06-15 14:54:09', '172.16.97.17', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466002537588', null, null, '2016-06-15 14:55:36', '2016-06-15 14:55:37', '172.16.97.17', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466003007257', '7a5e16d7258b6df615aaa088eba31cd7', '40fdbe758fff3f5f3d150d95df15cf61', '2016-06-15 15:03:26', '2016-06-15 16:30:27', '172.16.97.13', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466003445030', null, null, '2016-06-15 15:10:44', '2016-06-15 15:10:44', '172.16.97.14', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466010170993', '02c39a98d22ea136a006af4537843ddb', '41661150ebafff9590d674c1eebfebe2', '2016-06-15 17:02:50', '2016-06-15 17:04:36', '172.16.97.13', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466011054694', null, null, '2016-06-15 17:17:34', '2016-06-15 17:17:34', '172.16.97.13', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466011144274', 'f4ffd8df8d3fe9b4060d717006d713dd', 'c1db0097326a4be03570ace27690c7d0', '2016-06-15 17:19:03', '2016-06-15 17:19:03', '172.16.97.13', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466011150920', '5824efff2039b11ac6487d5a283f82ca', '54339b2c75b3059afbb0d2ecee0fea3d', '2016-06-15 17:19:10', '2016-07-01 20:15:49', '172.16.97.13', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466100610942', '1456c74f84f11d168b363b2d2858f712', 'bd9ce890be8b9b10d2007738eea36733', '2016-06-16 18:10:11', '2016-06-16 18:10:13', '127.0.0.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466101415550', '618797b555c22956154aefc090f767a4', 'f77309d00cfa29df071a15cacd917006', '2016-06-16 18:23:35', '2016-06-16 18:25:11', '127.0.0.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1466247121434', null, null, '2016-06-21 14:20:41', '2016-06-21 14:20:41', '172.16.97.13', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1467004117978', 'f6b9bcdb7f1b57d893dfedb284163e46', '43ade7073549b78cec5308dfd856abec', '2016-06-27 13:08:38', '2016-06-27 16:09:11', '127.0.0.1', 'stbui', null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1467362486321', '748fb6a72579d27b5ea53b8d0939c39c', '2db107c5f586d5d8b78311a04dc774c1', '2016-07-01 16:41:26', '2016-07-01 20:03:43', '127.0.0.1', 'stbui', null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1467367287655', 'f7b7cce18eae8577a5c5dd770797720b', '05b42b52a8af2efd8a5a17eae380196e', '2016-07-01 18:01:27', '2016-07-01 18:01:54', '172.16.97.13', 'stbui', null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User1467369866833', '7ffd1a5f4acffa03fbb6a549b48aef78', '73a0d69ffc8c50c7ebba22544d21952e', '2016-07-01 18:44:26', '2016-07-01 20:23:14', '127.0.0.1', 'stbui', null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_9rgsHQ7F9T', 'MidhdfSK1H8lsMYqHwUVwHpsU4OB0WEY', null, '2016-06-23 14:37:02', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_a7QKJgx83b', '_yOaaKGbYgfi_25_ob5oG7VF0XdSlnXh', null, '2016-06-23 14:38:45', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_bGXM6cGmWm', 'jRolorKd_WRY9I4gc5vLDirfFMzh8EnO', null, '2016-06-23 15:12:45', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_CKLrf_a04g', '_ydr4ZbGtg9WLsoaO36LvI1zUleXczNb', null, '2016-06-23 16:40:57', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_czh2KVdHAV', 'z6am9yKTrKxthsV4Ki_kyYG84spf9eH8', null, '2016-06-23 16:34:02', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_D8kAwK_S8L', 'w7_mokBv5ohmSAv7o63Z3c15SnWZ7WSV', null, '2016-06-23 14:37:28', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_Gbi4fM_IzI', 'McMMnwAQAR4kskgmwisSWVDXuyitT1xn', null, '2016-06-23 14:33:36', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_grTqTrHmJr', 'WCQeqamovJbtW5YzMZq_GRXayDTVCjaJ', null, '2016-06-23 16:48:00', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_Gu2rqC7wlA', '0w1b_KN8K9MkW1uNw_HUvskFa3JBY9_i', null, '2016-06-23 15:59:01', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_hMdAVexzG2', '8f9xNY0lK5hrGL5m7bN4q0spvur8d0bg', null, '2016-06-23 15:03:36', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_HTVpG7NwBO', 'HI_siLFD0i9ZyanFT4FSbo54GB0FI8L_', null, '2016-06-23 15:04:28', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_hweydKkmPE', '7KEyn9oFTbaI44ukM913H6_cbJIzuYJE', null, '2016-06-23 14:46:03', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_IGtYPOhfLP', 'c1Zwtb4KqVlm0TLh5JGP_9GXJPp7pEU_', null, '2016-06-23 15:05:08', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_jaBSDZQINq', 'Jv1ePwCX3PpyrtsBiBpuSJdc_tPxeg2M', null, '2016-06-23 16:35:41', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_Leg_rU5yNy', 'FjnbmHj_6coiLDhApVLDAotX5__r3rJH', null, '2016-06-23 16:34:26', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_lPaYyN2UpI', 'X0SvUiCV_D82uBsjOl2Eeo11_1ygJqyJ', null, '2016-06-23 16:38:24', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_lTwJaS045g', 'L3XjLmraP_d7_NGZwhaNNZqYHpiWbIfd', null, '2016-06-23 14:18:22', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_nBsc1vpSKZ', 'KbAQJWFonfaggyf4YStwUo8EPECMpJ82', null, '2016-06-23 14:40:17', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_pidLCWSPP3', 'eH8t_2fZNHdDioryigTDJ1vOQAZThuJn', null, '2016-06-23 14:30:19', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_q0eSKBbEIu', 'lmsei9D5jS3TfiP52n9txHE916XWUekO', null, '2016-06-23 16:40:50', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_r4r1pK_v_G', '2bZVxwL5whMufsL2rNbsa_L3qf4jh2k_', null, '2016-06-23 15:06:23', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_sNNbE1JTt5', 'wibWPg8cSY_Hwdz3KzSN4h4I3RTWUDYL', null, '2016-06-23 14:02:11', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_UtAyDBPreD', '_7Tvn0aPXcgCiIscJflaEiAm8MJFtDG7', null, '2016-06-23 15:02:19', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_Vxcv0p4WMC', 'fiTtm1Y8FlXx80fSZUT48WnyeP6zPdJ8', null, '2016-06-23 16:46:34', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_VXW97QznoU', '1j4L8QS5zqo1wVDXfLhuPRnYhKOCJl9W', null, '2016-06-23 12:37:39', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_WKQi1sopKx', 'vC8Hf4cf5hPXtib8UFO2np7UZ954eXXX', null, '2016-06-23 14:28:57', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_WpMh1UvJV7', '6xWAU6rVSahU688OZ2CslWqdK5G_eZWb', null, '2016-06-23 14:02:54', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_wTADQ6n1pF', 'DGnvlBg2OwdPMAu_XXZ35GoeCiIw25WD', null, '2016-06-23 14:35:18', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_z4mhxrTsy8', 'wk4nGmG8ynqriXvfQPtlDOJzkV6XGvLZ', null, '2016-06-23 16:37:37', '2016-06-24 15:21:38', '127.0.0.1', null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_z5_fiDdoB9', 'wAorFqEITfLV0H4WN85u3trNQg_kAZ4D', null, '2016-06-23 16:12:33', null, null, null, null, null, null, null, null, null, null);
INSERT INTO `appusers` VALUES ('User_zan42HDI_c', 'wqb8X7Jo5Nw5y8_8wR4Mg3cG4OB5Dj0Q', null, '2016-06-23 14:01:10', '2016-06-24 13:16:53', '127.0.0.1', null, null, null, null, null, null, null, null);

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
  `config` varchar(255) NOT NULL,
  `proxy` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `serverId` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of program
-- ----------------------------
INSERT INTO `program` VALUES ('1', 'IE 6', 'iexplore', 'http://www.baidu.com', '0', '/static/home/images/app/ie6.png', '11', '1');
INSERT INTO `program` VALUES ('2', 'IE 7', '', '', '0', '/static/home/images/app/ie7.png', '11', '0');
INSERT INTO `program` VALUES ('3', 'IE 8', '', '', '0', '/static/home/images/app/ie8.png', '11', '0');
INSERT INTO `program` VALUES ('4', 'IE 9', '', '', '0', '/static/home/images/app/ie9.png', '11', '0');
INSERT INTO `program` VALUES ('5', 'IE 10', '', '', '0', '/static/home/images/app/ie10.png', '11', '0');
INSERT INTO `program` VALUES ('6', 'IE 11', '', '', '', '/static/home/images/app/ie11.png', '11', '0');
INSERT INTO `program` VALUES ('7', 'chrome', '', '', '', '/static/home/images/app/chrome.png', '11', '0');
INSERT INTO `program` VALUES ('8', 'firefox', 'C:\\Program Files\\Mozilla Firefox\\firefox.exe', 'http://www.baidu.com', '', '/static/home/images/app/firefox.png', '11', '0');
INSERT INTO `program` VALUES ('9', 'opera', '', '', '', '/static/home/images/app/opera.png', '11', '0');
INSERT INTO `program` VALUES ('10', '360浏览器', 'C:\\Documents and Settings\\Administrator\\Local Settings\\Application Data\\360Chrome\\Chrome\\Application\\360chrome.exe', '', '', '/static/home/images/app/360se.png', '11', '0');
INSERT INTO `program` VALUES ('11', '360极速浏览器', 'C:\\Program Files\\360Chrome\\Chrome\\Application\\360chrome.exe', '', '', '/static/home/images/app/360chrome.png', '11', '0');
INSERT INTO `program` VALUES ('12', '猎豹浏览器', 'C:\\Program Files\\liebao\\liebao.exe', '', '', '/static/home/images/app/liebao.png', '11', '0');
INSERT INTO `program` VALUES ('13', '傲游浏览器', 'C:\\Program Files\\Maxthon\\Bin\\Maxthon.exe', '', '', '/static/home/images/app/maxthon.png', '11', '0');
INSERT INTO `program` VALUES ('14', 'QQ浏览器', 'C:\\Program Files\\Tencent\\QQBrowser\\QQBrowser.exe', '', '', '/static/home/images/app/qqbrowser.png', '11', '0');
INSERT INTO `program` VALUES ('15', 'UC浏览器', 'C:\\Documents and Settings\\Administrator\\Local Settings\\Application Data\\SogouExplorer\\SogouExplorer.exe', '', '', '/static/home/images/app/ucbrowser.png', '11', '0');
INSERT INTO `program` VALUES ('16', '搜狗浏览器', 'C:\\Documents and Settings\\Administrator\\Local Settings\\Application Data\\SogouExplorer\\SogouExplorer.exe', '', '', '/static/home/images/app/sogou.png', '11', '0');
INSERT INTO `program` VALUES ('17', '2345浏览器', 'C:\\Program Files\\2345Soft\\2345Explorer\\2345Explorer.exe', '', '', '/static/home/images/app/2345.png', '11', '0');
INSERT INTO `program` VALUES ('18', '世界之窗', 'C:\\Documents and Settings\\Administrator\\Local Settings\\Application Data\\TheWorld6\\Application\\TheWorld.exe', 'http://www.baidu.com', '', '/static/home/images/app/theworld.png', '11', '0');
INSERT INTO `program` VALUES ('19', '我的桌面', '', '', '', '', '0', '0');
INSERT INTO `program` VALUES ('20', 'hosts', 'C:\\hostsShare-client\\build\\hostsShare.exe', '', '', '', '11', '0');

-- ----------------------------
-- Table structure for server
-- ----------------------------
DROP TABLE IF EXISTS `server`;
CREATE TABLE `server` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `ip` varchar(15) NOT NULL,
  `port` int(5) NOT NULL,
  `status` int(1) NOT NULL,
  `appid` int(11) NOT NULL,
  `syncUserDate` datetime DEFAULT NULL,
  `accessToken` varchar(255) NOT NULL,
  `probePath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of server
-- ----------------------------
INSERT INTO `server` VALUES ('11', 'win2003', '192.168.159.137', '80', '1', '1', '2016-06-27 12:27:34', 'YFtTew6WoBU5BWuFBQwOKg9zTN2GD6UY', 'C:\\f2etest-browsers\\www');
INSERT INTO `server` VALUES ('10', 'ie7', '127.0.0.1', '80', '0', '0', '2016-06-27 09:50:39', 'Qo3l_ptAEzf_XJiOjRHcuy3Iakhf8XTb', 'C:\\f2etest-browsers\\www');
INSERT INTO `server` VALUES ('8', 'ie9', '172.16.97.13', '80', '0', '0', '2016-06-27 09:50:39', 'MPq1_HatCyuyqDISks68xM0RdUX1JGu0', 'C:\\f2etest-browsers\\www');
INSERT INTO `server` VALUES ('12', 'ie10', '192.168.159.137', '80', '1', '0', '2016-06-27 12:27:34', 'lUfhgDiW5pwPXPyRBHrRw5AOY_9KYfgq', 'C:\\f2etest-browsers\\www');
INSERT INTO `server` VALUES ('15', 'test', '127.0.0.1', '80', '0', '0', null, 'x6ORNtDnZZgRkiosAabMHQP8BFFHAd1r', 'C:\\f2etest-browsers\\www');
INSERT INTO `server` VALUES ('16', 'demo', '127.0.0.1', '80', '0', '0', null, 't_NX20erY_6y5aLYESXSJIcFjh1J19li', 'C:\\f2etest-browsers\\www');

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

-- MySQL dump 10.13  Distrib 5.5.40, for Win32 (x86)
--
-- Host: localhost    Database: dcloud
-- ------------------------------------------------------
-- Server version	5.5.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applogs`
--

DROP TABLE IF EXISTS `applogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applogs`
--

LOCK TABLES `applogs` WRITE;
/*!40000 ALTER TABLE `applogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `applogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appusers`
--

DROP TABLE IF EXISTS `appusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appusers`
--

LOCK TABLES `appusers` WRITE;
/*!40000 ALTER TABLE `appusers` DISABLE KEYS */;
/*!40000 ALTER TABLE `appusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(11) NOT NULL,
  `apiKey` varchar(255) NOT NULL,
  `guacamoleApi` varchar(255) NOT NULL,
  `guacamoleConfig` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=gbk;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program`
--

DROP TABLE IF EXISTS `program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `server`
--

DROP TABLE IF EXISTS `server`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=gbk;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `server`
--

LOCK TABLES `server` WRITE;
/*!40000 ALTER TABLE `server` DISABLE KEYS */;
/*!40000 ALTER TABLE `server` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wd_browsers`
--

DROP TABLE IF EXISTS `wd_browsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wd_browsers` (
  `browser_id` int(11) NOT NULL AUTO_INCREMENT,
  `browser_name` varchar(20) DEFAULT '',
  `browser_version` varchar(10) DEFAULT '',
  `node_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`browser_id`),
  UNIQUE KEY `node_id` (`node_id`,`browser_name`,`browser_version`)
) ENGINE=MyISAM AUTO_INCREMENT=89 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wd_browsers`
--

LOCK TABLES `wd_browsers` WRITE;
/*!40000 ALTER TABLE `wd_browsers` DISABLE KEYS */;
/*!40000 ALTER TABLE `wd_browsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wd_jsunit`
--

DROP TABLE IF EXISTS `wd_jsunit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wd_jsunit`
--

LOCK TABLES `wd_jsunit` WRITE;
/*!40000 ALTER TABLE `wd_jsunit` DISABLE KEYS */;
/*!40000 ALTER TABLE `wd_jsunit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wd_logs`
--

DROP TABLE IF EXISTS `wd_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wd_logs` (
  `log_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `userid` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `data` varchar(1000) DEFAULT NULL,
  `log_time` datetime DEFAULT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2535 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wd_logs`
--

LOCK TABLES `wd_logs` WRITE;
/*!40000 ALTER TABLE `wd_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `wd_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wd_nodes`
--

DROP TABLE IF EXISTS `wd_nodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wd_nodes`
--

LOCK TABLES `wd_nodes` WRITE;
/*!40000 ALTER TABLE `wd_nodes` DISABLE KEYS */;
/*!40000 ALTER TABLE `wd_nodes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-07-02 23:32:26

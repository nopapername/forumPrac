-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.6.26 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 forum 的数据库结构
CREATE DATABASE IF NOT EXISTS `forum` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `forum`;

-- 导出  表 forum.comment 结构
CREATE TABLE IF NOT EXISTS `comment` (
  `postId` int(11) DEFAULT NULL,
  `content` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `user` varchar(50) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 正在导出表  forum.comment 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` (`postId`, `content`, `user`) VALUES
	(0, '哈哈哈哈哈哈', '1019825864');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;

-- 导出  表 forum.post 结构
CREATE TABLE IF NOT EXISTS `post` (
  `title` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `content` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `user` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `postId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 正在导出表  forum.post 的数据：~3 rows (大约)
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` (`title`, `content`, `user`, `postId`) VALUES
	('哈哈', '我是内容', '1019825864', 0);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;

-- 导出  表 forum.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `uid` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `userName` varchar(50) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 正在导出表  forum.user 的数据：~2 rows (大约)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`uid`, `userName`) VALUES
	('1019825864', '123456');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

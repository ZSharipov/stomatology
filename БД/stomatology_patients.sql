-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: stomatology
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fio` char(30) NOT NULL,
  `birth_day` date NOT NULL,
  `address` varchar(100) NOT NULL,
  `tel` char(18) DEFAULT NULL,
  `hbs` tinyint(4) NOT NULL DEFAULT '0',
  `hcv` tinyint(4) NOT NULL DEFAULT '0',
  `hiv` tinyint(4) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_edit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,'Иванов И. И.','2020-02-02','ул. Терешково','34-75-5-46-75',1,1,0,'2019-12-17 21:23:09','2020-02-07 15:07:05'),(2,'Степан Игорь Николаевич','1970-12-12','ул. Дружба','92-765-46-78',0,0,0,'2019-12-17 21:23:09','2020-01-18 20:47:08'),(3,'Болван Б. В.','1980-01-01','ул. Победа 34','34-23432-3432',1,0,0,'2020-01-13 12:40:16','2020-02-11 16:55:02'),(4,'Чурбан Ч.Ч','1973-03-03','ул. Гулбутта 43 у а л. Гулбутта 43  ул. Гулбутта 43 ул. Гулбутта 43','222-32-232-',0,0,1,'2020-01-13 12:43:53','2020-01-30 09:25:19'),(5,'Петросян','1992-01-02','ул. Парковая 1','23432-23432-3',1,1,0,'2020-01-13 18:48:07','2020-01-30 12:49:58'),(6,'Терешково В.В.','1900-01-01','пос. Зарафшон','12-3-45',0,0,0,'2020-01-13 19:03:27','2020-01-14 08:43:47'),(9,'Тарасов D. Б.','1980-01-01','г. Кабристон','2133412',0,0,0,'2020-01-13 19:58:30','2020-01-20 10:07:15'),(10,'Никулин Ю','1954-04-04','Хохландия','323-434-54',0,0,0,'2020-01-14 13:33:14','2020-01-14 08:33:14'),(11,'Курбон','2019-01-01','adress','tel',1,1,0,'2020-01-17 22:22:47','2020-01-18 19:31:57'),(14,'Аттор','2020-12-03','ул. Космос','23-234-546',0,0,0,'2020-02-07 20:30:38','2020-02-07 15:30:38'),(15,'Бедил','2020-01-01','ул. Победа',NULL,1,0,0,'2020-02-07 20:38:44','2020-02-07 17:25:42'),(16,'Сафронов А. Н.','2020-02-02','ул. Нариманова',NULL,0,0,0,'2020-02-07 20:40:41','2020-02-07 15:40:41');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-11 22:07:18

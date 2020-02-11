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
-- Table structure for table `journal`
--

DROP TABLE IF EXISTS `journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journal` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_doctor` int(10) unsigned NOT NULL,
  `id_patient` int(10) unsigned NOT NULL,
  `state` char(1) NOT NULL DEFAULT '0',
  `is_deciduous` tinyint(4) NOT NULL DEFAULT '0',
  `note` mediumtext,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_edit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_done` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doc_fk_idx` (`id_doctor`),
  KEY `patient_fk_idx` (`id_patient`),
  CONSTRAINT `doc_fk` FOREIGN KEY (`id_doctor`) REFERENCES `doctors` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `patient_fk` FOREIGN KEY (`id_patient`) REFERENCES `patients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journal`
--

LOCK TABLES `journal` WRITE;
/*!40000 ALTER TABLE `journal` DISABLE KEYS */;
INSERT INTO `journal` VALUES (48,1,1,'1',1,'28/11/2019\nДиагноз: К00.3>Крапчатые зубы\nОбезболивание: Инфильтрационная\nОбезболивание: Мандибулярная\n11/2/2020\nМолочный зуб: 2(II)\n','2020-01-13 16:17:55','2020-02-11 09:40:30',NULL),(50,1,1,'0',0,'','2020-01-13 19:27:19','2020-02-05 08:48:30',NULL),(52,4,4,'2',0,'','2020-01-13 19:29:56','2020-02-05 08:48:30',NULL),(53,1,9,'3',0,'Диагноз: К00.1>Сверхкомплектные зубы\nМолочный зуб: 1(I)\nПломбировочные материалы: Эндодонтические>Эндометазон\nПломбировочные материалы: Эндодонтические>Эндометазон\nОбезболивание: Аппликационная\nАнестетик: Лидокаин\n\n','2020-01-13 19:59:18','2020-02-07 12:36:21',NULL),(57,6,9,'0',0,'','2020-01-20 09:29:20','2020-02-05 08:48:30',NULL),(58,6,11,'0',0,'','2020-01-20 09:29:56','2020-02-05 08:48:30',NULL),(59,6,1,'0',0,'','2020-01-20 09:43:39','2020-02-05 08:48:30',NULL),(60,1,2,'0',0,'','2020-01-20 09:46:59','2020-02-05 08:48:30',NULL),(61,1,3,'0',0,'','2020-01-20 09:47:06','2020-02-05 08:48:30',NULL),(62,1,5,'0',0,'','2020-01-30 17:48:52','2020-02-05 08:48:30',NULL),(63,1,10,'0',0,NULL,'2020-02-07 18:08:45','2020-02-07 13:08:45',NULL),(65,1,14,'0',0,NULL,'2020-02-07 20:33:02','2020-02-07 15:33:02',NULL),(66,1,15,'0',0,NULL,'2020-02-07 20:39:40','2020-02-07 15:39:40',NULL),(67,1,16,'0',0,NULL,'2020-02-07 20:41:02','2020-02-07 15:41:02',NULL),(68,1,11,'0',0,NULL,'2020-02-11 14:51:33','2020-02-11 09:51:33',NULL),(69,1,4,'0',0,NULL,'2020-02-11 14:58:22','2020-02-11 09:58:22',NULL),(70,1,3,'0',0,NULL,'2020-02-11 14:58:10','2020-02-11 09:59:33',NULL);
/*!40000 ALTER TABLE `journal` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-11 22:07:17

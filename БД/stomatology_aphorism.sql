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
-- Table structure for table `aphorism`
--

DROP TABLE IF EXISTS `aphorism`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aphorism` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aphorism`
--

LOCK TABLES `aphorism` WRITE;
/*!40000 ALTER TABLE `aphorism` DISABLE KEYS */;
INSERT INTO `aphorism` VALUES (1,'Тот, кто смеется последним, обычно не имеет переднего зуба.'),(2,'Врач — не что иное, как утешитель для души. (Петроний)'),(3,'Доброта лучше красоты. (Г. Гейне)'),(4,'Самое главное украшение — чистая совесть. (Цицерон Марк Туллий)'),(5,'От врачей и учителей требуют чуда, а если чудо свершится – никто не удивляется. (Мария Эбнер Эшенбах)'),(6,'Чистая совесть ни лжи не боится, ни слухов, ни сплетен. (Овидий)'),(7,'Наличие хорошего врача в городе — благодеяние Господне.'),(8,'Самую сильную черту отличия человека от животных составляет нравственное чувство, или совесть.'),(9,'Оптимистическая ложь до такой степени необходима в медицине, что врач, неспособный искренне лгать, выбрал не ту профессию. (Джордж Бернард Шоу)'),(10,'Если после разговора с врачом не стало легче, то это не врач. (В. Бехтерев)'),(11,'Врач — философ: ведь нет большой разницы между мудростью и медициной. (Гиппократ)'),(12,'Даже самую большую душевную боль может смягчить небольшая зубная. (Лидия Ясиньская)'),(13,'Я не знаю иных признаков превосходства, кроме доброты. (Л. Бетховен)'),(14,'В медицине главным лекарством является сам врач. (Антоний Кэмпиньский)'),(15,'Добрые нравы суть награды честного человека. (Г. Державин)'),(16,'Только радостное сердце способно находить удовольствие в добре. И. Кант');
/*!40000 ALTER TABLE `aphorism` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-14 15:50:11

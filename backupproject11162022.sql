-- MariaDB dump 10.19  Distrib 10.4.25-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_murrahs
-- ------------------------------------------------------
-- Server version	10.6.10-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customers` (
  `cust_ID` int(11) NOT NULL AUTO_INCREMENT,
  `cust_first_name` varchar(50) NOT NULL,
  `cust_last_name` varchar(50) NOT NULL,
  `cust_email` varchar(255) NOT NULL,
  PRIMARY KEY (`cust_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` VALUES (1,'Amanda','Black','black.amanda@gmail.com'),(2,'Johnathan','Lee','johnlee@yahoo.com'),(3,'Amy','Young','amyy@me.com'),(4,'Wilbur','Thorn','thorn.will@outlook.com'),(5,'Charlotte','Callaghan','ccallaghan@icloud.com'),(6,'undefined','undefined','undefined'),(7,'undefined','undefined','undefined'),(8,'undefined','undefined','undefined'),(9,'Samuel','Murrah','murrahs@oregonstate.edu');
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Developers`
--

DROP TABLE IF EXISTS `Developers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Developers` (
  `dev_ID` int(11) NOT NULL AUTO_INCREMENT,
  `dev_name` varchar(255) DEFAULT NULL,
  `dev_location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`dev_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Developers`
--

LOCK TABLES `Developers` WRITE;
/*!40000 ALTER TABLE `Developers` DISABLE KEYS */;
INSERT INTO `Developers` VALUES (1,'Survivor Games','Russia'),(2,'Sports n Stuff Creations','United States of America'),(3,'Wargames Central','Germany'),(4,'MovieBrand Games','United States of America'),(5,'Spooks Unending','Japan');
/*!40000 ALTER TABLE `Developers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Games`
--

DROP TABLE IF EXISTS `Games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Games` (
  `game_ID` int(11) NOT NULL AUTO_INCREMENT,
  `game_title` varchar(255) DEFAULT NULL,
  `game_price` decimal(19,2) NOT NULL,
  `dev_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`game_ID`),
  KEY `dev_ID` (`dev_ID`),
  CONSTRAINT `Games_ibfk_1` FOREIGN KEY (`dev_ID`) REFERENCES `Developers` (`dev_ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Games`
--

LOCK TABLES `Games` WRITE;
/*!40000 ALTER TABLE `Games` DISABLE KEYS */;
INSERT INTO `Games` VALUES (1,'Man-Thing Heroes',49.99,2),(2,'Lost',29.99,1),(3,'Zombies vs Cats',19.99,5),(4,'Cowboy Shoot\'em',39.99,3),(5,'Stranger Ranger',59.99,4);
/*!40000 ALTER TABLE `Games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Games_Genres_Details`
--

DROP TABLE IF EXISTS `Games_Genres_Details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Games_Genres_Details` (
  `game_genre_details_ID` int(11) NOT NULL AUTO_INCREMENT,
  `genre_ID` int(11) NOT NULL,
  `game_ID` int(11) NOT NULL,
  PRIMARY KEY (`game_genre_details_ID`),
  KEY `genre_ID` (`genre_ID`),
  KEY `game_ID` (`game_ID`),
  CONSTRAINT `Games_Genres_Details_ibfk_1` FOREIGN KEY (`genre_ID`) REFERENCES `Genres` (`genre_ID`),
  CONSTRAINT `Games_Genres_Details_ibfk_2` FOREIGN KEY (`game_ID`) REFERENCES `Games` (`game_ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Games_Genres_Details`
--

LOCK TABLES `Games_Genres_Details` WRITE;
/*!40000 ALTER TABLE `Games_Genres_Details` DISABLE KEYS */;
INSERT INTO `Games_Genres_Details` VALUES (1,1,1),(2,2,2),(3,4,3),(4,3,3),(5,3,4),(6,2,5),(7,5,5);
/*!40000 ALTER TABLE `Games_Genres_Details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Games_Purchases_Details`
--

DROP TABLE IF EXISTS `Games_Purchases_Details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Games_Purchases_Details` (
  `game_purch_details_ID` int(11) NOT NULL AUTO_INCREMENT,
  `purch_ID` int(11) NOT NULL,
  `game_ID` int(11) NOT NULL,
  `game_price` decimal(19,2) NOT NULL,
  PRIMARY KEY (`game_purch_details_ID`),
  KEY `purch_ID` (`purch_ID`),
  KEY `game_ID` (`game_ID`),
  CONSTRAINT `Games_Purchases_Details_ibfk_1` FOREIGN KEY (`purch_ID`) REFERENCES `Purchases` (`purch_ID`) ON UPDATE CASCADE,
  CONSTRAINT `Games_Purchases_Details_ibfk_2` FOREIGN KEY (`game_ID`) REFERENCES `Games` (`game_ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Games_Purchases_Details`
--

LOCK TABLES `Games_Purchases_Details` WRITE;
/*!40000 ALTER TABLE `Games_Purchases_Details` DISABLE KEYS */;
INSERT INTO `Games_Purchases_Details` VALUES (1,1,1,49.99),(2,2,1,49.99),(3,2,2,29.99),(4,3,3,19.99),(5,4,4,39.99),(6,5,1,49.99),(7,5,5,59.99);
/*!40000 ALTER TABLE `Games_Purchases_Details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Genres`
--

DROP TABLE IF EXISTS `Genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Genres` (
  `genre_ID` int(11) NOT NULL AUTO_INCREMENT,
  `genre_title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`genre_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Genres`
--

LOCK TABLES `Genres` WRITE;
/*!40000 ALTER TABLE `Genres` DISABLE KEYS */;
INSERT INTO `Genres` VALUES (1,'Sports'),(2,'Survival'),(3,'First Person Shooter'),(4,'Horror'),(5,'Story');
/*!40000 ALTER TABLE `Genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Purchases`
--

DROP TABLE IF EXISTS `Purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Purchases` (
  `purch_ID` int(11) NOT NULL AUTO_INCREMENT,
  `purch_date` date NOT NULL,
  `cust_ID` int(11) NOT NULL,
  PRIMARY KEY (`purch_ID`),
  KEY `cust_ID` (`cust_ID`),
  CONSTRAINT `Purchases_ibfk_1` FOREIGN KEY (`cust_ID`) REFERENCES `Customers` (`cust_ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Purchases`
--

LOCK TABLES `Purchases` WRITE;
/*!40000 ALTER TABLE `Purchases` DISABLE KEYS */;
INSERT INTO `Purchases` VALUES (1,'2019-12-21',1),(2,'2015-07-03',2),(3,'2021-08-04',3),(4,'2022-01-09',4),(5,'2018-04-18',5);
/*!40000 ALTER TABLE `Purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnostic`
--

DROP TABLE IF EXISTS `diagnostic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diagnostic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnostic`
--

LOCK TABLES `diagnostic` WRITE;
/*!40000 ALTER TABLE `diagnostic` DISABLE KEYS */;
INSERT INTO `diagnostic` VALUES (1,'MySQL is working!');
/*!40000 ALTER TABLE `diagnostic` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-16  8:59:20


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `ar_internal_metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ar_internal_metadata` (
  `key` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `composite_sample_type_states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `composite_sample_type_states` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `composite_sample_type_id` int unsigned DEFAULT NULL,
  `state_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `csts_composite_sample_type_id` (`composite_sample_type_id`),
  KEY `csts_state_id` (`state_id`),
  CONSTRAINT `csts_composite_sample_type_id` FOREIGN KEY (`composite_sample_type_id`) REFERENCES `composite_sample_types` (`id`),
  CONSTRAINT `csts_state_id` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `composite_sample_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `composite_sample_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `composite_sample_class` varchar(20) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `container_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `container_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `container_class` varchar(20) DEFAULT NULL,
  `rows` int DEFAULT NULL,
  `columns` int DEFAULT NULL,
  `max_volume` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `containers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `containers` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `container_type_id` int unsigned DEFAULT NULL,
  `row` int DEFAULT NULL,
  `column` int DEFAULT NULL,
  `location` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `c_container_type_id` (`container_type_id`),
  CONSTRAINT `c_container_type_id` FOREIGN KEY (`container_type_id`) REFERENCES `container_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `item_states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_states` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int unsigned DEFAULT NULL,
  `state_id` int unsigned DEFAULT NULL,
  `value` text,
  PRIMARY KEY (`id`),
  KEY `is_item_id` (`item_id`),
  KEY `is_state_id` (`state_id`),
  CONSTRAINT `is_item_id` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  CONSTRAINT `is_state_id` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `sample_class` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `sample_type_id` int unsigned DEFAULT NULL,
  `composite_sample_type_id` int unsigned DEFAULT NULL,
  `container_id` int unsigned DEFAULT NULL,
  `container_row` int unsigned DEFAULT NULL,
  `container_column` int unsigned DEFAULT NULL,
  `location_type_id` int unsigned DEFAULT NULL,
  `location` text,
  PRIMARY KEY (`id`),
  KEY `i_sample_type_id` (`sample_type_id`),
  KEY `i_composite_sample_type_id` (`composite_sample_type_id`),
  KEY `i_container_id` (`container_id`),
  KEY `i_location_type_id` (`location_type_id`),
  CONSTRAINT `i_composite_sample_type_id` FOREIGN KEY (`composite_sample_type_id`) REFERENCES `composite_sample_types` (`id`),
  CONSTRAINT `i_container_id` FOREIGN KEY (`container_id`) REFERENCES `containers` (`id`),
  CONSTRAINT `i_location_type_id` FOREIGN KEY (`location_type_id`) REFERENCES `location_types` (`id`),
  CONSTRAINT `i_sample_type_id` FOREIGN KEY (`sample_type_id`) REFERENCES `sample_types` (`id`),
  CONSTRAINT `sample_check` CHECK ((((`sample_class` = _utf8mb3'sample') and (`sample_type_id` is not null) and (`composite_sample_type_id` is null)) or ((`sample_class` = _utf8mb3'composite_sample') and (`sample_type_id` is null) and (`composite_sample_type_id` is not null))))
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `location_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `specification` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sample_type_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sample_type_categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sample_type_states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sample_type_states` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `sample_type_id` int unsigned DEFAULT NULL,
  `state_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sts_sample_type_id` (`sample_type_id`),
  KEY `sts_state_id` (`state_id`),
  CONSTRAINT `sts_sample_type_id` FOREIGN KEY (`sample_type_id`) REFERENCES `sample_types` (`id`),
  CONSTRAINT `sts_state_id` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sample_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sample_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `sample_type_category_id` int unsigned DEFAULT NULL,
  `name` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `description` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `sample_types_sample_type_category_id` (`sample_type_category_id`),
  CONSTRAINT `sample_types_sample_type_category_id` FOREIGN KEY (`sample_type_category_id`) REFERENCES `sample_type_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(20) DEFAULT NULL,
  `key_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;




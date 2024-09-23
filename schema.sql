CREATE TABLE `confirmation` (
	`id` bigint unsigned NOT NULL AUTO_INCREMENT,
	`created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP(),
	`need_bus_to_city` tinyint(1),
	`need_bus_to_restaurant` tinyint(1),
	`extra_information` varchar(512),
	`must_have_song` varchar(128),
	PRIMARY KEY (`id`),
	UNIQUE KEY `id` (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `confirmation_member` (
	`id` bigint unsigned NOT NULL AUTO_INCREMENT,
	`first_name` varchar(64),
	`last_name` varchar(64),
	`confirmation_id` int NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `id` (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;


CREATE TABLE `session` (
	`sid` varchar(256) NOT NULL,
	`sess` varchar(256) NOT NULL,
	`expire` timestamp(6) NOT NULL,
	PRIMARY KEY (`sid`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `user_` (
	`id` bigint unsigned NOT NULL AUTO_INCREMENT,
	`salt` varchar(32) NOT NULL,
	`username` varchar(32) NOT NULL,
	`password` varchar(256) NOT NULL,
	`first_name` varchar(64),
	`last_name` varchar(64),
	PRIMARY KEY (`id`),
	UNIQUE KEY `id` (`id`),
	UNIQUE KEY `username` (`username`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;


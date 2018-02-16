SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

CREATE DATABASE `plentydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `plentydb`;

CREATE TABLE IF NOT EXISTS `item` (
    `id` smallint(5) NOT NULL AUTO_INCREMENT,
    `categoryId`  smallint(5) NOT NULL,
    `name` varchar(50) NOT NULL,
    `price` varchar(10) NOT NULL,
    `quantity` varchar(10) NOT NULL,
    `createdAt` timestamp,
    `updatedAt` timestamp,
    `status` smallint(1) NOT NULL,
    PRIMARY KEY(`id`),
    KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `category` (
    `id` smallint(5) NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `position` smallint(1) NOT NULL,
    `createdAt` timestamp,
    `updatedAt` timestamp,
    `status` smallint(1) NOT NULL,
    PRIMARY KEY(`id`),
    KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `menu` (
    `id` smallint(5) NOT NULL AUTO_INCREMENT,
    `date`  varchar(30) NOT NULL,
    `createdAt` timestamp,
    `updatedAt` timestamp,
    `status` smallint(1) NOT NULL,
    PRIMARY KEY(`id`),
    KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `map_menu` (
    `menuId` smallint(5) NOT NULL,
    `itemId` smallint(5) NOT NULL,
    `createdAt` timestamp,
    `updatedAt` timestamp,
    `status` smallint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
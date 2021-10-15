-- Model: photodb    Version: 1.3
-- MySQL Server Configuration Script

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema photodb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `photodb` ;

CREATE SCHEMA IF NOT EXISTS `photodb` DEFAULT CHARACTER SET utf8 ;
USE `photodb` ;

-- -----------------------------------------------------
-- Table photodb.users
--
-- This table contians the users of the platform. A user
-- has a username, a hashed password, and an admin 
-- field.
-- -----------------------------------------------------
DROP TABLE IF EXISTS `photodb`.`users` ;

CREATE TABLE IF NOT EXISTS `photodb`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(32) NOT NULL,
  `hashed_password` VARCHAR(128) NOT NULL,
  `is_admin` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table photodb.photos
--
-- The photos table contains the records of every photo 
-- stored in the system. This includes file location and 
-- other matadata. Each photo has an uploader which is 
-- referenced to the users table. A phto can be
-- referenced to another photo if it is an edited
-- version of that photo. This is part of the 
-- non-destructive editing system, and will be expanded 
-- upon in future schemas.
--
-- -----------------------------------------------------
DROP TABLE IF EXISTS `photodb`.`photos` ;

CREATE TABLE IF NOT EXISTS `photodb`.`photos` (
  `photo_id` INT NOT NULL AUTO_INCREMENT,
  `file_path` VARCHAR(512) NOT NULL,
  `file_format` VARCHAR(20) NOT NULL,
  `hash` VARCHAR(256) NOT NULL,
  `uploader` INT NOT NULL,
  `date_taken` DATETIME NULL,
  `gps` POINT NULL,
  `last_editor` INT NULL,
  `original_photo` INT NULL,
  `is_original` TINYINT NOT NULL DEFAULT 1,
  `date_edited` DATETIME NULL,
  `date_uploaded` DATETIME NOT NULL,
  `is_public` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`photo_id`),
  INDEX `uploader_idx` (`uploader` ASC) VISIBLE,
  INDEX `last_editor_idx` (`last_editor` ASC) VISIBLE,
  INDEX `original_photo_idx` (`original_photo` ASC) VISIBLE,
  CONSTRAINT `photo_uploader`
    FOREIGN KEY (`uploader`)
    REFERENCES `photodb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `photo_last_editor`
    FOREIGN KEY (`last_editor`)
    REFERENCES `photodb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `photo_original_photo`
    FOREIGN KEY (`original_photo`)
    REFERENCES `photodb`.`photos` (`photo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table photodb.albums
--
-- The albums table contains the names and owners of 
-- albums. It also contains the date the album was 
-- created and also the date the album was last edited
-- for sorting and display purposes.
--
-- -----------------------------------------------------
DROP TABLE IF EXISTS `photodb`.`albums` ;

CREATE TABLE IF NOT EXISTS `photodb`.`albums` (
  `album_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `owner` INT NOT NULL,
  `date_created` DATETIME NOT NULL,
  `date_last_edited` DATETIME NOT NULL,
  PRIMARY KEY (`album_id`),
  INDEX `owner_idx` (`owner` ASC) VISIBLE,
  CONSTRAINT `album_owner_id`
    FOREIGN KEY (`owner`)
    REFERENCES `photodb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table photodb.album_photos
--
-- The album_photos table contains the photo entries 
-- stored in each album. Each row contains a relation
-- between an album and a photo.
--
-- -----------------------------------------------------
DROP TABLE IF EXISTS `photodb`.`album_photos` ;

CREATE TABLE IF NOT EXISTS `photodb`.`album_photos` (
  `album_photo_id` INT NOT NULL AUTO_INCREMENT,
  `album_id` INT NOT NULL,
  `photo_id` INT NOT NULL,
  PRIMARY KEY (`album_photo_id`),
  INDEX `album_id_idx` (`album_id` ASC) VISIBLE,
  INDEX `photo_id_idx` (`photo_id` ASC) VISIBLE,
  CONSTRAINT `album_entry_album_id`
    FOREIGN KEY (`album_id`)
    REFERENCES `photodb`.`albums` (`album_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `album_entry_photo_id`
    FOREIGN KEY (`photo_id`)
    REFERENCES `photodb`.`photos` (`photo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table photodb.thumbnails
--
-- The thumbnails table stores the path and data about 
-- stored thumbnails on the server. Each thumbnail is 
-- referenced to a photo.
--
-- -----------------------------------------------------

DROP TABLE IF EXISTS `photodb`.`thumbnail` ;

CREATE TABLE IF NOT EXISTS `photodb`.`thumbnail` (
  `thumbnail_id` INT NOT NULL AUTO_INCREMENT,
  `photo_id` INT NOT NULL,
  `file_path` VARCHAR(512) NOT NULL,
  `format` VARCHAR(20) NOT NULL,
  `width` INT NOT NULL,
  `height` INT NOT NULL,
  PRIMARY KEY (`thumbnail_id`),
  INDEX `photo_id_idx` (`photo_id` ASC) VISIBLE,
  CONSTRAINT `thumbnail_photo_id`
    FOREIGN KEY (`photo_id`)
    REFERENCES `photodb`.`photos` (`photo_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

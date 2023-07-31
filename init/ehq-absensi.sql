-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2023 at 06:00 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ehq-absensi`
--

-- --------------------------------------------------------

--
-- Table structure for table `absens`
--

CREATE TABLE `absens` (
  `id` int(50) NOT NULL,
  `key` varchar(50) NOT NULL,
  `status` enum('masuk','terlambat','alpha','ijin') NOT NULL,
  `message` varchar(100) NOT NULL,
  `created_at` varchar(20) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `access_key`
--

CREATE TABLE `access_key` (
  `key` varchar(100) NOT NULL,
  `type` enum('main','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `access_key`
--

INSERT INTO `access_key` (`key`, `type`) VALUES
('0xa57910dfc0e5b22b38b86c63d769c0d0dd7b12c1f9806a8a30b3de6133264b06', 'main');

-- --------------------------------------------------------

--
-- Table structure for table `cron`
--

CREATE TABLE `cron` (
  `id` int(50) NOT NULL,
  `status` enum('done','waiting') NOT NULL DEFAULT 'waiting',
  `count_create` int(50) NOT NULL,
  `created_at` varchar(20) NOT NULL,
  `updated_at` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `persons`
--

CREATE TABLE `persons` (
  `key` varchar(50) NOT NULL,
  `no` int(10) NOT NULL,
  `class` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `status_absen` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{ masuk: 0, terlambat: 0, alpha: 0, ijin: 0 }' CHECK (json_valid(`status_absen`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `persons`
--

INSERT INTO `persons` (`key`, `no`, `class`, `name`, `status_absen`) VALUES
('00000000001', 1, 'S1', 'TEST NAMA 1', '\"{ \'masuk\': 0, \'terlambat\': 0, \'alpha\': 0, \'ijin\': 0 }\"');

-- --------------------------------------------------------

--
-- Table structure for table `persons_rp`
--

CREATE TABLE `persons_rp` (
  `key` varchar(100) NOT NULL,
  `class` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `persons_rp`
--

INSERT INTO `persons_rp` (`key`, `class`) VALUES
('0x9b366ad6229004fa39966dcc599c23072a6ac42df986af56aeb2ed8971c06d9f', 'S1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absens`
--
ALTER TABLE `absens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `access_key`
--
ALTER TABLE `access_key`
  ADD PRIMARY KEY (`key`),
  ADD UNIQUE KEY `type` (`type`);

--
-- Indexes for table `cron`
--
ALTER TABLE `cron`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `persons_rp`
--
ALTER TABLE `persons_rp`
  ADD PRIMARY KEY (`key`),
  ADD UNIQUE KEY `class` (`class`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `absens`
--
ALTER TABLE `absens`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cron`
--
ALTER TABLE `cron`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

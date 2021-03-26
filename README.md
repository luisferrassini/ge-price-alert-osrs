# ge-price-alert-osrs

Um bot de discord feito em nodeJS

Precisa:
- criar o config.json seguindo o exemplo de config.json.example.json
- seguir o Passo 1 do tutorial https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js-pt e colocar o BOT_TOKEN no config.json
- criar o configdb.json seguindo o exemplo de configdb.json.example.json
- colocar os acessos à um bd no configdb.json

Tabela do banco de dados:
```SQL
-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2021 at 05:09 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE TABLE `ge-price-alert-osrs` (
  `id` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `alert_type` varchar(2) NOT NULL DEFAULT '<=',
  `value` int(50) NOT NULL,
  `enviado` varchar(1) NOT NULL DEFAULT 'N',
  `id_channel` varchar(255) NOT NULL,
  `id_message` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ge-price-alert-osrs`
--
ALTER TABLE `ge-price-alert-osrs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ge-price-alert-osrs`
--
ALTER TABLE `ge-price-alert-osrs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
```

-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-04-2023 a las 08:10:29
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `acronime_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `abreviature`
--

CREATE TABLE `abreviature` (
  `id` int(11) NOT NULL,
  `acronime` varchar(255) NOT NULL,
  `consultation_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `representation`
--

CREATE TABLE `representation` (
  `id` int(11) NOT NULL,
  `representation_acronime` varchar(255) NOT NULL,
  `frequency` int(11) NOT NULL,
  `since` varchar(11) NOT NULL,
  `abreviature_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vars_representation`
--

CREATE TABLE `vars_representation` (
  `id` int(11) NOT NULL,
  `var_representation_acronime` varchar(255) NOT NULL,
  `frequency` int(11) NOT NULL,
  `since` varchar(11) NOT NULL,
  `representation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `abreviature`
--
ALTER TABLE `abreviature`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `representation`
--
ALTER TABLE `representation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `abreviature_id` (`abreviature_id`);

--
-- Indices de la tabla `vars_representation`
--
ALTER TABLE `vars_representation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `representation_id` (`representation_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `abreviature`
--
ALTER TABLE `abreviature`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT de la tabla `representation`
--
ALTER TABLE `representation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT de la tabla `vars_representation`
--
ALTER TABLE `vars_representation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `representation`
--
ALTER TABLE `representation`
  ADD CONSTRAINT `representation_ibfk_1` FOREIGN KEY (`abreviature_id`) REFERENCES `abreviature` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vars_representation`
--
ALTER TABLE `vars_representation`
  ADD CONSTRAINT `vars_representation_ibfk_1` FOREIGN KEY (`representation_id`) REFERENCES `representation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

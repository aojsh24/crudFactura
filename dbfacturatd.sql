-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 07-10-2021 a las 06:18:11
-- Versión del servidor: 5.7.31
-- Versión de PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbfacturatd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle`
--

DROP TABLE IF EXISTS `detalle`;
CREATE TABLE IF NOT EXISTS `detalle` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdFactura` int(11) NOT NULL,
  `NombreProducto` varchar(255) DEFAULT NULL,
  `Cantidad` int(11) NOT NULL,
  `Precio` decimal(18,2) NOT NULL,
  `TotalLinea` decimal(18,2) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Detalle_IdFactura` (`IdFactura`)
) ENGINE=MyISAM AUTO_INCREMENT=79 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `detalle`
--

INSERT INTO `detalle` (`Id`, `IdFactura`, `NombreProducto`, `Cantidad`, `Precio`, `TotalLinea`) VALUES
(73, 35, 'Disco Duro 1TB', 1, '700.00', '700.00'),
(69, 34, 'USB 16GB', 2, '100.00', '200.00'),
(70, 33, 'Gorra', 2, '200.00', '400.00'),
(71, 33, 'Cinturón', 1, '150.00', '150.00'),
(72, 23, 'Teclado USB', 2, '150.00', '300.00'),
(74, 35, 'Adaptador USB', 2, '75.00', '150.00'),
(78, 36, 'Marcadores', 5, '3.00', '15.00'),
(61, 23, 'Auriculares', 2, '100.00', '200.00'),
(62, 33, 'Pantalón', 10, '100.00', '1000.00'),
(77, 36, 'Lapiceros', 10, '2.00', '20.00'),
(76, 35, 'Mouse USB', 2, '100.00', '200.00'),
(75, 35, 'Monitor LCD', 1, '1800.00', '1800.00'),
(60, 23, 'Cuaderno', 1, '10.00', '10.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

DROP TABLE IF EXISTS `factura`;
CREATE TABLE IF NOT EXISTS `factura` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nit` varchar(255) DEFAULT NULL,
  `NombreFactura` varchar(255) DEFAULT NULL,
  `Fecha` varchar(255) DEFAULT NULL,
  `Estado` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`Id`, `Nit`, `NombreFactura`, `Fecha`, `Estado`) VALUES
(34, '123456', 'Alejandro Rosa', '2021-10-06', 1),
(33, '7895478', 'Abel', '2021-10-06', 1),
(35, '456878', 'Julio Estrada', '2021-10-05', 1),
(36, '42645', 'Julio Arana', '2021-10-05', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
CREATE TABLE IF NOT EXISTS `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20211005052141_InitialCreate', '5.0.10');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

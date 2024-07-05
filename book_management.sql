-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2024 at 05:38 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `buku`
--

CREATE TABLE `buku` (
  `id_buku` varchar(10) NOT NULL,
  `judul_buku` varchar(64) NOT NULL,
  `id_pengarang` varchar(64) NOT NULL,
  `penerbit` varchar(64) DEFAULT NULL,
  `tahun_terbit` varchar(64) NOT NULL,
  `kategori_buku` varchar(64) NOT NULL,
  `no_isbn` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buku`
--

INSERT INTO `buku` (`id_buku`, `judul_buku`, `id_pengarang`, `penerbit`, `tahun_terbit`, `kategori_buku`, `no_isbn`) VALUES
('B001', 'Belajar Pemrograman Python', 'P001', 'PT Gramedia', '2020', 'Pemrograman', '978-602-123456-7'),
('B002', 'Data Science untuk Pemula', 'P002', 'PT Elex Media', '2019', 'Data Science', '978-602-987654-3'),
('B003', 'Pengantar Jaringan Komputer', 'P003', 'PT Andi Publisher', '2021', 'Jaringan', '978-602-135791-1'),
('B004', 'Pemrograman Web dengan PHP', 'P004', 'PT Informatika', '2020', 'Pemrograman', '978-602-246810-2'),
('B005', 'Algoritma dan Struktur Data', 'P005', 'PT Ilmu Komputer', '2018', 'Pemrograman', '978-602-121212-4');

-- --------------------------------------------------------

--
-- Table structure for table `pengarang`
--

CREATE TABLE `pengarang` (
  `id_pengarang` varchar(10) NOT NULL,
  `nama_pengarang` varchar(32) NOT NULL,
  `no_telp` varchar(32) DEFAULT NULL,
  `email` varchar(32) DEFAULT NULL,
  `alamat` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pengarang`
--

INSERT INTO `pengarang` (`id_pengarang`, `nama_pengarang`, `no_telp`, `email`, `alamat`) VALUES
('P001', 'Saiful Hafiz Saputra', '08123456789', 'saiful@example.com', 'Jl. Merdeka No. 1'),
('P002', 'John Doe', '08198765432', 'john.doe@example.com', 'Jl. Kebangsaan No. 2'),
('P003', 'Jane Smith', '08123412345', 'jane.smith@example.com', 'Jl. Kemerdekaan No. 3'),
('P004', 'Kumala Anggraeni', '08213456789', 'kumala@example.com', 'Jl. Pahlawan No. 4'),
('P005', 'Hartini', '08219876543', 'hartini@example.com', 'Jl. Kartini No. 5'),
('P006', 'Kusminto', '08387912301702', 'kusminto@gmail.com', 'Jalan-Jalan');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`id_buku`),
  ADD KEY `id_pengarang` (`id_pengarang`);

--
-- Indexes for table `pengarang`
--
ALTER TABLE `pengarang`
  ADD PRIMARY KEY (`id_pengarang`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buku`
--
ALTER TABLE `buku`
  ADD CONSTRAINT `buku_ibfk_1` FOREIGN KEY (`id_pengarang`) REFERENCES `pengarang` (`id_pengarang`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

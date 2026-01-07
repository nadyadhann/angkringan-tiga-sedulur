-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2026 at 02:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `angkringan`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id_menu` int(11) NOT NULL,
  `nama_menu` varchar(50) NOT NULL,
  `kategori` enum('makanan','minuman') NOT NULL,
  `harga_jual` decimal(15,2) NOT NULL,
  `stok` int(11) NOT NULL,
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id_menu`, `nama_menu`, `kategori`, `harga_jual`, `stok`, `updated_at`) VALUES
(1, 'Nasi Kucing', 'makanan', 3000.00, 0, '2026-01-04 23:19:21'),
(2, 'Gorengan', 'makanan', 1000.00, 1, '2026-01-04 23:17:58'),
(3, 'Ati/Ampela', 'makanan', 2000.00, 0, '2025-12-29 12:57:49'),
(4, 'Usus', 'makanan', 2000.00, 1, '2026-01-04 23:19:21'),
(5, 'Kulit', 'makanan', 2000.00, 3, '2026-01-04 23:19:21'),
(6, 'Telur Puyuh', 'makanan', 3000.00, 0, '2025-12-29 12:57:49'),
(7, 'Kepala Ayam', 'makanan', 6000.00, 0, '2025-12-29 12:57:49'),
(8, 'Sayap', 'makanan', 7000.00, 0, '2025-12-29 12:57:49'),
(9, 'Bakso', 'makanan', 3000.00, 0, '2025-12-29 12:57:49'),
(10, 'Kornet', 'makanan', 5000.00, 0, '2025-12-29 12:57:49'),
(11, 'Fishroll', 'makanan', 4000.00, 0, '2025-12-29 12:57:49'),
(12, 'Dumpling', 'makanan', 7000.00, 0, '2025-12-30 00:26:54'),
(13, 'Sosis Kecil', 'makanan', 3000.00, 0, '2025-12-29 12:57:49'),
(14, 'Sosis Besar', 'makanan', 7000.00, 0, '2025-12-29 12:57:49'),
(15, 'Scallop', 'makanan', 5000.00, 0, '2025-12-29 12:57:49'),
(16, 'Cikua', 'makanan', 3000.00, 0, '2025-12-29 12:57:49'),
(17, 'Otak-Otak', 'makanan', 3000.00, 0, '2025-12-29 12:57:49'),
(18, 'Teh Tawar', 'minuman', 2000.00, 2, '2026-01-04 23:19:21'),
(19, 'Es Teh Manis', 'minuman', 4000.00, 4, '2026-01-04 23:18:48'),
(20, 'Teh Manis Hangat', 'minuman', 3000.00, 5, '2026-01-04 23:18:52'),
(21, 'Jeruk Peras', 'minuman', 6000.00, 0, '2025-12-29 12:57:49'),
(22, 'Nutrisari', 'minuman', 5000.00, 0, '2025-12-29 12:57:49'),
(23, 'Teh Tarik', 'minuman', 7000.00, 0, '2025-12-29 12:57:49'),
(24, 'Good Day', 'minuman', 7000.00, 0, '2025-12-29 12:57:49'),
(25, 'Kapal Api', 'minuman', 5000.00, 0, '2025-12-29 12:57:49'),
(26, 'ABC Kopi Susu', 'minuman', 5000.00, 0, '2025-12-29 12:57:49'),
(27, 'ABC Klepon', 'minuman', 7000.00, 0, '2025-12-29 12:57:49'),
(28, 'Indocafe', 'minuman', 4000.00, 0, '2025-12-29 12:57:49'),
(29, 'Luwak White Koffie', 'minuman', 4000.00, 0, '2025-12-29 12:57:49'),
(30, 'Ovaltine', 'minuman', 7000.00, 0, '2025-12-29 12:57:49'),
(31, 'Chocolatos', 'minuman', 7000.00, 0, '2025-12-29 12:57:49'),
(32, 'Milo', 'minuman', 6000.00, 0, '2025-12-29 12:57:49'),
(33, 'Beng-Beng', 'minuman', 7000.00, 0, '2025-12-29 12:57:49'),
(34, 'Frisian Flag Panas', 'minuman', 4000.00, 0, '2025-12-29 12:57:49'),
(35, 'Frisian Flag Dingin', 'minuman', 6000.00, 0, '2025-12-29 12:57:49'),
(36, 'Susu Jahe', 'minuman', 7000.00, 0, '2025-12-29 12:57:49'),
(37, 'Jahe Murni', 'minuman', 5000.00, 0, '2025-12-29 12:57:49');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `tipe` enum('income','expense') NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `jumlah` decimal(15,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `tanggal`, `tipe`, `deskripsi`, `jumlah`, `created_at`, `updated_at`) VALUES
(1, '2025-12-28', 'income', 'Tes dari browser', 15000.00, '2025-12-28 08:47:59', '2025-12-28 08:47:59'),
(4, '2025-12-29', 'expense', 'Beli ayam (1 kg)', 38000.00, '2025-12-29 00:26:34', '2025-12-29 00:26:34'),
(5, '2025-12-29', 'income', 'Es Teh Manis (1), Jeruk Peras (1), Teh Manis Hangat (1), Nasi Kucing (1), Bakso (1), Telur Puyuh (1)', 22000.00, '2025-12-29 00:36:09', '2025-12-29 00:36:09'),
(6, '2025-12-29', 'expense', 'Beli minyak (1 pcs)', 22000.00, '2025-12-29 02:13:03', '2025-12-29 02:13:03'),
(7, '2025-12-29', 'income', 'Nasi Kucing (1), Gorengan (1)', 4000.00, '2025-12-29 02:44:46', '2025-12-29 02:44:46'),
(8, '2025-12-29', 'expense', 'Beli ayam (2 kg)', 76000.00, '2025-12-29 02:46:10', '2025-12-29 02:46:10'),
(9, '2025-12-29', 'income', 'Nasi Kucing (1), Ati/Ampela (2), Gorengan (1)', 8000.00, '2025-12-29 08:53:21', '2025-12-29 08:53:21'),
(10, '2025-12-29', 'income', 'Ati/Ampela (2)', 4000.00, '2025-12-29 08:57:02', '2025-12-29 08:57:02'),
(11, '2025-12-29', 'income', 'Nasi Kucing (1), Dumpling (1)', 10000.00, '2025-12-29 09:58:39', '2025-12-29 09:58:39'),
(12, '2025-12-30', 'income', 'Nasi Kucing (1), Dumpling (1), Gorengan (1)', 11000.00, '2025-12-29 22:57:44', '2025-12-29 22:57:44'),
(13, '2025-12-30', 'income', 'Nasi Kucing (1), Gorengan (1), Dumpling (1)', 11000.00, '2025-12-29 22:58:11', '2025-12-29 22:58:11'),
(14, '2025-12-30', 'expense', 'Beli ayam (3 kg)', 114000.00, '2025-12-30 00:25:35', '2025-12-30 00:25:35'),
(15, '2025-12-30', 'income', 'Nasi Kucing (1), Dumpling (1), Gorengan (1)', 11000.00, '2025-12-30 00:26:54', '2025-12-30 00:26:54'),
(16, '2025-12-30', 'income', 'dana umkm', 500000.00, '2025-12-30 00:57:33', '2025-12-30 00:57:33'),
(17, '2025-12-30', 'expense', 'Beli beras (5 kg)', 60000.00, '2025-12-30 01:10:07', '2025-12-30 01:10:07'),
(18, '2026-01-05', 'income', 'Nasi Kucing (1), Usus (1), Gorengan (1)', 6000.00, '2026-01-04 23:17:58', '2026-01-04 23:17:58'),
(19, '2026-01-05', 'income', 'Teh Tawar (1), Nasi Kucing (1), Kulit (1), Usus (1)', 9000.00, '2026-01-04 23:19:21', '2026-01-04 23:19:21'),
(20, '2026-01-05', 'expense', 'Beli ayam (5 kg)', 175000.00, '2026-01-04 23:20:29', '2026-01-04 23:20:29'),
(21, '2026-01-05', 'expense', 'Beli beras (5 kg)', 60000.00, '2026-01-04 23:20:44', '2026-01-04 23:20:44');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `api_token` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `api_token`) VALUES
(1, 'admin', 'admin', 'null', NULL, '$2y$12$fIuMFKox7Nxlt6baOlaBgeOCNXeK5cpKlxUndfZbraoH0crqBnnMC', NULL, NULL, '2026-01-06 01:35:24', 'TebYIQrZPLQ7ZN4jPCjCZEw89ZPjWsbBJDKoLlYq');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `idx_tanggal` (`tanggal`),
  ADD KEY `idx_tipe` (`tipe`),
  ADD KEY `idx_tanggal_tipe` (`tanggal`,`tipe`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

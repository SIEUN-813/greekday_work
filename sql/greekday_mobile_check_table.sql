--
-- 테이블 구조 `greekday_mobile_check_table`
--

CREATE TABLE `greekday_mobile_check_table` (
  `userName` varchar(50) NOT NULL,
  `userPhone` varchar(16) NOT NULL,
  `userBirth` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`userName`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
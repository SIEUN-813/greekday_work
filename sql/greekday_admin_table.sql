--
-- 테이블 구조 `greekday_admin_table`
--

CREATE TABLE `greekday_admin_table` (
  `userName` varchar(50) NOT NULL,
  `userId` varchar(16) NOT NULL,
  `userPw` varchar(16) NOT NULL,
  `userPhone` varchar(16) NOT NULL,
  `userMobile` varchar(16) NOT NULL,
  `userEmail` varchar(250) NOT NULL,
  `userBirth` varchar(10) DEFAULT NULL,
  `userGender` varchar(4) DEFAULT NULL,
  `userAddress` varchar(250) DEFAULT NULL,
  `userSignDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
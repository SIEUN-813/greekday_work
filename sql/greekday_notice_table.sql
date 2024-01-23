--
-- 테이블 구조 `greekday_notice_table`
--

CREATE TABLE `greekday_notice_table` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `wSubject` varchar(250) NOT NULL,
  `wContent` text NOT NULL,
  `wId` varchar(16) DEFAULT NULL,
  `wHit` int DEFAULT NULL,
  `wDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),  
  FOREIGN KEY(wId) REFERENCES  greekday_admin_table(userId)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- 테이블 구조 `greekday_faq_table`
--

CREATE TABLE `greekday_faq_table` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `wType` varchar(16) DEFAULT NULL,
  `wSubject` varchar(250) NOT NULL,
  `wContent` text NOT NULL,
  `wId` varchar(16) DEFAULT NULL,
  `wDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),  
  FOREIGN KEY(wId) REFERENCES  greekday_admin_table(userId)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
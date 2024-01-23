<?
    include_once('./greekday_header.php');

    $SQL = "CREATE TABLE greekday_delivery_table (
        `userDeliveryName`  VARCHAR(50)                             NOT NULL, 
        `userName`          VARCHAR(50)                             NOT NULL, 
        `userId`            VARCHAR(16)                             NOT NULL,
        `userPhone`         VARCHAR(16)                             NULL,
        `userMobile`        VARCHAR(16)                             NOT NULL,
        `userAddress`       VARCHAR(16)                             NOT NULL,
        FOREIGN KEY(userId) REFERENCES greekday_member_table(userId)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

    $result = mysqli_query($conn ,$SQL);
    if($result==false){
        echo "배송지 테이블 생성 실패";
    }
    else{
        echo "배송지 테이블 생성 성공";
    }
?>
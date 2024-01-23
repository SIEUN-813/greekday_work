<?
    include_once('./greekday_header.php');

    $SQL = "CREATE TABLE greekday_member_table (
        userName          VARCHAR(50)                             NOT NULL, 
        userId            VARCHAR(16)                             NOT NULL,
        userPw            VARCHAR(16)                             NOT NULL,
        userPhone         VARCHAR(16)                             NOT NULL,
        userMobile        VARCHAR(16)                             NOT NULL,
        userEmail         VARCHAR(250)                            NOT NULL,
        userBirth         VARCHAR(10)                                 NULL,
        userGender        VARCHAR(4)                                  NULL,
        userServiceAgree  VARCHAR(1000)                           NOT NULL,
        userAddress       VARCHAR(250)                                NULL,
        userSignDate      timestamp DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(userId)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4";

    $result = mysqli_query($conn ,$SQL);
    if($result==false){
        echo "테이블 생성 실패";
    }
    else{
        echo "테이블 생성 성공";
    }
?>
<?
    include_once('./greekday_header.php');

    $SQL = "CREATE TABLE greekday_mobile_check_table (
        userName          VARCHAR(50)                             NOT NULL, 
        userPhone         VARCHAR(16)                             NOT NULL,
        userBirth         VARCHAR(10)                                 NULL,
        PRIMARY KEY(userName)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4";

    $result = mysqli_query($conn ,$SQL);
    if($result==false){
        echo "테이블 생성 실패";
    }
    else{
        echo "테이블 생성 성공";
    }
?>
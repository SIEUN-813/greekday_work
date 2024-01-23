<?
    include_once('./greekday_header.php');

    $SQL = "CREATE TABLE greekday_faq_table (
        idx            INT                 NOT NULL AUTO_INCREMENT,
        wType          VARCHAR(16)         NULL,
        wSubject       VARCHAR(250)        NOT NULL, 
        wContent       TEXT                NOT NULL,
        wId            VARCHAR(16)         NULL, 
        wDate          timestamp DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(idx)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4";

    $result = mysqli_query($conn ,$SQL);
    if($result==false){
        echo "자주묻는질문 테이블 생성 실패";
    }
    else{
        echo "자주묻는질문 테이블 생성 성공";
    }
?>
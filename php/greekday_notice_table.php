<?
    include_once('./greekday_header.php');

    $SQL = "CREATE TABLE greekday_notice_table (
        idx            INT                 NOT NULL AUTO_INCREMENT,
        wSubject       VARCHAR(250)        NOT NULL, 
        wContent       TEXT                NOT NULL,
        wId            VARCHAR(16)         NULL, 
        wHit           INT                 NULL,
        wDate          timestamp DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(idx)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4";

    $result = mysqli_query($conn ,$SQL);
    if($result==false){
        echo "공지사항 테이블 생성 실패";
    }
    else{
        echo "공지사항 테이블 생성 성공";
    }
?>
<?
    include_once('./greekday_header.php');

    $idx = $_POST['idx'];

    $SQL = "DELETE FROM greekday_notice_table 
            WHERE idx='$idx'";
    $result = mysqli_query($conn, $SQL);

    if($result == true){
        echo 1;
    }
    else{
        echo 0;
    }
?>
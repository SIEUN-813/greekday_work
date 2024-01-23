<?
    include_once('./greekday_header.php');

    $userId = $_POST['userId'];
    $주소 = $_POST['userAddress'];
    
    $SQL = "DELETE FROM greekday_member_table
            WHERE userId='$userId' AND 주소='$주소'";
    $result = mysqli_query($conn, $SQL);

    if($result == true){
        echo 1;
    }
    else{
        echo 0;
    }
?>
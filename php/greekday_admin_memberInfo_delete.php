<?
    include_once('./greekday_header.php');

    $userId = $_POST['userId'];
    
    $sql = "DELETE FROM greekday_member_table          
            WHERE   userId='$userId'";
    $result = mysqli_query($conn, $sql);
    
    if($result==true){
        echo 1;
    }
    else{
        echo 0;
    }

?>
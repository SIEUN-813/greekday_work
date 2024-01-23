<?
    include_once('./greekday_header.php');

    $userId = $_POST['userId'];

    $SQL = "SELECT * FROM greekday_admin_table WHERE userId='$userId'";
    $res = mysqli_query($conn, $SQL);

    if(mysqli_num_rows($res) > 0){
        echo 1;
    }
    else{
        echo 0;
    }
?>
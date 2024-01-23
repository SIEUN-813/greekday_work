<?
    include_once('./greekday_header.php');

    $userName = $_POST['userName'];
    $userId = $_POST['userId'];
    $userEmail = $_POST['userEmail'];

    $SQL = "SELECT * FROM greekday_member_table WHERE userName='$userName' AND userId='$userId' AND userEmail='$userEmail'";
    $res = mysqli_query($conn, $SQL);

    if(mysqli_num_rows($res) > 0){
        echo 1;
    }
    else{
        echo 0;
    }
?>
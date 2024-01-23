<?
    include_once('./greekday_header.php');

    $userId = $_POST['userId'];
    $userPw = $_POST['userPw'];

    $SQL = "UPDATE greekday_admin_table SET userPw='$userPw' WHERE userId='$userId'";
    $res = mysqli_query($conn, $SQL);

    if($res==true){
        echo 1;
    }
    else{
        echo 0;
    }
?>
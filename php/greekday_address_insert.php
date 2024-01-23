<?
    include_once('./greekday_header.php');

    $userName = $_POST['userName'];
    $userAddress = $_POST['userAddress'];

    $SQL = "UPDATE greekday_member_table SET userAddress='$userAddress' WHERE userName='$userName'";
    $res = mysqli_query($conn, $SQL);

    if($res==true){
        echo 1;
    }
    else{
        echo 0;
    }
?>
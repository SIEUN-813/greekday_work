<?
    include_once('./greekday_header.php');

    $userName = $_POST['userName'];
    $userEmail = $_POST['userEmail'];

    $SQL = "SELECT userId, userSignDate, userMobile FROM greekday_admin_table WHERE userName='$userName' AND userEmail='$userEmail'";
    $res = mysqli_query($conn, $SQL);

    if(mysqli_num_rows($res) > 0){
        $record = mysqli_fetch_array($res);
        echo '{ "아이디": "'.$record['userId'].'", "휴대폰번호": "'.$record['userMobile'].'", "가입일": "'.$record['userSignDate'].'"}';
    }
    else{
        echo 0;
    }
?>
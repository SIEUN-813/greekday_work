<?
    include_once('./greekday_header.php');

    $userId = $_POST['userId'];
    $userPw = $_POST['userPw'];
    $userEmail = $_POST['userEmail'];
    $userMobile = $_POST['userMobile'];
    $userBirth = $_POST['userBirth'];

    $SQL = "UPDATE greekday_member_table SET userPw='$userPw', userEmail='$userEmail', userMobile='$userMobile', userBirth='$userBirth' WHERE userId='$userId'";
    $res = mysqli_query($conn, $SQL);
    
    $sqlSelect = "SELECT * FROM greekday_member_table
                  WHERE userId='$userId'";
    $res = mysqli_query($conn, $sqlSelect);

    if($res==true){
        $record = mysqli_fetch_array($res);
        echo 1;
    }
    else{
        echo 0;
    }
?>
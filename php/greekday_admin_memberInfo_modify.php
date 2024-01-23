<?
    include_once('./greekday_header.php');

    $userId=$_POST['userId'];
    $userHp=$_POST['userHp'];
    $userPw=$_POST['userPw'];
    $userName=$_POST['userName'];
    $userEmail=$_POST['userEmail'];
    $userAddress=$_POST['userAddress'];
    $userBirth=$_POST['userBirth'];

    $sql = "UPDATE greekday_member_table 
            SET userPw='$userPw', userEmail='$userEmail', userAddress='$userAddress',userName='$userName',userBirth='$userBirth'
            WHERE userId='$userId'";
    $res = mysqli_query($conn, $sql);
    
    if( $res ==true){
        echo 1;
    }
    else {
        echo 0;
    }
?>

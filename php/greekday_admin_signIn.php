<?
    include_once('./greekday_header.php');

    $userId = $_POST['userId'];
    $userPw = $_POST['userPw'];

    $SQL = "SELECT userId, userName, userPhone, userMobile, userEmail, userGender, userBirth FROM greekday_admin_table WHERE userId='$userId' AND userPw='$userPw'";
    $res = mysqli_query($conn, $SQL);

    if(mysqli_num_rows($res) > 0){
        $record = mysqli_fetch_array($res);
        echo '{ "아이디": "'.$record['userId'].'", "이름": "'.$record['userName'].'", "일반전화": "'.$record['userPhone'].'", "휴대폰번호": "'.$record['userMobile'].'", "이메일": "'.$record['userEmail'].'" , "성별": "'.$record['userGender'].'", "생년월일": "'.$record['userBirth'].'"}';
    }
    else{
        echo 0;
    }
?>
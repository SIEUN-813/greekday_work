<?  
    include_once('./greekday_header.php');
    
    $userName = $_POST['userName'];
    $userId = $_POST['userId'];
    $userPw = $_POST['userPw'];
    $userEmail = $_POST['userEmail'];
    $userPhone = $_POST['userPhone'];
    $userMobile = $_POST['userMobile'];
    $userGender = $_POST['userGender'];
    $userBirth = $_POST['userBirth'];
    $userServiceAgree = $_POST['userServiceAgree'];

    $SQL = "INSERT INTO greekday_member_table (userName, userId, userPw, userEmail, userPhone, userMobile, userGender, userBirth, userServiceAgree) 
    VALUES ('$userName', '$userId', '$userPw', '$userEmail', '$userPhone', '$userMobile', '$userGender', '$userBirth', '$userServiceAgree')";

    $result = mysqli_query($conn, $SQL);

    // 회원가입 성공하면 1 실패하면 0
    if($result===true){        
        echo 1;
    }
    else{
        echo 0;
    }
?>
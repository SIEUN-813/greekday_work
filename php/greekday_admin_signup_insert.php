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

    $SQL = "INSERT INTO greekday_admin_table (userName, userId, userPw, userEmail, userPhone, userMobile, userGender, userBirth) 
    VALUES ('$userName', '$userId', '$userPw', '$userEmail', '$userPhone', '$userMobile', '$userGender', '$userBirth')";

    $result = mysqli_query($conn, $SQL);

    if($result===true){        
        echo 1;
    }
    else{
        echo 0;
    }
?>
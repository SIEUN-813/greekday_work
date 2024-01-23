<?
    include_once('./greekday_header.php');
    
    $userName = $_POST['userName'];
    $userPhone = $_POST['userPhone'];
    $userBirth = $_POST['userBirth'];
    
    $SQL = "INSERT INTO greekday_mobile_check_table (userName, userPhone, userBirth) 
    VALUES ('$userName', '$userPhone', '$userBirth')";

    $result = mysqli_query($conn, $SQL);

    if($result===true){    
        echo 1;
    }
    else{
        echo 0;
    }
?>
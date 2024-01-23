<?
    include_once('./greekday_header.php');
    
    $userDeliveryName = $_POST['userDeliveryName'];
    $userName = $_POST['userName'];
    $userId = $_POST['userId'];
    $userPhone = $_POST['userPhone'];
    $userMobile = $_POST['userMobile'];
    $userAddress = $_POST['userAddress'];

    $SQL = "INSERT INTO greekday_delivery_table (userDeliveryName, userName, userId, userPhone, userMobile, userAddress) 
            VALUES ('$userDeliveryName', '$userName', '$userId', '$userPhone', '$userMobile', '$userAddress')";
    $result = mysqli_query($conn, $SQL);

    if($result===true){
        echo 1;
    }
    else{
        echo 0;
    }
?>
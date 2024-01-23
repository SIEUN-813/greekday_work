<?
    include_once('./greekday_header.php');

    $userPhone = $_POST['userPhone'];

    $SQL = "SELECT * FROM greekday_mobile_check_table WHERE userPhone='$userPhone'";
    $res = mysqli_query($conn, $SQL);

    if(mysqli_num_rows($res) > 0){
        echo 1;
    }
    else{
        echo 0;
    }
?>
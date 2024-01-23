<?
    include_once('./greekday_header.php');

    $userEmail = $_POST['userEmail'];

    $SQL = "SELECT * FROM greekday_admin_table WHERE userEmail='$userEmail'";
    $res = mysqli_query($conn, $SQL);

    if(mysqli_num_rows($res) > 0){
        echo 1;
    }
    else{
        echo 0;
    }
?>
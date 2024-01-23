<?
    include_once('./greekday_header.php');

    $userId = $_POST['userId'];

    $SQL = "SELECT * FROM greekday_delivery_table 
            WHERE userId = '$userId'";
    $result = mysqli_query($conn, $SQL);
    
    if(mysqli_num_rows($result) > 0){
        $arr = array();
        while($item = mysqli_fetch_array($result)){
            array_push($arr, array(
                'userName' => $item['userName'],
                'userMobile' => $item['userMobile'],
                'userAddress' => $item['userAddress']
            ));
        };
    }
    $json_data = json_encode($arr, JSON_UNESCAPED_UNICODE);
    echo $json_data;
?>
<?
    include_once('./greekday_header.php');

    $wId = $_POST['wId'];

    $wSubject = str_replace("'", "&apos;", $_POST['wSubject']);
    $wContent = str_replace("'", "&apos;", $_POST['wContent']);

    $wSubject = str_replace("\"", "&quot;", $wSubject);
    $wContent = str_replace("\"", "&quot;", $wContent);

    $wSubject = str_replace("<", "&lt;", $wSubject);
    $wContent = str_replace("<", "&lt;", $wContent);

    $wSubject = str_replace(">", "&gt;", $wSubject);
    $wContent = str_replace(">", "&gt;", $wContent);

    $wSubject = nl2br($wSubject);
    $wContent = nl2br($wContent);

    $SQL = "INSERT INTO greekday_notice_table (wId, wSubject, wContent) 
            VALUES ('$wId', '$wSubject', '$wContent')";
    $result = mysqli_query($conn, $SQL);

    if($result == true){
        echo 1;
    }
    else{
        echo 0;
    }
?>
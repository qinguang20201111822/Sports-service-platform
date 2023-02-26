<?php
include_once 'inc/config.inc.php';
include_once 'inc/mysql.inc.php';
include_once 'inc/tool.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "datas" => "");

$datas=array();
$query = "select * from hot_news order by news_id desc";
$result = execute($link, $query);
while(($data=mysqli_fetch_assoc($result))!=null){
    $datas[]=$data;
}
$responseData['datas']=$datas;
echo json_encode($responseData);

// close($link);
?>


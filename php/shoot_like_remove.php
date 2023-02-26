<?php
include_once 'inc/config.inc.php';
include_once 'inc/mysql.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "message"=>"");

$datas = array();
$query="delete from jijin_photos_like where user_id={$_GET['user_id']} and module_id={$_GET['module_id']}";
execute($link,$query);
if(mysqli_affected_rows($link)!=1){
    $responseData['code']=1;
	$responseData['message']="取消点赞失败，请重试";
    exit();
}
	$responseData['message']="取消点赞成功";
    echo json_encode($responseData);

close($link);

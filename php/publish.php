<?php
include_once 'inc/config.inc.php';
include_once 'inc/tool.inc.php';
include_once 'inc/mysql.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "message" => "");

//验证输入是否正确
include_once 'inc/check_publish.inc.php';


$query="insert into yueqiu(user_id,module_id,place,aim_time,publish_time,content) 
values({$_POST['user_id']},{$_POST['module_id']},'{$_POST['place']}','{$_POST['aim_time']}',now(),'{$_POST['content']}')";
execute($link,$query);
if(mysqli_affected_rows($link)==1){
	$responseData['message']="发布约球成功！";
}else{
	$responseData['code']=1;
	$responseData['message']="发布约球失败，请重试";
}

echo json_encode($responseData);


// close($link);
?>
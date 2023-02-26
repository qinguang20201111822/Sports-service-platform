<?php
include_once 'inc/config.inc.php';
include_once 'inc/mysql.inc.php';
include_once 'inc/tool.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "message" => "","username"=>"","user_head"=>"","user_id"=>"");

include_once 'inc/check_login.inc.php';
$query="select * from sspu_member where name='{$_POST['name']}' and pw=md5({$_POST['pw']})";
$result=execute($link,$query);
//为了获取到用户的头像存储相对位置
$data=mysqli_fetch_assoc($result);

if(mysqli_num_rows($result)==1){
    $responseData['message'] = "登陆成功";
	$responseData['username'] = "{$_POST['name']}";
	$responseData['user_head']=$data['photo'];
	$responseData['user_id']=$data['id'];
	echo json_encode($responseData);
}
else{
	$responseData['code'] = 8;
	$responseData['message'] = "登陆失败，请重试";
	echo json_encode($responseData);
}
// close($link);
?>

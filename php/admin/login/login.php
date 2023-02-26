<?php
include_once '../../inc/config.inc.php';
include_once '../../inc/mysql.inc.php';
include_once '../../inc/tool.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "message" => "", "user_id" => "","user_name" => "");

include_once 'login_check.php';
$query = "select * from admin_member where (name='{$_POST['name']}' or phone='{$_POST['name']}') and pw='{$_POST['pw']}'";
$result = execute($link, $query);

if (mysqli_num_rows($result) == 1) {
	$responseData['message'] = "登陆成功";
	$responseData['username'] = $data['name'];

	//为了获取到用户的id和name
	$data = mysqli_fetch_assoc($result);
	$responseData['user_id'] = $data['id'];
	$responseData['user_name'] = $data['name'];
	echo json_encode($responseData);
} else {
	$responseData['code'] = 8;
	$responseData['message'] = "登陆失败，请重试";
	echo json_encode($responseData);
}
close($link);

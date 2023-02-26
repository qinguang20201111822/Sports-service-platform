<?php
include_once 'inc/config.inc.php';
include_once 'inc/mysql.inc.php';
include_once 'inc/tool.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "message" => "");


include_once 'inc/check_register.inc.php';

$query = "insert into sspu_member(name,pw,register_time,phone) values('{$_POST['name']}',md5({$_POST['password']}),now(),{$_POST['phone']})";
execute($link, $query);
if (mysqli_affected_rows($link) == 1) {
	$responseData['message'] = "注册成功";
	echo json_encode($responseData);
} else {
	$responseData['code'] = 8;
	$responseData['message'] = "注册失败，请重试";
	echo json_encode($responseData);
}
// close($link);
?>

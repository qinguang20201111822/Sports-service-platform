<?php
include_once '../../inc/config.inc.php';
include_once '../../inc/mysql.inc.php';
include_once '../../inc/tool.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "message" => "","adminer_id" => "","register_time"=>'');


include_once 'adminer_add_check.php';

$query = "insert into admin_member(name,pw,register_time,phone) values('{$_POST['name']}',md5('{$_POST['pw']}'),now(),{$_POST['phone']})";
execute($link, $query);
if (mysqli_affected_rows($link) == 1) {
	$responseData['message'] = "添加成功";
	// 如果添加成功，就获取该成员的id
	$query="select id from admin_member where name='{$_POST['name']}'";
	$result=execute($link,$query);
	$data=mysqli_fetch_assoc($result);
	$responseData['adminer_id']=$data['id'];
	//返回注册时间
	$responseData['register_time']=date('Y-m-d h:i:s', time());
	echo json_encode($responseData);
} else {
	$responseData['code'] = 8;
	$responseData['message'] = "添加失败，请重试";
	echo json_encode($responseData);
}
close($link);
?>

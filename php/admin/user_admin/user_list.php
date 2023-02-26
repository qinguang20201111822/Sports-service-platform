<?php
include_once '../../inc/config.inc.php';
include_once '../../inc/mysql.inc.php';
include_once '../../inc/tool.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "message" => "", "datas" => "");

$datas = array();

$query = "select id,name,phone,register_time from sspu_member order by id asc";
$result = execute($link, $query);

if (mysqli_num_rows($result) == 0) {
	$responseData['code'] = 1;
	$responseData['message'] = "获取失败，请刷新重试";
	echo json_encode($responseData);
	exit();
}

while (($data = mysqli_fetch_assoc($result)) != null) {
	//记录数据
	$datas[] = $data;
}
$responseData['datas']=$datas;
echo json_encode($responseData);
close($link);

?>

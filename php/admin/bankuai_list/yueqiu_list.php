<?php
include_once '../../inc/config.inc.php';
include_once '../../inc/mysql.inc.php';
include_once '../../inc/tool.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "message" => "", "datas" => "");

$datas = array();
$datas_reply = array();

$query = "select yq.yueqiu_id,yq.user_id,yq.place,yq.aim_time,yq.publish_time,yq.joined_num,qm.module_name 
from yueqiu yq,qg_son_module qm where yq.module_id=qm.id order by yq.publish_time desc";
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
$responseData['datas'] = $datas;
echo json_encode($responseData);
close($link);

<?php
include_once '../../inc/config.inc.php';
include_once '../../inc/mysql.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "message" => "");

$query = "delete jp,qm from jijin_photos jp,qg_son_module qm where jp.module_id={$_GET['jijin_id']} and qm.id={$_GET['jijin_id']}";
execute($link, $query);

if (mysqli_affected_rows($link) == 0) {
	$responseData['code'] = 1;
	$responseData['message'] = "删除失败，请重试";
	echo json_encode($responseData);
	exit();
}

$responseData['message'] = "删除成功";
echo json_encode($responseData);
close($link);

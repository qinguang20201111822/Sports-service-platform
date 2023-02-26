<?php
include_once '../../inc/config.inc.php';
include_once '../../inc/mysql.inc.php';
include_once '../../inc/tool.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "message" => "", "datas" => "", "datas_photos" => "");

$datas = array();
$datas_photos = array();

$query = "select publish_time,module_name,id from qg_son_module where father_module_id=42 order by publish_time desc";
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
	//获取集锦的数据
	$query = "select photo from jijin_photos where module_id={$data['id']}";
	$result1 = execute($link, $query);
	$photos=array();
	while (($photo = mysqli_fetch_assoc($result1)) != null) {
		$photos[]=$photo;
	}
	$datas_photos[$data['id']]=$photos;
}
$responseData['datas'] = $datas;
$responseData['datas_photos'] = $datas_photos;
echo json_encode($responseData);
close($link);

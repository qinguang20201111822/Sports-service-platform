<?php
include_once '../../inc/config.inc.php';
include_once '../../inc/mysql.inc.php';
include_once '../../inc/tool.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "message" => "", "datas" => "","datas_reply" => "");

$datas = array();
$datas_reply = array();

$query = "select news_id,title,publish_time from hot_news order by publish_time desc";
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
	//统计相应新闻下的评论数
	$query = "select count(*) from news_reply where news_id={$data['news_id']}";
	$count_reply = num($link, $query);
	//根据新闻的id把数据放到以id为下标的数组里
	$datas_reply[$data['news_id']]=$count_reply;
}
$responseData['datas_reply'] = $datas_reply;
$responseData['datas'] = $datas;
echo json_encode($responseData);
close($link);

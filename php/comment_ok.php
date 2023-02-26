<?php
include_once 'inc/config.inc.php';
include_once 'inc/mysql.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "message" => "");
// var_dump($_GET['content']);
if (mb_strlen($_GET['content'],"UTF8") > 50) {
	$responseData['code'] = 1;
	$responseData['message'] = "评论字数要在50字以内哦";
	
	echo json_encode($responseData);
	exit();
}
if (mb_strlen($_GET['content'],"UTF8") ==0) {
	$responseData['code'] = 2;
	$responseData['message'] = "请输入您想说的";
	echo json_encode($responseData);
	exit();
}
$query = "insert into news_reply(content,user_id,news_id,reply_time) values('{$_GET['content']}',{$_GET['user_id']},{$_GET['news_id']},now())";
execute($link, $query);
if (mysqli_affected_rows($link) == 1) {
	$responseData['message'] = "评论成功";
} else {
	$responseData['code'] = 1;
	$responseData['message'] = "评论失败，请重试";
}
echo json_encode($responseData);
close($link);

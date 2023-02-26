<?php
include_once 'inc/config.inc.php';
include_once 'inc/mysql.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "message" => "", "news_title" => "");

$datas_reply = array();
$data_like = array();
//获取新闻信息
$query = "select title from hot_news where news_id={$_GET['news_id']}";
$result = execute($link, $query);
if (mysqli_num_rows($result) == 0) {
    $responseData['code'] = 1;
    $responseData['message'] = "参数不合法";
    echo json_encode($responseData);
    exit();
}
$data = mysqli_fetch_assoc($result);
$responseData['news_title'] = $data['title'];
echo json_encode($responseData);
?>
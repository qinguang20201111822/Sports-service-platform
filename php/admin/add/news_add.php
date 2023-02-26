<?php
include_once '../../inc/config.inc.php';
include_once '../../inc/mysql.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "message" => "");
//判断标题是否为空
if($_GET['title']==null){
    $responseData['code'] = 1;
    $responseData['message'] = "标题不得为空";
    echo json_encode($responseData);
    exit;
}

//判断内容是否为空
if($_GET['content']==null){
    $responseData['code'] = 2;
    $responseData['message'] = "内容不得为空";
    echo json_encode($responseData);
    exit;
}

//判断标题长度是否大于66
if (mb_strlen($_GET['title'], "utf-8") > 66) {
    $responseData['code'] = 3;
    $responseData['message'] = "用户名长度不得超过66！";
    echo json_encode($responseData);
    exit;
}
$query = "insert into hot_news(title,content,publish_time) values('{$_GET['title']}','{$_GET['content']}',now())";
execute($link, $query);
if (mysqli_affected_rows($link) != 1) {
    $responseData['code'] = 4;
    $responseData['message'] = "发布失败，请重试";
    exit();
}
$responseData['message'] = "发布成功";
echo json_encode($responseData);

close($link);

<?php
include_once 'inc/config.inc.php';
include_once 'inc/mysql.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "message" => "");

//向回复表中更新点赞数
$query = "update news_reply set like_count={$_GET['like_count']} where reply_id={$_GET['reply_id']}";
execute($link, $query);
if (mysqli_affected_rows($link) != 1) {
    $responseData['code'] = 1;
    $responseData['message'] = "点赞失败，请重试";
    echo json_encode($responseData);
    exit;
}

// 向点赞表中添加点赞记录，防止重复点赞
$query="insert news_like(reply_id,user_id) values({$_GET['reply_id']},{$_GET['user_id']})";
execute($link, $query);
if (mysqli_affected_rows($link) != 1) {
    $responseData['code'] = 1;
    $responseData['message'] = "点赞失败，请重试";
    echo json_encode($responseData);
    exit;
}
echo json_encode($responseData);
// close($link);
?>
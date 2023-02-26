<?php
include_once 'inc/config.inc.php';
include_once 'inc/mysql.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "message" => "", "data_news" => "", "data_reply" => "", "num_reply" => "","data_like" => "");

$datas_reply = array();
$data_like = array();


//获取新闻信息
$query = "select * from hot_news where news_id={$_GET['news_id']}";
$result = execute($link, $query);
if (mysqli_num_rows($result) == 0) {
    $responseData['code'] = 1;
    $responseData['message'] = "参数不合法";
    echo json_encode($responseData);
    exit();
}
$data = mysqli_fetch_assoc($result);
$responseData['data_news'] = $data;


//获取评论总条数
$query = "select count(*) from news_reply where news_id={$_GET['news_id']}";
$result = execute($link, $query);
$num_reply += num($link, $query);
$responseData['num_reply'] = $num_reply;


//获取评论数据
$query = "select nr.reply_id,nr.content,nr.reply_time,nr.like_count,sm.name,sm.photo from news_reply nr,sspu_member sm 
where nr.news_id={$_GET['news_id']} and nr.user_id=sm.id";
$result = execute($link, $query);
while (($data = mysqli_fetch_assoc($result)) != null) {
    //记录父板块的数据
    $datas_reply[] = $data;

}

// 获取回复点赞信息
$query = "select * from news_like";
$result = execute($link, $query);
while (($like = mysqli_fetch_assoc($result)) != null) {
    //记录点赞信息的数据
    $data_like[] = $like;
}
$responseData['data_reply'] = $datas_reply;
$responseData['data_like'] = $data_like;


echo json_encode($responseData);
// close($link);

?>
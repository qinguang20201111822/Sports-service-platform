<?php

//escape方法进行转义
$_POST=escape($link,$_POST);

if (empty($_POST['user_id'])) {
    $responseData['code'] = 2;
    $responseData['message'] = "参数错误";
    echo json_encode($responseData);
    exit;
}
if (empty($_POST['place'])) {
    $responseData['code'] = 3;
    $responseData['message'] = "请输入地点";
    echo json_encode($responseData);
    exit;
}
if (empty($_POST['aim_time'])) {
    $responseData['code'] = 5;
    $responseData['message'] = "请输入具体时间";
    echo json_encode($responseData);
    exit;
}
if (empty($_POST['content'])) {
    $responseData['code'] = 4;
    $responseData['message'] = "请输入具体描述";
    echo json_encode($responseData);
    exit;
}


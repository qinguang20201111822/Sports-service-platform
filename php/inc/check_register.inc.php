<?php

//escape方法进行转义
$_POST = escape($link, $_POST);
//判断用户名是否已经存在
$query = "select * from sspu_member where name='{$_POST['name']}'";
$result = execute($link, $query);
if (mysqli_num_rows($result)) {
    $responseData['code'] = 1;
    $responseData['message'] = "用户名已存在";
    echo json_encode($responseData);
    exit;
}

if (mb_strlen($_POST['name']) > 32) {
    $responseData['code'] = 2;
    $responseData['message'] = "用户名不能超过32位！";
    echo json_encode($responseData);
    exit;
}
//判断名字和密码是否为空
if (empty($_POST['name'])) {
    $responseData['code'] = 3;
    $responseData['message'] = "用户名不得为空！";
    echo json_encode($responseData);
    exit;
}
if (empty($_POST['phone'])) {
    $responseData['code'] = 4;
    $responseData['message'] = "手机号不得为空！";
    echo json_encode($responseData);
    exit;
}
if (strlen($_POST['phone'])!=11) {
    $responseData['code'] = 5;
    $responseData['message'] = "手机号长度有误！";
    echo json_encode($responseData);
    exit;
}
//手机号的正则表达式
$str = $_POST['phone'];
$isMatched = preg_match('/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/', $str, $matches);

if($isMatched!=1){
    $responseData['code'] = 6;
    $responseData['message'] = "手机号输入有误！";
    echo json_encode($responseData);
    exit;
}
if (empty($_POST['password'])) {
    $responseData['code'] = 7;
    $responseData['message'] = "密码不得为空！";
    echo json_encode($responseData);
    exit;
}

//判断密码长度是否大于6小于32
if (mb_strlen($_POST['password']) > 32 || (mb_strlen($_POST['password']) < 6)) {
    $responseData['code'] = 8;
    $responseData['message'] = "密码长度不符合要求！";
    echo json_encode($responseData);
    exit;
}
//判断两次输入的密码是否相同
if ($_POST['password'] != $_POST['confirm_pw']) {
    $responseData['code'] = 9;
    $responseData['message'] = "两次密码不相同";
    echo json_encode($responseData);
    exit;
}
// //匹配验证码。通过都该为小写，使用户输入时不用区分大小写
// if(strtolower($_POST['vcode'])!=strtolower($_SESSION['vcode'])){
//     $responseData['code']=7;
//     $responseData['message']="验证码错误";
//     echo json_encode($responseData);
//     exit;
// }

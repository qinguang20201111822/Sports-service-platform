<?php

//escape方法进行转义
$_POST = escape($link, $_POST);

//判断输入的手机号格式是否正确
if (strlen($_POST['phone'])!=11) {
    $responseData['code'] = 1;
    $responseData['message'] = "手机号长度有误！";
    echo json_encode($responseData);
    exit;
}
//手机号的正则表达式
$str = $_POST['phone'];
$isMatched = preg_match('/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/', $str, $matches);

if($isMatched!=1){
    $responseData['code'] = 2;
    $responseData['message'] = "手机号格式有误！";
    echo json_encode($responseData);
    exit;
}
if($_POST['phone']==$_POST['old_phone']){
    $responseData['code'] = 3;
    $responseData['message'] = "请输入新的手机号";
    echo json_encode($responseData);
    exit;
}
// //匹配验证码。通过都该为小写，使用户输入时不用区分大小写
// if(strtolower($_POST['vcode'])!=strtolower($_SESSION['vcode'])){
//     $responseData['code']=4;
//     $responseData['message']="验证码错误";
//     echo json_encode($responseData);
//     exit;
// }





?>

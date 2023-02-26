<?php

//escape方法进行转义
$_POST = escape($link, $_POST);
//判断输入的密码是否为空
if (empty($_POST['pw'])) {
    $responseData['code'] = 1;
    $responseData['message'] = "请输入原密码";
    echo json_encode($responseData);
    exit;
}
//判断输入的原密码是否正确
$query = "select * from sspu_member where pw=md5({$_POST['pw']}) and id={$_POST['user_id']}";
$result = execute($link, $query);
if (mysqli_num_rows($result)==0) {
    $responseData['code'] = 2;
    $responseData['message'] = "原密码有误";
    echo json_encode($responseData);
    exit;
}

//判断输入的密码是否为空
if (empty($_POST['password'])) {
    $responseData['code'] = 3;
    $responseData['message'] = "请输入新密码";
    echo json_encode($responseData);
    exit;
}
if (empty($_POST['confirm_pw'])) {
    $responseData['code'] = 4;
    $responseData['message'] = "请输入确认密码";
    echo json_encode($responseData);
    exit;
}

//判断密码长度是否大于6小于32
if (mb_strlen($_POST['password']) > 32 || (mb_strlen($_POST['password']) < 6)) {
    $responseData['code'] = 5;
    $responseData['message'] = "新密码长度不符合要求！";
    echo json_encode($responseData);
    exit;
}
//判断两次输入的密码是否相同
if ($_POST['password'] != $_POST['confirm_pw']) {
    $responseData['code'] = 6;
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





?>

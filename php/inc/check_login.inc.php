<?php
$_POST = escape($link, $_POST);
//判断名字是否为空
if (empty($_POST['name'])) {
    $responseData['code'] = 1;
    $responseData['message'] = "用户名不得为空！";
    echo json_encode($responseData);
    exit;
}
//判断密码是否为空
if (empty($_POST['pw'])) {
    $responseData['code'] = 2;
    $responseData['message'] = "密码不得为空！";
    echo json_encode($responseData);
    exit;
}
//判断名字长度是否大于66
if (mb_strlen($_POST['name']) > 32) {
    $responseData['code'] = 3;
    $responseData['message'] = "用户名长度不得超过32！";
    echo json_encode($responseData);
    exit;
}

$query = "select pw from sspu_member where name='{$_POST['name']}' or phone='{$_POST['name']}'";
$result = execute($link, $query);
if (mysqli_num_rows($result) == null) {
    //判断密码是否正确
    // $data = mysqli_fetch_assoc($result);
    // if ($data['pw'] != md5($_POST['pw'])) {
    $responseData['code'] = 4;
    $responseData['message'] = "密码有误！";
    echo json_encode($responseData);
    exit;
    // }
}

//判断时间
// if(empty($_POST['time']) || !is_numeric($_POST['time']) || $_POST['time']>2592000){
// 	$_POST['time']=2592000;
// }
//匹配验证码。通过都该为小写，使用户输入时不用区分大小写
// if(strtolower($_POST['vcode'])!=strtolower($_SESSION['vcode'])){
//     skip('login.php', 'error', '验证码错误');
// }

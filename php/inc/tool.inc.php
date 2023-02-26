<?php
include_once 'mysql.inc.php';
function skip($url,$pic,$message){
//content="3;URL={$url}"意思是：经过3S后，跳转到URL该页面。
$html=<<<A
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta http-equiv="refresh" content="3;URL={$url}" />
<title>正在跳转中</title>
<link rel="stylesheet" type="text/css" href="style/remind.css" />
</head>
<body>
<div class="notice"><span class="pic {$pic}"></span> {$message} <a href="{$url}">3秒后自动跳转!</a></div>
</body>
</html>
A;
echo $html;
exit;
}
//进行防注入
function mysql_dataCheck($parameter)
    {
        $link = connect();
        $parameter =  mysqli_real_escape_string($link, $parameter);
        mysqli_close($link);
        return $parameter;
    }
//为了验证用户是否已经登录
function is_login($link){
    if(isset($_COOKIE['sspu']['name'])&&isset($_COOKIE['sspu']['pw'])){
        $query="select * from sspu_member where name='{$_COOKIE['sspu']['name']}'and sha1(pw)='{$_COOKIE['sspu']['pw']}'";
        $result=execute($link,$query);
        if(mysqli_num_rows($result)){
            $data=mysqli_fetch_assoc($result);
            return $data['id'];
        }
        else{
            return false;
        }    
    }
    else{
        return false;
    }
}

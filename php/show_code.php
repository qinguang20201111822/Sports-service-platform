<?php 
session_start();
//利用vcode.inc.php文件的方法来实现不同验证码
include_once 'inc/vcode.inc.php';
//利用$_SESSION函数来传递验证码,如果要用的话就可以直接调用该函数使用
$_SESSION['vcode']=vcode(100,40,30,4);
?>
<?php
include_once '../inc/config.inc.php';
include_once '../inc/mysql.inc.php';
include_once '../inc/tool.inc.php';
/*isset() 函数用于检测变量是否已设置并且非 NULL
防止用户通过输入页面地址直接访问该页面
is_numeric() 函数用于检测变量是否为数字或数字字符串，所以利用此函数可以避免恶意的 
把ID写为：id=1 or 1=1 的形式，防止恶意删除
*/
if(!isset($_GET['id']) || !is_numeric($_GET['id'])){
    //skip是tool.inc.php包里面定义的跳转方法
    skip('son_module.php','error','id参数错误！');
}
$link=connect();
//在 HTML 表单中使用 method="get" 时，所有的变量名和值都会显示在 URL 中
//在父页面进行删除时，要把删除的ID传到该界面，并进行删除语句
$query="delete from qg_son_module where id={$_GET['id']}";
execute($link,$query);
/*mysqli_affected_rows() 函数返回前一次 MySQL 操作
（SELECT、INSERT、UPDATE、REPLACE、DELETE）所影响的记录行数。
一次删除即返回1
*/
if(mysqli_affected_rows($link)==1){
    skip('son_module.php','ok','删除成功！');
}
else{
    skip('son_module.php','error','删除失败,请重试');
}



?>
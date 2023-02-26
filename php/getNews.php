<?php
include_once 'inc/config.inc.php';
include_once 'inc/mysql.inc.php';
include_once 'inc/tool.inc.php';

$link = connect();
$query="select * from books";
$result=execute($link,$query);
$datas=array();
//把全部数据放到数组里
while(($data=mysqli_fetch_assoc($result))!=null){
    $datas[]=$data;
}
// var_dump($datas);
echo json_encode($datas);

// close($link);
?>
<?php
include_once 'inc/config.inc.php';
include_once 'inc/mysql.inc.php';
include_once 'inc/tool.inc.php';
$link = connect();

//统一返回格式
$responseData=array("code"=>0,"message"=>"");
$bookname=$_POST['bookname'];
$author=$_POST['author'];

$query="insert into books(bookname,author) values('$bookname','$author')";
$result=execute($link,$query);
if($result=false){
    $responseData['code']=1;
    $responseData['message']="添加失败";
    echo json_encode($responseData);
}else{
    $responseData['message']="添加成功";
    echo json_encode($responseData);
}
// close($link);


?>
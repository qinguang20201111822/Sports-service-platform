<?php
include_once 'inc/config.inc.php';
include_once 'inc/mysql.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "datas_part" => "");
$datas = array();

$query="select id,module_name from qg_son_module where father_module_id=41";
$result=execute($link,$query);
while(($data=mysqli_fetch_assoc($result))!=null){
    $datas[]=$data;
}
$responseData['datas_part'] = $datas;
echo json_encode($responseData);
// close($link);
?>

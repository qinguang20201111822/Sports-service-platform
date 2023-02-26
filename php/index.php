<?php
include_once 'inc/config.inc.php';
include_once 'inc/mysql.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "datas_father" => "","datas_son" => "","datas_count" => "");

$datas_father=array();
$datas_son=array();
$datas_count=array();
$query = "select * from qg_father_module order by sort desc";
$result_father = execute($link, $query);
while(($data_father=mysqli_fetch_assoc($result_father))!=null){
    //记录父板块的数据
	$datas_father[]=$data_father;
	//根据父板块ID获取子版块信息，并记录
	$query = "select * from qg_son_module where father_module_id={$data_father['id']} ";
	$result_son = execute($link, $query);
	while ($data_son = mysqli_fetch_assoc($result_son)) {
		//记录子板块的数据
		$datas_son[]=$data_son;

		//该查询语句的作用：只统计一个子版块下的帖子数
		$query = "select count(*) from sspu_content where module_id={$data_son['id']} and time >CURDATE()-7";
		$count_today = num($link, $query);
		$datas_count[$data_son['id']]=$count_today;
	}
}
$responseData['datas_father']=$datas_father;
$responseData['datas_son']=$datas_son;
$responseData['datas_count']=$datas_count;
echo json_encode($responseData);
// close($link);
?>
<?php
include_once 'inc/config.inc.php';
include_once 'inc/mysql.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "datas" => "", "father_title" => "", "son_title" => "");

$datas = array();

//获取子版块标题信息
$query = "select * from qg_son_module where id={$_GET['module_id']}";
$result = execute($link, $query);
if (mysqli_num_rows($result) == 0) {
    $responseData['code'] = 2;
    $responseData['datas'] = "参数不合法";
    echo json_encode($responseData);
    exit();
}
$data_son = mysqli_fetch_assoc($result);
$responseData['son_title'] = $data_son['module_name'];

//获取帖子信息
$query = "select * from yueqiu where module_id={$_GET['module_id']} order by publish_time desc";
$result = execute($link, $query);
if (mysqli_num_rows($result) != 0) {
    while (($data = mysqli_fetch_assoc($result)) != null) {
        $datas[] = $data;
    }
    $responseData['datas'] = $datas;
} else {
    $responseData['code'] = 1;
    $responseData['datas'] = "客官不好意思，暂时还没找到 {$responseData['son_title']} 伙伴，不妨发起一个~~";
    echo json_encode($responseData);
    exit();
}

//获取父板块标题信息
$query = "select * from qg_father_module where id={$data_son['father_module_id']}";
$result = execute($link, $query);
$data_father = mysqli_fetch_assoc($result);
$responseData['father_title'] = $data_father['module_name'];


echo json_encode($responseData);
// close($link);
?>
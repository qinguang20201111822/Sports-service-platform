<?php
include_once 'inc/config.inc.php';
include_once 'inc/mysql.inc.php';
$link = connect();
//统一返回格式
$responseData = array("code" => 0, "message"=>"","datas" => "");

//判断输入的值是否为空
if ($_GET['input'] == null) {
    $responseData['code'] = 1;
    $responseData['message']='请输入您要搜索的内容';
    echo json_encode($responseData);
    exit();
}
//记录搜索的数据库是否没有结果
$datas = array();

//查询热点新闻
$query = "select title,news_id,publish_time from hot_news where title like '%{$_GET['input']}%'";
$result = execute($link, $query);
if (mysqli_num_rows($result) != null) {
    while (($data = mysqli_fetch_assoc($result)) != null) {
        //在数组中添加分类的名称
        // $array=[['part'=>'热点新闻']];
        array_push($data,'热点新闻');
        $datas[] = $data;
    }
}

//查询拍摄
$query = "select id,module_name,publish_time from qg_son_module where father_module_id=42 and module_name like '%{$_GET['input']}%'";
$result = execute($link, $query);
if (mysqli_num_rows($result) != null) {
    while (($data = mysqli_fetch_assoc($result)) != null) {
        array_push($data,'集锦拍摄');
        $datas[] = $data;
    }
}
//查询赛事
$query = "select title,id,publish_time from saishi where title like '%{$_GET['input']}%'";
$result = execute($link, $query);
if (mysqli_num_rows($result) != null) {
    while (($data = mysqli_fetch_assoc($result)) != null) {
        array_push($data,'赛事专区');
        $datas[] = $data;
    }
}

//查询约球
$query = "select content,yueqiu_id,publish_time,module_id from yueqiu where content like '%{$_GET['input']}%'";
$result = execute($link, $query);
if (mysqli_num_rows($result) != null) {
    while (($data = mysqli_fetch_assoc($result)) != null) {
        array_push($data,'约球频道');
        $datas[] = $data;
    }
}
if($datas==null){
    $responseData['code'] = 2;
    $responseData['message']='对不起，没有查询到';
    echo json_encode($responseData);
    exit();
}
//根据publish_time对数组进行降序排序
function sortByKeyDesc($arr, $key)
{
    array_multisort(array_column($arr, $key), SORT_DESC, $arr);
    return $arr;
}
$datas = sortByKeyDesc($datas, 'publish_time');

$responseData['datas'] = $datas;

echo json_encode($responseData);

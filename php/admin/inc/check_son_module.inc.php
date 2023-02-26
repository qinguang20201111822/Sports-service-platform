<?php

//管理员视角：先检测是否选择父板块
if (!is_numeric($_POST['father_module_id'])){
    skip('son_module_add.php', 'error', '所属父版块不得为空！');
}

//用户视角：防止可能会存在随意篡改id的情况
$query="select * from qg_father_module where id={$_POST['father_module_id']}";
$result=execute($link,$query);
if(mysqli_num_rows($result)==0){
    skip('son_module_add.php', 'error', '所属父版块不存在！');
}

//判断子版块的输入情况
//判断名字是否为空
if (empty($_POST['module_name'])) {
    skip('son_module_add.php', 'error', '版块名称不得为空！');
}
//判断名字长度是否大于66
if (mb_strlen($_POST['module_name']) > 66) {
    skip('son_module_add.php', 'error', '版块名称长度不得超过66！');
}

//判断子版块和排序
//escape方法进行转义
$_POST=escape($link,$_POST);
switch ($check_flag){
    case 'add':
        $query = "select * from qg_son_module where module_name='{$_POST['module_name']}'";
        break;
    case 'update':
        //为了让用户只修改排序，不修改名称，执行该语句时，mysqli_num_rows($result)该语句会返回0，不会出现跳转，因为查询的语句查询不到
        //同时也为了防止出现在已有的位置上添加版块
        $query = "select * from qg_son_module where module_name='{$_POST['module_name']}' and id!={$_GET['id']}";
        break;
    default:
        skip('son_module_add.php','error','参数错误！');

}
// $result = execute($link, $query);
// //mysqli_num_rows() 函数返回结果集中行的数量。查询到则返回1（if默认的就为1），否则返回0
// if (mysqli_num_rows($result)) {
//     skip('son_module_add.php', 'error', '该版块已经存在！');
// }



//判断版块简介长度是否大于255
if (mb_strlen($_POST['info']) > 255) {
    skip('son_module_add.php', 'error', '简介长度长度不得超过255！');
}


















?>
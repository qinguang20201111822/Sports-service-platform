<?php
	//该方法类是用来判断输入的格式是否正确

	//判断名字是否为空
	if (empty($_POST['module_name'])) {
		skip('father_module_add.php', 'error', '版块名称不得为空！');
	}
	//判断名字长度是否大于66，因为名字可能会有反斜杠的编码，用mb_strlen可以判断
	if (mb_strlen($_POST['module_name']) > 66) {
		skip('father_module_add.php', 'error', '版块名称长度不得超过66！');
	}
	//判断排序是否为数字
	if (!is_numeric($_POST['sort'])) {
		skip('father_module_add.php', 'error', '排序只能为数字！');
	}
	//escape是转义方法，把字符里的双引号或单引号可以传到所用的方法里
	//也能使名字可以带引号
	$_POST = escape($link, $_POST);

    switch ($check_flag){
        case 'add':
            $query = "select * from qg_father_module where module_name='{$_POST['module_name']}'";
            break;
        case 'update':
            //为了让用户只修改排序，不修改名称，执行该语句时，mysqli_num_rows($result)该语句会返回0，不会出现跳转，因为查询的语句查询不到
            //同时也为了防止出现在已有的位置上添加版块
			$query = "select * from qg_father_module where module_name='{$_POST['module_name']}' and id!={$_GET['id']}";
            break;
        default:
            skip('father_module_add.php','error','$check_flag参数错误！');
    
    }
	$result = execute($link, $query);
	//mysqli_num_rows() 函数返回结果集中行的数量。查询到则返回1（if默认的就为1），否则返回0
	if (mysqli_num_rows($result)) {
		skip('father_module_add.php', 'error', '该版块已经存在！');
	}

?>
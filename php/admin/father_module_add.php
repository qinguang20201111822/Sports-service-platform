<?php
include_once '../inc/config.inc.php';
include_once '../inc/mysql.inc.php';
include_once '../inc/tool.inc.php';
$name['title'] = '添加父板块';
$template['css'] = array('style/public.css');
if(isset($_POST['submit'])){
$link = connect();
//先判断提交的数据是否格式正确，再连接数据库执行插入语句

//利用check方法包检查用户填写的信息是否符合规范
$check_flag='add';
include_once 'inc/check_father_module.inc.php';

	$query = "insert into qg_father_module(module_name,sort) values('{$_POST['module_name']}',{$_POST['sort']})";
	execute($link, $query);
	if (mysqli_affected_rows($link) == 1) {
		skip('father_module.php', 'ok', '恭喜你，添加成功！');
	} else {
		skip('father_module_add.php', 'error', '添加失败！');
	}
}


?>



<!-- 
/*当引用页面文件时，不放在前方，下面要紧接着为页面部署的代码
否则页面会出现空行，且PHP内的语句执行不了
*/ -->
<?php include 'inc/header.inc.php'; ?>
<div id='main' style="height:1000px;">
	<div class="title">添加父版块</div>
	<form method="post">
		<table class="au">
			<tr>
				<td>版块名称</td>
				<td><input name="module_name" type="text" require/></td>
				<td>
					版块名称不得为空，最大不得超过66个字符
				</td>
			</tr>
			<tr>
				<td>排序</td>
				<td><input name="sort" value="0" type="text" /></td>
				<td>
					填写一个数字即可
				</td>
			</tr>
		</table>
		<input style="margin-top:20px;cursor:pointer;" class="btn" type="submit" name="submit" value="添加" />
	</form>

</div>




<?php include 'inc/footer.inc.php' ?>
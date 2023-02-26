<?php
include_once '../inc/config.inc.php';
include_once '../inc/mysql.inc.php';
include_once '../inc/tool.inc.php';
$name['title'] = '修改子板块';
$template['css'] = array('style/public.css');
$link = connect(); //这个link必须放在if(isset)之前，因为没提交之前就要利用数据库生成列表选项
//判断传入的id参数是否存在，
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    skip('son_module.php', 'error', 'id参数错误！');
}

$query = "select * from qg_son_module where id={$_GET['id']}";
$result = execute($link, $query);
//判断该查询语句是否存在
//mysqli_num_rows() 函数返回结果集中行的数量。没有的话就不返回
if (!mysqli_num_rows($result)) {
    skip('son_module', 'error', '该板块信息不存在！');
}


//进行验证提交的信息
if (isset($_POST['submit'])) {
    //先判断提交的数据是否格式正确，再连接数据库执行插入语句

    //利用check方法包检查用户填写的信息是否符合规范
    $check_flag = 'update';
    include_once 'inc/check_son_module.inc.php';
    $query = "update qg_son_module set father_module_id={$_POST['father_module_id']},module_name='{$_POST['module_name']}',info='{$_POST['info']}',sort={$_POST['sort']} where id={$_GET['id']}";
    execute($link, $query);
    //判断是否更新成功
    //mysqli_affected_rows() 函数返回前一次 MySQL 操作（SELECT、INSERT、UPDATE、REPLACE、DELETE）所影响的记录行数。
    if (mysqli_affected_rows($link) == 1) {
        skip('son_module.php', 'ok', '修改成功！');
    } else {
        skip('son_module_update.php', 'error', '修改失败！');
    }
}


//mysqli_fetch_assoc() 函数从结果集中取得一行作为关联数组。
//即，把结果赋给$data
$data = mysqli_fetch_assoc($result);
?>


<?php include 'inc/header.inc.php'; ?>
<div id='main' style="height:1000px;">
    <div class="title">修改子板块 - <?php echo "{$data['module_name']}";?></div>
    <form method="post">
        <table class="au">
            <tr>
                <td>所属父板块</td>
                <td>
                    <select name="father_module_id">
                        <option value="0">=======请选择一个父板块=======</option>
                        <?php
                        $query = "select * from qg_father_module";
                        $result_father = execute($link, $query);
                        while ($data_father = mysqli_fetch_assoc($result_father)) {
                            if ($data_father['id'] == $data['father_module_id']) {
                                echo "<option selected='selected' value='{$data_father['id']}'>{$data_father['module_name']}</option>";
                            } else {
                                echo "<option value='{$data_father['id']}'>{$data_father['module_name']}</option>";
                            }
                        }
                        ?>
                    </select>
                </td>
                <td>
                    必须选择一个父板块
                </td>
            </tr>

            <tr>
                <td>版块名称</td>
                <td><input name="module_name" value="<?php echo "{$data['module_name']}";?>" type="text" /></td>
                <td>
                    版块名称不得为空，最大不得超过66个字符
                </td>
            </tr>

            <tr>
                <td>版块简介</td>
                <td>
                    <textarea name="info"><?php echo "{$data['info']}";?></textarea>
                </td>
                <td>
                    版块简介不得超过255个字符
                </td>
            </tr>

            <tr>
                <td>版主</td>
                <td>
                    <select name="member_id">
                        <option value="0">=======请选择一个版主=======</option>
                    </select>
                </td>
                <td>
                    请选择一个版主
                </td>
            </tr>

            <tr>
                <td>排序</td>
                <td><input name="sort" value="<?php echo "{$data['sort']}"; ?>" type="text" /></td>
                <td>
                    填写一个数字即可
                </td>
            </tr>
        </table>
        <input style="margin-top:20px;cursor:pointer;" class="btn" type="submit" name="submit" value="确认修改" />
    </form>

</div>




<?php include 'inc/footer.inc.php' ?>
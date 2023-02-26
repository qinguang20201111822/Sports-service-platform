<?php
include_once '../inc/config.inc.php';
include_once '../inc/mysql.inc.php';
include_once '../inc/tool.inc.php';
$name['title'] = '添加子板块';
$template['css'] = array('style/public.css');
$link = connect(); //这个link必须放在if(isset)之前，因为没提交之前就要利用数据库生成列表选项
if (isset($_POST['submit'])) {
    //先判断提交的数据是否格式正确，再连接数据库执行插入语句
    //利用check方法包检查用户填写的信息是否符合规范
    $check_flag = 'add';
    include_once 'inc/check_son_module.inc.php';

    $query = "insert into qg_son_module(father_module_id,module_name,info,member_id,sort) values({$_POST['father_module_id']},'{$_POST['module_name']}','{$_POST['info']}',{$_POST['member_id']},{$_POST['sort']})";
    execute($link, $query);
    if (mysqli_affected_rows($link) == 1) {
        skip('son_module.php', 'ok', '恭喜你，添加成功！');
    } else {
        skip('son_module_add.php', 'error', '对不起，添加失败，请重试！');
    }
}
?>


<?php include 'inc/header.inc.php'; ?>
<div id='main' style="height:1000px;">
    <div class="title">添加子版块</div>
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
                            echo
                            "<option value='{$data_father['id']}'>{$data_father['module_name']}</option>";
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
                <td><input name="module_name" type="text" /></td>
                <td>
                    版块名称不得为空，最大不得超过66个字符
                </td>
            </tr>

            <tr>
                <td>版块简介</td>
                <td><textarea name="info"></textarea></td>
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
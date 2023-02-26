<?php
include_once '../inc/config.inc.php';
include_once '../inc/mysql.inc.php';
include_once '../inc/tool.inc.php';
$link = connect();
$name['title'] = '父板块列表页';
//为了方便CSS的使用
$template['css'] = array('style/public.css', 'style/father_module.css');
//提交之后要进行修改排序
if(isset($_POST['submit'])){
    //防止用户提交的序号不是数字
    foreach($_POST['sort'] as $key=>$val){
        if(!is_numeric($val)||!is_numeric($key)){
            skip('father_module.php','error','排序参数错误！');
        }
        $query[]="update qg_father_module set sort={$val} where id={$key}";
    }
//因为把一次要修改布置一个sort的值，所以利用了数组，并且利用自定义的execute_multi方法执行
    if(execute_multi($link,$query,$error)){
		skip('father_module.php','ok','排序修改成功！');
	}else{
		skip('father_module.php','error',$error);
	}

}


?>

<?php include_once 'inc/header.inc.php'; ?>
<div id="main" style="height:1000px;">
    <div class="title">父版块列表</div>
    <form method="post">
        <table class="list">
            <tr>
                <th>排序</th>
                <th>版块名称</th>
                <th>操作</th>
            </tr>
            <?php
            $query = 'select * from qg_father_module';
            //将返回一个 mysqli_result 对象
            $result = execute($link, $query);

            /*mysqli_fetch_assoc() 函数从结果集中取得一行作为关联数组。
        一行一行的取，直到结束
        */
            while ($data = mysqli_fetch_assoc($result)) {
                //url是对互联网上得到的资源的位置和访问方法的简称
                //$urlencode是编码技术，把多余的？进行编码，防止出错
                $url = urlencode("father_module_delete.php?id={$data['id']}");

                //$return_url和$message时赋值给“取消”使用的
                //$_SERVER 是一个包含了诸如头信息(header)、路径(path)、以及脚本位置(script locations)等等信息的数组
                $return_url = urlencode($_SERVER['REQUEST_URI']);
                $message = "确定要删除父板块{$data['module_name']}吗？ ";

                $delete_url = "confirm.php?url={$url}&return.url={$return_url}&message={$message}&{$data['module_name']}";
                /*href 属性规定链接的目标地址：
            href 标签的 href 属性用于指定超链接目标的 URL。
            如果 href 属性没有被指定链接，<a> 标签将不是一个链接。
            
            在 HTML 表单中使用 method="get" 时，所有的变量名和值都会显示在 URL 中进行传输，即？后的内容
            */




                $html = <<<A
            <tr>
            <td><input class="sort" type="text" name="sort[{$data['id']}]" value="{$data['sort']}" /></td>
            <td>{$data['module_name']}[id:{$data['id']}]</td>
            <td>
            <a href="#">[访问]</a>&nbsp;&nbsp;
            <a href="father_module_update.php?id={$data['id']}">[编辑]</a>&nbsp;&nbsp;
            <a href="$delete_url">[删除]</a>
            </td>
            </tr>
A;
                echo $html;
            }
            ?>
        </table>
        <input style="margin-top:20px;cursor:pointer;" class="btn" type="submit" name="submit" value="排序" />
    </form>
</div>
<?php include 'inc/footer.inc.php' ?>
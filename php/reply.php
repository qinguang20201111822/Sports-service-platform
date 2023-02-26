<?php
include_once 'inc/config.inc.php';
include_once 'inc/mysql.inc.php';
include_once 'inc/tool.inc.php';
$name['title'] = '回复';
//为了方便CSS的使用
$template['css'] = array('style/public.css', 'style/publish.css');
$link=connect();
//如果还未登录
if(!$member_id=is_login($link)){
    skip('login.php', 'error', "您还未登录，请先登录");
}
//对传入的id进行判断是否存在。利用$_GET方法传过来的id来判断时属于哪一个版块
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    skip('index.php', 'error', "id参数错误");
}
//在查询是否在数据库中
$query = "select sm.name,sc.id,sc.title,sc.member_id
from sspu_content sc,sspu_member sm where sc.id={$_GET['id']} and sm.id=sc.member_id";
$result_reply=execute($link,$query);
if(mysqli_num_rows($result_reply)==0){
    skip($_SERVER['REQUEST_URI'],'error',"帖子不存在");
}
$data_reply=mysqli_fetch_assoc($result_reply);

//进行回复内容的操作
if(isset($_POST['submit'])){
    include_once 'inc/check_reply.inc.php';
    $query="insert into sspu_reply(content_id,content ,member_id,time) values({$_GET['id']},'{$_POST['content']}',{$data_reply['member_id']},now())";
    execute($link,$query);
    if(mysqli_affected_rows($link)==1){
        skip("show.php?id={$_GET['id']}",'ok',"回复成功");
    }else{
        skip($_SERVER['REQUEST_URI'],'error',"回复失败");
    }
}


?>
<?php include_once 'inc/header.inc.php'; ?>
<div id="position" class="auto">
		 <a>首页</a> &gt;回复帖子
	</div>
	<div id="publish">
		<div>回复：由 <?php echo $data_reply['name'] ?> 发布的: 《<?php echo $data_reply['title'] ?>》</div>
		<form method="post">
			<textarea name="content" class="content"></textarea>
			<input class="reply" type="submit" name="submit" value="" />
			<div style="clear:both;"></div>
		</form>
	</div>

</div>

<?php include 'inc/footer.inc.php' ?>
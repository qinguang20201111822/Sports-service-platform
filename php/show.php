<?php
include_once 'inc/config.inc.php';
include_once 'inc/mysql.inc.php';
include_once 'inc/tool.inc.php';
include_once 'inc/page.inc.php';

//为了方便CSS的使用
$template['css'] = array('style/public.css', 'style/publish.css', 'style/newsdetail.css', 'style/show.css', 'style/list.css');
$link = connect();
$member_id = is_login($link);

//对传入的id进行判断是否存在。利用$_GET方法传过来的id来判断时属于哪一个版块
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    skip('index.php', 'error', "id参数错误");
}
$query = "select sm.name,sm.photo,sc.id,sc.module_id,sc.title,sc.content,sc.time,sc.times,sc.member_id
from sspu_content sc,sspu_member sm where sc.id={$_GET['id']} and sm.id=sc.member_id";


$result_content = execute($link, $query);
if (mysqli_num_rows($result_content) == 0) {
    skip('index.php', 'error', "帖子不存在");
}
//浏览量
$query = "update sspu_content set times=times+1 where id={$_GET['id']}";
execute($link, $query);
//填充帖子内容
$data_content = mysqli_fetch_assoc($result_content);
$data_content['times'] = $data_content['times'] + 1; //为了使第一次阅读时，把阅读量加一；
$data_content['title'] = htmlspecialchars($data_content['title']);
$data_content['content'] = nl2br(htmlspecialchars($data_content['content']));
//填充子版块的内容
$query = "select * from qg_son_module where id={$data_content['module_id']}";
$result_son = execute($link, $query);
$data_son = mysqli_fetch_assoc($result_son);

//填充父版块的内容
$query = "select * from qg_father_module where id={$data_son['father_module_id']}";
$result_father = execute($link, $query);
$data_father = mysqli_fetch_assoc($result_father);
$name['title'] = "{$data_content['title']}";

//获取回复信息
$query = "select count(*) from sspu_reply where content_id={$_GET['id']}";
$num_total += num($link, $query);
$page = page($num_total, 2, 2);
?>

?>

<?php include_once 'inc/header.inc.php'; ?>

<div id="position" class="auto">
    <a href="index.php">首页</a> &gt; <a href="list_father.php?id=<?php echo $data_father['id'] ?>"><?php echo $data_father['module_name'] ?></a> &gt; <a href="list_son.php?id=<?php echo $data_son['id'] ?>"><?php echo $data_son['module_name'] ?></a> &gt; <?php echo $data_content['title'] ?>
</div>

<div class="news_show">
    <!-- 显示新闻标题 -->
    <div class="show_title">
        <h2><?php echo $data_content['title'] ?></h2>
        <span>时间：<?php echo $data_content['time'] ?></span>
        <span>分类：<?php echo $data_son['module_name'] ?></span>
        <span>作者：<?php echo $data_content['name'] ?></span>
        <span>阅读：<?php echo $data_content['times'] ?>&nbsp;&nbsp;回复：<?php echo $num_total ?></span>
    </div>
    <!-- trim() 函数移除字符串两侧的空白字符或其他预定义字符。 -->

    <div class="content"><?php echo htmlspecialchars_decode(trim($data_content['content'])); ?> </div>
    <!-- <div><a href="javascript:history.back(-1);">返回>></a></div> -->
</div>

<div id="main" class="auto">
    <div class="wrap1">
        <a class="btn reply" id="reply" ></a>
        <div style="clear:both;"></div>
    </div>

    <?php
    $query = "select sr.content,sr.time,sm.name,sm.photo from sspu_member sm,sspu_reply sr 
    where sr.content_id={$_GET['id']} and sm.id=sr.member_id order by time desc {$page['limit']}";
    $result_reply = execute($link, $query);
    while ($data_reply = mysqli_fetch_assoc($result_reply)) {
        $data_reply['content'] = nl2br(htmlspecialchars($data_reply['content']));
    ?>
        <div class="wrapContent">
            <div class="left">
                <div class="face">
                    <a target="_blank" data-uid="2374101" href="">
                        <img src="<?php if ($data_reply['photo'] != '') {
                                        echo $data_reply['photo'];
                                    } else {
                                        echo 'style/photo.jpg';
                                    } ?>" />
                    </a>
                </div>
                <div class="name">
                    <a><?php echo $data_reply['name'] ?></a>
                </div>
            </div>
            <div class="right">

                <div class="pubdate">
                    <span class="date">回复时间：<?php echo $data_reply['time'] ?></span>
                    <span class="floor">1楼&nbsp;|&nbsp;<a href="#">引用</a></span>
                </div>
                <div class="content">
                    <!-- <div class="quote">
                    <h2>引用 1楼 孙胜利 发表的: </h2>
                    哈哈
                </div> -->
                    <?php echo $data_reply['content'] ?>
                </div>
            </div>
            <div style="clear:both;"></div>
        </div>
    <?php } ?>


    <script src="../js/jQuery.js"></script>
    <script>
        $(document).ready(function() {
            $("#reply").click(function() {
                $("#publish").fadeIn();
            });
        });
    </script>

    <div class="wrap1">
        <div class="pages">
            <?php
            $query = "select count(*) from sspu_reply where content_id={$_GET['id']}";
            $num_total += num($link, $query);
            $page = page($num_total, 2, 2);
            echo $page['html'];
            ?>
        </div>
    </div>
    <div id="publish" style="display:none">
        <div>回复：由 <?php echo $data_reply['name'] ?> 发布的: 《<?php echo $data_reply['title'] ?>》</div>
        <form method="post">
            <textarea name="content" class="content"></textarea>
            <input class="reply" type="submit" name="submit" value="" />
            <div style="clear:both;"></div>
        </form>
    </div>

    <div class="pages">
        <a href="#">回到顶部</a>
    </div>
</div>

<?php include 'inc/footer.inc.php' ?>
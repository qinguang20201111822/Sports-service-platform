<?php
include_once '../inc/config.inc.php';
/*isset() 函数用于检测变量是否已设置并且非 NULL
防止用户通过输入页面地址直接访问该页面
*/
if(!isset($_GET['message'])||!isset($_GET['url'])||!isset($_GET['return_url'])){
    exit();
}
?>


<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<title>后台界面</title>
<meta name="keywords" content="后台界面" />
<meta name="description" content="后台界面" />
<link rel="stylesheet" type="text/css" href="style/remind.css" />
</head>
<body>
<div class="notice"><span class="pic ask"></span>
<?php echo $_GET['message'] ?>
<a style="color:brown" href="<?php echo $_GET['url'] ?>">确定</a>|
<a style="color:aqua" href="<?php echo $_GET['return_url'] ?>">取消</a>
</div>
</body>
</html>

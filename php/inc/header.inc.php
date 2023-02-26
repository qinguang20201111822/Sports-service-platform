<!DOCTYPE html>
<html lang="zh-CN">

<head>
	<meta charset="utf-8" />
	<title><?php echo $name['title'] ?></title>
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<?php
	foreach ($template['css'] as $val) {
		echo "<link rel='stylesheet' type='text/css' href='{$val}' />";
	}
	?>
</head>

<body>
	<div class="header_wrap">
		<div id="header" class="auto">
			<div class="logo">SSPUer's</div>
			<div class="nav">
				<a class="hover" href="index.php" target="_blank">首页</a>
				<a style="width: 90px;" href="#" target="_blank">赛事专区</a>
				<a style="width: 90px;" href="#" target="_blank">约球频道</a>
				<a style="width: 90px;" href="#" target="_blank">集锦拍摄</a>
				<a style="width: 90px;" href="#" target="_blank">晨跑服务</a>
			</div>
			<div class="serarch">
				<form>
					<input class="keyword" type="text" name="keyword" placeholder="搜索其实很简单" />
					<input class="submit" type="submit" name="submit" value="" />
				</form>
			</div>
			<div class="login">
				<?php

				if ($member_id) {
					$str = <<<A
					<a style="padding:10px">你好 {$_COOKIE['sspu']['name']}</a><span style="color: #fff;">|</span>
					<a href="login_out.php">注销</a>
A;
					echo $str;
				} else {
					$str = <<<A
					<a href="login.php" style="padding:10px">登录</a>
					<a href="register.php">注册</a>	
A;
					echo $str;
				}

				?>
			</div>

		</div>
	</div>
	<div style="margin-top:55px;"></div>
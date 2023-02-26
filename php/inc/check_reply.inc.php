<?php

//escape方法进行转义
$_POST=escape($link,$_POST);

if (empty($_POST['content'])) {
    skip($_SERVER['REQUEST_URI'], 'error', '回复内容不能为空！');
}

?>
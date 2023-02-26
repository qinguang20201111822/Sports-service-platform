<?php
include_once 'inc/config.inc.php';
include_once 'inc/mysql.inc.php';
include_once 'inc/tool.inc.php';
$name['title'] = '注销';
setcookie('sspu[name]','',time()-1);
setcookie('sspu[pw]','',time()-1);
skip('index.php', 'ok', "注销成功");
?>
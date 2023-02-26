<?php
$myhead = current($_FILES);
//判断文件大小
if ($myhead['size'] > 500000) {
    header("HTTP/1.1 404 too big.");
    exit();
}
//判断文件的类型
$allow_type = array('image/jpeg', 'image/png', 'image/gif');
//如果文件类型符合，则重新命名并上传
if (!in_array($myhead['type'], $allow_type)) {
    header("HTTP/1.1 400 Invalid extension.");
    exit;
}
//进行改名
$type = strrchr($myhead['name'], '.');
$head = date("YmdHis") . rand(100, 999) . $type;
$head1 = "../../../image/news/" . $head;

//上传
move_uploaded_file($myhead['tmp_name'], $head1);
$head2 = "image/news/" . $head;
echo json_encode(array('location' => $head2));

<?php
//重新定义连接函数是增加结果判断处理功能

//数据库连接
function connect($host = DB_HOST, $user = DB_USER, $password = DB_PASSWORD, $database = DB_DATABASE, $port = DB_PORT)
{
    $link = @mysqli_connect($host, $user, $password, $database, $port);
    //对错误的结果进行输出
    if (mysqli_connect_errno()) {
        exit(mysqli_connect_error());
    }
    mysqli_set_charset($link, 'utf8'); //设置字符编码：utf8编码
    return $link;
}
//执行一条SQL语句，返回结果及对象或返回布尔值
function execute($link, $query)
{
    /*mysqli_query()函数执行某个针对数据库的查询，
    针对成功的 SELECT、SHOW、DESCRIBE 或 EXPLAIN 查询，将返回一个 mysqli_result 对象*/
    $result = mysqli_query($link, $query);
    //对错误的结果进行输出
    if (mysqli_errno($link)) {
        exit(mysqli_error($link));
    }
    return $result;
}

//执行一条SQL语句，只返回布尔值
function execute_bool($link, $query)
{
    
    //mysqli_real_query函数功能为：执行 SQL 查询
    $bool = mysqli_real_query($link, $query);
    //对错误的结果进行输出
    if (mysqli_errno($link)) {
        exit(mysqli_error($link));
    }
    return $bool;
}
//一次性执行多条SQL语句
/*
 一次性执行多条SQL语句
$link：连接
$arr_sqls：数组形式的多条sql语句
$error：传入一个变量，里面会存储语句执行的错误信息
使用案例：
$arr_sqls=array(
	'select * from sfk_father_module',
	'select * from sfk_father_module',
	'select * from sfk_father_module',
	'select * from sfk_father_module'
);
var_dump(execute_multi($link, $arr_sqls,$error));
echo $error;
*/
function execute_multi($link, $arr_sqls, &$error)
{
    $sqls = implode(';', $arr_sqls) . ';';
    if (mysqli_multi_query($link, $sqls)) {
        $data = array();
        $i = 0; //计数
        do {
            if ($result = mysqli_store_result($link)) {
                $data[$i] = mysqli_fetch_all($result);
                mysqli_free_result($result);
            } else {
                $data[$i] = null;
            }
            $i++;
            if (!mysqli_more_results($link)) break;
        } while (mysqli_next_result($link));
        if ($i == count($arr_sqls)) {
            return $data;
        } else {
            $error = "sql语句执行失败：<br />&nbsp;数组下标为{$i}的语句:{$arr_sqls[$i]}执行错误<br />&nbsp;错误原因：" . mysqli_error($link);
            return false;
        }
    } else {
        $error = '执行失败！请检查首条语句是否正确！<br />可能的错误原因：' . mysqli_error($link);
        return false;
    }
}
//获取记录数
function num($link, $sql_count)
{
    $result = execute($link, $sql_count);
    $count = mysqli_fetch_row($result);
    return $count[0];
}
//数据入库之前进行转义，确保数据能顺利的入库
//mysqli_real_escape_string() 函数转义在 SQL 语句中使用的字符串中的特殊字符
function escape($link,$data)
{
    //先判断是否为字符串类型
    if (is_string($data)) {
        return mysqli_real_escape_string($link, $data); //把数据存入数据库
    }
    //再判断是否为数组类型
    if (is_array($data)) {
        foreach ($data as $key => $val) {
            //对于多维数组，进行递归即可
            $data[$key] = escape($link, $val);
        }
    }
    return $data;
}
//关闭数据库的连接
function close($link)
{
    mysqli_close($link);
}
?>
<?php

/* 
使用方式：
$page=page(100,10,4);
echo $page['html'];
*/
//$count:总信息条数  $page_size：每页信息条数,$num_but：每次显示几个页数按钮,$page='page'：当前的页面数
function page($count, $page_size, $num_btn, $page = 'page')
{
    //如果父板块下没有帖子
    if ($count == 0) {
        $data = array(
            'limit' => '',
            'html' => ''
        );
        return $data;
    }
    //判断传入的页数是否合法
    //是否有page参数、参数是否为数字、参数是否大于0
    if (!isset($_GET[$page]) || !is_numeric($_GET[$page]) || $_GET[$page] < 1) {
        $_GET[$page] = 1;
    }
    //总页数
    $page_num_all = ceil($count / $page_size);
    //判断传入的页数是否大于应有的页数,如果有则显示最后一页
    if ($page_num_all < $_GET[$page]) {
        $_GET[$page] = $page_num_all;
    }
    //记录当前页面信息要从第几条开始
    $start = ($_GET[$page] - 1) * $page_size;
    $limit = "limit {$start},{$page_size}";

    /*因为传入的URL地址不单单包含page，还有别的参数，
而且不能点击页面按钮时，使URL只含page，
所以当改变page的值时，要保留其他参数的值，而不是写死
*/
    $current_url = $_SERVER['REQUEST_URI']; //获取当前url地址
    $arr_current_url = parse_url($current_url); //把url拆分到数组里
    $current_path = $arr_current_url['path']; //经文件的路径保存起来

    $url = '';
    //判断是否设置了url中的属性项；eg：page
    if (isset($arr_current_url['query'])) {
        parse_str($arr_current_url['query'], $arr_query); //把属性值拆分到数组中，key即属性名
        unset($arr_query[$page]); //去除page属性
        //判断除了page，属性是否为空
        if (empty($arr_query)) {
            $url = "{$current_path}?page=";
        } else {
            $other = http_build_query($arr_query); //把数组中的属性重新建立
            $url = "{$current_path}?{$other}&page=";
        }
    } else {
        $url = "{$current_path}?page=";
    }



    $html = array();
    //如果要显示的按钮数大于总按钮数，则输出全部页面按钮
    if ($num_btn > $page_num_all) {
        for ($i = 1; $i <= $page_num_all; $i++) {
            if ($_GET[$page] == $i) {
                $html[$i] = "<span>{$i}</span>";
            } else {
                $html[$i] = "<a href='{$url}{$i}'>{$i}</a>";
            }
        }
    }
    //如果不大于
    else {
        $left_num = floor(($num_btn - 1) / 2);
        //不考虑两边时
        $start = ($_GET[$page] - $left_num);
        $end = $start + $num_btn - 1;

        //对左边进行限制
        if ($start < 1) {
            $start = 1;
        }
        //对右边进行限制
        if ($end > $page_num_all) {
            $start = $page_num_all - ($num_btn - 1);
        }


        //循环输出，以$start为起始，循环$num_btn次，每次$start加一
        for ($i = 1; $i <= $num_btn; $i++) {
            //当循环到当前页面时，进行标记
            if ($_GET[$page] == $start) {
                $html[$start] = "<span>{$start}</span>";
            } else {
                $html[$start] = "<a href='{$url}{$start}'>{$start}</a>";
            }
            $start++;
        }
    }
    //进行跳转到第一页或最后一页，以及上一页下一页功能
    if (count($html) > 3) {
        //reset()函数是为了使数组的指针在第一个元素
        reset($html);
        //为了获取第一个键值，即页数的值，为了判断是否为第一页
        $key_first = key($html);
        //end() 函数将内部指针指向数组中的最后一个元素
        end($html);
        //为了获取最后的键值，即页数的值，为了判断是否为最后一页
        $key_ned = key($html);
        if ($key_first != 1) {
            //array_shift删除数组中的第一个元素
            array_shift($html);
            //array_unshift:在数组的起始插入一个元素
            array_unshift($html, "<a href='{$url}1'>1...</a>");
        }
        if ($key_ned != $page_num_all) {
            //array_pop删除数组中的最后一个元素
            array_pop($html);
            //array_push:在数组的最后插入一个元素
            array_push($html, "<a href='{$url}{$page_num_all}'>...{$page_num_all}</a>");
        }
    }
    //添加“上一页”，“下一页”功能
    if ($_GET[$page] != 1) {
        $prev = $_GET[$page] - 1;
        array_unshift($html, "<a href='{$url}{$prev}'><< 上一页</a>");
    }
    if ($_GET[$page] != $page_num_all) {
        $next = $_GET[$page] + 1;
        array_push($html, "<a href='{$url}{$next}'>下一页>>> </a>");
    }

    //把数组$html进行拼接，并用空格连接
    $html = implode(' ', $html);
    //利用数组记录 $limit语句 和 显示当前在第几页的HTML代码
    $data = array(
        'limit' => $limit,
        'html' => $html
    );
    return $data;
}

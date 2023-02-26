define(['tools', 'jquery', 'jquery_cookie'], function (tools, $) {
    function saiShi_show() {
        jQuery(document).ready(function ($) {
            $(function () {
                $("#header").load("../public/header.html");
                //赛事帖子的数据获取
                $.ajax({
                    method: "get",
                    url: "../../php/get_saishi.php",
                    data: {
                        module_id: GetUrlString("id")
                    },
                    success: function (result) {
                        var obj = JSON.parse(result);
                        var arr = obj.datas;
                        //防止非合法验证
                        if (obj.code != 0) {
                            var str = `
                        <div class="alert alert-danger" role="alert"><h2>${obj.datas}</h2></div>`;
                            $(str).insertAfter("#saishi");
                        } else {
                            //输出标题
                            var str = `
                        <ol class="breadcrumb">
                            <li><a href="../public/index.html">HOME</a></li>
                            <li>${obj.father_title}</li>
                            <li class="active">${obj.son_title}</li>
                        </ol>
                        `;
                            $(str).insertAfter("#daohang");

                            //输出赛事帖子内容
                            var str = `<div class="row">`;
                            for (var i = 0; i < arr.length; i++) {
                                str += `
                            <div class="col-sm-6 col-md-3"style="height:470px">
                                <div class="thumbnail">
                                    <a href="../show/show_saiShi.html?id=${arr[i].id}" target="_blank"></a>
                                    <div class="caption">
                                        <h4>${arr[i].title}</h4>
                                        <h5>截止时间：${arr[i].end_time}</h5>
                                        <p>
                                            <a href="../show/show_saiShi.html?id=${arr[i].id}" class="button button-rounded button-raised button-primary" role="button" target="_blank">浏览</a>
                                            <a href="https://www.wjx.cn/vm/Q0oYAQp.aspx" class="button button-border button-rounded button-primary" role="button" target="_blank">报名</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        `;
                            }
                            str += `</div>`;
                            $("#saishi").prepend(str);
                        }
                    },
                    error: function (msg) {
                        alert(msg);
                    }
                })
            })
        })
    }
    return {
        saiShi_show: saiShi_show
    }
})
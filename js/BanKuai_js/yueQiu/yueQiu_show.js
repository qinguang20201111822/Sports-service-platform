define(['jquery','tools', 'jquery_cookie', 'bootstrap'], function (jquery, jquery_cookie, tools, bootstrap) {
    function yueQiu_show() {
        jQuery(document).ready(function ($) {
            $(function () {
            $("#header").load("../public/header.html");
            //赛事帖子的数据获取
            $.ajax({
                method: "get",
                url: "../../php/get_yueqiu.php",
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

                        var user_head = $.cookie("user_head");
                        //输出赛事帖子内容
                        var str = `<div class="row" >`;
                        for (var i = 0; i < arr.length; i++) {
                            str += `
                            <div class="col-sm-6 col-md-3" style="height:470px">
                                <div class="thumbnail" >
                                    <img src="${arr[i].photo}">
                                    <div class="caption">
                                        <h4>${arr[i].content}</h4>
                                        <h5>发布时间：${arr[i].publish_time}</h5>
                                        <h5>约定时间：${arr[i].aim_time}</h5>
                                        <h5>地点：${arr[i].place}</h5>
                                        <p>
                                            <button id="join_comment" value="${arr[i].yueqiu_id}"  type="button" class="button button-rounded button-highlight" data-toggle="modal" data-target="#comment">Joined <span class="badge" id="joined_num" style="background-color: rgb(145, 145, 148);">${arr[i].joined_num}</span></button>
                                            <button id="join_join" value="${arr[i].yueqiu_id}"  type="button" class="button button-border button-rounded button-primary" data-toggle="modal" data-target="#join">Join</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        `;
                        }
                        str += `</div>`;
                        $("#saishi").append(str);
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
        yueQiu_show: yueQiu_show
    }
})
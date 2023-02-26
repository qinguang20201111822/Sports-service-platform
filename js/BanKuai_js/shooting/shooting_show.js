define(['jquery','bootstrap', 'tools',  'jquery_cookie'], function (jquery,bootstrap, tools, $) {
    function shooting_show() {
        jQuery(document).ready(function ($) {
            $(function () {
            $("#header").load("../public/header.html");
            //赛事帖子的数据获取
            //获取用户id
            var user_id = $.cookie("user_id");
            if(user_id==null){
                user_id="0";
            }
            $.ajax({
                method: "get",
                url: "../../php/get_jijin.php",
                data: {
                    module_id: GetUrlString("id"),
                    user_id:user_id
                },
                success: function (result) {
                    var obj = JSON.parse(result);
                    var arr = obj.datas;
                    var user_like = obj.user_like;
                    //防止非合法验证
                    if (obj.code != 0) {
                        var str = `
                        <div class="alert alert-danger" role="alert"><h2>${obj.datas}</h2></div>`;
                        $(str).insertAfter("#photo");
                    } else {
                        //输出标题
                        var str = `
                        <ol class="breadcrumb">
                            <li><a href="../public/index.html">HOME</a></li>
                            <li>${obj.father_title}</li>
                            <li class="active">${obj.son_title}</li>`;
                        if (user_like == "false") {
                            str += `
                                <li><span class="glyphicon glyphicon-heart-empty" id="like"></span></li>
                            </ol>`;
                        } else {
                            str += `
                                <li><span class="glyphicon glyphicon-heart" id="like" style="color:red"></span></li>
                            </ol>`;
                        }

                        $(str).insertAfter("#daohang");

                        //输出赛事帖子内容
                        var str = `<div class="row">`;
                        for (var i = 0; i < arr.length; i++) {
                            str += `
                            <div class="col-sm-6 col-md-3" style="height:470px">
                                <div class="thumbnail">
                                    <img  src="${arr[i].photo}">
                                </div>
                            </div>
                        `;
                        }
                        str += `</div>`;
                        $("#photo").append(str);
                    }
                },
                error: function (msg) {
                    alert(msg);
                }
            })
        })
        })
    }
    //点赞功能
    function like() {
        jQuery(document).ready(function ($) {
            $(function () {
            $(document).on("click", "#like", function () {
                //获取用户id
                var user_id = $.cookie("user_id");
                if (user_id == null) {
                    alert("登录后可进行点赞")
                } else {
                    if ($(this).attr("style") == null) {
                        var str = `<span class="glyphicon glyphicon-heart" id="like" style="color:red"></span>`;
                        $(this).replaceWith(str);

                        $.ajax({
                            method: "get",
                            url: "../../php/shoot_like_add.php",
                            data: {
                                module_id: GetUrlString("id"),
                                user_id: user_id
                            },
                            success: function (result) {
                                var obj = JSON.parse(result);
                                if (obj.code != 0) {
                                    alert(obj.message)
                                }
                            },
                            error: function (msg) {
                                alert(msg);
                            }
                        })

                    } else {
                        var str = `<span class="glyphicon glyphicon-heart-empty" id="like">`;
                        $(this).replaceWith(str);

                        $.ajax({
                            method: "get",
                            url: "../../php/shoot_like_remove.php",
                            data: {
                                module_id: GetUrlString("id"),
                                user_id: user_id
                            },
                            success: function (result) {
                                var obj = JSON.parse(result);
                                if (obj.code != 0) {
                                    alert(obj.message)
                                }
                            },
                            error: function (msg) {
                                alert(msg);
                            }
                        })
                    }
                }
            })
        })
        })
    }
    return {
        shooting_show: shooting_show,
        like: like
    }
})
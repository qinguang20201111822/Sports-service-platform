define(['jquery', 'news', 'bootstrap', 'tools', 'jquery_cookie'], function (jquery, news, bootstrap, tools, $) {
    //点赞功能
    function dianzan() {
        jQuery(document).ready(function ($) {
            $(function () {
                $(".col-md-4").on("click", ".dianzan", function () {
                    //判断是否登录
                    if ($.cookie("user_id") == null) {
                        alert("登录后可进行点赞")
                    } else {
                        // 点赞操作
                        if ($(this).attr("style") == null) {
                            str = `<span class="glyphicon glyphicon-thumbs-up" style="color: red;"></span>`;
                            $(this).replaceWith(str);

                            // 点赞数加一操作
                            var reply_id = "#" + $(this).attr("value");
                            var reply_id1 = $(this).attr("value")
                            var num = parseInt($(reply_id).html());
                            var like_count = num + 1;

                            str = `<span class="badge" style="background-color: #F0AD4E;" id="${reply_id}">${like_count}</span>`;
                            $(reply_id).replaceWith(str);

                            //获取用户id
                            var user_id = $.cookie("user_id");
                            $.ajax({
                                method: "get",
                                url: "../../php/update_like.php",
                                data: {
                                    reply_id: reply_id1,
                                    like_count: like_count,
                                    user_id: user_id
                                },
                                success: function (result) {
                                    var obj = JSON.parse(result);
                                    if (obj.code == 1) {
                                        alert(obj.message);
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
    //评论功能
    function comment() {
            jQuery(document).ready(function ($) {
                $(function () {
                $.cookie("click", "false");
                $(".col-md-4").on("click", "#comment", function () {
                    //判断是否登录
                    if ($.cookie("user_id") == null) {
                        alert("登录后可进行评论")
                    } else {
                        if ($.cookie("click") == "false") {
                            var user_name = $.cookie("user_name");
                            var user_head = $.cookie("user_head");
                            $.ajax({
                                method: "get",
                                url: "../../php/comment.php",
                                data: {
                                    news_id: GetUrlString("id")
                                },
                                success: function (result) {
                                    var obj = JSON.parse(result);
                                    var str = `
                                <div id="pinglun" class="panel panel-default" style="display:block">
                                    <div class="panel-heading">${obj.news_title}</div>
                                    <div class="panel-body">
                                        <span class="yuan"><img id="img1" src="${user_head}"> ${user_name}</span>
                                        <textarea id="content" class="form-control" rows="3"></textarea>
                                        <button id="comment_ok" class="button button-pill button-primary pull-right">评论</button>
                                    </div>
                                </div>`;
                                    $(".col-md-4").append(str);
                                    $.cookie("click", "true");
                                },
                                error: function (msg) {
                                    alert(msg)
                                }
                            })
                        }
                    }
                })
                //评论后提交
                $(".col-md-4").on("click", "#comment_ok", function () {
                    var user_id = $.cookie("user_id");
                    var content = $("#content").val();
                    $.ajax({
                        method: "get",
                        url: "../../php/comment_ok.php",
                        data: {
                            news_id: GetUrlString("id"),
                            user_id: user_id,
                            content: content
                        },
                        success: function (result) {
                            var obj = JSON.parse(result);
                            if (obj.code != 0) {
                                alert(obj.message);
                            } else {
                                alert(obj.message);
                                $("#pinglun").css({ "display": "none" });
                                $.cookie("click", "false");
                                comment_list();
                            }

                        },
                        error: function (msg) {
                            alert(msg)
                        }
                    })
                })
            })
        })
        // comment_list();
    }
    //评论展示
    function comment_list() {
        jQuery(document).ready(function ($) {
            $(function () {
                $.ajax({
                    method: "get",
                    url: "../../php/comment_list.php",
                    data: {
                        news_id: GetUrlString("id")
                    },
                    success: function (result) {
                        $(".col-md-4").empty();
                        var obj = JSON.parse(result);
                        var data_reply = obj.data_reply;
                        var data_like = obj.data_like;
                        //获取用户id
                        var user_id = $.cookie("user_id");
                        var str = `
                    <ul class="list-group">
                        <li class="list-group-item active">
                            <h4>热评
                                <span class="badge badge-secondary">
                                    <h5>${obj.num_reply}</h5>
                                </span>
                                <button id="comment" class="button button-pill button-primary pull-right">评论</button>
                            </h4>
                        </li>`;
                        for (var i = 0; i < data_reply.length; i++) {
                            str += `<li class="list-group-item">
                        <span class="yuan">    
                        <img src="${data_reply[i].photo}" class="img1">
                            ${data_reply[i].name} ：${data_reply[i].content}
                        </span>        
                        <span class="pull-right">
                            <span class="badge" style="background-color: #F0AD4E;" id="${data_reply[i].reply_id}">${data_reply[i].like_count}</span> `;

                            if (data_like.length != 0) {
                                for (var j = 0; j < data_like.length; j++) {
                                    if ((user_id == data_like[j].user_id) && (data_reply[i].reply_id == data_like[j].reply_id)) {
                                        str += `<span class="dianzan glyphicon glyphicon-thumbs-up" style="color: red;"  value="${data_reply[i].reply_id}"></span>`;
                                        //break是防止重复输出点红色点赞
                                        break;
                                    } else if (j == data_like.length - 1) {
                                        str += `<span class="dianzan glyphicon glyphicon-thumbs-up" value="${data_reply[i].reply_id}"></span>`;
                                    }
                                }
                            } else {
                                str += `<span class="dianzan glyphicon glyphicon-thumbs-up" value="${data_reply[i].reply_id}"></span>`;
                            }
                        }
                        str += `</span></li>`;

                        str += `</ul>`;

                        $(".col-md-4").append(str);

                    },
                    error: function (msg) {
                        alert(msg)
                    }
                })
            })
        })
    }
    return {
        dianzan: dianzan,
        comment: comment,
        comment_list: comment_list
    }
})
define(['jquery','tools', 'jquery_cookie', 'bootstrap'], function (jquery, jquery_cookie, tools, bootstrap) {
    function join() {
        jQuery(document).ready(function ($) {
            $(function () {
            var user_id = $.cookie("user_id");
            //把模拟框放进去
            var str = `
            <div class="modal fade" id="join" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                &times;
                            </button>
                            <h4 class="modal-title" id="myModalLabel">
                                加入约球
                            </h4>
                        </div>
                        <div class="modal-body">
                                <div class="form-group join">
                                    <label for="code">您可以向发布者留下您的联系方式 或者别的</label>
                                    <textarea id="content" class="form-control" rows="3"></textarea>
                                </div>
                        </div>
                        <div class="modal-footer join-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button  type="button" class="btn btn-primary">Join</button>
                        </div>
                    </div>
                </div>
            </div>`;
            $("#saishi").append(str);
            //检查是否已经报过名了
            $("#saishi").on("click", "#join_join", function () {
                if (user_id == null) {
                    //修改模拟框,提示用户进行登录
                    $(".join").empty();
                    $(".join-footer").empty();
                    var str1 = `<h3><strong>请先登录，之后方可加入</strong></h3>`;
                    var str2 = `<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>`;
                    $(".join").append(str1);
                    $(".join-footer").append(str2);
                } else {
                    var yueqiu_id = $(this).attr("value");
                    $.ajax({
                        method: "get",
                        url: "../../php/yueQiu_join/join_check.php",
                        data: {
                            yueqiu_id: yueqiu_id,
                            user_id: user_id
                        },
                        success: function (result) {
                            var obj = JSON.parse(result);
                            if (obj.code != 0) {
                                //修改模拟框
                                $(".join").empty();
                                $(".join-footer").empty();
                                var str1 = `<h3><strong>${obj.message}</strong></h3>`;
                                var str2 = `<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>`;
                                $(".join").append(str1);
                                $(".join-footer").append(str2);

                            } else {
                                //为提交按钮添加id值
                                $(".join-footer").empty();
                                var str2 = `
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button id="comment_ok" value="${yueqiu_id}" type="button" class="btn btn-primary">Join</button>`;
                                $(".join-footer").append(str2);
                            }
                        },
                        error: function (msg) {
                            alert(msg)
                        }
                    })
                }
            })
            //评论后提交
            $("#saishi").on("click", "#comment_ok", function () {
                var yueqiu_id = $(this).attr("value");
                var content = $("#content").val();
                $.ajax({
                    method: "get",
                    url: "../../php/yueQiu_join/join.php",
                    data: {
                        yueqiu_id: yueqiu_id,
                        user_id: user_id,
                        content: content
                    },
                    success: function (result) {
                        var obj = JSON.parse(result);
                        if (obj.code != 0) {
                            alert(obj.message);
                        } else {
                            alert(obj.message);

                            //关闭模拟框
                            $('#join').modal('hide');

                            $("#joined_num").text(obj.joined_num);

                        }

                    },
                    error: function (msg) {
                        alert(msg)
                    }
                })
            })
        })
        })
    }
    function join_comment() {
        jQuery(document).ready(function ($) {
            $(function () {
            //把模拟框放进去
            var str = `
             <div class="modal fade" id="comment" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                 aria-hidden="true">
                 <div class="modal-dialog">
                     <div class="modal-content">
                         <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                 &times;
                             </button>
                             <h4 class="modal-title" id="myModalLabel">
                                 留言台
                             </h4>
                         </div>
                         <div class="modal-body comment">
                         </div>
                         <div class="modal-footer">
                             <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                             </button>
                         </div>
                     </div>
                 </div>
             </div>
             `;
            $("#saishi").append(str);

            //把评论的内容展示到评论区
            $("#saishi").on("click", "#join_comment", function () {
                var yueqiu_id = $(this).attr("value");

                $.ajax({
                    method: "get",
                    url: "../../php/yueQiu_join/join_comment.php",
                    data: {
                        yueqiu_id: yueqiu_id
                    },
                    success: function (result) {
                        // 先进行清空
                        $(".comment").empty();
                        var obj = JSON.parse(result);
                        var datas = obj.datas;
                        if (obj.code != 0) {
                            $(".comment").empty();
                            var str = `<h3><strong>${obj.message}</strong></h3>`;
                            $(".comment").append(str);
                        } else {
                            var str = ``;
                            for (var i = 0; i < datas.length; i++) {
                                str += `
                             <li class="list-group-item">
                                <span class="yuan"><img src="${datas[i].photo}" class="img1">${datas[i].name}：${datas[i].content}</span>
                                <span class="pull-right">${datas[i].reply_time}</span>
                             </li>
                                `;
                                $(".comment").append(str);

                            }
                        }

                    },
                    error: function (msg) {
                        alert(msg)
                    }
                })
            })
        })
        })
    }
    return {
        join: join,
        join_comment: join_comment
    }
})
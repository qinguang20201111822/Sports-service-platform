define(['jQuery', 'jquery_cookie', 'bootstrap'], function (jQuery, jquery_cookie, bootstrap) {
    var user_id = $.cookie("user_id");
    var user_head = $.cookie("user_head");

    //定义背景颜色
    var color = new Array('success', 'info', 'warning', 'danger');

    function header() {
        $("#header").load("../public/header.html");
        $(function () {
            $.ajax({
                method: "get",
                url: "../../php/user/user_myHeader.php",
                data: {
                    user_id: user_id
                },
                success: function (result) {
                    var obj = JSON.parse(result);
                    var arr = obj.datas;
                    var str = `
                    <ul class="list-group">
                        <li class="list-group-item well-lg">
                            <h3>
                            <span class="yuan">
                                <img id="img2" class="rounded-circle mr-2" src="${arr.photo}">
                                <strong>${arr.name}</strong>
                            </span>
                            </h3>
                        </li>
                    </ul>
                    `;
                    $("#userHeader").prepend(str);
                },
                error: function (msg) {
                    alert(msg)
                }
            })
        })
    }
    function myCenter() {
        $(function () {
            //一进入页面要显示个人中心，之后还要能够点击返回显示
            $.ajax({
                method: "get",
                url: "../../php/user/user_myCenter.php",
                data: {
                    user_id: user_id
                },
                success: function (result) {
                    var obj = JSON.parse(result);
                    var arr = obj.datas;
                    var str = `
                <li class="list-group-item list-group-item-success">
                <h4 id="user_phone">手机号：${arr.phone}</h4>
                </li>

                <li class="list-group-item list-group-item-info">
                    <h4>From Register To Now : <strong>${arr.register_time}</strong> Days</h4>
                </li>`;
                    if (obj.num_yueqiu == 0) {
                        str += `
                    <li class="list-group-item list-group-item-warning">
                        <h4>您还没发布过约球</h4>
                    </li>`;
                    } else {
                        str += `
                    <li class="list-group-item list-group-item-warning">
                        <h4>共发布过 : <strong>${obj.num_yueqiu}</strong> 次约球</h4>
                    </li>`;
                    }
                    str += `
                <li class="list-group-item list-group-item-danger">
                    <h4>
                        <span class="glyphicon glyphicon-paperclip" aria-hidden="true"></span>
                        今天的你运动了吗
                    </h4>
                </li>
                <li class="list-group-item well-lg">
                    <button type="button" class="button button-pill button-primary" data-toggle="modal" data-target="#change_head" id="change_head">修改头像</button>
                    <button type="button" class="button button-pill button-primary" data-toggle="modal" data-target="#change_pw" id="change_pw">修改密码</button>
                    <button type="button" class="button button-pill button-primary" data-toggle="modal" data-target="#change_phone" id="change_phone">修改手机号码</button>
                </li>
                `;
                    $("#list_forUser").append(str);
                },
                error: function (msg) {
                    alert(msg)
                }
            })
            //一进入页面要显示个人中心，之后还要能够点击返回显示
            $("#myCenter").click(function () {
                $("#myPublish").removeClass();
                $("#myMessage").removeClass();
                $("#myCenter").attr('class', 'active');

                $("#list_forUser").empty();
                $.ajax({
                    method: "get",
                    url: "../../php/user/user_myCenter.php",
                    data: {
                        user_id: user_id
                    },
                    success: function (result) {
                        var obj = JSON.parse(result);
                        var arr = obj.datas;
                        var str = `
                    <li class="list-group-item list-group-item-success">
                    <h4>手机号：${arr.phone}</h4>
                    </li>

                    <li class="list-group-item list-group-item-info">
                        <h4>From Register To Now : <strong>${arr.register_time}</strong> Days</h4>
                    </li>`;
                        if (obj.num_yueqiu == 0) {
                            str += `
                        <li class="list-group-item list-group-item-warning">
                            <h4>您还没发布过约球</h4>
                        </li>`;
                        } else {
                            str += `
                        <li class="list-group-item list-group-item-warning">
                            <h4>共发布过 : <strong>${obj.num_yueqiu}</strong> 次约球</h4>
                        </li>`;
                        }
                        str += `
                    <li class="list-group-item list-group-item-danger">
                        <h4>
                            <span class="glyphicon glyphicon-paperclip" aria-hidden="true"></span>
                            今天的你运动了吗
                        </h4>
                    </li>
                    <li class="list-group-item well-lg">
                        <button type="button" class="button button-pill button-primary" data-toggle="modal" data-target="#change_head">修改头像</button>
                        <button type="button" class="button button-pill button-primary" data-toggle="modal" data-target="#change_pw">修改密码</button>
                        <button type="button" class="button button-pill button-primary" data-toggle="modal" data-target="#change_phone">修改手机号码</button>
                    </li>
                    `;
                        $("#list_forUser").append(str);
                    },
                    error: function (msg) {
                        alert(msg)
                    }
                })
            })
        })
    }
    function myPublish() {
        $(function () {
            $("#myPublish").click(function () {
                $("#myCenter").removeClass();
                $("#myMessage").removeClass();
                $("#myPublish").attr('class', 'active');

                $("#list_forUser").empty();

                $.ajax({
                    method: "get",
                    url: "../../php/user/user_myPublish.php",
                    data: {
                        user_id: user_id
                    },
                    success: function (result) {
                        //先清空
                        $("#list_forUser").empty();
                        var obj = JSON.parse(result);
                        var arr = obj.datas;
                        var str = ``;
                        if (obj.code == 1) {
                            str += `
                            <li class="list-group-item list-group-item-info">
                                <h4>${obj.message}</h4>
                            </li>
                            `;
                        } else {
                            for (var i = 0; i < arr.length; i++) {
                                str += `
                            <li class="list-group-item list-group-item-${color[i % 4]}">
                                <h4>您发布了在<strong>${arr[i].place}</strong>的<strong>${arr[i].module_name}</strong>邀请</h4>
                                <h5><strong> Time：</strong>${arr[i].publish_time}</h5>
                            </li>
                            `;
                            }
                        }
                        $("#list_forUser").append(str);
                    },
                    error: function (msg) {
                        alert(msg)
                    }
                })
            })
        })
    }
    function myMessage() {
        // $(function () {
        //     $("#myMessage").click(function () {
        //         $("#myCenter").removeClass();
        //         $("#myPublish").removeClass();
        //         $("#myMessage").attr('class', 'active');

        //         $("#list_forUser").empty();

        //         $.ajax({
        //             method: "get",
        //             url: "../../php/user/user_myMessage.php",
        //             data: {
        //                 user_id: user_id
        //             },
        //             success: function (result) {
        //                  //先清空
        //                 //  $("#list_forUser").empty();
        //                 //  var obj = JSON.parse(result);
        //                 //  var arr = obj.datas;
        //                 //  var str = ``;
        //                 // alert(result)
        //             },
        //             error: function (msg) {
        //                 alert(msg)
        //             }
        //         })
        //     })
        // })
    }
    //修改用户的基本信息
    function change_head() {
        var str = `
           <div class="modal fade change_head" id="change_head" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
               aria-hidden="true" data-keyboard="false" data-backdrop="static">
               <div class="modal-dialog">
                   <div class="modal-content">
                       <div class="modal-header">
                           <button type="button" class="close" id="X_cancel" data-dismiss="modal" aria-hidden="true">
                               &times;
                           </button>
                           <h4 class="modal-title" id="myModalLabel">
                             修改头像
                           </h4>
                       </div>
                       <div class="modal-body">
                           <form action="../../php/user/change_header_upload.php" method="post" enctype="multipart/form-data" target="winupload">
                                <span class="yuan"><img id="img_head" src="${user_head}"></span>
                                <br><br>
                                <input type="file" class="form-control" name="upload_head" id="upload_head">
                            </form>
                            <iframe src="" name="winupload" style="display: none;"></iframe>
                       </div>
                       <div class="modal-footer">
                           <button id="btn_change_head_cancel" type="button" class="btn btn-default" data-dismiss="modal">关闭
                           </button>
                           <button id="btn_change_head" type="button" class="btn btn-primary">
                               提交更改
                           </button>
                       </div>
                   </div>
               </div>
           </div>`;
        $("#list_forUser").append(str);

        $(function () {
            //当文件传进来时，就触发提交按钮，这样可进行照片预览
            $("#upload_head").change(function () {
                $(this).parent().submit();
            })

            // 如果点击取消或者×，则删除已经上传成功的图片
            $("#list_forUser").on("click", "#btn_change_head_cancel,#X_cancel", function () {
                //获取当前的head的src
                var src = $("#img_head").attr("src");
                //如果没有上传，则不进行删除操作
                if (src != user_head) {
                    $.ajax({
                        method: "post",
                        url: "../../php/user/change_header_delete.php",
                        data: {
                            src: src
                        },
                        success: function (result) {
                            $("#img_head").attr('src', user_head)
                        },
                        error: function (msg) {
                            alert(msg)
                        }
                    })
                }
            })
            // 点击提交修改，则上传成功的图片到数据库
            $("#list_forUser").on("click", "#btn_change_head", function () {
                //获取当前的head的src,alt(即是tmp_name的值)
                var src = $("#img_head").attr("src");

                //如果没有上传，则不进行更新数据库操作
                if (src != user_head) {
                    $.ajax({
                        method: "post",
                        url: "../../php/user/change_header.php",
                        data: {
                            src: src,
                            user_id:user_id,
                            old_head: user_head
                        },
                        success: function (result) {
                            var obj=JSON.parse(result);
                            if(obj.code==0){
                            //修改成功后，要把当前页面的头像给改变，并且cookie也要改变
                            $("#img1").attr('src', src);
                            $("#img2").attr('src', src);
                            $.cookie("user_head", src, {
                                expires: 1,
                                path: "/"
                            });
                            $('#change_head').modal('hide');
                            }else{
                                alert(obj.message);
                            }
                        },
                        error: function (msg) {
                            alert(msg)
                        }
                    })
                }
            })
        })
    }
    function change_pw() {
        $(function () {
            var str = `
           <div class="modal fade" id="change_pw" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
               aria-hidden="true">
               <div class="modal-dialog">
                   <div class="modal-content">
                       <div class="modal-header">
                           <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                               &times;
                           </button>
                           <h4 class="modal-title" id="myModalLabel">
                             修改密码
                           </h4>
                       </div>
                       <div class="modal-body">
                            <div class="form-group">
                                <label for="phone">原密码</label>
                                <input type="password" class="form-control" id="pw" placeholder="请输入原密码">
                            </div>
                            <div class="form-group">
                                <label for="password">新密码</label>
                                <input type="password" class="form-control" id="password" placeholder="请输入大于6位的密码">
                            </div>
                            <div class="form-group">
                                <label for="confirm_pw">确认密码</label>
                                <input type="password" class="form-control" id="confirm_pw" placeholder="请再输入相同密码">
                            </div>
                            <div class="form-group">
                                <label for="code">请输入下方验证码</label>
                                <input type="text" class="form-control" id="code" placeholder="输入验证码">
                            </div>
                       </div>
                       <div class="modal-footer">
                           <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                           </button>
                           <button id="btn_changepw" type="button" class="btn btn-primary">
                               提交更改
                           </button>
                       </div>
                   </div>
               </div>
           </div>`;
            $("#list_forUser").append(str);

            //获取数据通过ajax进行验证
            $("#change_pw").on("click", "#btn_changepw", function () {
                var pw = $("#pw").val();
                var password = $("#password").val();
                var confirm_pw = $("#confirm_pw").val();

                $.ajax({
                    method: "post",
                    url: "../../php/user/change_pw.php",
                    data: {
                        user_id: user_id,
                        pw: pw,
                        password: password,
                        confirm_pw: confirm_pw
                    },
                    success: function (result) {
                        var obj = JSON.parse(result);
                        if (obj.code == 0) {
                            $.cookie("user_name", null, { path: "/", expires: -1 });
                            $.cookie("user_head", null, { path: "/", expires: -1 });
                            $.cookie("user_id", null, { path: "/", expires: -1 });
                            $.cookie("user_phone", null, { path: "/", expires: -1 });
                            alert(obj.message);
                            $('#change_pw').modal('hide')
                            setTimeout(function () {
                                location.href = "../log_re/login.html";
                            }, 1000);
                        } else {
                            alert(obj.message);
                        }
                    },
                    error: function (msg) {
                        alert(msg);
                    }
                })
            })
        })
    }
    function change_phone() {
        $(function () {
            var user_phone = $.cookie("user_phone");
            var str = `
            <div class="modal fade" id="change_phone" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                &times;
                            </button>
                            <h4 class="modal-title" id="myModalLabel">
                                修改手机号
                            </h4>
                        </div>
                        <div class="modal-body">
                                <div class="form-group">
                                    <label for="phone">请修改手机号</label>
                                    <input type="text" class="form-control" id="phone" value="${user_phone}">
                                </div>
                                <div class="form-group">
                                    <label for="code">请输入下方验证码</label>
                                    <input type="text" class="form-control" id="code" placeholder="输入验证码">
                                </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                            </button>
                            <button id="btn_changephone" type="button" class="btn btn-primary">
                                提交更改
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
            $("#list_forUser").append(str);

            //获取数据通过ajax进行验证
            $("#change_phone").on("click", "#btn_changephone", function () {
                var user_phone = $.cookie("user_phone");
                var phone = $("#phone").val();
                $.ajax({
                    method: "post",
                    url: "../../php/user/change_phone.php",
                    data: {
                        user_id: user_id,
                        phone: phone,
                        old_phone: user_phone
                    },
                    success: function (result) {
                        var obj = JSON.parse(result);
                        if (obj.code == 0) {
                            alert(obj.message);
                            $("#user_phone").text(phone);
                            //用户手机号放cookie中
                            $.cookie("user_phone", phone, {
                                expires: 1,
                                path: "/"
                            });
                            $('#change_phone').modal('hide');
                        } else {
                            alert(obj.message);
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
        header: header,
        myCenter: myCenter,
        myPublish: myPublish,
        myMessage: myMessage,
        change_head: change_head,
        change_phone: change_phone,
        change_pw: change_pw
    }
})

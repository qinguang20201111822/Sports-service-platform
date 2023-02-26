define(['jquery', 'bootstrap', 'jquery_cookie'], function (jquery, bootstrap, jquery_cookie) {

    function show() {
        $(function () {
            $("#adminer_list").click(function () {
                $.ajax({
                    method: "get",
                    url: "../../php/admin/user_admin/adminer_list.php",
                    success: function (result) {
                        //先清空 再展示
                        $("#list_forUser").empty();
                        var obj = JSON.parse(result);
                        var arr = obj.datas;
                        var str = `
                        <div class="panel panel-default">
                        <div class="panel-heading">
                            <strong>管理员列表</strong>
                            <button id="addAdminer" class="button button-border button-rounded button-primary pull-right button-small" data-toggle="modal" data-target="#adminer_add" >添加管理员</button>
                        </div>
                        <div class="panel-body">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>姓名</th>
                                        <th>电话</th>
                                        <th>注册时间</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody id="t1_admin">`;
                        for (var i = 0; i < arr.length; i++) {
                            str += `
                        <tr id="${arr[i].id}">
                            <td><strong>${arr[i].id}</strong></td>
                            <td>${arr[i].name}</td>
                            <td>${arr[i].phone}</td>
                            <td>${arr[i].register_time}</td>   
                            <td><button id="btn_adminer_delete" value="${arr[i].id}" class="button button-rounded button-small button-caution"  data-toggle="modal" data-target="#adminer_delete"><strong>删除</strong></button> </td>
                        </tr>
                        `;
                        }
                        str += `
                                </tbody>
                            </table>
                        </div>
                    </div>
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
    function adminer_delete() {
        $(function () {
            $("#list_forUser").empty();
            //点击删除后，把模拟框放进去
            $("#list_forUser").on("click", "#btn_adminer_delete", function () {
                var admin = $.cookie("user_id");
                if (admin != 1) {
                    alert("您没有此权限")
                } else {
                    //获取都id，作为确认删除按钮的value
                    var user_id = $(this).attr("value");
                    var str = `
                        <div class="modal fade" id="adminer_delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                            &times;
                                        </button>
                                        <h4 class="modal-title" id="myModalLabel">
                                            删除用户
                                        </h4>
                                    </div>
                                    <div class="modal-body" id="adminer_caozuo">
                                        <h3><strong>确定要删除该管理员吗？</strong></h3>
                                    </div>
                                    <div class="modal-footer join-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                        <button id="submit_delete" value="${user_id}" type="button" class="btn btn-primary">确定</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    $("#list_forUser").append(str);
                }
            })

            //点击确定删除后，进行数据的提交
            $("#list_forUser").on("click", "#submit_delete", function () {
                var adminer_id = $(this).attr("value");
                //获取用户id
                $.ajax({
                    method: "get",
                    url: "../../php/admin/user_admin/adminer_delete.php",
                    data: {
                        adminer_id: adminer_id
                    },
                    success: function (result) {
                        var obj = JSON.parse(result);
                        alert(obj.message);
                        if (obj.code == 0) {
                            // 在页面上去除该用户
                            var str = "#" + adminer_id;
                            $(str).remove();
                            //隐藏模拟框
                            $('#adminer_delete').modal('hide')
                            var str = `<h3><strong>您没有此权限</strong></h3>`;
                            $("#adminer_caozuo").append(str);
                        }
                    },
                    error: function () {
                        alert(msg)
                    }
                })
            })
        })
    }


    //新增管理员
    function adminer_add() {
        $(function () {
            
            $("#list_forUser").on("click", "#addAdminer", function () {
                var str = `
                        <div class="modal fade" id="adminer_add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        &times;
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel">
                                        添加管理员
                                    </h4>
                                </div>
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label for="name">用户名</label>
                                        <input type="text" class="form-control" id="name" placeholder="请设置用户名">
                                    </div>
                                    <div class="form-group">
                                        <label for="phone">手机号</label>
                                        <input type="text" class="form-control" id="phone" placeholder="可用于登录和找回密码">
                                    </div>
                                    <div class="form-group">
                                        <label for="password">密码</label>
                                        <input type="password" class="form-control" id="pw" placeholder="请输入大于6位的密码">
                                    </div>
                                    <div class="form-group">
                                        <label for="confirm_pw">确认密码</label>
                                        <input type="password" class="form-control" id="confirm_pw" placeholder="请再输入相同密码">
                                    </div>
                                    
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                                    </button>
                                    <button id="btn_addAdminer" type="button" class="btn btn-primary">
                                        提交
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                $("#list_forUser").append(str);
               
            })

            //点击提交后，进行连接数据库
            $("#list_forUser").on("click", "#btn_addAdminer", function () {
                var name = $("#name").val();
                var phone = $("#phone").val();
                var pw = $("#pw").val();
                var confirm_pw = $("#confirm_pw").val();
                var vcode = $("#vcode").val();
                var config_vcode = $("#click_vcode").val();
                $.ajax({
                    method: "post",
                    url: "../../php/admin/user_admin/adminer_add.php",
                    data: {
                        name: name,
                        phone: phone,
                        pw: pw,
                        confirm_pw: confirm_pw
                    },
                    success: function (result) {
                        var obj = JSON.parse(result);
                        if (obj.code == 0) {
                            //在页面上添加该用户
                            var str = `
                            <tr id="${obj.adminer_id}">
                                <td><strong>${obj.adminer_id}</strong></td>
                                <td>${name}</td>
                                <td>${phone}</td>
                                <td>${obj.register_time}</td>   
                                <td><button id="btn_adminer_delete" value="${obj.adminer_id}" class="button button-rounded button-small button-caution"  data-toggle="modal" data-target="#adminer_delete"><strong>删除</strong></button> </td>
                            </tr>`;
                            $("#t1_admin").append(str);
                            alert(obj.message);
                            //关闭模拟框
                            $('#adminer_add').modal('hide')
                        } else {
                            alert(obj.message);
                        }

                    },
                    error: function (msg) {
                        alert(msg)
                    }
                })
            })

        })
    }
    return {
        show: show,
        adminer_delete: adminer_delete,
        adminer_add: adminer_add
    }
})
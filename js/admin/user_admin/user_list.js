define(['jquery', 'bootstrap', 'jquery_cookie'], function (jquery, bootstrap, jquery_cookie) {

    function show() {
        $(function () {
            $("#user_list").click(function () {
                $.ajax({
                    method: "get",
                    url: "../../php/admin/user_admin/user_list.php",
                    success: function (result) {
                        //先清空 再展示
                        $("#list_forUser").empty();
                        var obj = JSON.parse(result);
                        var arr = obj.datas;
                        var str = `
                        <div class="panel panel-default">
                        <div class="panel-heading"><strong>用户列表</strong></div>
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
                                <tbody id="t1">`;
                        for (var i = 0; i < arr.length; i++) {
                            str += `
                        <tr id="${arr[i].id}">
                            <td><strong>${arr[i].id}</strong></td>
                            <td>${arr[i].name}</td>
                            <td>${arr[i].phone}</td>
                            <td>${arr[i].register_time}</td>   
                            <td><button id="btn_user_delete" value="${arr[i].id}" class="button button-rounded button-small button-caution"  data-toggle="modal" data-target="#user_delete"><strong>删除</strong></button> </td>
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
    function user_delete() {
        $(function () {
            $("#list_forUser").empty();
            //点击删除后，把模拟框放进去
            $("#list_forUser").on("click", "#btn_user_delete", function () {
                //获取都id，作为确认删除按钮的value
                var user_id = $(this).attr("value");
                var str = `
                    <div class="modal fade" id="user_delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
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
                                <div class="modal-body">
                                    <h3><strong>确定要删除该用户吗？</strong></h3>
                                </div>
                                <div class="modal-footer join-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                    <button id="submit_delete" value="${user_id}" type="button" class="btn btn-primary">确定</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
                $("#list_forUser").append(str);
            })

            //点击确定删除后，进行数据的提交
            $("#list_forUser").on("click", "#submit_delete", function () {
                var user_id = $(this).attr("value");
                //获取用户id
                $.ajax({
                    method: "get",
                    url: "../../php/admin/user_admin/user_delete.php",
                    data: {
                        user_id: user_id
                    },
                    success: function (result) {
                        var obj = JSON.parse(result);
                        alert(obj.message);
                        if (obj.code == 0) {
                            // 在页面上去除该用户
                            var str="#"+user_id;
                            $(str).remove();
                            //隐藏模拟框
                            $('#user_delete').modal('hide')

                        }
                    },
                    error: function () {
                        alert(msg)
                    }
                })
            })
        })
    }
    return {
        show: show,
        user_delete: user_delete
    }
})
define(['jquery', 'bootstrap', 'jquery_cookie'], function (jquery, bootstrap, jquery_cookie) {

    function show() {
        $(function () {
            $("#saishi_list").click(function () {
                $.ajax({
                    method: "get",
                    url: "../../php/admin/bankuai_list/saishi_list.php",
                    success: function (result) {
                        //先清空 再展示
                        $("#list_forUser").empty();
                        var obj = JSON.parse(result);
                        var arr = obj.datas;
                        var arr_reply = obj.datas_reply;
                        var str = `
                        <div class="panel panel-default">
                        <div class="panel-heading"><strong>赛事列表</strong></div>
                        <div class="panel-body">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>标题</th>
                                        <th>所属种类</th>
                                        <th>发布时间</th>
                                        <th>结束时间</th>
                                        <th>问卷链接</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody id="t1">`;
                        for (var i = 0; i < arr.length; i++) {
                            str += `
                        <tr id="${arr[i].id}">
                            <td><strong>${arr[i].id}</strong></td>
                            <td>${arr[i].title}</td>
                            <td>${arr[i].module_name}</td>
                            <td>${arr[i].publish_time}</td>
                            <td>${arr[i].end_time}</td>
                            <td>${arr[i].link}</td>
                            <td><button id="btn_saishi_delete" value="${arr[i].id}" class="button button-rounded button-small button-caution"  data-toggle="modal" data-target="#saishi_delete"><strong>删除</strong></button> </td>
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
    function saishi_delete() {
        $(function () {
            $("#list_forUser").empty();
            //点击删除后，把模拟框放进去
            $("#list_forUser").on("click", "#btn_saishi_delete", function () {
                //获取都id，作为确认删除按钮的value
                var saishi_id = $(this).attr("value");
                var str = `
                    <div class="modal fade" id="saishi_delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        &times;
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel">
                                        删除赛事
                                    </h4>
                                </div>
                                <div class="modal-body">
                                    <h3><strong>确定要删除该赛事吗？</strong></h3>
                                </div>
                                <div class="modal-footer join-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                    <button id="submit_delete_saishi" value="${saishi_id}" type="button" class="btn btn-primary">确定</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
                $("#list_forUser").append(str);
            })

            //点击确定删除后，进行数据的提交
            $("#list_forUser").on("click", "#submit_delete_saishi", function () {
                var saishi_id = $(this).attr("value");
                //获取用户id
                $.ajax({
                    method: "get",
                    url: "../../php/admin/bankuai_list/saishi_delete.php",
                    data: {
                        saishi_id: saishi_id
                    },
                    success: function (result) {
                        var obj = JSON.parse(result);
                        alert(obj.message);
                        if (obj.code == 0) {
                            // 在页面上去除该用户
                            var str="#"+saishi_id;
                            $(str).remove();
                            //隐藏模拟框
                            $('#saishi_delete').modal('hide')

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
        saishi_delete: saishi_delete
    }
})
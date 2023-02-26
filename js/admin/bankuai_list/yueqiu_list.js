define(['jquery', 'bootstrap', 'jquery_cookie'], function (jquery, bootstrap, jquery_cookie) {

    function show() {
        $(function () {
            $("#yueqiu_list").click(function () {
                $.ajax({
                    method: "get",
                    url: "../../php/admin/bankuai_list/yueqiu_list.php",
                    success: function (result) {
                        //先清空 再展示
                        $("#list_forUser").empty();
                        var obj = JSON.parse(result);
                        var arr = obj.datas;
                        var arr_reply = obj.datas_reply;
                        var str = `
                        <div class="panel panel-default">
                        <div class="panel-heading"><strong>约球列表</strong></div>
                        <div class="panel-body">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>发布者id</th>
                                        <th>所属类型</th>
                                        <th>地点</th>
                                        <th>发布时间</th>
                                        <th>约定时间</th>
                                        <th>参加人数</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody id="t1">`;
                        for (var i = 0; i < arr.length; i++) {
                            str += `
                        <tr id="${arr[i].yueqiu_id}">
                            <td><strong>${arr[i].yueqiu_id}</strong></td>
                            <td>${arr[i].user_id}</td>
                            <td>${arr[i].module_name}</td>
                            <td>${arr[i].place}</td>
                            <td>${arr[i].publish_time}</td>
                            <td>${arr[i].aim_time}</td>
                            <td>${arr[i].joined_num}</td>
                            <td><button id="btn_yueqiu_delete" value="${arr[i].yueqiu_id}" class="button button-rounded button-small button-caution"  data-toggle="modal" data-target="#yueqiu_delete"><strong>删除</strong></button> </td>
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
    function yueqiu_delete() {
        $(function () {
            $("#list_forUser").empty();
            //点击删除后，把模拟框放进去
            $("#list_forUser").on("click", "#btn_yueqiu_delete", function () {
                //获取都id，作为确认删除按钮的value
                var yueqiu_id = $(this).attr("value");
                var str = `
                    <div class="modal fade" id="yueqiu_delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        &times;
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel">
                                        删除约球
                                    </h4>
                                </div>
                                <div class="modal-body">
                                    <h3><strong>确定要删除该约球吗？</strong></h3>
                                </div>
                                <div class="modal-footer join-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                    <button id="submit_delete_yueqiu" value="${yueqiu_id}" type="button" class="btn btn-primary">确定</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
                $("#list_forUser").append(str);
            })

            //点击确定删除后，进行数据的提交
            $("#list_forUser").on("click", "#submit_delete_yueqiu", function () {
                var yueqiu_id = $(this).attr("value");
                //获取用户id
                $.ajax({
                    method: "get",
                    url: "../../php/admin/bankuai_list/yueqiu_delete.php",
                    data: {
                        yueqiu_id: yueqiu_id
                    },
                    success: function (result) {
                        var obj = JSON.parse(result);
                        alert(obj.message);
                        if (obj.code == 0) {
                            // 在页面上去除该用户
                            var str="#"+yueqiu_id;
                            $(str).remove();
                            //隐藏模拟框
                            $('#yueqiu_delete').modal('hide')

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
        yueqiu_delete: yueqiu_delete
    }
})
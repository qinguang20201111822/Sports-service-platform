define(['jquery', 'bootstrap', 'jquery_cookie'], function (jquery, bootstrap, jquery_cookie) {
    function show() {
        jQuery(document).ready(function ($) {
            $(function () {
            $("#jijin_list").click(function () {
                $.ajax({
                    method: "get",
                    url: "../../php/admin/bankuai_list/jijin_list.php",
                    success: function (result) {
                        //先清空 再展示
                        $("#list_forUser").empty();
                        var obj = JSON.parse(result);
                        var arr = obj.datas;
                        var arr_photo = obj.datas_photos;
                        var str = `
                        <div class="panel panel-default">
                        <div class="panel-heading"><strong>用户集锦列表</strong></div>`;
                        for (var i = 0; i < arr.length; i++) {
                            str += `
                                <div class="panel-body" id="${arr[i].id}">
                                <h3>—————————————————————————————————————</h3>
                                <h4><strong>${arr[i].module_name}</strong>  ${arr[i].publish_time}</h4>
                                    <button id="btn_jijin_delete" value="${arr[i].id}" class="button button-rounded button-small button-caution pull-right"  data-toggle="modal" data-target="#jijin_delete"><strong>删除</strong></button>
                                `;
                            //对照片的数据进行处理
                            var photos = arr_photo[arr[i].id];

                            for (var j = 0; j < photos.length; j++) {
                                str += `<img id="jijin_photo" src="${photos[j].photo}">`;
                            }
                            str += `</div>`;
                        }
                        str += `
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
        })
    }
    function jijin_delete() {
        jQuery(document).ready(function ($) {
            $(function () {
            $("#list_forUser").empty();
            //点击删除后，把模拟框放进去
            $("#list_forUser").on("click", "#btn_jijin_delete", function () {
                //获取都id，作为确认删除按钮的value
                var jijin_id = $(this).attr("value");
                var str = `
                    <div class="modal fade" id="jijin_delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        &times;
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel">
                                        删除集锦
                                    </h4>
                                </div>
                                <div class="modal-body">
                                    <h3><strong>确定要删除该集锦吗？</strong></h3>
                                </div>
                                <div class="modal-footer join-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                    <button id="submit_delete_jijin" value="${jijin_id}" type="button" class="btn btn-primary">确定</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
                $("#list_forUser").append(str);
            })

            //点击确定删除后，进行数据的提交
            $("#list_forUser").on("click", "#submit_delete_jijin", function () {
                var jijin_id = $(this).attr("value");
                //获取用户id
                $.ajax({
                    method: "get",
                    url: "../../php/admin/bankuai_list/jijin_delete.php",
                    data: {
                        jijin_id: jijin_id
                    },
                    success: function (result) {
                        var obj = JSON.parse(result);
                        alert(obj.message);
                        if (obj.code == 0) {
                            // 在页面上去除该用户
                            var str = "#" + jijin_id;
                            $(str).remove();
                            //隐藏模拟框
                            $('#jijin_delete').modal('hide')

                        }
                    },
                    error: function () {
                        alert(msg)
                    }
                })
            })
        })
        })
    }
    return {
        show: show,
        jijin_delete: jijin_delete
    }
})
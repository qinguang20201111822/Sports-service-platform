define(['jquery', 'jquery_cookie'], function ($) {
    function search() {
        $("#header").load("../public/header.html");
        //在首页输入后进行的搜索
        $(function () {
            var input = $.cookie("input");
            $.ajax({
                method: "get",
                url: "../../php/search.php",
                data: {
                    input: input
                },
                success: function (result) {
                    
                    var ss=`<input type="text" id="input" placeholder="${input}">`;
                    $("#guanjianzi").append(ss);
                    //先进行清空
                    $(".panel-footer").empty();
                    var obj = JSON.parse(result);
                    var arr = obj.datas;
                    if (obj.code != 0) {
                        alert(obj.message);
                    } else {
                        var str = `
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>标题</th>
                                    <th>所属</th>
                                    <th>发布时间</th>
                                </tr>
                            </thead>
                            <tbody id="t1">`;
                        for (var i = 0; i < arr.length; i++) {
                            //判断类型
                            if (arr[i][0] == "集锦拍摄") {
                                str += `<tr><td><a target="_blank" href="../BanKuai/shooting.html?id=${arr[i].yueqiu_id}">${arr[i].module_name}</a></td>`;
                            } else if (arr[i][0] == "约球频道") {
                                //根据约球的类别，进行跳转，直接根据id进行设置href
                                str += `<tr><td><a target="_blank" href="../BanKuai/YueQiu.html?id=${arr[i].module_id}">${arr[i].content}</a></td>`;
                            } else {
                                str += `<tr><td><a target="_blank" href="../show/show_saiShi.html?id=${arr[i].id}">${arr[i].title}</a></td>`;
                            }
                            str += ` <td>${arr[i][0]}</td>
                                    <td>${arr[i].publish_time}</td>
                                    </tr>`;
                        }
                        str += `</tbody></table>`;
                        $(".panel-footer").append(str);
                    }
                    //搜索完成后，删除cookie("input")
                    $.cookie("input", null, {
                        path: "/"
                    });
                },
                error: function (msg) {
                    alert(msg)
                }
            })

            //在搜索页面输入后进行的搜索
            $(".panel-body").on("click", "#btn1", function () {
                var input = $("#input").val();
                $.ajax({
                    method: "get",
                    url: "../../php/search.php",
                    data: {
                        input: input
                    },
                    success: function (result) {
                        //先进行清空
                        $(".panel-footer").empty();
                        var obj = JSON.parse(result);
                        var arr = obj.datas;
                        if (obj.code != 0) {
                            alert(obj.message);
                        } else {
                            var str = `
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>标题</th>
                                        <th>所属</th>
                                        <th>发布时间</th>
                                    </tr>
                                </thead>
                                <tbody id="t1">`;
                            for (var i = 0; i < arr.length; i++) {
                                //判断类型
                                if (arr[i][0] == "集锦拍摄") {
                                    str += `<tr><td>${arr[i].module_name}</td>`;
                                } else if (arr[i][0] == "约球频道") {
                                    str += `<tr><td>${arr[i].content}</td>`;
                                } else {
                                    str += `<tr><td>${arr[i].title}</td>`;
                                }
                                str += ` <td>${arr[i][0]}</td>
                                            <td>${arr[i].publish_time}</td>
                                            </tr>`;
                            }
                            str += `</tbody></table>`;
                            $(".panel-footer").append(str);
                        }
                        //搜索完成后，删除cookie("input")
                        $.cookie("input", null, {
                            path: "/"
                        });
                    },
                    error: function (msg) {
                        alert(msg)
                    }
                })
            })
        })
    }
    return {
        search: search
    }

})
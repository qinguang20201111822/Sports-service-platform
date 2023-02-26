define(['jquery', 'bootstrap', 'jquery_cookie'], function (jquery, bootstrap, jquery_cookie) {

    function show() {
        var user_id = $.cookie("user_id");
        if (user_id == null) {
            $(".container-fluid").remove();
            alert("请先登录")
            setTimeout(function () {
                location.href = "login.html";
            }, 200);
        } else {
            $(function () {
                var user_name=$.cookie("user_name");
                $("#user_name").text(user_name);
                $.ajax({
                    method: "get",
                    url: "../../php/admin/index.php",
                    success: function (result) {
                        var obj = JSON.parse(result);
                        var str = `
                            <ul class="list-group">
                            <li class="list-group-item ">
                                <h3><span><strong>小名</strong></span></h3>
                                <h5>
                                    <span>IP：${obj.ip} </span>
                                </h5>
                            </li>
                            <li class="list-group-item list-group-item-warning">
                                <h4>${obj.location} ${'\xa0'}${obj.tq}${'\xa0'} <strong>${obj.high}</strong> ${'\xa0'}<strong>${obj.low}</strong></h4>
                            </li>
        
                            <li class="list-group-item list-group-item-danger">
                                <h4><span class="glyphicon glyphicon-paperclip" aria-hidden="true"></span>
                                ${obj.tip}
                            </li>
                            <li class="list-group-item">
                                <img src="https://api.vvhan.com/api/bing">
                            </li>
                        </ul>
                        `;
                        $("#list_forUser").append(str);

                    },
                    error: function (msg) {
                        alert(msg)
                    }
                })
            })
        }
    }
    function login_out(){
        $(".container-fluid").on("click", "#login_out", function () {
            $.cookie("user_name", null, { path: "/", expires: -1 });
            $.cookie("user_id", null, { path: "/", expires: -1 });
            alert("退出成功")
            //跳转到首页
            location.href = "login.html";
        })
    }
    return {
        show: show,
        login_out:login_out
    }
})
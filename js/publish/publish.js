define(['jquery', 'jquery_cookie'], function ($) {
    function publish() {
        $("#header").load("../public/header.html");
        $(function () {
            $.ajax({
                method: "get",
                url: "../../php/get_portName.php",
                success: function (result) {
                    var obj = JSON.parse(result);
                    var arr = obj.datas_part;
                    var str = ``;
                    for (var i = 0; i < arr.length; i++) {
                        str += `<option value="${arr[i].id}">${arr[i].module_name}</option>`;
                    }
                    $("#part").append(str);
                },
                error: function (msg) {
                    alert(msg);
                }
            });


            $("#btn1").on("click", function () {
                var aInputs = document.getElementsByTagName("input");
                // var aInputs = $("input").val();
                var oBtn1 = $("#btn1").val();
                var module_id = $("#part").val();
                var content = $("#content").val();
                //获取用户的id
                var user_id = $.cookie("user_id");
                $.ajax({
                    method: "post",
                    url: "../../php/publish.php",
                    data: {
                        user_id: user_id,
                        module_id: module_id,
                        place: aInputs[1].value,
                        aim_time: aInputs[2].value,
                        content: content,
                    },
                    success: function (result) {
                        var obj = JSON.parse(result);
                        if (obj.code == 1) {
                            alert(obj.message);
                        } else {
                            alert(obj.message);
                        }
                    },
                    error: function (msg) {
                        alert(msg);
                    }
                });
            })
        })
    }
    return{
        publish:publish
    }
})
define(["jquery", "jquery_cookie"], function ($) {
    function index() {

        $(function () {
            $("#header").load("../public/header.html");
            //获取版块的内容
            $.ajax({
                method: "post",
                url: "../../php/index.php",
                success: function (result) {
                    //处理转化数据
                    var obj = JSON.parse(result);
                    var arr_father = obj.datas_father;
                    var arr_son = obj.datas_son;
                    var saiShi_count = obj.saiShi_count;
                    var shooting_count = obj.shooting_count;
                    var yueQiu_count = obj.yueQiu_count;
                    for (var i = 0; i < arr_father.length; i++) {
                        var str = `
                        <h3><span class="label label-danger">New</span><span style="color: white;">${arr_father[i].module_name}<span> </h3>
                        <div class="row">
                        `;
                        for (var j = 0; j < arr_son.length; j++) {
                            if (arr_father[i].id == arr_son[j].father_module_id) {
                                str += `
                                <div class="col-sm-6 col-md-3">
                                <div class="thumbnail">`;
                                //进行版块分离跳转
                                if (arr_father[i].module_name == '约球频道') {
                                    str += `
                                    <a target="_blank" href="../BanKuai/YueQiu.html?id=${arr_son[j].id}"><img src="../../image/basketball.jpeg"></a>`;
                                } else if (arr_father[i].module_name == '赛事专区') {
                                    str += `
                                    <a target="_blank" href="../BanKuai/SaiShi.html?id=${arr_son[j].id}"><img src="../../image/basketball.jpeg"></a>`;
                                } else if (arr_father[i].module_name == '集锦拍摄') {
                                    str += `
                                    <a target="_blank" href="../BanKuai/shooting.html?id=${arr_son[j].id}"><img src="../../image/basketball.jpeg"></a>`;
                                }

                                str += `
                                <div class="caption">
                                <h3>${arr_son[j].module_name}</h3>`;

                                if (arr_father[i].module_name == '集锦拍摄') {
                                    str += `
                                    <p>${arr_son[j].info}</p>
                                    <p>
                                    <a class="btn btn-default" role="button">点赞数：<span class="badge">${shooting_count[arr_son[j].id]}</span></a>
                                    <a target="_blank" href="../BanKuai/shooting.html?id=${arr_son[j].id}" class="button button-border button-rounded button-primary" role="button">查看</a>
                                    </p>
                                    </div></div></div>`;
                                } else if (arr_father[i].module_name == '约球频道') {
                                    str += `
                                    <p>最新发布：</p>
                                    <p>
                                    <a class="btn btn-default" role="button">近一周发布数：<span class="badge">${yueQiu_count[arr_son[j].id]}</span></a>
                                    <a target="_blank" href="../BanKuai/YueQiu.html?id=${arr_son[j].id}" class="button button-border button-rounded button-primary" role="button">浏览</a>
                                    </p>
                                    </div></div></div>`;
                                } else if (arr_father[i].module_name == '赛事专区') {
                                    str += `
                                    <p>最新赛事：</p>
                                    <p>
                                    <a class="btn btn-default" role="button">近一周赛事数：<span class="badge">${saiShi_count[arr_son[j].id]}</span></a>
                                    <a target="_blank" href="../BanKuai/SaiShi.html?id=${arr_son[j].id}" class="button button-border button-rounded button-primary" role="button">浏览</a>
                                    </p>
                                    </div></div></div>`;
                                } else {
                                    str += `
                                    <p>${arr_son[j].info}</p>
                                    <p>
                                    <a class="btn btn-default" role="button">总浏览量：<span class="badge">${saiShi_count[arr_son[j].id]}</span></a>
                                    <a target="_blank" href="../BanKuai/shooting.html?id=${arr_son[j].id}" class="button button-border button-rounded button-primary" role="button">查看</a>
                                    </p>
                                    </div></div></div>`;
                                }
                            }
                        }
                        str += `</div>`;
                        $(str).insertAfter("#bankuai");
                    }

                },
                error: function (msg) {
                    alert(msg);
                }
            });
            //获取新闻热点的内容
            $.ajax({
                method: "post",
                url: "../../php/hot_news.php",
                success: function (result) {
                    var obj = JSON.parse(result);
                    var arr = obj.datas;
                    var str = `
                        <h3><span class="label label-danger">New</span> <span style="color: white;">热门动态<span> </h3>`;
                    for (var i = 0; i < arr.length; i++) {
                        str += `
                        <div class="row">
                            <div class="col-sm-6 col-md-3">
                                <div class="thumbnail">
                                    <a target="_blank" href="../BanKuai/hotNews.html?id=${arr[i].news_id}"></a>
                                    <div class="caption"><span >
                                        <h4 >${arr[i].title}</h4>
                                        <span class="label label-danger">发布时间</span><span class="badge"> ${arr[i].publish_time}</span>
                                        <p>
                                            <h4>
                                                <p></p> 
                                                <a target="_blank" href="../BanKuai/hotNews.html?id=${arr[i].news_id}" class="button button-border button-rounded button-primary" role="button">查看详情</a>
                                            </h4>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                    str += `</div>`;
                    $(str).insertAfter("#hot_news");
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        })
    }
    return {
        index: index
    }
})
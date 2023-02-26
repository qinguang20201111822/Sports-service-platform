define(['jquery','bootstrap', 'tools', 'jquery_cookie'], function (jquery,bootstrap, tools, $) {
    function show() {
        jQuery(document).ready(function ($) {
            $(function () {
            $("#header").load("../public/header.html");
            //赛事的数据获取
            $.ajax({
                method: "get",
                url: "../../php/show/saiShi.php",
                data: {
                    saiShi_id: GetUrlString("id")
                },
                success: function (result) {
                    var obj = JSON.parse(result);
                    if (obj.code != 0) {
                        var str = `
                        <div class="alert alert-danger" role="alert"><h2>参数不合法</h2></div>`;
                        $("#contain").append(str);
                    } else {
                        //获取数据
                        var datas = obj.data_saiShi;
                        //文件title改名
                        $("#title").append(datas.title)
                        //给button附上链接
                        $("#join_saiShi").attr("href", datas.link);
                        var str = `
                            <h1 class="news-title">${datas.title}</h1>
                            <div class="news-status">
                                <blockquote>
                                    <p>
                                        发布时间：${datas.publish_time} ${'\xa0'}
                                        截止时间：${datas.end_time} 
                                    </p>
                                </blockquote>
                                
                            </div>
                            `;
                        $("#show_title").prepend(str);
                        
                        str = `
                            <button class="button button-border button-rounded button-primary form-control"><strong>立即报名</strong></button><br>
                            `;
                        $("#join_saiShi").prepend(str);

                        str = `
                            <div class="news-content">
                                ${datas.content} 
                            </div>
                    `;
                        $("#show_content").append(str);
                        // str = `
                   
                           
                        // `;
                        // $("#show_photo").append(str);
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
        show: show,
    }
})
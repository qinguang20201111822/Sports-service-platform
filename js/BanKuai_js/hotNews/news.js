define(['jquery', 'bootstrap', 'tools', 'jquery_cookie'], function (jquery, bootstrap, tools, $) {
    function news() {
        jQuery(document).ready(function ($) {
            $(function () {
                $("#header").load("../public/header.html");
                //赛事帖子的数据获取
                $.ajax({
                    method: "get",
                    url: "../../php/get_hotNews.php",
                    data: {
                        news_id: GetUrlString("id")
                    },
                    success: function (result) {
                        var obj = JSON.parse(result);

                        //获取数据
                        var data_news = obj.data_news;
                        //文件title改名
                        $("#title").append(data_news.title)

                        var str = `
                    <h1 class="news-title">${data_news.title}</h1>
                    <div class="news-status">
                        <blockquote>
                            <p>
                                发布时间:${data_news.publish_time} 
                            </p>
                        </blockquote>

                    </div>
                    <div class="news-content">
                        ${data_news.content} 
                    </div>
                    `;
                        $(".col-md-8").append(str);

                    },
                    error: function (msg) {
                        alert(msg);
                    }
                })

            })
        })
    }

    return {
        news: news,
    }
})
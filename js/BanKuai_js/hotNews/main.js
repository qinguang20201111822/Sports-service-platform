require.config({
    paths:{
        "jquery": "../../jQuery",
        "jquery_cookie":"../../jquery.cookie",
        "bootstrap":"../../bootstrap.min",
        "tools":"../../tools",
        "news":"news",
        "comment":"comment"
    },
    shim:{
        "jquery_cookie": ["jquery"],
        "tools":{
            exports:"_"
        },
        "bootstrap":{
            exports:"_"
        }

    }
})

require(['news','comment'],function(news,comment){
    news.news();
    comment.comment_list();
    comment.dianzan();
    comment.comment();
})



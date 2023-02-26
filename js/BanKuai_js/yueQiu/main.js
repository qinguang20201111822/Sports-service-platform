require.config({
    paths:{
        "jquery": "../../jQuery",
        "jquery_cookie":"../../jquery.cookie",
        "bootstrap":"../../bootstrap.min",
        "tools":"../../tools",
        "yueQiu_show":"yueQiu_show",
        "join":"join"
    },
    shim:{
        "jquery_cookie": ["jquery"],
        "tools":{
            exports:"_"
        }

    }
})

require(['yueQiu_show','join'],function(yueQiu_show,join){
    yueQiu_show.yueQiu_show();
    join.join();
    join.join_comment()
})



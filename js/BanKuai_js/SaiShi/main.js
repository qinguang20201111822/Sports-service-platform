require.config({
    paths:{
        "jquery": "../../jQuery",
        "jquery_cookie":"../../jquery.cookie",
        "tools":"../../tools",
        "saiShi_show":"saiShi_show"
    },
    shim:{
        "jquery_cookie": ["jquery"],
        "tools":{
            exports:"_"
        }
    }
})

require(['saiShi_show'],function(saiShi_show){
    saiShi_show.saiShi_show();
})



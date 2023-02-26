require.config({
    paths:{
        "jquery": "../../jQuery",
        "jquery_cookie":"../../jquery.cookie",
        "bootstrap":"../../bootstrap.min",
        "tools":"../../tools",
        "show":"show",
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

require(['show'],function(show){
   show.show();
})



require.config({
    paths:{
        "jquery": "../../jQuery",
        "jquery_cookie":"../../jquery.cookie",
        "bootstrap":"../../bootstrap.min",
        "tools":"../../tools",
        "shooting":"shooting_show"
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

require(['shooting'],function(shooting){
    shooting.shooting_show();
    shooting.like();
})



require.config({
    paths: {
        "jQuery": "../jquery",
        "jquery_cookie": "../jquery.cookie",
        "bootstrap":"../bootstrap.min",
        "user_center": "user_center"
    },
    shim:{
        "jquery_cookie": ["jQuery"]    
    }
})

require(["user_center"], function (user_center) {
    user_center.header();
    user_center.myCenter();
    user_center.change_head();
    user_center.change_phone();
    user_center.change_pw();

    user_center.myPublish();
    user_center.myMessage();
})
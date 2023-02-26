require.config({
    paths: {
        "jquery": "../jQuery",
        "jquery_cookie": "../jquery.cookie",
        "publish": "publish"
    },
    shim:{
        "jquery_cookie": ["jquery"]    
    }
})

require(["publish"], function (publish) {
    publish.publish();
})
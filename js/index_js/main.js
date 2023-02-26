require.config({
    paths: {
        "jquery": "../jQuery",
        "jquery_cookie":"../jquery.cookie",
        "index":"index"
    },
    shim: {
        //设置函数依赖，先加载jquery.js再加载jquery.cookie.js
        "jquery_cookie": ["jquery"],
        //如果有模块不遵从AMD规范的(像一个js文件里为一个方法)
        // "文件名":{
        //     exports:"_"
        // }
    }
})

//引入模块
require(['index'],function(index){
    index.index();
})

require.config({
    paths: {
        "jquery": "../jQuery",
        "bootstrap": "../bootstrap.min",
        "jquery_cookie": "../jquery.cookie",
        "index": "index",
        "user_list": "user_admin/user_list",
        "adminer_list": "user_admin/adminer_list",
        "news_list": "bankuai_list/news_list",
        "saishi_list": "bankuai_list/saishi_list",
        "yueqiu_list": "bankuai_list/yueqiu_list",
        "jijin_list": "bankuai_list/jijin_list",
        "news_add": "bankuai_add/news_add",
        "saishi_add": "bankuai_add/saishi_add",
    },
    shim: {
        "jquery_cookie": ["jquery"],
        "tinymce":{
            exports:"_"
        }

    }
})

require(['index', 'user_list', 'adminer_list', 'news_list', 'saishi_list', 'yueqiu_list', 'jijin_list',
'news_add','saishi_add'],
    function (index, user_list, adminer_list, news_list, saishi_list, yueqiu_list, jijin_list,news_add,saishi_add) {
        //首页面
        index.show();
        index.login_out();
        //用户列表
        user_list.show();
        user_list.user_delete();
        //管理员列表
        adminer_list.show();
        adminer_list.adminer_delete()
        adminer_list.adminer_add();
        //新闻列表
        news_list.show();
        news_list.news_delete();
        //赛事列表
        saishi_list.show();
        saishi_list.saishi_delete();
        //约球列表
        yueqiu_list.show();
        yueqiu_list.yueqiu_delete();
        //集锦列表
        jijin_list.show();
        jijin_list.jijin_delete();
        //新闻添加
        news_add.add(); 
        //新闻添加
        saishi_add.add();
    })
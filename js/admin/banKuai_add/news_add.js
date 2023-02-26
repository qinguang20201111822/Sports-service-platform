define(['jquery', 'bootstrap', 'jquery_cookie',], function (jquery, bootstrap, jquery_cookie) {

    function add() {
        $(function () {
            $("#news_add").click(function () {
                $("#list_forUser").empty();
                var str = `
                <div class="panel-body">
                    <div class="form-group">
                        <label for="title">标题</label>
                        <input type="text" class="form-control" id="title" placeholder="请输入新闻标题">
                    </div>
                        <label for="content">内容</label>
                        <textarea class="form-control" rows="3" id="content" placeholder="请在此编辑新闻内容..."></textarea>
                    <a id="btn" class="button button-block button-rounded button-caution button-large"><strong>发布</strong></a>

                </div>

                `;
                $("#list_forUser").append(str);

                //富文本
                tinymce.init({
                    selector: '#content',
                    language: 'zh_CN', //中文，需要引入zh_CN.js
                    plugins: 'preview autolink directionality visualchars fullscreen image link template code table pagebreak nonbreaking anchor insertdatetime advlist lists wordcount autoresize imagetools',

                    content_style: "body {font-family:\"微软雅黑\";font-size:20px;height:100px; }",//自定义编辑器样式

                    max_height: 450, //编辑器最大高度（超过这个高度出现滚动条）
                    toolbar: 'undo redo fontsizeselect fontselect forecolor backcolor bold italic underline strikethrough alignleft aligncenter alignright outdent indent blockquote removeformat bullist numlist link table image lineheight preview code codesample fullscreen',

                    branding: false, //隐藏编辑器右下角标识
                    menubar: false, //隐藏菜单栏
                    images_upload_url: '../../php/admin/add/news_content.php',
                    images_upload_base_path: '/src',//其作用是：定义好一个基准路径，和PHP返回的路径进行拼接，得到完整的相对路径 
                })

                //点击发布后进行上传
                $("#btn").click(function () {
                    var title=$("#title").val();
                    var content = tinyMCE.activeEditor.getContent();
                    $.ajax({
                        method: "get",
                        url: "../../php/admin/add/news_add.php",
                        data: {
                            title: title,
                            content:content
                        },
                        success: function (result) {
                            var obj=JSON.parse(result);
                            alert(obj.message);
                            if(obj.code==0){
                                $("#title").val("");
                                tinymce.activeEditor.setContent("")
                            }
                        },
                        error: function (msg) {
                            alert(msg)
                        }

                    })
                })
            })

        })
    }

    return {
        add: add,
    }
})
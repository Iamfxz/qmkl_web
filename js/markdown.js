$(document).ready(
    function () {
        editormd("my-editormd", { //注意1：这里的就是上面的DIV的id属性值
            placeholder: "此处开始编写您要发布的内容...",
            width: "95%",
            height: 600,
            //markdown : md,
            codeFold: true,
            syncScrolling: "single",
            //你的lib目录的路径
            path: "tools/editor-master/lib/",
            imageUpload: true,//图片上传功能
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL: "img/uploadImg",
            /* theme: "dark",//工具栏主题
            previewTheme: "dark",//预览主题
            editorTheme: "pastel-on-dark",//编辑主题  */
            emoji: true,
            taskList: true,
            tocm: true,         // Using [TOCM]
            tex: true,                   // 开启科学公式TeX语言支持，默认关闭
            flowChart: true,             // 开启流程图支持，默认关闭
            sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
            //这个配置在simple.html中并没有，但是为了能够提交表单，使用这个配置可以让构造出来的HTML代码直接在第二个隐藏的textarea域中，方便post提交表单。
            saveHTMLToTextarea: true,
            toolbarIcons: function () {
                // Or return editormd.toolbarModes[name]; // full, simple, mini
                // Using "||" set icons align right.
                return ["undo", "redo", "|", "bold", "italic", "quote", "uppercase", "lowercase", "|", "h1", "h2", "h3", "h4", "|", "list-ul", "list-ol", "hr", "|", "link", "image", "code", "code-block", "table", "html-entities", "|", "watch", "preview", "fullscreen", "clear", "|", "help"]
            }
        });
    }
);




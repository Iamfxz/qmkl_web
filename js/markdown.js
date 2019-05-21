$(function() {
    editormd("my-editormd", { //注意1：这里的就是上面的DIV的id属性值
        width: "95%",
        height: 540,
        syncScrolling: "single",
        theme : "dark",
        previewTheme : "dark",
        emoji : true,
        //imageUpload : true,//显示本地上传
        path: "tools/editor-master/lib/", //注意2：你的路径
        saveHTMLToTextarea: true ,//注意3：这个配置，方便post提交表单
        toolbarIcons:function () {
            return ["bold","italic","quote","|","h1","h2","h3","|","list-ul","list-ol","|","link","reference-link","image","code","preformatted-text","code-block","table","datetime","emoji","pagebreak","|","goto-line","watch","preview"]
        }
    });

});




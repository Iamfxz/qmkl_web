//显示帖子详情

function showPost(myPostId) {
    var x=myPostId.toString();
    var myData = {
        token: $.cookie('qmkl_token'),
        postId:x
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://119.23.238.215:8080/qmkl1.0.0/web/post/list/detail",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json;charset=UTF-8",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(myData)
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        if(response.code == 200){
            var po=response.data.webPost;
            /*
            先移除div id=test-editormd-view；中的子元素然后再重新添加
             */
            $("#test-editormd-view").empty();
            var txt1="<textarea style=\"display: none\" name=\"test-editormd-markdown-doc\" id=\"postInfoText\"></textarea>";
            $("#test-editormd-view").append(txt1);
            $("#postInfoTitle").html(po.title);
            $("#postLikeNum").html("点赞数："+po.likeNum);
            $("#postDislikeNum").html("点踩数："+po.disLikeNum);
            $("#postCommentNum").html("评论数："+po.commentNum);
            $("#postInfoTime").html("发布时间："+po.createTime);
            $("#postInfoText").val(po.content);
            testEditormdView2 = editormd.markdownToHTML("test-editormd-view", {
                htmlDecode      : "",  // you can filter tags decode
                emoji           : true,
                taskList        : true,
                tex             : true,  // 默认不解析
                flowChart       : true,  // 默认不解析
                sequenceDiagram : true,  // 默认不解析
            });
            $("#postList").hide();
            $("#postInfo").show();
             }
        else {

            alert(x);
            alert("查询失败，请先登录再查询");
        }
    });
}


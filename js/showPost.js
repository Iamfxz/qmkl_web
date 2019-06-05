//显示帖子详情

function showPost(myPostId) {
    var x=myPostId.toString();
    $.cookie("postId",x);
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
            var pi=response.data.user;
            /*
            先移除div id=test-editormd-view；中的子元素然后再重新添加
             */
            $("#test-editormd-view").empty();
            var txt1="<textarea style=\"display: none\" name=\"test-editormd-markdown-doc\" id=\"postInfoText\"></textarea>";
            $("#test-editormd-view").append(txt1);
            $("#postInfoTitle").html(po.title);
            $("#postLikeNum").html(po.likeNum);
            $("#postDislikeNum").html(po.disLikeNum);
            $("#postCommentNum").html("评论数："+po.commentNum);
            $.cookie("postCommentNum",po.commentNum);
            $("#postInfoTime").html("发布时间："+po.createTime);
            $("#postInfoText").val(po.content);

            $("#postInfoNickname").text(pi.nickname);
            $("#infoNickname_2").text($.cookie("userNickname"));

            var userImg="http://119.23.238.215:8080/qmkl1.0.0/user/download/avatar/"+pi.avatar;
            $("#postInfoportrait").attr("src",userImg);
            var userImg2="http://119.23.238.215:8080/qmkl1.0.0/user/download/avatar/"+$.cookie("userAvatar");
            $("#portrait_2").attr("src",userImg2);

            testEditormdView2 = editormd.markdownToHTML("test-editormd-view", {
                htmlDecode      : "",  // you can filter tags decode
                emoji           : true,
                taskList        : true,
                tex             : true,  // 默认不解析
                flowChart       : true,  // 默认不解析
                sequenceDiagram : true,  // 默认不解析
            });
            $("#postList").hide();
            $("#myPost").hide();
            $("#postInfo").show();

            showReplylist(1);
            $.cookie("currentContentPageNum",1);
             }
        else {

            alert(x);
            alert("查询失败，请先登录再查询");
        }
    });
}

//显示帖子回复表


function showReplylist(num) {

        var myData = {
            token: $.cookie('qmkl_token'),
            postId:$.cookie("postId"),
            num:"8",
            page:num.toString()

        };
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://119.23.238.215:8080/qmkl1.0.0/web/comment/list",
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
                $("#replyPostList").show();
                $("#replyPostList").empty();

                for(var i=0;response.data.length>i;i++){
                    var htmlstr ="<div class='list-group-item my-list-group-item active '>"+
                        "<span class=\"badge badge-info author\"><span class=\"glyphicon glyphicon-thumbs-down\" onclick=\"isaddCommentDisLike("+response.data[i].id+")\"></span>" +
                        "<span id=\"commentIdDisLike"+response.data[i].id+"\" class=\"badge badge-info author\">"+ response.data[i].dislikeNum+"</span> </span>" +
                        "<span class=\"badge badge-info author\"><span class=\"glyphicon glyphicon-thumbs-up\" onclick=\"isaddCommentLike("+response.data[i].id+")\"></span>" +
                        "<span id=\"commentIdLike"+response.data[i].id+"\" class=\"badge badge-info author\">"+ response.data[i].likeNum+"</span> </span>" +
                        "                <span class=\"badge badge-info post-time\">时间："+response.data[i].createTime+"</span>\n" +
                        "                <div>\n" +
                        "                    <span class=\"badge badge-info author\">层主："+response.data[i].nickName+"</span>\n" +
                        "                    <br><br>\n" +
                        "                    <span class=\"badge badge-info author\">内容："+response.data[i].content+"</span>\n" +
                        "                    <spam></spam>\n" +
                        "                </div><br><br>"+"</div>";

                    $("#replyPostList").append(htmlstr);
                }
                var page=$.cookie("postCommentNum");
                var y=Math.ceil((page)/8);
                if(y=="0")
                {
                    $("#showReplyMessage").text("当前页数为："+num+"页 - - - - - -总共"+(y+1)+"页");
                }
                else
                {
                    $("#showReplyMessage").text("当前页数为："+num+"页 - - - - - -总共"+y+"页");
                }
                if(num==1)
                {
                    $("#preReplyPageNode").attr("class","next disabled");
                }
                else if(num==y)
                {
                    $("#nextReplyPageNode").attr("class","next disabled");
                }
                else{
                    $("#nextReplyPageNode").attr("class","previous");
                    $("#preReplyPageNode").attr("class","previous");
                }

            }
            else {
                alert("查询失败，请先登录再查询");
            }
        });

}



//回复帖子
function replyPost() {
    if ($("#replyPostContent").text()==null){
       alert("发帖内容不能为空！！！");
    }
    else
    {
        var myData = {
            token: $.cookie('qmkl_token'),
            postId: $.cookie("postId"),
            content:$("#replyPostContent").val(),
            replyUserId: $.cookie("userID")
        };
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://119.23.238.215:8080/qmkl1.0.0/web/comment/add",
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
                alert("回复成功");
                $("#replyPostContent").val("");
                showReplylist();
            }
            else {
                alert("查询失败，请先登录再查询");
            }
        });
    }

}


//帖子点赞和点灭
//先判断然后再执行
function isaddLike() {

    var myData = {
        token: $.cookie('qmkl_token'),
        postId:$.cookie("postId")

    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://119.23.238.215:8080/qmkl1.0.0/web/post/like/islike",
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
            if(response.data !="true" )
            {
                addlike();
            }
            else
            {
                alert("你已经点赞过了！");
            }
        }
        else {
            alert("点赞失败，请先登录再查询"+$.cookie('qmkl_token')+$.cookie("postId"));
        }
    });

}

function addlike() {
    var myData = {
        token: $.cookie('qmkl_token'),
        postId:$.cookie("postId")

    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://119.23.238.215:8080/qmkl1.0.0/web/post/like/add",
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
            var num = $('#postLikeNum').text();
            num++;
            $("#postLikeNum").empty();
            $('#postLikeNum').text(num);
        }
        else {
            alert("点赞失败，请先登录再点赞");
        }
    });

}



//点踩帖子
function isadddisLike(){

    var myData = {
        token: $.cookie('qmkl_token'),
        postId:$.cookie("postId")

    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://119.23.238.215:8080/qmkl1.0.0/web/post/dislike/isdislike",
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
            if(response.data != "true" )
            {
                adddisLike();
            }
            else
            {
                alert("你已经点灭过了！")
            }
        }
        else {
            alert("点灭失败，请先登录再查询");
        }
    });

}


function adddisLike() {
    var myData = {
        token: $.cookie('qmkl_token'),
        postId:$.cookie("postId")

    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://119.23.238.215:8080/qmkl1.0.0/web/post/dislike/add",
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
            var num = $('#postDislikeNum').text();
            num++;
            $("#postDislikeNum").empty();
            $('#postDislikeNum').text(num);
        }
        else {
            alert("点赞失败，请先登录再查询");
        }
    });

}
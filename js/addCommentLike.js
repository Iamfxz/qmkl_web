//评论点赞和点灭
//先判断然后再执行
function isaddCommentLike(commentId) {
    var x=commentId.toString();
    var myData = {
        token: $.cookie('qmkl_token'),
        commentId:x

    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://119.23.238.215:8080/qmkl1.0.0/web/comment/like/islike",
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
                addCommentLike(x);
            }
            else
            {
                $("#ourModalContent").empty();
                $("#ourModalContent").text("你已经点赞过了！");
                $('#ourModal').modal('show');
            }
        }
        else {
            $("#ourModalContent").empty();
            $("#ourModalContent").text("点赞失败");
            $('#ourModal').modal('show');
        }
    });

}

function addCommentLike(x) {
    var myData = {
        token: $.cookie('qmkl_token'),
        commentId:x

    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://119.23.238.215:8080/qmkl1.0.0/web/comment/like/add",
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
            var name="#commentIdLike"+x;
            var num = $(name).text();
            num++;
            $(name).empty();
            $(name).text(num);
        }
        else {
            $("#ourModalContent").empty();
            $("#ourModalContent").text("点赞失败");
            $('#ourModal').modal('show');
        }
    });

}



//点踩帖子
function isaddCommentDisLike(commentId){
    var x=commentId.toString();
    var myData = {
        token: $.cookie('qmkl_token'),
        commentId:x

    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://119.23.238.215:8080/qmkl1.0.0/web/comment/dislike/isdislike",
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
            if(response.data!= "true" )
            {
                addCommentDisLike(x);
            }
            else
            {
                $("#ourModalContent").empty();
                $("#ourModalContent").text("你已经点灭过了！");
                $('#ourModal').modal('show');
            }
        }
        else {
            $("#ourModalContent").empty();
            $("#ourModalContent").text("点灭失败");
            $('#ourModal').modal('show');
        }
    });

}


function addCommentDisLike(x) {
    var myData = {
        token: $.cookie('qmkl_token'),
        commentId:x

    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://119.23.238.215:8080/qmkl1.0.0/web/comment/dislike/add",
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
            var name="#commentIdDisLike"+x;
            var num = $(name).text();
            num++;
            $(name).empty();
            $(name).text(num);
        }
        else {
            $("#ourModalContent").empty();
            $("#ourModalContent").text("点灭失败");
            $('#ourModal').modal('show');
        }
    });

}
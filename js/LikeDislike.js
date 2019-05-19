var hasLike = false;
var hasDislike = false;
/**
 *  发送点赞请求，每个用户最多只能点一次赞，再点一次则取消点赞
 * @param fileID 文件的ID
 * @param isLike  是否点过
 */
function like(fileID) {
    var myData = {
        fileId: fileID.toString(),
        token: $.cookie('qmkl_token')
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://120.77.32.233/qmkl1.0.0/like/addordesc",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(myData)
    };

    $.ajax(settings).done(function (response) {
        var fileLikeNum = $("#fileLikeNum");
        var num = fileLikeNum.text();
        if(hasLike){
            fileLikeNum.text(parseInt(num) - 1);
            $("#likeIcon").attr('src', "img/icon/like.png");
            hasLike = false;
        }else {
            fileLikeNum.text(parseInt(num) + 1);
            $("#likeIcon").attr('src', "img/icon/like_cancel.png");
            hasLike = true;
        }
    });
}

/**
 *  发送点踩请求，每个用户最多只能点一次踩，再点一次则取消点踩
 * @param fileID 文件的ID
 * @param isDislike 是否点过
 */
function dislike(fileID, isDislike) {
    var myData = {
        fileId: fileID.toString(),
        token: $.cookie('qmkl_token')
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://120.77.32.233/qmkl1.0.0/dislike/addordesc",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(myData)
    };

    $.ajax(settings).done(function (response) {
        var fileDislikeNum = $("#fileDislikeNum");
        var num = fileDislikeNum.text();
        if(hasDislike){
            fileDislikeNum.text(parseInt(num) - 1);
            $("#dislikeIcon").attr('src', "img/icon/dislike.png");
            hasDislike = false;
        }else {
            fileDislikeNum.text(parseInt(num) + 1);
            $("#dislikeIcon").attr('src', "img/icon/dislike_cancel.png");
            hasDislike = true;
        }
    });
}

/**
 *  判断用户是否点过赞，用于刚开始加载文件详情模块的时候
 * @param fileID
 */
function isLike(fileID) {
    var myData = {
        fileId: fileID.toString(),
        token: $.cookie('qmkl_token')
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://120.77.32.233/qmkl1.0.0/like/is/like",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(myData)
    };

    $.ajax(settings).done(function (response) {
        if (response.data === true) {
            $("#likeIcon").attr('src', "img/icon/like_cancel.png");
            hasLike = true;
        } else {
            $("#likeIcon").attr('src', "img/icon/like.png");
            hasLike = false;
        }
    });
}

/**
 *  判断用户是否点过踩，用于刚开始加载文件详情模块的时候
 * @param fileID
 */
function isDislike(fileID) {
    var myData = {
        fileId: fileID.toString(),
        token: $.cookie('qmkl_token')
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://120.77.32.233/qmkl1.0.0/dislike/is/dislike",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(myData)
    };

    $.ajax(settings).done(function (response) {
        console.log(response.data);
        if (response.data === true) {
            $("#dislikeIcon").attr('src', "img/icon/dislike_cancel.png");
            hasDislike = true;
        } else {
            $("#dislikeIcon").attr('src', "img/icon/dislike.png");
            hasDislike = false;
        }
    });
}
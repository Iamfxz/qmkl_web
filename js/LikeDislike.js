function like(fileID) {
    //获取文件总数，方便设置分页浏览
    var myData = {
        fileId: fileID.toString(),
        token: $.cookie('qmkl_token')
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": urlprefix.concat("/like/addordesc"),
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
        fileLikeNum.text(parseInt(num) + 1);
    });
}

function dislike(fileID) {
    //获取文件总数，方便设置分页浏览
    var myData = {
        fileId: fileID.toString(),
        token: $.cookie('qmkl_token')
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": urlprefix.concat("/dislike/addordesc"),
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
        fileDislikeNum.text(parseInt(num) + 1);
    });
}
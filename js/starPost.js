function starPost() {

    var myData = {
        token: $.cookie('qmkl_token'),
        classify:$("#modulePart").val(),
        title:$("#my-title").val(),
        content:$("#my-editormd-markdown-doc").val()
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://119.23.238.215:8080/qmkl1.0.0/web/post/add",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(myData)
    };
    $.ajax(settings).done(function (response) {

        if(response.code == 200){
            alert("成功");
        }
        else {
            alert("发送失败，请先登录然后输入帖子内容");;
            shakeModal();
        }
    });
    alert("你的贴子题目是："+$("#my-title").val());
}
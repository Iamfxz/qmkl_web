function starPost() {
    if($("#my-title").val().length==0||$(".editormd-markdown-textarea").val().length==0) {
        $("#ourModalContent").empty();
        $("#ourModalContent").text("请先选着分区号，然后在填写帖子内容。帖子标题和帖子内容不能为空！！！");
        $('#ourModal').modal('show');
    }
    if ($("#my-title").val().length == 0 || $(".editormd-markdown-textarea").val().length == 0) {
        alert("请先选着分区号，然后在填写帖子内容。帖子标题和帖子内容不能为空！！！");
    }
    else {
        var myData = {
            token: $.cookie('qmkl_token'),
            classify: $("#modulePart").val(),
            title: $("#my-title").val(),
            content: $(".editormd-markdown-textarea").val()
        };
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://119.23.238.215:8080/qmkl1.0.0/web/post/add",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json;charset=UTF-8n",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(myData)
        };
        $.ajax(settings).done(function (response) {

            if(response.code == 200){
                $("#my-title").val("");

                $("#ourModalContent").empty();
                $("#ourModalContent").text("发帖成功");
                clean_markdown();
                $('#ourModal').modal('show');
                switchBlock(-1);
            }
            else {
                $("#ourModalContent").empty();
                $("#ourModalContent").text("发送失败，请先登录然后输入帖子内容");
                $('#ourModal').modal('show');


            }
        });

            if (response.code == 200) {
                $("#ourModalContent").empty();
                $("#ourModalContent").text("发送成功");
                $('#ourModal').modal('show');

            }
            else {
                $("#ourModalContent").empty();
                $("#ourModalContent").text("发送失败");
                $('#ourModal').modal('show');
                shakeModal();

            }
        }

}
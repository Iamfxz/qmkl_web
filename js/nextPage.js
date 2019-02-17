/**
 * 资源列表的下一页
 * @param page 下一页
 */
function nextPage(page){
    if(page==="next"){
        page=Number($.cookie("currentPage"))+1;
        console.log("下一页是："+page);
        var totalFolderNum =Number($.cookie('totalFolderNum'));
        if(page>=Math.ceil(totalFolderNum / 20)){
            return;
        }
    }else if(page==="prev"){
        page=Number($.cookie("currentPage"))-1;
        if(page<=0){
            return;
        }
        console.log("上一页是："+page);
    }
    //清空文件列表
    $("#listGroup").empty();
    //存储当前分页位置
    $.cookie("currentPage",page);
    //请求新的文件列表
    var myData = {
        path: "/",
        collegeName: "福州大学",
        token: $.cookie('qmkl_token'),
        page: page.toString(),
        pageNum: "20"
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://120.77.32.233/qmkl1.0.0/file/list/",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(myData)
    };
    $.ajax(settings).done(function (response) {
        //console.log("分页请求结果："+response.msg);
        for (var i in response.data) {
            var newElement = $("<div class=\"list-group-item\">\n" +
                "            <h4 class=\"list-group-item-heading\">\n" +
                "                <a href=\"#\" onclick=\"list_item_click(this,1)\">\n" +
                i +
                "                </a>\n" +
                "            </h4>\n" +
                "        </div>");
            $("#listGroup").append(newElement);
        }
    });
}
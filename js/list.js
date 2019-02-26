//第一次打开页面加载主列表
$(document).ready(
    showMain()
);

//显示主列表，并初始化分页栏
function showMain() {
    //清空文件列表
    $("#listGroup").empty();
    //隐藏文件详细信息
    hiddenFileUI();
    //显示分页栏
    $("#pagination").removeClass("hidden");
    //删除之后的路径导航
    $("#pathNavigation li:gt(1)").remove();
    //设置路径导航中的学校名字
    $("#school").text($.cookie("currentCollege"));
    if($.cookie("currentCollege")==="其他学校"){
        alert("目前还没有零散的其他学校的文件，如果您希望自己所在的学校也加入我们期末考啦共享资料库中，" +
            "欢迎上传资料，并留下您学校的名字，更多合作请联系qq:347647804");
    }
    //设置当前路径
    $.cookie('currentPath', '/');
    var myData = {
        path: "/",
        collegeName: $.cookie("currentCollege"),
        token: $.cookie('qmkl_token'),
        page: "1",
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
        //console.log("主界面文件资源列表请求结果：" + response.msg);

        //加载文件资源列表
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
    //初始化分页栏
    pagination();
}

/**
 * 文件列表点击事件处理
 * @param id 点击的元素
 * @param requestMethod 请求的方法
     *  1--通过点击文件列表请求,默认方法
     *  2--通过点击路径导航的请求
 */
function list_item_click(id, requestMethod) {
    //隐藏分页栏
    $("#pagination").addClass("hidden");
    //请求文件（夹）名
    var requestFile;
    //路径导航栏
    var pathNavigation = $("#pathNavigation");
    if (requestMethod === 2) {
        requestFile = $(id).children().text().toString().trim();
    } else {
        requestFile = id.innerHTML.toString().trim();
    }
    //清空文件列表
    $("#listGroup").empty();
    //判断点击的是文件还是文件夹
    if (isFile(requestFile)) {
        if (requestMethod === 2) {
            return;
        }
        //console.log("你点击了普通文件");
        //文件详细信息请求
        fileDetailAjax(requestFile);
        //修改路径导航
        pathNavigation.append("<li onclick=\"pathNavigationFolderClick(this)\">\n" +
            "            <a href=\"#\">" + requestFile.toString().trim() + "</a>\n" +
            "        </li>");
        return;
    } else {
        hiddenFileUI();
    }
    //取出先前路径
    var prePath = $.cookie('currentPath');
    //修改当前路径
    var currentPath;
    if (requestMethod === 2) {
        currentPath = prePath;
    } else {
        currentPath = prePath + requestFile + '/';
        //存储当前路径
        $.cookie('currentPath', currentPath);
    }
    console.log("currentPath:" + currentPath);
    //修改路径导航
    if (requestMethod === 2) {
        pathNavigation.empty();
        pathNavigation.append("<li>\n" +
            "            <a href=\"#\" id=\"school\" data-toggle=\"modal\" data-target=\"#schoolModal\" onclick=\"postSchoolAjax()\">" +
            $.cookie("currentCollege")+ "</a>\n" + "        </li>");
        pathNavigation.append("<li onclick=\"showMain()\" id=\"mainList\" >\n" +
            "            <a href=\"#\">主列表</a>\n" +
            "        </li>");
        if (currentPath !== "/") {
            var pathName = currentPath.split("/");
            for (var i = 0; i < pathName.length; i++) {
                if (pathName[i] !== "") {
                    pathNavigation.append("<li onclick=\"pathNavigationFolderClick(this)\">\n" +
                        "            <a href=\"#\">" + pathName[i] + "</a>\n" +
                        "        </li>");
                }
            }
        }
    } else {
        pathNavigation.append("<li onclick=\"pathNavigationFolderClick(this)\">\n" +
            "            <a href=\"#\">" + requestFile.toString().trim() + "</a>\n" +
            "        </li>");
    }
    var myData = {
        path: currentPath,
        collegeName: $.cookie("currentCollege"),
        token: $.cookie('qmkl_token')
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
    console.log(requestFile);
    $.ajax(settings).done(function (response) {
        console.log(response.data);
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

/**
 * 路径导航中文件夹的跳转点击事件处理函数
 * @param id 希望跳转的文件夹
 * 逻辑：通过点击的文件夹获取其前面有哪些文件夹，重新设置当前路径currentPath
 * 再通过调用list_item_click(requestName)处理跳转事件
 */
function pathNavigationFolderClick(id) {
    //var requestFile = id.innerHTML.toString().trim();
    var $it = $(id);
    var currentPath;
    if (isFile($it.text().toString().trim())) {
        currentPath = "";
    } else {
        currentPath = "/";
    }

    while ($it.attr("id") !== "mainList") {
        var name = "/" + $it.text().toString().trim();
        currentPath = name.concat(currentPath);
        $it = $it.prev();
    }
    $.cookie("currentPath", currentPath);
    console.log("路径导航：" + currentPath);
    list_item_click(id, 2)
}

//判断是否是文件（含有'.'），否则为文件夹
function isFile(Name) {
    return Name.indexOf('.') > 0;
}

//展示普通文件资源界面，包含下载、预览、点赞等功能
function showFileUI(requestFile) {
    //显示一些东西
    var fileName = $("#fileName");
    fileName.removeClass("hidden");
    fileName.text(requestFile);
    $("#previewButton").removeClass("hidden");
    $("#downloadButton").removeClass("hidden");
    $("#fileInfo").removeClass("hidden");
}

//隐藏普通文件详细信息图形界面
function hiddenFileUI() {
    //显示一些东西
    var fileName = $("#fileName");
    fileName.addClass("hidden");
    $("#previewButton").addClass("hidden");
    $("#downloadButton").addClass("hidden");
    $("#fileInfo").addClass("hidden");
}

//普通文件详细信息请求
function fileDetailAjax(requestFile) {
    var currentFile = $.cookie('currentPath') + requestFile;
    var myData = {
        path: currentFile,
        collegeName: $.cookie("currentCollege"),
        token: $.cookie('qmkl_token')
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://120.77.32.233/qmkl1.0.0/file/list/detail",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json;charset=UTF-8",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(myData)
    };
    $.ajax(settings).done(function (response) {
        console.log("文件详细信息：" + response);
        $("#fileCreateAt").text(response.data["createAt"]);
        $("#fileNick").text(response.data["nick"]);
        $("#fileLikeNum").text(response.data["likeNum"]);
        $("#fileDislikeNum").text(response.data["dislikeNum"]);
        fileDownloadButton(requestFile, response.data["md5"], response.data["id"]);
        filePreviewButton(requestFile, response.data["md5"], response.data["id"]);

        showFileUI(requestFile);
    });
}

//文件下载按钮设置
function fileDownloadButton(requestFile, md5, id) {
    $("#downloadButton").attr({
        "href": "http://120.77.32.233/qmkl1.0.0/dir/download/file/" + md5 + "/" + id,
        "download": requestFile
    });
}

//文件预览按钮设置
function filePreviewButton(requestFile, md5, id) {
    if (myPreview(requestFile)) {
        $("#previewButton").attr({
            "href": "http://www.finalexam.cn/qmkl1.0.0/dir/online/file/" + md5 + "/" + id + "/" + requestFile,
            "target": "_blank"
        });
    } else {
        $("#previewButton").attr({
            "href": "https://view.officeapps.live.com/op/view.aspx?src=http://www.finalexam.cn/qmkl1.0.0/dir/online/file/" + md5 + "/" + id + "/" + requestFile,
            "target": "_blank"
        });
    }
}


//pdf jpg png 直接用自己的库来进行预览
function myPreview(fileName) {
    var suffix = fileName.substring(fileName.lastIndexOf('.') + 1);
    return suffix === "pdf" || suffix === "jpg" || suffix === "png";
}

/**
 * 分页设置
 *  请求所有的文件资源，并存储其文字及对应拼音
 *  window.list
 *  window.list_pinyin
 */
function pagination() {
    //获取文件总数，方便设置分页浏览
    var myData = {
        path: "/",
        collegeName: $.cookie("currentCollege"),
        token: $.cookie('qmkl_token')
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
        var arr_list_pinyin = [];
        var arr_list = [];
        var total = 0;
        //清空搜索下拉框的列表
        var searchBoxItemList = $("#itemList");
        searchBoxItemList.empty();
        for (var i in response.data) {
            if(response.data.hasOwnProperty(i)){
                arr_list[total] = i;
                arr_list_pinyin[total] = pinyinUtil.getPinyin(i,"",false);
                var newElement = ("<option value=\"" + arr_list[total] + "\">" + arr_list_pinyin[total] + "</option>");
                searchBoxItemList.append(newElement);
            }
            total++;
        }
        //全局变量,存储所有的文件夹汉字名或拼音名，用于搜索
        window.list = arr_list;
        window.list_pinyin = arr_list_pinyin;

        //console.log(window.list);
        //console.log(window.list_pinyin);
        //console.log("文件夹总数量为：" + total);
        //存储文件总数
        $.cookie('totalFolderNum', total);
        //存储当前分页位置
        $.cookie("currentPage",1);
        var totalPageNum = Math.ceil(total / 20);
        //清空分页列表
        var pagination = $("#pagination");
        pagination.empty();
        var prevElement = $("<li>\n" +
            "            <a href=\"#\" onclick=\"nextPage('prev')\">Prev</a>\n" +
            "        </li>");
        var nextElement = $("<li>\n" +
            "            <a href=\"#\" onclick=\"nextPage('next')\">Next</a>\n" +
            "        </li>");
        pagination.append(prevElement);
        for (var j = 1; j <= totalPageNum; j++) {
            var newElement = $("<li>\n" +
                "            <a href=\"#\" onclick=\"nextPage(" + j + ")\">" + j + "</a>\n" +
                "        </li>");
            pagination.append(newElement);
        }
        pagination.append(nextElement);
    });
}
//搜索框点击回车搜索文件
function onKeyDown(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode === 13) { // enter 键
        //console.log($.cookie("currentPath"));
        //console.log($("#search_box").val());
        searchFolder();
        console.log($("#itemList"))
    }
}

/**
 *  搜索文件
 * @param Folder 文件夹名字
 */
function searchFolder() {
    var searchFolderName = $("#search_box").val();
    var FolderName = window.list;
    for (var i in FolderName) {
        if (FolderName.hasOwnProperty(i))
            if (searchFolderName === FolderName[i]) {
                list_item_click($("#search_box").val(),3);
            }
    }
}
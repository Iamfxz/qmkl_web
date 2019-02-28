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
 */
function searchFolder() {
    var searchBox = $("#search_box");
    var searchFolderName = searchBox.val();
    var FolderName = window.list;
    for (var i in FolderName) {
        if (FolderName.hasOwnProperty(i))
            if (searchFolderName === FolderName[i]) {
                list_item_click(searchBox.val(),3);
            }
    }
    var resource = $("#resource");
    if(!resource.hasClass("active")){
        $("#officialWeb").removeClass("active");
        resource.addClass("active");
        $("#chat").removeClass("active");
        $("#information").removeClass("active");

        $(".officialWebPart").addClass("hidden");
        $(".resourcePart").removeClass("hidden");
        $(".chatPart").addClass("hidden");
        $(".informationPart").addClass("hidden");
    }
}
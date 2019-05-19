/*
* 本文档实现用户点击按时间或热度排序按钮
* */

//默认是用热度排序
var timeOrHeat = "heat";

//按时间排序
function sortByTime() {
    timeOrHeat = "time";
    $("#sortByTime").attr("class","btn btn-success SortBtn");
    $("#sortByHeat").attr("class","btn btn-primary SortBtn");

    //清除帖子信息
    $(".bbs-ul").empty();
    //重新显示帖子
    showPostList(postClassify.toString(),postCurrentPage.toString(),listPerPage.toString(),timeOrHeat.toString());
}

//按热度排序
function sortByHeat() {
    timeOrHeat = "heat";
    $("#sortByTime").attr("class","btn btn-primary SortBtn");
    $("#sortByHeat").attr("class","btn btn-success SortBtn");

    //清除帖子信息
    $(".bbs-ul").empty();
    //重新显示帖子
    showPostList(postClassify.toString(),postCurrentPage.toString(),listPerPage.toString(),timeOrHeat.toString());
}
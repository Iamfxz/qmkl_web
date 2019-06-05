//前面一页回复和后面一页
function postBackContent() {
    num=$.cookie("currentContentPageNum");
    if(num!=1)
        num--;
    $.cookie("currentContentPageNum",num);
    showReplylist(num);
}

/*
* 帖子的下一页
* */
function postNextContent() {
    num=$.cookie("currentContentPageNum");
    var page=$.cookie("postCommentNum");
    var y=Math.ceil(page/8);
    if(num!=y)
        num++;
    $.cookie("currentContentPageNum",num);
    showReplylist(num);
}
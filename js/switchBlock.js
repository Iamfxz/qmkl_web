/*
* 本文件主要是在用户点击选择左边的模块的时候 能清除右边的帖子信息并生成新的帖子信息
* */


function switchBlock(blockNum) {
    postClassify = blockNum;
    postCurrentPage = 1;
    //清理帖子
    $(".bbs-ul").empty();
    showPostList(postClassify.toString(),"1",listPerPage.toString(),timeOrHeat.toString());/*这里写1是因为第一次载入都是显示第一页*/

}
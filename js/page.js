/*
* 此js文件主要解决首页帖子的上一页下一页问题
* */


//保存帖子的当前页数
var postCurrentPage = 1;

/*
*   帖子的上一页
*   每次处理完上一页和下一页后都要判断下是不是第一页或者最后一页
* */
function postBackPage() {
    if(postCurrentPage == 1){//如果当前是第一页 还点击了上一页 就上面都不做

    }else{
        //清理帖子
        $(".bbs-ul").empty();
        //将当前页数-1
        postCurrentPage--;
        //重新获取第二页的帖子

        showPostList(postClassify.toString(),postCurrentPage.toString(),listPerPage.toString(),timeOrHeat.toString());
    }
}

/*
* 帖子的下一页
* */
function postNextPage() {
    if(postCurrentPage >= maxPage){//如果是最后一页 还点击了下一页 则不做处理

    }else{
        //清理帖子
        $(".bbs-ul").empty();

        //将当前页数+1
        postCurrentPage++;

        //重新获取第二页的帖子
        showPostList(postClassify.toString(),postCurrentPage.toString(),listPerPage.toString(),timeOrHeat.toString());
    }
}
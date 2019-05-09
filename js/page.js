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
        var myData = {
            classify:postClassify.toString(),
            page:postCurrentPage.toString(),
            num:listPerPage.toString(),
            token: $.cookie('qmkl_token'),
            sortMethod:timeOrHeat.toString()
        };
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://119.23.238.215:8080/qmkl1.0.0/web/post/list/all",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json;charset=UTF-8",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(myData)
        };
        $.ajax(settings).done(function (response) {
            /*console.log(response.code);*/
            if(response.code=="200"){
                /*console.log(response.data);*/
                //帖子最多能显示的页数
                maxPage = Math.ceil((response.data.sumPost/listPerPage));
                /*console.log(response.data.post.length);*/
                for(var i = 0 ;i<response.data.post.length;i++){
                    var newElement = document.createElement('li');
                    var htmlstr = "<span class=\'title_bbs\'><a href='#'>" + response.data.post[i].title + "</a></span>" +
                        "<span class=\'author\'>" + response.data.post[i].userId + "</span>"+
                        "<span class=\'time\'>" + response.data.post[i].createTime + "</span>";
                    newElement.innerHTML = htmlstr;
                    $(".bbs-ul").append(newElement);
                }
            }
        });
        document.getElementById('showPageMessage').innerText = "当前第 " + postCurrentPage + " 页/ 总:"
            + maxPage + " 页";
        //如果点了下一页后的当前页是最后一页 那么他的按钮将不能点击 反之相反
        if(postCurrentPage == maxPage){
            $("#nextPageNode").attr("class","next disabled");
        }else{
            $("#nextPageNode").attr("class","next");
        }
        //如果是第一页 那么上一页按钮不可按 反之相反
        if(postCurrentPage == 1){
            $("#prePageNode").attr("class","previous disabled");
        }else{
            $("#prePageNode").attr("class","previous");
        }
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
        var myData = {
            classify:postClassify.toString(),
            page:postCurrentPage.toString(),
            num:listPerPage.toString(),
            token: $.cookie('qmkl_token'),
            sortMethod:timeOrHeat.toString()
        };
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://119.23.238.215:8080/qmkl1.0.0/web/post/list/all",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json;charset=UTF-8",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(myData)
        };
        $.ajax(settings).done(function (response) {
            /*console.log(response.code);*/
            if(response.code=="200"){
                /*console.log(response.data);*/
                //帖子最多能显示的页数
                maxPage = Math.ceil((response.data.sumPost/listPerPage));
                /*console.log(response.data.post.length);*/
                for(var i = 0 ;i<response.data.post.length;i++){
                    var newElement = document.createElement('li');
                    var htmlstr = "<span class=\'title_bbs\'><a href='#'>" + response.data.post[i].title + "</a></span>" +
                        "<span class=\'author\'>" + response.data.post[i].userId + "</span>"+
                        "<span class=\'time\'>" + response.data.post[i].createTime + "</span>";
                    newElement.innerHTML = htmlstr;
                    $(".bbs-ul").append(newElement);
                }
            }
        });
        document.getElementById('showPageMessage').innerText = "当前第 " + postCurrentPage + " 页/ 总:"
            + maxPage + " 页";
        //如果点了下一页后的当前页是最后一页 那么他的按钮将不能点击 反之相反
        if(postCurrentPage == maxPage){
           $("#nextPageNode").attr("class","next disabled");
        }else{
            $("#nextPageNode").attr("class","next");
        }
        //如果是第一页 那么上一页按钮不可按 反之相反
        if(postCurrentPage == 1){
            $("#prePageNode").attr("class","previous disabled");
        }else{
            $("#prePageNode").attr("class","previous");
        }
    }
}
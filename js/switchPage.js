/**
 * 模块官网，资源，趣聊，个人等的换页
 *  网页打开后就预加载完成
 */
$(document).ready(function(){
    var resource = $("#resource");
    var information = $("#information");
    var officialWeb = $("#officialWeb");
    var chat = $("#chat");
    resource.click(function(){
        if(resource.hasClass("active")){
            return 1;
        }else{
            $("#resource").addClass("active");
            $("#information").removeClass("active");
            $("#chat").removeClass("active");
            $("#officialWeb").removeClass("active");
        }
    });
    information.click(function(){
        if(information.hasClass("active")){
            return 1;
        }else{
            $("#information").addClass("active");
            $("#resource").removeClass("active");
            $("#chat").removeClass("active");
            $("#officialWeb").removeClass("active");
        }
    });
    officialWeb.click(function () {
        if(officialWeb.hasClass("active")){
            return 1;
        }else{
            $("#officialWeb").addClass("active");
            $("#resource").removeClass("active");
            $("#information").removeClass("active");
            $("#chat").removeClass("active");
        }
    });
    chat.click(function () {
        if(chat.hasClass("active")){
            return 1;
        }else{
            $("#chat").addClass("active");
            $("#resource").removeClass("active");
            $("#information").removeClass("active");
            $("#officialWeb").removeClass("active");
        }
    })
});

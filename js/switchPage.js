/**
 * 模块官网，资源，趣聊，个人等的换页
 *  网页打开后就预加载完成
 */
$(document).ready(function(){
    var resource = $("#resource");
    var information = $("#information");
    var officialWeb = $("#officialWeb");
    var chat = $("#chat");
    officialWeb.click(function () {
        if(officialWeb.hasClass("active")){
            return 1;
        }else{
            $("#officialWeb").addClass("active");
            $("#resource").removeClass("active");
            $("#information").removeClass("active");
            $("#chat").removeClass("active");

            $(".officialWebPart").removeClass("hidden");
            $(".resourcePart").addClass("hidden");
            $(".chatPart").addClass("hidden");
            $(".informationPart").addClass("hidden");
        }
    });
    resource.click(function(){
        if(resource.hasClass("active")){
            return 1;
        }else{
            $("#officialWeb").removeClass("active");
            $("#resource").addClass("active");
            $("#chat").removeClass("active");
            $("#information").removeClass("active");

            $(".officialWebPart").addClass("hidden");
            $(".resourcePart").removeClass("hidden");
            $(".chatPart").addClass("hidden");
            $(".informationPart").addClass("hidden");
        }
    });
    chat.click(function () {
        if(chat.hasClass("active")){
            return 1;
        }else{
            $("#officialWeb").removeClass("active");
            $("#resource").removeClass("active");
            $("#chat").addClass("active");
            $("#information").removeClass("active");

            $(".officialWebPart").addClass("hidden");
            $(".resourcePart").addClass("hidden");
            $(".chatPart").removeClass("hidden");
            $("#myPost").show();
            $(".informationPart").addClass("hidden");
        }
    });
    information.click(function(){
        if(information.hasClass("active")){
            return 1;
        }else{
            $("#officialWeb").removeClass("active");
            $("#resource").removeClass("active");
            $("#chat").removeClass("active");
            $("#information").addClass("active");

            $(".officialWebPart").addClass("hidden");
            $(".resourcePart").addClass("hidden");
            $(".chatPart").addClass("hidden");
            $(".informationPart").removeClass("hidden");

        }
    });
});

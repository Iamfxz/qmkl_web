function getInfo() {
    $("#Nickname").text($.cookie("userNickname"));
    $("#myNickname").val($.cookie("userNickname"));
    $("#mySex").val($.cookie("userGender"));
    $("#myPhone").val($.cookie("userPhone"));
    $("#myCollege").val($.cookie("userAcademy"));
    $("#myUserId").val($.cookie("userID"));
    $("#myShool").val($.cookie("currentCollege"));

    $("#myPhone").attr("disabled","disabled");
    $("#mySex").attr("disabled","disabled");
    $("#myNickname").attr("disabled","disabled");
    $("#myCollege").attr("disabled","disabled");
    $("#myShool").attr("disabled","disabled");
    $("#myAdminssiondate").attr("disabled","disabled");
 //   $("#img-thumbnail").attr("src","http://119.23.238.215:8080/qmkl1.0.0/user/download/avatar/id/"+$.cookie("userID"));
    $(".informationPart").show();
}


function infoAlter()
{
    $("#myNickname").attr("disabled",false);
    $("#mySex").attr("disabled",false);
    $("#myAdminssiondate").attr("disabled",false);
    //$("#myCollege").attr("disabled",false);
    //$("#myShool").attr("disabled",false);
    $(".modifyTd").css("background-color","rgb(201, 245, 245)");
}

function saveTd() {
    if(true){   //假设修改全部合法；
        var myData = {
            token: $.cookie('qmkl_token'),
            user:{
                nickname:$("#myNickname").val(),
                gender:$("#mySex").val(),
                enterYear:$("#myAdminssiondate").val(),
                college:$("#myShool").val(),
                academy:$("#myCollege").val()
            }
        };
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://119.23.238.215:8080/qmkl1.0.0/user/update/info",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json;charset=UTF-8",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(myData)
        };
        $.ajax(settings).done(function (response) {
            console.log(response);
            if(response.code == 200){
            alert("修改成功！");
                $("#mySex").attr("disabled","disabled");
                $("#myNickname").attr("disabled","disabled");
                $("#myAdminssiondate").attr("disabled","disabled");
                $(".modifyTd").css("background-color","rgba(249,249,249,0.6)");

            }
        });
    }
    else {
        alert("修改失败！");
    }



}

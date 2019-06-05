/*
获取cookie中的个人信息，显示在界面上

 */

function getInfo() {
    var userImg="http://119.23.238.215:8080/qmkl1.0.0/user/download/avatar/"+$.cookie("userAvatar");
    $("#infoNickname").text($.cookie("userNickname"));

    $("#myNickname").val($.cookie("userNickname"));
    $("#mySex").val($.cookie("userGender"));
    $("#myPhone").val($.cookie("userPhone"));
    $("#myCollege").val($.cookie("userAcademy"));
    $("#myUserId").val($.cookie("userID"));
    $("#myShool").val($.cookie("currentCollege"));
    $("#myAdminssiondate").val($.cookie("userEnterYear"));
    $("#portrait").attr("src",userImg);


    $("#myPhone").attr("disabled","disabled");
    $("#mySex").attr("disabled","disabled");
    $("#myNickname").attr("disabled","disabled");
    $("#myCollege").attr("disabled","disabled");
    $("#myShool").attr("disabled","disabled");
    $("#myAdminssiondate").attr("disabled","disabled");;
    $(".informationPart").show();

}
/*
修改信息
 */

function infoAlter()
{
    $("#myNickname").attr("disabled",false);
    $("#mySex").attr("disabled",false);
    $("#myAdminssiondate").attr("disabled",false);
    $("#myShool").hide();
    $("#mySchoolAlter").show();
    $("#myCollege").hide();
    $("#myCollegeAlter").show();
    $(".modifyTd").css("background-color","rgb(201, 245, 245)");
    $
}
/*
获取学院信息
 */
function MycollegeListAjax() {
    var myData = {
        collegeName: $('#mySchoolAlter').val()
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://119.23.238.215:8080/qmkl1.0.0/academy/list/college",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(myData)
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        if (response.code == 200) {
            var academy = response.data;
            console.log(response.data);
            var obj = document.getElementById('myCollegeAlter');
            obj.options.length = 0;
            for (var ad in academy) {
                if(academy.hasOwnProperty(ad))
                    obj.options.add(new Option(academy[ad]));
            }
        } else {
            shakeModal();
        }
    });
}




/*

更新个人信息
 */
function saveTd() {
        if($("#mySchoolAlter").val()==null|| $("#myCollegeAlter").val()==null|| $("#myNickname").val()==null|| $("#mySex").val()==null|| $("#myAdminssiondate").val()==null){
            alert("修改内容不能为空！！！");
        }
        else
        {
            var myData = {
                token: $.cookie('qmkl_token'),
                user:{
                    nickname:$("#myNickname").val(),
                    gender:$("#mySex").val(),
                    enterYear:$("#myAdminssiondate").val(),
                    college:$("#mySchoolAlter").val(),
                    academy:$("#myCollegeAlter").val()
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
                    alert("修改成功！"+$("#mySchoolAlter").val()+$("#myCollegeAlter").val());
                    $(".modifyTd").css("background-color","rgba(249,249,249,0.6)");
                    $("#myCollegeAlter").hide();
                    $("#mySchoolAlter").hide();
                    $.cookie("currentCollege", $("#mySchoolAlter").val());
                    $.cookie("userAcademy",$("#myCollegeAlter").val());
                    $.cookie("userGender",$("#mySex").val());
                    $.cookie("userNickname",$("#myNickname").val());
                    $.cookie("userEnterYear",$("#myAdminssiondate").val());
                    getInfo();
                    $("#myCollege").show();
                    $("#myShool").show();
                }
            });
        }

}








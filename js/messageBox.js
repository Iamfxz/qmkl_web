//获取私信列表的内容
function setMessageBox() {
    //获取未读私信条数并显示
    setNumOfLetter();
    //获取全部私信用户列表并显示
    setLetterList();
}

//全部私信用户列表并显示
function setLetterList() {
    var myData = {
        token: $.cookie('qmkl_token')
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://119.23.238.215:8080/qmkl1.0.0/web/letter/list",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(myData)
    };
    $.ajax(settings).done(function (response) {
        if(response.code == 200){
            for(var i = 0 ;i<response.data.length;i++){
                console.log(response);
                /*var jsName = "javascript:showLetter(" + response.data[i].otherUserId.toString()+ "," + response.data[i].nickname.toString() + ")";*/
                var jsName = "javascript:showLetter(" + response.data[i].otherUserId.toString()+ ")";
                var newElement = document.createElement('div');
                newElement.setAttribute("class","my-list-group-item col-md-11 alert");
                newElement.setAttribute("style","margin: 5px;padding: 3px");
                var htmlstr = " <a href=\"#\" class=\"close\" data-dismiss=\"alert\">&times;</a>\n" +
                    "                        <a href=\"" + jsName + "\"><span class=\"badge\" style=\"color: red; background" +
                    "-color: #020101\">"+ response.data[i].unreadNum + "</span> " + response.data[i].nickname + "</a>";
                newElement.innerHTML = htmlstr;
                $("#letterUser").append(newElement);
            }


        }
    });
}
//获取获取未读私信条数并显示
function setNumOfLetter() {
    var myData = {
        token: $.cookie('qmkl_token')
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://119.23.238.215:8080/qmkl1.0.0/web/letter/unread",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(myData)
    };
    $.ajax(settings).done(function (response) {
        if (response.code == 200){
            var numOfL = document.getElementById("numOfLetter");
            numOfL.innerHTML = "(<span style='color: red'>" + response.data +"</span>)";
        }
    });
}


function showLetter(otherUserId) {
    var nickname;
    /*先通过传过来的id获取发送者的昵称*/
    var myData = {
        token: $.cookie('qmkl_token'),
        id:otherUserId.toString()
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://119.23.238.215:8080/qmkl1.0.0/user/infobyid",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json;charset=UTF-8",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(myData)
    };
    $.ajax(settings).done(function (response) {
        if(response.code == 200){
            nickname = response.data.nickname;

            /*这里嵌套第二次查询*/
            var x=otherUserId.toString();
            var myData = {
                token: $.cookie('qmkl_token'),
                otherUserId:x
            };
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://119.23.238.215:8080/qmkl1.0.0/web/letter/record",
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
                    //先清除里面的
                    $("#letterInfo").empty();
                    var newElement = document.createElement('div');
                    newElement.setAttribute("class","list-group-item my-list-group-item active letterInfoLi");
                    var htmlstr = "<p id=\"sender\">" + nickname + "</p>";
                    newElement.innerHTML = htmlstr;
                    $("#letterInfo").append(newElement);
                    var newElement2 = document.createElement('div');
                    newElement2.setAttribute("class","letterContent");

                    for(var i = 0 ;i<response.data.length;i++){
                        var newElement3 = document.createElement('div');
                        newElement3.setAttribute("class","letterLi");
                        newElement3.setAttribute("style","padding: 10px;border-bottom: 3px black;border-bottom-width: 1px;border-bottom-style: solid;");
                        var str = "<span class=\"badge badge-info send-time sendLetterTime\" style=\"float: right;\">" + response.data[i].createTime + "</span>\n" +
                            "                    <span class=\"letterContent\">" + response.data[i].content + "</span>"
                        newElement3.innerHTML = str;
                        newElement2.append(newElement3);
                    }
                    $("#letterInfo").append(newElement2);

                    $("#postList").hide();
                    $("#myPost").hide();
                    $("#letterInfo").show();
                }
            });

        }
    });



}
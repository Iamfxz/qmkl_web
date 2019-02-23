/**
 *  向后端请求所有的学校的名字
 */
function postSchoolAjax() {
    var schoolModelBody = $("#SchoolModelBody");
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://120.77.32.233/qmkl1.0.0/college/list",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false
    };
    $.ajax(settings).done(function (response) {
        if(response.code===200){
            schoolModelBody.empty();
        }
        for (var i in response.data){
            if(response.data.hasOwnProperty(i)){
                var newElement = $("                    <a href=\"#\" class=\"list-group-item\" onclick=\"chooseSchoolAjax(this.innerText)\">" +
                    response.data[i] +
                    "</a>\n");
                schoolModelBody.append(newElement);
            }
        }
    })
}

/**
 *  选择学校，并进行切换学校，同时更新列表文件资源
 * @param school 学校名字，用户点击选择的结果
 */
function chooseSchoolAjax(school) {
    //点击后隐藏模态框
    $("#schoolModal").modal("hide");
    //存储当前学校
    $.cookie("currentSchool",school.toString().trim());
}
function showRegisterForm() {
    $('.loginBox').fadeOut('fast', function () {
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast', function () {
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('账号注册');
    });
    $('.error').removeClass('alert alert-danger').html('');
}

function showLoginForm() {
    $('#loginModal .registerBox').fadeOut('fast', function () {
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast', function () {
            $('.login-footer').fadeIn('fast');
        });
        $('.modal-title').html('账号登陆');
    });
    $('.error').removeClass('alert alert-danger').html('');
}

function showImproveForm() {
    $('#loginModal .registerBox').fadeOut('fast', function (){
        $('.ImproveBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast', function () {
            $('.improve-footer').fadeIn('fast');
        });
        $('.modal-title').html('完善信息');
    })
    $('.error').removeClass('alert alert-danger').html('');
}

function openLoginModal() {
    showLoginForm();
    setTimeout(function () {
        $('#loginModal').modal('show');
    }, 230);

}

function openRegisterModal() {
    showRegisterForm();
    setTimeout(function () {
        $('#loginModal').modal('show');
    }, 230);

}

//登陆请求
function loginAjax() {
    var myData = {
        username: $('#telephone_login').val(),
        password: hex_sha1($('#password_login').val())
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://119.23.238.215:8080/qmkl1.0.0/user/login",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(myData)
    };
    $.ajax(settings).done(function (response) {
        if(response.code === 200){
            $("#ourModalContent").empty();
            $("#ourModalContent").text("登录成功");
            $('#ourModal').modal('show');
            var token = response.data;
            console.log("qmkl_token(cookie):"+token);
            //创建一个cookie并设置有效时间为 7天
            $.cookie('qmkl_token',token,{ expires: 7 });
            //获取用户信息
            userInfoAjax(token);
            $('#loginModal').modal('hide');
            //开始显示主页面
            showMain();
            //首页显示帖子
            showPostList("-1","1",listPerPage.toString(),timeOrHeat.toString());
            //获取私信列表的内容
            setMessageBox();
            $("#loginAndRegister").addClass("hidden");
        }
        else {
            $("#ourModalContent").empty();
            $("#ourModalContent").text("失败");
            $('#ourModal').modal('show')
            shakeModal();
            $("#loginAndRegister").removeClass("hidden");
        }
    });


    /*   Simulate error message from the server   */
    //shakeModal();
}

function shakeModal() {
    $('#loginModal .modal-dialog').addClass('shake');
    $('.error').addClass('alert alert-danger').append("无效的账号或密码");
    $('input[type="password"]').val('');
    setTimeout(function () {
        $('#loginModal .modal-dialog').removeClass('shake');
    }, 1000);
}

/**
 *  获取用户的个人信息来为后面的操作做准备，比如显示相应学校的文件
 * @param token
 */
function userInfoAjax(token) {
    //传输的数据
    var myData = {
        token: $.cookie('qmkl_token')
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://119.23.238.215:8080/qmkl1.0.0/user/info",
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
        if(response.code === 200){
            //学校，不可改
            $.cookie("currentCollege",response.data["college"]);
            //手机号，不可改
            $.cookie("userPhone",response.data["phone"]);
            //性别，入学年龄，昵称（可修改）
            $.cookie("userGender",response.data["gender"]);
            $.cookie("userEnterYear",response.data["enterYear"]);
            $.cookie("userNickname",response.data["nickname"]);
            //学院
            $.cookie("userAcademy",response.data["academy"]);
            //用户id，用于修改头像
            $.cookie("userID",response.data["id"]);
            $.cookie("userAvatar",response.data["avatar"]);
        }
    });
}

/*
*  注册时选择学校 获取学院列表
* */
function collegeListAjax() {
    var myData = {
        collegeName: $('#college').val()
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
        if (response.code === 200) {

            /*以下除了谷歌浏览器都可以*/
           /* var academy1 = response.data;
            document.getElementById('academy').innerHTML = "";
            for (var ad in academy1) {
                var option = document.createElement("option");
                var node = document.createTextNode(academy1[ad]);
                option.appendChild(node);
                document.getElementById('academy').appendChild(option)
            }*/
            /*以上除了谷歌浏览器都可以*/
            var academy = response.data;
            console.log(response.data);
            var obj = document.getElementById('academy');
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
* 检查注册时输入信息的正确性
* */
function check() {
    /*检查密码不能为空*/
    var password = document.getElementById("password_register").value;
    if(password == null || password == ''){
        $("#ourModalContent").empty();
        $("#ourModalContent").text("密码不能为空");
        $('#ourModal').modal('show');
        return false;
    }
    /*检查两次密码的一致性*/
    var password_confirmation = document.getElementById("password_confirmation").value;
    if(password != password_confirmation){
        $("#ourModalContent").empty();
        $("#ourModalContent").text("两次输入的密码不一致，请重新输入");
        $('#ourModal').modal('show');
        return false;
    }
    /*检查昵称不能为空*/
    var nickname = document.getElementById("nickname").value;
    if(nickname == null || nickname == ''){
       $("#ourModalContent").empty();
        $("#ourModalContent").text("用户名不能为空");
        $('#ourModal').modal('show');
        return false;
    }
    /*检查入学年份不能为空*/
    var enterYear = document.getElementById("enterYear").value;
    if(enterYear == null || enterYear == ''){
        $("#ourModalContent").empty();
        $("#ourModalContent").text("入学年份不能为空");
        $('#ourModal').modal('show');
        return false;
    }
    /*检查性别不能为空*/
    var gender = document.getElementById("gender").value;
    if(gender == null || gender == ''){
        $("#ourModalContent").empty();
        $("#ourModalContent").text("性别不能为空");
        $('#ourModal').modal('show');
        return false;
    }
    /*检查学校不能为空*/
    var college = document.getElementById("college").value;
    if(college == null || college == ''){
        $("#ourModalContent").empty();
        $("#ourModalContent").text("学校不能为空");
        $('#ourModal').modal('show');
        return false;
    }
    /*检查学院不能为空*/
    var temp_academy = document.getElementById("academy").value;
    if(temp_academy == null || temp_academy == ''){
        $("#ourModalContent").empty();
        $("#ourModalContent").text("学院不能为空");
        $('#ourModal').modal('show');
        return false;
    }
    return true;
}

var registerTaken;
var registerPhone;
//注册单击验证码
function yzm() {
    if(isPhoneNum()){
        var myData = {
            phone:$('#telephone_register').val(),
            msg : "注册"
        };
        registerPhone = $('#telephone_register').val();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://119.23.238.215:8080/qmkl1.0.0/sms/send",
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
                /*alert("发送验证码成功");*/
                $('#myModal').modal('show');
                registerTaken = response.data;
                setTime();
                // $("#yzm1").attr("onclick","null");
            }else if(response.msg == "手机号已注册"){
                $("#ourModalContent").empty();
                $("#ourModalContent").text("手机号已注册");
                $('#ourModal').modal('show');

            }else{
                $("#ourModalContent").empty();
                $("#ourModalContent").text("发送失败");
                $('#ourModal').modal('show');
            }
        });
    }
}

//设置还有多长时间不能点击获取验证码
var countdown = 60;
function setTime() {
    if (countdown == 0) {
        $("#yzm1").text("验证码");
        $("#yzm1").attr('disabled',false);
        countdown = 60;//60秒过后button上的文字初始化,计时器初始化;
        $("#yzm1").attr('onclick','yzm()');
        return;
    } else {
        $("#yzm1").attr('disabled', true);
        $("#yzm1").attr('onclick','null');
       // $("#yzm1").css("background", "#ccc").css("cursor", "not-allowed")
        $("#yzm1").text("("+countdown+"s)后重新发送") ;
        countdown--;
    }
    setTimeout(function() { setTime() },1000) //每1000毫秒执行一次
}

//校验手机号是否合法
function isPhoneNum(){
    var phonenum = $("#telephone_register").val();
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if(!reg.test(phonenum)){
        $("#ourModalContent").empty();
        $("#ourModalContent").text("请输入有效的手机号码！");
        $('#ourModal').modal('show');
        return false;
    }else{
        return true;
    }
}

function register() {

    var registerCode = document.getElementById('validNum').value;
    registerPhone = $("#telephone_register").val();
    var myData = {
        token :registerTaken,
        vercode:document.getElementById('validNum').value,
        phone: $("#telephone_register").val()
    };
    console.log("手机：" + registerPhone + "验证码：" + registerCode);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://119.23.238.215:8080/qmkl1.0.0/user/vercode",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json;charset=UTF-8",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(myData)
    };
    $.ajax(settings).done(function (response) {
        console.log(response.code);
        console.log(response.msg);
        if(response.code == 200){
            registerSuccess();
            console.log(registerPhone+"   "+  registerCode  +  "    "  + registerTaken);
        }else{
            registerFail();
            console.log(registerCode);
            console.log(registerPhone+"   "+  registerCode  +  "    "  + registerTaken);
        }
    });
}

function registerSuccess() {
    console.log("注册成功");
    showImproveForm();
}

function registerFail() {
    console.log("注册失败");
    confirm("验证码输入错误，请重新输入！")
}

function improveRegister() {
    var phone = registerPhone;
    if(check()){
        var myData = {
            phone:phone,
            username:phone,
            password:hex_sha1(document.getElementById("password_register").value),
            nickname:document.getElementById("nickname").value,
            enterYear:document.getElementById("enterYear").value,
            gender:document.getElementById("gender").value,
            college:document.getElementById("college").value,
            academy:document.getElementById("academy").value
        };
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://119.23.238.215:8080/qmkl1.0.0/user/all/info",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json;charset=UTF-8",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(myData)
        };
        $.ajax(settings).done(function (response) {
            console.log(response.code);
            if(response.code == 200){
                $("#ourModalContent").empty();
                $("#ourModalContent").text("完善信息成功");
                $('#ourModal').modal('show');
            }else if (response.code == 200 && response.msg == "昵称已存在") {
                $("#ourModalContent").empty();
                $("#ourModalContent").text("昵称已存在，请输入一个新的昵称");
                $('#ourModal').modal('show');
            }
        });
    }
}
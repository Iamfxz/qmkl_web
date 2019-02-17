function showRegisterForm() {
    $('.loginBox').fadeOut('fast', function () {
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast', function () {
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Register with');
    });
    $('.error').removeClass('alert alert-danger').html('');
}

function showLoginForm() {
    $('#loginModal .registerBox').fadeOut('fast', function () {
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast', function () {
            $('.login-footer').fadeIn('fast');
        });
        $('.modal-title').html('Login with');
    });
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
    var myData = "{\"username\": \"" + $('#telephone_login').val() +
        "\",\"password\": \"" + hex_sha1($('#password_login').val()) +
        "\"}";
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://120.77.32.233/qmkl1.0.0/user/login",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": myData
    };
    //console.log("账号："+ $('#telephone_login').val());
    //console.log("密码（加密后）："+hex_sha1($('#password_login').val()));
    $.ajax(settings).done(function (data) {
        if(data.code === 200){
            var token = data.data;
            console.log("qmkl_token(cookie):"+token);
            //创建一个cookie并设置有效时间为 7天
            $.cookie('qmkl_token',token,{ expires: 7 });
            $('#loginModal').modal('hide');
            //刷新页面
            window.location.reload();
        }
        else {
            shakeModal();
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
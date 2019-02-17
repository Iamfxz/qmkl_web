function onKeyDown(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode === 13) { // enter 键
        alert("开始进行搜索");
    }
}

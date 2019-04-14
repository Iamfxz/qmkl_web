$(document).ready(function () {
    $('#letterContentFrame').hover(function () {
        document.getElementById("letterContentFrame").style.visibility="visible"
    })
    $('#letterContentFrame').mouseleave(function () {
        document.getElementById("letterContentFrame").style.visibility="hidden"
    })
    $('#float_left #letterNumber').hover(function () {
        document.getElementById("letterContentFrame").style.visibility="visible"
    })
    $('#float_left #letterNumber').mouseleave(function () {
        document.getElementById("letterContentFrame").style.visibility="hidden"
    })


})
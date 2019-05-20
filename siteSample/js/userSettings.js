//=======Dynamic settings applying

//trigger for Buy Button
var switchStatus = false;
$("#buyButton").on('change', function() {
    if ($(this).is(':checked')) {
        switchStatus = $(this).is(':checked');
//        alert(switchStatus);// To verify
        $('.delay').attr('style', "display:block");
    }
    else {
       switchStatus = $(this).is(':checked');//
        var stat = $('.delay').attr('style', "display:none");
//        console.log(stat);
    }
});

//trigger for Sales Text
var switchTextStatus = false;
$("#salesText").on('change', function() {
    if ($(this).is(':checked')) {
        switchTextStatus = $(this).is(':checked');
//        alert(switchStatus);// To verify
        $('.sales_text').attr('style', "display:block");
    }
    else {
       switchTextStatus = $(this).is(':checked');//
        var stat = $('.sales_text').attr('style', "display:none");
        // console.log(stat);
    }
});

//Change background img
$(".custom-select").on('change', function() {
    var backgroundNum = $(this).val()
    var url      = window.location.href;
    //get absolute url
    url = url.split(/(.+\/).?/)[1];
    console.log(url);

    var imgName = "url("+url+"images/bg-"+backgroundNum+".jpg)"
    $('body').attr('style', 'background-image:'+imgName);

});

//trigger for Autoplay
var switchAutoplay = false;
$("#autoplay").on('change', function() {
    if ($(this).is(':checked')) {
        switchStatus = $(this).is(':checked');
//        $(".video")[0].play();
        $('.video')[0].autoplay = true;
//        $('.video').attr('autoplay', true);
    }
    else {
       switchStatus = $(this).is(':checked');//
        var stat = $('.video').attr('autoplay', false);
//        console.log(stat);
    }
});
//======= END Dynamic settings applying

//============= Get parameters from url ====//
//alert(location.search);
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

    var background = getUrlVars()["bg"];
    var autoplay = getUrlVars()["play"];
    var buyButton = getUrlVars()["button"];
    var salesText = getUrlVars()["text"];
    var exitPop = getUrlVars()["exit"];
//    console.log(background);
//    console.log(autoplay);
//    console.log(buyButton);
//    console.log(salesText);
//    console.log(exitPop);
if(background){
    var url      = window.location.href;
    //get absolute url
    url = url.split(/(.+\/).?/)[1];
    var imgName = "url("+url+"images/bg-"+background+".jpg)"
    $('body').attr('style', 'background-image:'+imgName);
}
if(autoplay){
   $('.video')[0].autoplay = true;
}
if(buyButton){
   $('.delay').attr('style', "display:block");
}
if(salesText){
   $('.sales_text').attr('style', "display:block");
}
if(exitPop){
   $('.exit_pop').attr('style', "display:block");
}

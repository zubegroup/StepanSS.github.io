
//trigger for Instant Buy Button
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

//Change background img
$(".custom-select").on('change', function() {
    var backgroundNum = $(this).val()

    console.log(backgroundNum);
    var imgName = "url(/siteSample/images/bg-"+backgroundNum+".jpg)"
    $('body').attr('style', 'background-image:'+imgName);

});


//trigger for Autoplay
var switchAutoplay = false;
$("#autoplay").on('change', function() {
    if ($(this).is(':checked')) {
        switchStatus = $(this).is(':checked');
        $(".video")[0].play();
        $('.video')[0].autoplay = true;
//        $('.video').attr('autoplay', true);
    }
    else {
       switchStatus = $(this).is(':checked');//
        var stat = $('.video').attr('autoplay', false);
//        console.log(stat);
    }
});

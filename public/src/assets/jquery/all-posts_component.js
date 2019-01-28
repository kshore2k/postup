import * as $ from 'jquery';

$(document).ready(function(){

    // Scroll Top Animation
    $('#page_top').children().click(function(){
        $('html, body').animate({scrollTop: $('html').offset().top}, 500)
    })

    // Social Link Hover Effects
    var imageSrc;
    $('.social_icon').hover(
        function(){
            imageSrc = $(this).attr('src');
            $(this).attr('src', $(this).attr('hover'))
        },
        function(){
            $(this).attr('src', imageSrc)
        }
    );

})
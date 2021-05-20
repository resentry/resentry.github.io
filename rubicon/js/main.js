$(document).ready(function () {
    $('.slides-botom').slick({
        arrows: false,
        dots: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        speed: 5000,
        autoplay: true,
        autoplaySpeed: 1,
        easing: 'easeOutSine',
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 3
            }
        }],
    });
});
document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            document.getElementById('navbar_top').classList.add('fixed-top');
            document.getElementById('navbar_top').classList.add('shadow');
            // add padding top to show content behind navbar
            navbar_height = document.querySelector('.navbar').offsetHeight;
            document.body.style.paddingTop = navbar_height + 'px';
        } else {
            document.getElementById('navbar_top').classList.remove('fixed-top');
            document.getElementById('navbar_top').classList.remove('shadow');

            // remove padding top from body
            document.body.style.paddingTop = '0';
        }
    });
});
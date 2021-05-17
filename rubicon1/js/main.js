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
    });
});

$(document).ready(function () {
    $('.slider-top').slick({
        dots: true,
        autoplay: true,
    });
});

// var counter = 1;
// setInterval(function () {
//     document.getElementById('radio' + counter).checked = true;
//     counter++;
//     if (counter > 3) {
//         counter = 1;
//     }
// }, 3000)

// let angel = document.getElementsByClassName('menu__item');
// for (i = 0; i <= angel.length; i++) {
//     angel[i].onmouseover = function (event) {
//         let target = event.target;
//         target.lastChild.src = "/img/angle-arrow-down-orange.png"
//     }
//     angel[i].onmouseout = function (event) {
//         let target = event.target;
//         target.lastChild.src = "/img/angle-arrow-down.png"
//     }
// }

// let services = document.querySelectorAll('.services-name, .all-servicess');
// for (i = 0; i <= services.length; i++) {
//     services[i].onmouseover = function (event) {
//         let target = event.target;
//         let servicesStyles = target.getElementsByClassName('services-name');
//         servicesStyles[0].classList.add("services-name-orange");
//     }
//     services[i].onmouseout = function (event) {
//         let target = event.target;
//         let servicesStyles = target.getElementsByClassName('services-name');
//         servicesStyles[0].classList.remove("services-name-orange");
//     }
// }
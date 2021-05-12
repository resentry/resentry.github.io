var counter = 1;
setInterval(function () {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > 3) {
        counter = 1;
    }
}, 7000)

let angel = document.getElementsByClassName('menu__item');
for (i = 0; i <= angel.length; i++) {
    angel[i].onmouseover = function (event) {
        target = event.target;
        target.lastChild.src = "/img/angle-arrow-down-orange.png"
    }
    angel[i].onmouseout = function (event) {
        target = event.target;
        target.lastChild.src = "/img/angle-arrow-down.png"
    }
}

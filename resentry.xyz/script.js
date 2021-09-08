let arrData = [];
let date = [];
let electric = [];
let gas = [];
let water = [];
let year = new Date;
const mediaQuery = window.matchMedia('(max-width: 764px)');
document.getElementsByClassName('nowYear')[0].value = year.getFullYear();
document.getElementsByClassName('nowYear')[1].value = year.getFullYear();
showAllData()
dataOutput();
var ctx = document.getElementById('chart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: date,
        responsive: true,
        maintainAspectRatio: false,
        datasets: [{
            label: 'Электричество',
            data: electric,
            backgroundColor: 'transparent',
            borderColor: '#fc3f1d',
            borderWidth: 3,
            tension: 0.27
        },
        {
            label: 'Вода',
            data: water,
            backgroundColor: 'transparent',
            borderColor: '#75a2e7',
            borderWidth: 3,
            tension: 0.27
        },
        {
            label: 'Природный газ',
            data: gas,
            backgroundColor: 'transparent',
            borderColor: '#ffcc00',
            borderWidth: 3,
            tension: 0.27
        }
        ]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }

    }
});
//Вывод данных
function dataOutput() {
    var url = '/calc.php';
    let name = document.getElementById('name').innerText;
    var formData = new FormData();
    formData.append('name', name);
    let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    fetch(url, { method: 'POST', body: formData })
        .then(function (response) {
            return response.json();
        })
        .then(function (body) {
            console.log(body);
            body.sort(function (a, b) {
                a = a.date.split(" ");
                b = b.date.split(" ")
                if (new Date(a[0], months.indexOf(a[1])) > new Date(b[0], months.indexOf(b[1]))) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
            for (i = 0; i < body.length; i++) {
                for (key in body[i]) {
                    if (key != "date") {
                        body[i][key] = Number(body[i][key]);
                    }
                }
                arrData.push(body[i]);
            }
            let arrDate = arrData.map(function (elem) {
                return elem.date;
            })
            for (i = 0; i < arrDate.length; i++) {
                proxyToArray.push(arrDate[i])
            }
            let arrElectric = arrData.map(function (elem) {
                return elem.electric;
            })
            for (i = 0; i < arrElectric.length; i++) {
                electric.push(arrElectric[i])
            }
            let arrGas = arrData.map(function (elem) {
                return elem.gas;
            })
            for (i = 0; i < arrGas.length; i++) {
                gas.push(arrGas[i])
            }
            let arrWater = arrData.map(function (elem) {
                return elem.water;
            })
            for (i = 0; i < arrWater.length; i++) {
                water.push(arrWater[i])
            }
            chart.update();
        });
}

//Добавление данных
function dataInput() {
    let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let name = document.getElementById('name').innerText;
    let year = document.getElementsByClassName('year')[0].value;
    let month = document.getElementById('month').value;
    let electricAdd = Number(document.getElementById('electric').value);
    let waterAdd = document.getElementById('water').value;
    let gasAdd = document.getElementById('gas').value;
    var url = '/add.php';
    var formData = new FormData();
    formData.append('name', name);
    formData.append('year', year);
    formData.append('month', month);
    formData.append('electric', electricAdd);
    formData.append('water', waterAdd);
    formData.append('gas', gasAdd);
    fetch(url, { method: 'POST', body: formData })
        .then(function (response) {
            return response.text();
        })
        .then(function (body) {
            if (body != "") {
                alert(body)
            }
            else {
                let addDate = year + ' ' + month;
                let arrAddDate = [year + ' ' + month];
                let arrDate = date.slice();
                let combineArr = arrDate.concat(arrAddDate);
                combineArr.sort(function (a, b) {
                    a = a.split(" ");
                    b = b.split(" ")
                    if (new Date(a[0], months.indexOf(a[1])) > new Date(b[0], months.indexOf(b[1]))) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                });
                proxyToArray.splice(combineArr.indexOf(addDate), 0, addDate);
                electric.splice(combineArr.indexOf(addDate), 0, electricAdd);
                water.splice(combineArr.indexOf(addDate), 0, waterAdd);
                gas.splice(combineArr.indexOf(addDate), 0, gasAdd);
            }
        });
}
//Удаление данных
function dataDel() {
    let name = document.getElementById('name').innerText;
    let year = document.getElementsByClassName('year')[1].value;
    let month = document.getElementById('monthDel').value;
    var url = '/del.php';
    var formData = new FormData();
    formData.append('name', name);
    formData.append('year', year);
    formData.append('month', month);
    fetch(url, { method: 'POST', body: formData })
        .then(function (response) {
            return response.text();
        })
        .then(function (body) {
            if (body != "") {
                alert(body)
            }
            else {
                let delDate = year + ' ' + month;
                let item = date.indexOf(delDate);
                proxyToArray.splice(item, 1);
                electric.splice(item, 1);
                water.splice(item, 1);
                gas.splice(item, 1);
            }
        });
}
//При нажатии на кнопку "Посмотреть"
function showAllData() {
    document.getElementById('addMenu').classList.remove('addMenuVisible')
    document.getElementById('addMenu').classList.add('addMenu')
    document.getElementById('delMenu').classList.remove('delMenuVisible')
    document.getElementById('delMenu').classList.add('delMenu')
    document.getElementsByClassName('chart-container')[0].style.width = document.documentElement.clientWidth - 40 + 'px';
    for (i = 0; i < 9; i++) {
        document.getElementsByClassName('inputData')[i].classList.add('inputDataHidden');
    }
    document.getElementsByClassName('showAll')[0].classList.add('check');
    document.getElementsByClassName('showAdd')[0].classList.remove('check');
    document.getElementsByClassName('showDel')[0].classList.remove('check');
    window.addEventListener('resize', function () {
        document.getElementsByClassName('chart-container')[0].style.width = document.documentElement.clientWidth - 40 + 'px';
    }, true);

    function handleTabletChange(e) {
        if (e.matches) {
            document.getElementsByClassName('chart-container')[0].style.display = 'block';
            document.getElementsByClassName('login')[0].style.display = 'none';
            document.getElementsByClassName('menu')[0].children[0].children[0].style.marginLeft = 'auto';
            document.getElementsByClassName('menu')[0].children[0].children[0].children[0].style.marginLeft = '0';
            document.getElementsByClassName('menu')[0].children[0].children[3].style.marginRight = 'auto';
        }
    }
    handleTabletChange(mediaQuery);
    mediaQuery.addListener(handleTabletChange);
}
//При нажатии на кнопку "Добавить"
function add() {
    document.getElementById('addMenu').classList.remove('addMenu')
    document.getElementById('addMenu').classList.add('addMenuVisible')

    document.getElementById('delMenu').classList.remove('delMenuVisible');
    document.getElementById('delMenu').classList.add('delMenu');

    for (i = 0; i <= 6; i++) {
        document.getElementsByClassName('inputData')[i].classList.remove('inputDataHidden');
    }
    for (i = 6; i < 9; i++) {
        document.getElementsByClassName('inputData')[i].classList.add('inputDataHidden');
    }
    document.getElementsByClassName('showAll')[0].classList.remove('check');
    document.getElementsByClassName('showAdd')[0].classList.add('check');
    document.getElementsByClassName('showDel')[0].classList.remove('check');
    document.getElementsByClassName('chart-container')[0].style.width = document.documentElement.clientWidth - 390 + 'px';
    window.addEventListener('resize', function () {
        document.getElementsByClassName('chart-container')[0].style.width = document.documentElement.clientWidth - 390 + 'px';
    }, true);

    function handleTabletChangeAdd(e) {
        if (e.matches) {
            for (i = 0; i < document.getElementsByClassName('inputData').length; i++) {
                document.getElementsByClassName('inputData')[i].style.transition = 'none';
            }
            document.getElementsByClassName('login')[0].style.display = 'none';
            document.getElementsByClassName('chart-container')[0].style.display = 'none';
            document.getElementById('addMenu').style.marginLeft = 'auto';
            document.getElementById('addMenu').style.transition = 'none';
            document.getElementsByClassName('menu')[0].children[0].children[0].style.marginLeft = 'auto';
            document.getElementsByClassName('menu')[0].children[0].children[0].children[0].style.marginLeft = '0';
            document.getElementsByClassName('menu')[0].children[0].children[3].style.marginRight = 'auto';
        }
    }
    mediaQuery.addListener(handleTabletChangeAdd)
    handleTabletChangeAdd(mediaQuery)
}
//При нажатии на кнопку "Удалить"
function del() {
    document.getElementById('delMenu').classList.remove('delMenu')
    document.getElementById('delMenu').classList.add('delMenuVisible')

    document.getElementById('addMenu').classList.remove('addMenuVisible');
    document.getElementById('addMenu').classList.add('addMenu');
    for (i = 0; i <= 6; i++) {
        document.getElementsByClassName('inputData')[i].classList.add('inputDataHidden');
    }
    for (i = 6; i < 9; i++) {
        document.getElementsByClassName('inputData')[i].classList.remove('inputDataHidden');
    }
    document.getElementsByClassName('showAll')[0].classList.remove('check');
    document.getElementsByClassName('showAdd')[0].classList.remove('check');
    document.getElementsByClassName('showDel')[0].classList.add('check');
    document.getElementsByClassName('chart-container')[0].style.width = document.documentElement.clientWidth - 390 + 'px';
    window.addEventListener('resize', function () {
        document.getElementsByClassName('chart-container')[0].style.width = document.documentElement.clientWidth - 390 + 'px';
    }, true);

    function handleTabletChangeDel(e) {
        if (e.matches) {
            for (i = 0; i < document.getElementsByClassName('inputData').length; i++) {
                document.getElementsByClassName('inputData')[i].style.transition = 'none';
            }
            document.getElementsByClassName('login')[0].style.display = 'none';
            document.getElementsByClassName('chart-container')[0].style.display = 'none';
            document.getElementById('delMenu').style.marginLeft = 'auto';
            document.getElementById('delMenu').style.transition = 'none';
            document.getElementsByClassName('menu')[0].children[0].children[0].style.marginLeft = 'auto';
            document.getElementsByClassName('menu')[0].children[0].children[0].children[0].style.marginLeft = '0';
            document.getElementsByClassName('menu')[0].children[0].children[3].style.marginRight = 'auto';
        }
    }
    mediaQuery.addListener(handleTabletChangeDel)
    handleTabletChangeDel(mediaQuery)
}
//Проверка изменения массива date, для обновления графика
var arrayChangeHandler = {
    set: function (target, property, value, receiver) {
        setTimeout(() => {
            chart.update();
        }, 10);
        target[property] = value;
        return true;
    }
};

var proxyToArray = new Proxy(date, arrayChangeHandler);





<?php
    require "db.php";
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css">
    <title>Показания счетных приборов</title>
</head>

<body>

<?php
// если авторизован
if(isset($_SESSION['logged_user'])) : 
?>
    <header>
        <nav>
            <div class="menu">
                <ul>
                    <li>
                        <p class="showAll" onclick="showAllData()">Посмотреть</p>
                    </li>
                    <li>
                        <p class="showAdd" onclick="add()">Добавить</p>
                    </li>
                    <li>
                        <p class="showDel" onclick="del()">Удалить</p>
                    </li>
                    <li>
                        <p><a class="logout" href="/logout.php">Выйти</a></p>
                    </li>
                    <li class="login">
                        <p><a>Логин: </a><a id="name"><?php echo $_SESSION['logged_user']->login;?></a></p>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <div class="display">
        <div class="addMenu" id="addMenu">
            <div class="inputData colorYear colorYearBorder">
                <div class="sign">Год</div>
                <div class="input colorYearBorder"><input type="number" class="year nowYear"></div>
            </div>
            <div class="inputData colorMonth colorMonthBorder">
                <div class="sign">Месяц</div>
                <div class="input colorMonthBorder">
                    <select name="month" id="month">
                        <option value="Январь">Январь</option>
                        <option value="Февраль">Февраль</option>
                        <option value="Март">Март</option>
                        <option value="Апрель">Апрель</option>
                        <option value="Май">Май</option>
                        <option value="Июнь">Июнь</option>
                        <option value="Июль">Июль</option>
                        <option value="Август">Август</option>
                        <option value="Сентябрь">Сентябрь</option>
                        <option value="Октябрь">Октябрь</option>
                        <option value="Ноябрь">Ноябрь</option>
                        <option value="Декабрь">Декабрь</option>
                    </select>
                </div>
            </div>
            <div class="inputData colorElectric colorElectricBorder">
                <div class="sign">Электричество</div>
                <div class="input colorElectricBorder"><input type="number" id="electric"></div>
            </div>
            <div class="inputData colorWater colorWaterBorder">
                <div class="sign">Вода</div>
                <div class="input colorWaterBorder"><input type="number" id="water"></div>
            </div>
            <div class="inputData colorGas colorGasBorder">
                <div class="sign">Природный газ</div>
                <div class="input colorGasBorder"><input type="number" id="gas"></div>
            </div>
            <div class="inputData colorAdd colorAddBorder">
                <div class="sign" onclick="dataInput()">Добавить данные</div>
            </div>
        </div>
        <div class="delMenu" id="delMenu">
            <div class="inputData colorYear colorYearBorder">
                <div class="sign">Год</div>
                <div class="input colorYearBorder"><input type="number" class="year nowYear"></div>
            </div>
            <div class="inputData colorMonth colorMonthBorder">
                <div class="sign">Месяц</div>
                <div class="input colorMonthBorder">
                    <select name="month" id="monthDel">
                        <option value="Январь">Январь</option>
                        <option value="Февраль">Февраль</option>
                        <option value="Март">Март</option>
                        <option value="Апрель">Апрель</option>
                        <option value="Май">Май</option>
                        <option value="Июнь">Июнь</option>
                        <option value="Июль">Июль</option>
                        <option value="Август">Август</option>
                        <option value="Сентябрь">Сентябрь</option>
                        <option value="Октябрь">Октябрь</option>
                        <option value="Ноябрь">Ноябрь</option>
                        <option value="Декабрь">Декабрь</option>
                    </select>
                </div>
            </div>
            <div class="inputData colorDel colorDelBorder">
                <div class="sign" onclick="dataDel()">Удалить данные</div>
            </div>
        </div>
        <div class="chart-container">
            <canvas id="chart"></canvas>
        </div>
        <?php
        //если не авторизован
            else: ?> 

            <div class="auth">
                <a class="auth_login" href="/login.php"><span>Авторизоваться</span></a>
                <a class="auth_signup" href="/signup.php"><span>Регистрация</span></a>
            </div>

        <?php endif;
            ?>

    </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.4.1/dist/chart.min.js"></script>
<script src="script.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
    crossorigin="anonymous"></script>

</html>
<?php
require "db.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Показания счетных приборов</title>
</head>

<body>
<?php
    $data = $_POST;
    if(isset($data['do_signup'])){
        $errors = array();
        if(trim($data['login']) == ''){
            $errors[] = 'Введите логин!';
        }
        if(R::count('users', "login = ?", array($data['login'])) > 0){
            $errors[] = 'Пользователь с таким логином уже существует!';
        }
        if($data['password'] == ''){
            $errors[] = 'Введите пароль!';
        }
        if($data['password_2'] != $data['password']){
            $errors[] = 'Повторный пароль введен неверно!';
        }
        if(trim($data['email']) == ''){
            $errors[] = 'Введите email!';
        }
        if(R::count('users', "email = ?", array($data['email'])) > 0){
            $errors[] = 'Данный email уже используется!';
        }


        if(empty($errors)){
            $user = R::dispense('users');
            $user->login = $data['login'];
            $user->email = $data['email'];
            $user->password = password_hash($data['password'], PASSWORD_DEFAULT);
            R::store($user);

            R::selectDatabase('DB2');
            $chart = R::dispense($data['login']);
            $chart->date = 'test';
            $chart->electric = '1';
            $chart->water = '1';
            $chart->gas = '1';
            R::store($chart);
            R::wipe($data['login']);

            ?>
            <div class="bodyOkMessage">
                <div class="okMessage">Вы успешно зарегистрированы!</div>
                <div class="authAfterSignup">
                    <a class="auth_login" href="login.php"><span>Авторизоваться</span></a>
                    <a class="auth_signup" href="signup.php"><span>Регистрация</span></a>
                </div>
            </div>
            <script>
                document.addEventListener("DOMContentLoaded", function(event) {
                    document.getElementsByClassName('formSignup')[0].style.display = "none";
                });
            </script>

        <?php
        }
        else{
            ?>
                <script>
                document.addEventListener("DOMContentLoaded", function(event) {
                    document.getElementsByClassName('alertMessage')[0].style.opacity = '1';
                    document.getElementsByClassName('alertMessage')[0].innerHTML = '<?php echo array_shift($errors);?>';
                    document.getElementsByClassName('formSignup')[0].classList.add('shake');
                    document.getElementsByClassName('formSignup')[0].classList.add('alert');
                    setTimeout(() => {
                        document.getElementsByClassName('formSignup')[0].classList.remove('shake');
                        document.getElementsByClassName('formSignup')[0].classList.remove('alert');
                    }, 820)
                });
                </script>
            <?php
        }
    }
?>
<div class="bodySignup">
        <div class="alertMessage"></div>
        <form class="formSignup" action="/signup.php" method="POST">
            <div class="inputData colorWater colorWaterBorder">
                <div class="sign">Введите логин</div>
                <div class="input colorWaterBorder"><input class="year" type="text" name="login" value="<?php echo @$data['login']?>"></div>
            </div>
            <div class="inputData colorMonth colorMonthBorder">
                <div class="sign">Введите пароль</div>
                <div class="input colorMonthBorder"><input class="year" type="password" name="password"></div>
            </div>
            <div class="inputData colorMonth colorMonthBorder">
                <div class="sign">Повтор пароля</div>
                <div class="input colorMonthBorder"><input class="year" type="password" name="password_2"></div>
            </div>
            <div class="inputData colorEmail colorEmailBorder">
                <div class="sign">Введите email</div>
                <div class="input colorEmailBorder"><input class="year" type="email" name="email" value="<?php echo @$data['email']?>"></div>
            </div>
            <button class="do_signup" type="submit" name="do_signup">Зарегистрироваться</button>
        </form>
    </div> 
    
</body>
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.4.1/dist/chart.min.js"></script>
<script src="script.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
    crossorigin="anonymous"></script>

</html>
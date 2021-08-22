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
    if( isset($data['do_login'])){
        $errors = array();
        $user = R::findOne('users', 'login = ?', array($data['login']));
        if($user){
            //Пользователь существует
            if(password_verify($data['password'], $user->password)){
                $_SESSION['logged_user'] = $user;
                ?>
                <script>
                document.location.href = "/";
                </script>
                <?php
            }
            else{
                $errors[] = 'Неправильно указан пароль!';
            }
        }
        else{
            $errors[] = 'Пользователь с таким логином отсутствует!';
        }
        if(!empty($errors)){
            ?>
                <script>
                document.addEventListener("DOMContentLoaded", function(event) {
                    document.getElementsByClassName('alertMessage')[0].style.opacity = '1';
                    document.getElementsByClassName('alertMessage')[0].innerHTML = '<?php echo array_shift($errors);?>';
                    document.getElementsByClassName('formAuth')[0].classList.add('shake');
                    document.getElementsByClassName('formAuth')[0].classList.add('alert');
                    setTimeout(() => {
                        document.getElementsByClassName('formAuth')[0].classList.remove('shake');
                        document.getElementsByClassName('formAuth')[0].classList.remove('alert');
                    }, 820)
                });
                </script>
            <?php
        }
    }


?>
    <div class="bodyLogin">
        <div class="alertMessage"></div>
        <form class="formAuth" action="login.php" method="POST">
            <div class="inputData colorWater colorWaterBorder">
                <div class="sign">Ваш логин</div>
                <div class="input colorWaterBorder"><input class="year" type="text" name="login" value="<?php echo @$data['login']?>"></div>
            </div>
            <div class="inputData colorMonth colorMonthBorder">
                <div class="sign">Ваш пароль</div>
                <div class="input colorMonthBorder"><input class="year" type="password" name="password"></div>
            </div>
            <button class="enter" type="submit" name="do_login">Войти</button>
        </form>
    </div> 

</body>
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.4.1/dist/chart.min.js"></script>
<script src="script.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
    crossorigin="anonymous"></script>

</html>
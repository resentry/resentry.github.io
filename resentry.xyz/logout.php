<?php
    header('Location: /');
    require "db.php";
    unset($_SESSION['logged_user']);
?>
<?php
require "libs/rb.php";
R::setup( 'mysql:host=localhost;dbname=usersdb', 'rootik', '' );
R::addDatabase('DB2' ,'mysql:host=localhost;dbname=countersdb', 'root', '');
session_start();
?>
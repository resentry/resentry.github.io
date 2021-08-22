<?php 

try{
   $conn = new PDO("mysql:host=localhost;dbname=countersdb" , "root", "");
}catch(PDOException $e){
   $error_message = $e->getMessage();
   echo $error_message;
   exit();
}
$checkdb = 'SELECT `date` FROM '.' '. $_POST["name"].' '.' WHERE `date` = :date';

$stmt = $conn->prepare($checkdb);
$stmt->execute(['date' => $_POST["year"]." ".$_POST["month"]]);
$stack = array();
while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
   array_push($stack, $row);
}
if(count($stack) > 0){
   $namedb = 'DELETE FROM '.' '. $_POST["name"].' '.' WHERE date=?';
   $stmt = $conn->prepare($namedb);
   $stmt->execute(array_values(['date' => $_POST["year"]." ".$_POST["month"]]));
}
else{
   echo "Запись отсутствует";
}



?>
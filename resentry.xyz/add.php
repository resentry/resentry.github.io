<?php 
require "db.php";
try{
  $conn = new PDO("mysql:host=localhost;dbname=countersdb" , "root", "");
}catch(PDOException $e){
  $error_message = $e->getMessage();
  echo $error_message;
  exit();
}
$req = 'SELECT `date` FROM '.' '. $_POST["name"].' '.' WHERE `date` = :date';
$stmt = $conn->prepare($req);
$stmt->execute(['date' => $_POST["year"]." ".$_POST["month"]]);
$stack = array();
while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
  array_push($stack, $row);
}
if(count($stack) > 0){
  echo "Запись уже существует";
}
else{
  $namedb ='INSERT INTO'.' '. $_POST["name"].' '.'(`date`, `electric`, `water`, `gas`) VALUES (?,?,?,?)';
  // echo $namedb;
  $stmt = $conn->prepare($namedb);
  $rows = [
      ['date' => $_POST["year"]." ".$_POST["month"], 'electric' => $_POST["electric"],'water' => $_POST["water"],'gas' => $_POST["gas"]]
  ];

  $conn->beginTransaction();
  foreach ($rows as $data){
      $stmt->execute(array_values($data));
  }
  $conn->commit();
}
?>
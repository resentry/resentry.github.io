<?php 
$req ='SELECT * FROM'.' '. $_POST["name"];
try{
    $conn = new PDO("mysql:host=localhost;dbname=countersdb" , "root", "");
}catch(PDOException $e){
    $error_message = $e->getMessage();
    echo $error_message;
    exit();
}
$stmt = $conn->query($req);
$stack = array();
while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
  array_push($stack, $row);
}
echo json_encode($stack);

?>
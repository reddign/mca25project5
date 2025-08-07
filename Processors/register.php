<?php
print_r($_POST);
$u = $_POST["username"];
$p = $_POST["password"];
$e = $_POST["email"];
if($_SERVER['HTTP_HOST']=="127.0.0.1"){
    $mysqli = new mysqli("127.0.0.1","root","","waterguys");
}
else{
    $mysqli = new mysqli("195.35.59.14","u121755072_waterguys","?P6w@V5o6","u121755072_waterguysdb");
}
if ($mysqli->connect_errno){
    echo "Connection Failure";
    exit;
}

$sql = "INSERT INTO users(email, username, bestPassword) 
VALUES('{$e}','{$u}', SHA2(CONCAT('{$p}','oceanMan'),224) );";

$result = $mysqli -> query($sql);

header("location:../login.htm")
?>
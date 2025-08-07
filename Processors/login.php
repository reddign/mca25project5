<?php
session_start();
$u = $_POST["username"];
$p = $_POST["password"];
// To do:
// Connect to database 
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
// Send SQL Statement
$sql = "SELECT * FROM users where username='{$u}' and bestPassword = SHA2(CONCAT('{$p}','oceanMan'),224) ";

// echo $sql;
//Get results
$result = $mysqli -> query($sql);
$rows = $result -> fetch_all(MYSQLI_ASSOC);

// print_r( $rows);
// Check if matches row 
if (is_array($rows) && array_key_exists("0",$rows)){
    $_SESSION["LoggedIn"]="YES";
    $_SESSION["coins"]=100;
    $_SESSION["UserID"]=$u;
    header("location:../homepage/homepage.htm");
}
else{
    $_SESSION["LoggedIn"]="NO";
    $_SESSION["coins"]=0;
    $_SESSION["UserID"]="";
    header("location:../login.htm?message=Invalid Username or password.");
}
?>
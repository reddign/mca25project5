<?php
session_start();
$score=$_POST["score"];
$uname = $_SESSION["UserID"];

if($_SERVER['HTTP_HOST']=="127.0.0.1"){
    $mysqli = new mysqli("127.0.0.1","root","","waterguys");
}
else{    
    $mysqli = new mysqli("195.35.59.14","u121755072_waterguys","?P6w@V5o6","u121755072_waterguysdb");
    //make a SQL message
}

$sql = "INSERT INTO scores
(userid,score,game,time) 
VALUES 
(
(SELECT id FROM users where username='{$uname}')
,{$score},'brickBreak',NOW());";

if($uname!=""){
    $result = $mysqli -> query($sql);
}

header("location:brick.php");


?>
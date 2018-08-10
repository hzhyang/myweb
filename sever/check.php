<?php
$user_name = $_GET["name"];
header("Content-type: text/html;charset=utf-8");
    $conn = new mysqli("localhost:3306", "root", "", "aishangjia");
    $conn->query("set names 'utf8'");
    function isuser(){
        global $user_name,$conn;
        $sql = "select count(*) as num from user where username = '$user_name'";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        return $row["num"];
    };
    if(isuser()==0){
        echo "0";
    }
    else{
        echo "1";
    }
?>
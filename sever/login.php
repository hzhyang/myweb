<?php
 $user_name = $_POST["uname"];
 $pass_word = $_POST["upass"];
 header("Content-type: text/html;charset=utf-8");
 $conn = new mysqli("localhost:3306", "root", "", "aishangjia");
 $conn->query("set names 'utf8'");
 if(isuser()== 0){
     echo "0";
 }
 else{
    $sql = "select password as pass from user where username = '$user_name'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    if($row["pass"]==$pass_word){
        echo "1";
    }
    else{
        echo "2";
    }
 }


 function isuser(){
    global $user_name,$conn;
    $sql = "select count(*) as num from user where username = '$user_name'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row["num"];
}
?>
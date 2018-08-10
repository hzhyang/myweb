<?php
    $user_name = $_POST["uname"];
    $pass_word = $_POST["upass"];
    header("Content-type: text/html;charset=utf-8");
    $conn = new mysqli("localhost:3306", "root", "", "aishangjia");
    $conn->query("set names 'utf8'");
    if(isuser()==0){
        $sql = "insert into  user(username,password,regtime) values('$user_name','$pass_word',now())";
        if($conn->query($sql) === true) {
             echo '["success",'.'"'.$user_name.'"'.']';
        }
        else{
           echo "error";
        }
    }
    else{
        echo "repeat";
    }

    function isuser(){
        global $user_name,$conn;
        $sql = "select count(*) as num from user where username = '$user_name'";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        return $row["num"];
    }
?>
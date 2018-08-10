var auth_flag=repass_flag=pass_flag=name_flag=false;
//验证码
function radom(min,max){
    var round = Math.round(Math.random()*(max-min)+min);
    return round;
};
//自运行函数；
(function(){
    sj_code_style();
})();
//生成随机验证码函数；

function sj_code_style(){
    auth_arr = [];
    for(var i=0;i<4;i++){
        var rod = radom(65,122);
        if(rod>90&&rod<97){
            i = i-1;
        }
        else{
            auth_arr.push(String.fromCharCode(rod));
        }
    } 
    var fstybeg= ["<b>","<i>",""];
    var fstyend = ["</b>","</i>",""];
    var rgb = ["red","blue","green"];
    var str="";
    for(var j =0;j<auth_arr.length;j++){
        var fsb = radom(0,fstybeg.length-1);
        str+=fstybeg[fsb]+auth_arr[j]+" "+fstyend[fsb];  
    }
    $("#authcode").html(str);
    $("#authcode").css({color:rgb[radom(0,rgb.length)],})
}  
//换一张点击事件；
$(".auth_li>i").click(function(){
    sj_code_style();
    $(".auth_li>input").val("");
})

//前端验证输入数据合法性；

//判断验证码是否输入正确 这个一会做到注册按钮的点击事件里
$(".auth_li>input").keyup(function(){
    var codeval = $(this).val().toLowerCase();
    var str ="";
    auth_arr.forEach(element => {
        str+=element;
    });
    str = str.toLowerCase()
    if(str == codeval){
       auth_flag = true;
    }
    else{
        auth_flag = false;
    }
})
//用户名验证
$("#uname").keyup(function(){
    var name_val = $(this).val();
    var reg_phone = /^1\d{10}$/;
    var reg_email = /^\w+@\w+\.\w+$/;
    var phoneoremail = /\D/;
    if(!name_val){
        $(".erro_uname").text("");
    }
    $.get("../../../sever/check.php",{"name":name_val},function(data){
        if(data==1){
            if(phoneoremail.test(name_val)){
                $(".erro_uname").text("此邮箱已存在");
                $(".erro_uname").css({
                "color":"red",
                "background-image": 'url("../img/lg-ico.png")',
                "background-position-y": "1px"
                }) 
            }
            else{
                $(".erro_uname").text("此手机号已存在");
                $(".erro_uname").css({
                "color":"red",
                "background-image": 'url("../img/lg-ico.png")',
                "background-position-y": "1px"
                }) 
            }
            
            name_flag = false;
        }
        else{
            if(phoneoremail.test(name_val)){
                if(reg_email.test(name_val)){
                    $(".erro_uname").css({
                        "height":"15px",
                        "background-image": 'url("../img/lg-ico.png")',
                        "background-position-y": "-81px" 
                    })
                }
                else{
                    $(".erro_uname").css({
                        "background-image": 'none'
                    })
                    name_flag = false;
                    }
            }
            else{
                if(reg_phone.test(name_val)){
                    $(".erro_uname").css({
                        "height":"15px",
                        "background-image": 'url("../img/lg-ico.png")',
                        "background-position-y": "-81px" 
                    })
                }
                else{
                    $(".erro_uname").css({
                    
                        "background-image": 'none'
                    }) 
                    name_flag = false;
                }
            }
        }
    
    
    
});
    $(".erro_uname").text("");
});
$("#uname").blur(function(){
    var name_val = $(this).val();
    var reg_phone = /^1\d{10}$/;
    var reg_email = /^\w+@\w+\.\w+$/;
    var phoneoremail = /\D/;

    if(!name_val){
        $(".erro_uname").text("");
    }
    else{
    $.get("../../../sever/check.php",{"name":name_val},function(data){
        if(data==1){
            if(phoneoremail.test(name_val)){
                $(".erro_uname").text("此邮箱已存在");
                $(".erro_uname").css({
                "color":"red",
                "background-image": 'url("../img/lg-ico.png")',
                "background-position-y": "1px"
                }) 
            }
            else{
                $(".erro_uname").text("此手机号已存在");
                $(".erro_uname").css({
                "color":"red",
                "background-image": 'url("../img/lg-ico.png")',
                "background-position-y": "1px"
                }) 
            }
            
            name_flag = false;
        }
        else{
            if(phoneoremail.test(name_val)){
            
                if(reg_email.test(name_val)){
                
                    name_flag=true;
                }
                else{
                    $(".erro_uname").text("手机号/邮箱错误");
                    $(".erro_uname").css({
                        "color":"red",
                        "background-image": 'url("../img/lg-ico.png")',
                        "background-position-y": "1px"
                    }) 
                    name_flag = false;
                }
            } 
            else{
                if(reg_phone.test(name_val)){
                
                    name_flag=true;
                }
                else{
                    $(".erro_uname").text("手机号/邮箱错误");
                    $(".erro_uname").css({
                        "color":"red",
                        "background-image": 'url("../img/lg-ico.png")',
                        "background-position-y": "1px"
                    }) 
                    name_flag = false;
                }
        }
        }
    })
    }
    
})
//密码验证;
$("#pass").blur(function(){
    var pass_val =$(this).val();
    var reg_pass = /^[\w|\W]{6,16}$/;
    $("#pass_strong").css({"display":"none"})
    if(!pass_val){
        $(".erro_pass").text("");
    }
    else{
        if(reg_pass.test(pass_val)){  
            pass_flag=true; 
        }
        else{
            $(".erro_pass").text("6-16位数字、字母或符号");
            $(".erro_pass").css({
                "color":"red",
                "background-image": 'url("../img/lg-ico.png")',
                "background-position-y": "1px",
                "background-repeat":"no-repeat"
            }) 
            pass_flag=false; 
        }
    }
    
})
//keyup事件
$("#pass").keyup(function(){
    var pass_val =$(this).val();
    var reg_pass = /^[\w|\W]{6,16}$/;
    var pass_spchar = /\W/;
    var pass_number = /\d/;
    var pass_latter = /[A-z]/;
    $(".erro_pass").text("");
    if(reg_pass.test(pass_val)){
        $(".erro_pass").css({
        "height":"15px",
        "background-image": 'url("../img/lg-ico.png")',
        "background-position-y": "-81px" 
        })
        $("#pass_strong").css({"display":"block"})
    }
    else{
        $(".erro_pass").css({
            "background":"none"
        });
        $("#pass_strong").css({"display":"none"})
    }
    if(pass_spchar.test(pass_val)){
        var spchar = 1;
    }
    else{
        var spchar = 0;
    }
    if(pass_number.test(pass_val)){
        var number = 1;
    }
    else{
        var number = 0;
    }
    if(pass_latter.test(pass_val)){
        var latter = 1;
    }
    else{
        var latter = 0;
    }
    sum = latter+number+spchar;
    $("#pass_strong p").css({
        "background":"#b2b6bb"
    })
    switch(sum){
        case 1:{
            $("#pass_strong p").eq(2).css({
                "background":"#9ad4b2"
            })
            break;
        }
        case 2:{
            $("#pass_strong p").not(":eq(0)").css({
                "background":"#9ad4b2"
            })
            break;
        }
        case 3:{
            $("#pass_strong p").css({
                "background":"#9ad4b2"
            })
            break;
        }
    }
})
//密码重复
$("#repass").keyup(function(){
    var pass_val = $("#pass").val();
    var repass_val = $(this).val();
    $(".erro_repass").text("");
    if(pass_val == repass_val&&pass_flag){
        $(".erro_repass").css({
            "height":"15px",
            "background-image": 'url("../img/lg-ico.png")',
            "background-repeat":"no-repeat",
            "background-position-y": "-81px" 
        })
    }
    else{
        $(".erro_repass").css({
            "background":"none"
        });
    }
})
//密码重复 blur
$("#repass").blur(function(){
    var pass_val = $("#pass").val();
    var repass_val = $(this).val();
    if(pass_val == repass_val){
        repass_flag = true;
    }
    else{
        $(".erro_repass").text("2次密码不一致");
        $(".erro_repass").css({
            "color":"red",
            "background-image": 'url("../img/lg-ico.png")',
            "background-position-y": "1px",
            "background-repeat":"no-repeat"
        }) 
        repass_flag = false;
    }
})
$("html").keyup(function(){
  
    if(auth_flag&&repass_flag&&pass_flag&&name_flag){
        
         $(".btn_li").css({"background": "#e1063c","cursor": "pointer"})
         $(".btn_li:hover").css({
            "background": "#cc0033"
         })
    }
    else{
        $(".btn_li").css({"background": "gray","cursor": ""})
         $(".btn_li:hover").css({
            "background": "gray"
         })
    }
})
//按钮点击提交
//注册数据连接后台部分
$(".btn_li").click(function(){
    if(auth_flag&&repass_flag&&pass_flag&&name_flag){
        var u = $("#uname").val();
        var p = $("#pass").val();
        $.post("../../../sever/reg.php",{uname:u,upass:p},function(repose){
            var reposearr = eval(repose);
            var u = reposearr[1];
            if(reposearr[0] == "success"){
                var u = $("#uname").val();
                var mask = $("<div><p>恭喜您，注册成功</p><p><span>您的登录账号:</span><a>"+u+"</a></p><div><a href='../index.html'>立即去购物</a></div><span></span></div>")
                var str="系统已向您的邮箱 "+u+" 发送了一封邮件，包含您的用户名、登录账号及登录密码，请您登录邮箱，及时查看。";
                $(".reginput").append(mask);
                $(".reginput>div>span").text(str);
                $("#main_box>div").css({
                    "height":"354px"
                })
            }
            else if(repose == "error"){
                alert("系统错误请稍后重试");
            }
            else{
                alert("注册失败，用户名已存在")
            }
        })
    }
    else{
        $(this).css({
            "background":"gray"
        })
    }
})

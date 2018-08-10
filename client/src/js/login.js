var uname_flag = false;
var upass_flag = false;
function kong(elem,type){
    $(elem).text("请输入"+type).css({
        "display":"block"
    })
    
}
function hideelem(elem){
    elem.css({
        "display":"none"
    })
}
$("#uname").keyup(function(){
    hideelem($(".user_li>em"))
})
$("#pass").keyup(function(){
    hideelem($(".pass_li>em"))
})
$(".btn_li").click(function(){
    var uname_val = $("#uname").val();
    var pass_val =$("#pass").val();
    var rember_val = $("#reber").prop("checked");
    if(uname_val){
        uname_flag = true;
    }
    else{
        kong(".user_li>em","用户名");
        uname_flag = false;
    }
    if(pass_val){
        upass_flag = true;
    }
    else{
        kong(".pass_li>em","密码")
        upass_flag = false;
    }
    if(uname_flag&&upass_flag){
        $.post("../../../sever/login.php",{"uname":uname_val,"upass":pass_val},function(data){
            if(data=="0"){
                
                $(".user_li>em").text("用户不存在").css({
                    "display":"block"
                })
            }
            else if(data==1){
                login=true; //登录状态 true 为已登录；
                if(rember_val){
                    setCookie("rember",{"uname":uname_val,"upass":pass_val},"/",10) //将记住登录状态和用户信息
                }
                else{
                    setCookie("rember",{"uname":uname_val,"upass":pass_val},"/") //不记住登录状态，cookit时间为会话时间
                }
                location.href="../index.html";  //登录用户可以向index传用户名id
                

            }
            else{
                
                $(".pass_li>em").text("账号和密码不匹配").css({
                    "display":"block"
                })
            }
                
        })
    }
    
})
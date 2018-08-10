	//随机颜色rgb值
	function sjrgb(){
		var r = Math.round(Math.random()*255); 
		var g = Math.round(Math.random()*255);
		var b = Math.round(Math.random()*255);
		var rgb = "rgb("+r+","+g+","+b+")";
		return rgb;
	};
	//随机数函数
	function rand(min,max){
		if(min ==0){
			var rand =Math.round(Math.random()*max);
		}
		else{
			
		}
		var rand =Math.round(Math.random()*min+(max-min));
		return rand;
	};
	//兼容ie的阻止事件冒泡函数
	function stopEvent(){
		event.stopPropagation() ? event.stopPropagation():event.cancelBubble=true;
	};
	//获取键盘输入的值兼容写法
	function keysCode(ele){
		var keyscode = ele.keyCode || ele.which;
		return keyscode;
	};
	//event事件对象的兼容写法
	function eventIe(evt){
		var even = evt || window.event;
		return even;
	};
	//event事件委托兼容写法
	function evTargetIe(evt){
		var even = evt.target || evt.srcElement;
		return even;
	};
	//查找cookie函数
	function getCookie(name){
		var deccookie = decodeURIComponent(document.cookie);		//解码获取的cookie
		var arr = deccookie.split("; ");							//得到cookie字符串通过（分号空格"; "） 转化为数组；
		for(var i = 0;i<arr.length;i++){							//循环数组得到数组的项；
			var idx = arr[i].indexOf("=");							//判断数组中的项的"="的下标；
			var cookiename = arr[i].substring(0,idx);				//分割数组中项从下标0到等号的下标即街取到=之前；
			var cookievalue = arr[i].substring(idx+1);				//截取数组中"="的后面所有字符；
			if(name == cookiename){									//判断是否为要查询的name；
				cookievalue = JSON.parse(cookievalue)._value;		//转换为json对象，且取到_value的值；
				return cookievalue;									//返回要查询的value；
			}
		}
		
	};
	//通过正则查找所有cookie
	function getCookieAll(reg, cb, del){
		var num = 0;
		var arr = document.cookie.split("; ");
		for( var i=0,len=arr.length; i<len; i++ ){
			var str = arr[i];
			var ind = str.indexOf("=");
			var cookieName = str.substring(0, ind);
			var cookieValue = str.substring(ind+1);
			if(  reg.test(cookieName)  ){
				//console.log( JSON.parse(decodeURIComponent(cookieValue))._value );
				if( cb ){
					cb( cookieName, JSON.parse(decodeURIComponent(cookieValue))._value );
				}
				if( del ){
				
					document.cookie=cookieName+"=1;expires="+new Date(1970,0,1).toGMTString();
				}
				num++;
			}
		}	
		return num;//返回查询到的cookie个数
	}

	
	//设置修改cookie函数
	function setCookie (name,value,path,expires,domain,secure){
		var _json ={
			"_value":value
		}															//将得到的value转化为对象的值，避免value做tostring转换；
		var strjson = JSON.stringify(_json);						//然后将对象转换为json字符串；
		var endestr = encodeURIComponent(strjson);					//将json字符串编码；
		var cookies = name+"="+endestr+"; ";						//直接创建cookie，如果存在则覆盖；
			if(expires){											//判断是否存在expires；
				if(expires instanceof Date){						//判断expires是否为一个日期对象；
					cookies+="expires="+expires.toGMTString()+"; ";	//添加expires；
				}
				else if(expires == parseInt(expires)){				//判断expires是不是一个数字；
					var now = new Date();							//获取当前时间；
					now.setDate(now.getDate()+expires);				//当前时间加上输入的expires数字值；
					cookies+="expires="+now.toGMTString()+"; ";		//添加expires；
				}
			}
			if(path){												//是否存在path
				cookies+="path="+path+"; ";							//存在添加path
			}
			if(domain){												//是否存在domain
				cookies+="domain="+domain+"; ";						//存在添加domain
			}
			if(secure){												//是否存在secure；
				cookies+="secure";									//添加secure；
			}
			document.cookie = cookies;								//设置cookie；
	};
	//删除cookie函数
	function unsetCookie (name,value,expires,path,domain,secure){
		setCookie(name,"",new Date(0),path,domain,secure);			//将过期时间设置为0，即删除此cookie
	};
	//获取非行间样式兼容ie写法：//谷歌浏览器取到的值不一定准确
	function getStyleIe(elem,style,wlei){
		if(!wlei){										//判断wlei是否有值
			wlei=="null";								//没有设置默认值null；
		}	
		var styles = getComputedStyle(elem,wlei)[style] || elem.currentStyle[style];
		return styles;
	}
	//封装元素碰撞函数
	function collide(elem1,elem2){	
		//获取元素位置信息
		function getposit(elem){
			var left = elem.offsetLeft;
			var top = elem.offsetTop;
			var right = left+elem.offsetWidth;
			var bottom = top+elem.offsetHeight;
			return {"left":left,"top":top,"right":right,"bottom":bottom};  //返回元素的四个边的left值和top值；
		}
		//获取元素位置信息
		var elem1posit =getposit(elem1);
		var elem2posit =getposit(elem2);
		//判断是否碰撞；
		var a = elem1posit.right>elem2posit.left; 			//第一个元素的右边的left值大于第二个元素的左边的left值；
		var b = elem1posit.left<elem2posit.right;			//第一个元素的左边的left值小于第二个元素的右边的left值；
		var c = elem1posit.bottom>elem2posit.top;			//第一个元素的底边的top值大于第二个元素的顶边的top值；
		var d = elem1posit.top<elem2posit.bottom;			//第一个元素的顶边的top值小于第二个元素的底边的top值；
		if(a&&b&&c&&d){
			return true;//表示已经碰撞
		}
		else{
			return false;//表示为碰撞
		}
	}
	


	//键盘控制元素移动 注意：需要写在事件函数内部！
	function elemMove(elem,evt){
		var code = evt.keyCode;				//获取键值；
		var [setpx,setpy]=[0,0]				
		if(code == 37){						//判断键值所对应的键     左	
			setpx=-10;						//设置为负值，也就是减10；
		}
		if(code == 38){						//判断键值所对应的键     上
			setpy=-10;						//设置为负值，也就是减10；
		}
		if(code == 39){						//判断键值所对应的键     右；
			setpx=10;						//设置为正值 ，也就是加10；
		}
		if(code == 40){						//判断键值所对应的键     下；
			setpy=10;						//设置为正值 ，也就是加10；
		}
		
		elem.style.left=elem.offsetLeft+setpx+"px"; //设置要移动的元素的left值；
		elem.style.top=elem.offsetTop+setpy+"px";	//设置要移动的元素的top值；
	}
	

	//圆周运动
	function round(x,y,r,elem,timerms,step){//原点的x,y坐标；r半径；elem圆周运行元素；timerms定时器毫秒数;step角度步长值；
		var jd = 0;
		var elemx = elem.offsetWidth/2;		//得到圆周运动元素的宽的一半；
		var elemy = elem.offsetHeight/2;	//得到圆周运动元素的高的一半；
		if(step){							//判断是否存在step实参；
			st = step;						//存在则设置步长为step；
		}
		else{								//否则设置步长默认值 1；
			st = 1;
		}
		setInterval(function(){				//开启定时器；
		jd+=st;								//步长；
		var hd = Math.PI/180*jd;			//求弧度；
		var xx = Math.cos(hd)*r;			//求角a和直角之间的边的距离；
		var yy = Math.sin(hd)*r;			//求角a所对边的距离
		var tx = x+xx;						//求圆周运动元素相对页面的left值；
		var ty = y-yy;						//求圆周运动元素相对页面的top值；
		elem.style.left=tx+"px";			//设置圆周运动元素的left值；
		elem.style.top=ty+"px";				//设置圆周运动元素的top值；
	},timerms);								//timerms定时器毫秒数
		oelemleft = x+elemx;				//求出原点坐标x加上圆周运动元素的宽的一半； 
		oelemtop = y+elemy;					////求出原点坐标x加上圆周运动元素的高的一半；
		return {"oelemleft":oelemleft,"oelemtop":oelemtop};//返回原点坐标x加上圆周运动元素的宽的一半； 原点坐标x加上圆周运动元素的高的一半；
	}	//返回的oelemleft和oelemtop 分别减去要作为原点元素的宽和高的一半，即可让原点元素处于圆周运动   圆的圆心。
	


	//抛物线运动
	function parabola(elem,targetx,targety,a){								
		var originx = elem.offsetLeft;							//获取原点x
		var originy = elem.offsetTop;							//获取原点y
		var x = targetx-originx;								//抛物线上的某一点的x值；
		var y = targety-originy;								//抛物线上的某一点的y值；
		if(!a){													
			a= 0.001;
		};	
		var c = 0;
		var b = (y-c-a*x*x)/x;                                  //公式y=a*x*x+b*x+c和抛物线上的某一点求b;
		x= 0;
		var timer = setInterval(function(){
		/*	此片段为减速运动（缓冲运动）
			var step = (targetx-elem.offsetLeft)/10;
			step = step>0 ? Math.ceil(step) : Math.floor(step);
			x+=step;
		*/
			x++;												//++为想右抛；--为向左抛  匀速运动
			y = a*x*x+b*x+c;									//求y值；
			elem.style.left = originx+x+"px";					//设置elem的left
			elem.style.top = originy+y+"px";					//设置elem的top
			if(x+originx==targetx){								//如果elem的left等于目标target的x值停止定时器
				clearInterval(timer)
			}
		},30)
	}
	
	//运动（包含多属性同时运动和链式运动）
	function move(elem,json,cb){
		clearInterval(elem.timer);								//先清除定时器
		elem.timer=setInterval(function (){
			var flag = true; // 假设所有属性，都达到了目标值
			for(var arr in json){								//循环json，arr为属性
				var target = json[arr];							//获取目标值
				var start = getComputedStyle(elem)[arr];		//获取非行间样式，获取元素的原始属性值；
				if(arr == "opacity"){							//判断是否为透明opacity；
					start = Math.round(start*100);				//为了好计算*100然后四拾伍入；
				}
				else{
//					start = parseInt(start);					//谷歌浏览器在获取元素宽度和高度时取值不准；
					start = Math.round(start.replace('px',''));	//用replace去掉px，然后四拾伍入；
				}
				var step = (target-start)/10;					//获取步长 10这个值可随便设置，值越大速度越慢
				if(step>0){										//step>0；从左往右运动，向上取整
					step = Math.ceil(step);
				}
				else{
					step = Math.floor(step);					//step<0；从右往左运动，向下取整
				}
				if(arr == "opacity"){							//如果属性为透明opacity
					elem.style[arr] = (start+step)/100;			//arr属性值要除以100；
				}
				else{
					elem.style[arr]= start+step+"px";			//arr属性值加上px
				}
																// 判断是否更新到了目标值
				if(start != target ){
																// 众多的属性中，至少有1个属性没有到达目标值
					flag = false;
				}
			}
																// 判断是否所有属性均到了目标值
			if( flag ){
				clearInterval(elem.timer);
																// 回调函数
				if( cb ){
					
					cb();
					
				}
			}
		},30);
	}

	//ajax 封装;
	//ajax 兼容IE；
	function w3cie_ajax(){
		try {
			var xhr = new XMLHttpRequest();
		} catch (error) {
			var xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}
		return xhr;
	}
	//post方式ajax
	function postAjax(url,data,cb){
		var xhr = w3cie_ajax();									// 建立核心对象
		xhr.open("POST",url,true);								// 建立连接  true异步    false同步
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');// post发送数据时，必须设置请求头
		xhr.send(data);											// 发起请求
		xhr.onreadystatechange=()=>{							// 接收响应
			if(xhr.readyState == 4 && xhr.status == 200){
				var xhrrequest = xhr.responseText;
				if(cb){
					cb(xhrrequest);
				}
			}
		}

	}

	//get方式ajax;
	function getAjax(url,cb){
		var xhr = w3cie_ajax();									// 建立核心对象
		xhr.open("GET",url,true);								// 建立连接  true异步    false同步
		xhr.send();												// 发起请求
		xhr.onreadystatechange=()=>{							// 接收响应
			if(xhr.readyState == 4 && xhr.status == 200){
				var xhrrequest = xhr.responseText;
				if(cb){
					cb(xhrrequest);
				}
			}
		}
	}

	//jsonp 数据交互；
	function jsonp(url){											//传入url参数
		var scri = document.createElement("script");					//创建script标签
		document.getElementsByTagName("head")[0].appendChild(scri);	//把script标签添加到head中
		scri.src=url;												//设置script的src属性为url
	}
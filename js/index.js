$(function(){
	//页面加载完成就让第一张banner图显示
	$('.banner ul li').eq(0).children('img').show();
	//定时器
	var timer01 = null;
	var num = 0;
	var myFn = function(){
		$('.banner ul li').eq(num).children('img').stop().fadeOut(1000);
		num++;
		if(num > 1){
			num = 0;
		}
		$('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');
		$('.banner ul li').eq(num).children('img').stop().fadeIn(1000);
	}
	timer01 = setInterval(myFn,2000);
	//鼠标滑过
	$('.banner').hover(function(e) {
    	//关闭定时器
		clearInterval(timer01);    
    },function(e){
		timer01 = setInterval(myFn,2000);
	});	
	//点击ol的li事件
	$('.banner ol li').click(function(e) {
        $(this).addClass('current').siblings().removeClass('current');
		
		$('.banner ul li').eq(num).children('img').stop().fadeOut();
		num = $(this).index();
		$('.banner ul li').eq(num).children('img').stop().fadeIn();
	});
	
	
	//火箭回顶部
	//alert()
	$(window).scroll(function(){
		if($(window).scrollTop() >= $('.four').offset().top){
				$('.navR .huojian ').show();
		}else{
			$('.navR .huojian ').hide();	
		}
		
		$('.navR .huojian ').click(function(e) {
            $('body,html').stop().animate({'scrollTop':'0px'},500)
        });	
	});
	
	//二维码显示
	
	$('.navR ul li').eq(0).hover(function(e) {
    	$('.erweima').stop().fadeIn();    
    },function(){
		$('.erweima').stop().fadeOut();	
	});
	
	//3D简历
})







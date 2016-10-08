$LAB
    .script("lib/jquery-1.8.3.min.js").script("lib/jquery.flexslider-min.js").wait(function(){
      window.jQuery=$;
        $(function(){
          $('.flexslider').flexslider({
            slideshowSpeed:4000
          });

          $('.yellow a').append('<a href="http://campus.zhaozuor.com/" class="btn"></a>')
          var scrollTop=$(document).scrollTop();
          setTimeout(function(){flexNum();},100);

        	var bwidth=parseInt($('body').css('width'));
          if(bwidth<1080){
            $('.nav_bar').hide();
          }else{
            var nright=(bwidth-1000)/2-112;
            if(nright<0)nright=0;
            $('.nav_bar').css({
              'right':nright+'px',
              'display':'block'
            });
          }
          $('.scrollTop').click(function(){
             $("html,body").animate({scrollTop: "0px"}, $(document).scrollTop() / 2)
          });
          $('.comment').click(function(){
             $("html,body").animate({scrollTop: "2700px"}, (2700-$(document).scrollTop()) / 2)
          });
          $('.fbar .close').click(function(){
            $('.fbar').hide();
            $('html,body').css('padding-bottom','0px');
          });
          bindEvent();
        	$('#submit').click(function(){
              submit();
          });
          if(scrollTop>300){
                $('.scrollTop').fadeIn(300);
              }else{
                $('.scrollTop').fadeOut(300);
              }
          $(window).scroll(function(e){
        		e = e || window.event;
        		scrollTop=$(document).scrollTop();
          		if(scrollTop>760&&scrollTop<1660){
          			$('.stage img').addClass('animation');
                $('.stage img.web2').addClass('animation2');
          		}else{
          			$('.stage img').removeClass('animation');
                $('.stage img.web2').removeClass('animation2');
          		}
              if(scrollTop>300){
                $('.scrollTop').fadeIn(300);
              }else{
                $('.scrollTop').fadeOut(300);
              }
        	});
          
        	
        });
    }).script("http://s.zhaozuor.com/school/js/jquery.enplaceholder.js").wait(function(){
      $(function(){
        $('input,textarea').placeholder();
      });
    });
function bindEvent(){
  $("#userName").on('focus',function(){
      $(this).css('background','#def5be');
    })
    
    $("#userName").on('blur',function(){
      $(this).css('background','#fff');
    })
    
    $("#email").on('focus',function(){
      $(this).css('background','#def5be');
    })
    
    $("#email").on('blur',function(){
      $(this).css('background','#fff');
      var emailVal=$(this).val();
      var re = /^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if(emailVal==''){
        $(".tips").text('(至少输入一种联系方式)').css('color','#8c8c8c')
      }else if(!re.test(emailVal)){
        $(".tips").text('请输入正确的邮箱账号').css('color','#db5565');
      }else{
        $(".tips").text('(至少输入一种联系方式)').css('color','#8c8c8c')
      }
    })
    
    $("#phone").on('focus',function(){
      $(this).css('background','#def5be');
    })
    
    $("#phone").on('blur',function(){
      $(this).css('background','#fff');
      var phoneVal=$(this).val();
      var re = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
      if(phoneVal==''){
        $(".tips").text('(至少输入一种联系方式)').css('color','#8c8c8c')
        return;
      }else if(!re.test(phoneVal)){
        $(".tips").text('请输入正确的手机号').css('color','#db5565');
      }else{
        $(".tips").text('(至少输入一种联系方式)').css('color','#8c8c8c')
      }
    });
}
function submit(){
  var contVal=$("#inp_cont").val();
      var emailVal=$("#email").val();
      var phoneVal=$("#phone").val();
      var userName=$("input[name=userName]").val();
      
      var re1 = /^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      var re2 = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
      var userNameTxt;
      if(contVal==''){
        $(".tips").text('还是说点儿什么的哈...').css('color','#db5565');
        return;
      }else if(emailVal==''&&phoneVal==''){
        $(".tips").text('(至少输入一种联系方式)').css('color','#db5565');
        return;
      }else if(!re1.test(emailVal)&&emailVal!=''){
        $(".tips").text('请输入正确的邮箱账号').css('color','#db5565');
        return;
      }else if(!re2.test(phoneVal)&&phoneVal!=''){
        $(".tips").text('请输入正确的手机号').css('color','#db5565');
        return;
      }
      
      if(userName==''){
        userNameTxt = '';
      }else{
        userNameTxt = $("input[name=userName]").val();
      }
      $.ajax({
        type:"post",
        url:"/zzr/submitFeedback/",
        async:true,
        data:"feedback_username="+userNameTxt+"&feedback_tel="+phoneVal+"&feedback_email="+emailVal+"&feedback_content="+contVal,
        success:function(obj){
          if(obj.flag==1){
            $("#fade_box").fadeIn(500);
            setTimeout(function(){
              $("#fade_box").fadeOut(500);
              $("#inp_cont").val('');
              $("#email").val('');
              $("#phone").val('');
              $("#userName").val('');
            },2000)
          }

        }
      });
}
function flexNum(){
  var ele=$('.fbar .word b')
  var text=parseInt(ele.text());
  if(!isNaN(text)&&text>0){
    ele.text(0).show();
    var t=50;
    var start=0;
    var step=parseInt(text/4/1000*100);
    var timeC=setInterval(function(){
      start+=step;
      if(start>text){
        start=text;
      }
      
      ele.text(start);
      if(start==text){
        clearInterval(timeC);
      }
    },t);
  }
}
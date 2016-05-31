$(document).ready(function(){
    //用户登录以及遮罩层的应用===================================================
	$("#log_in").click(function(){
		var width = getClientWidthAndHeight().width;
		var height = getClientWidthAndHeight().height;
		var scroll = getScrollPosition();
		$("#log_in_kuang").css({
			"display":"block",
			"left":(width<=400?0:((width-400)/2)+scroll.left),
			"top":(height<=300?0:((height-300)/2)+scroll.top)
		});
		$("#cover").css({
			"height":height+scroll.top+10+"px",
			"width":width+scroll.left+10+'px',
			"display":"block"
		})
		$("body").css("overflow-x","hidden");
		$("body").css("overflow-y","hidden");
    })
    $(window).resize(function(e){
    	var width = getClientWidthAndHeight().width;
		var height = getClientWidthAndHeight().height;
		var scroll = getScrollPosition();
		$("#log_in_kuang").css({
			
			"left":(width<=400?0:((width-400)/2)+scroll.left),
			"top":(height<=300?0:((height-300)/2)+scroll.top)
		});
		$("#cover").css({
			"height":height+scroll.top+"px",
			"width":width+scroll.left+'px'
		})
    })
    $("#login_close").click(function(){
    	
    	$("#log_in_kuang").css({
			"display":"none"
		});
		$('#cover').css({
			"display":"none"
		})
    $("body").css("overflow-x","scroll");
		$("body").css("overflow-y","scroll");
    })
    //====================================================================
    //鼠标拖动登录窗口。
    
    	$(".log_in_kuang_header").drag("#log_in_kuang");
    	
    //====================================================================
      //头部 个人用户
      $("#persional").hover(function(){
      	 $("#persional_menu").css('display','block');
      	 $("#persional").animate({
      	 	"height":"150px"
      	 })
      	
      },function(){
      	$("#persional").animate({
      	 	"height":"30px",

      	 });
      	$("#persional_menu").css('display',"none");
      })
       $(".persional_menu_part").hover(function(e){
       		e.target.style.background = "#FFF68F";
       		
       },function(e){
       		e.target.style.background = "#C0FF3E";
       })
    	//======================================================================
    	//slide 
    	$(".third_ul_li").hover(function(){
    		var index = $(this).index();
    		$('#slide_second_level').animate({left:index*100+10+"px"},200,function(){
    			$('#second_ul').animate({
    				left:-index*100+"px"
    			})
    		});
    	
    	},function(){
    		
    	});

    	$("#slide").hover(function(){},function(){
    		$('#slide_second_level').animate({left:10+"px"},200,function(){
    			$('#second_ul').animate({
    				left:0
    			})
    		});
    	})
      //==================================================================
      //left_bar
      $("#left_bar h3").click(function(){
          var index = $("#left_bar h3").index(this);
          if($(".left_bar_part ul").eq(index).css('display') == "block"){
            $(".left_bar_part ul").eq(index).css('display',"none");
          }
          else{
            $(".left_bar_part ul").eq(index).css('display',"block");
          }
      });
      //==========================================================
      //left_slide
      (function($){
          var left_slide_top = getTotalWidAndHeig().height/2;
          $("#left_slide").css("top",left_slide_top);
          $(document).scroll(function(){
              left_slide_top = getClientWidthAndHeight().height/2 + getScrollPosition().top;
              $("#left_slide").css("top",left_slide_top);
          });
      })($);
     
      //==============================================================
      //rotator
      $("#rotator_button1").css("color","red");
      (function($){

        var current_play = 1;
        function getLeftPosition(n){
           return n - 1 < 0 ? 3 : n - 1; 
        }
        function getRightPosition(n){
          return n + 1 > 3 ? 0 : n + 1; 
        }
        function issides(n){
            if(Math.abs(n-current_play) != 1 && Math.abs(n-current_play) !== 0){return false}
             else if( n-current_play >0 ) {return 2}   //在右边
              else if(n - current_play<0){return 1;}  //在左边
        }
        $('#rotator_left_cover').click(function(){
          if($(".rotator_image").is(":animated")){$(".rotator_image").stop(false,true).animate();}
           var will_play = "#rotator_images" + getLeftPosition(current_play);
           var will_right = "#rotator_images" +  current_play;
           var will_disappear = "#rotator_images" +  getRightPosition(current_play);
           var will_appear =  "#rotator_images" + getLeftPosition(getLeftPosition(current_play));
    
           $(will_play).css({"z-index":3}).animate({
              
              "left":"100px",
              "height":"200px",
              "top":"0px"
        
              
           });

           $(will_right).css({"z-index":1,"height":"190px","top":"10px"}).animate({
              "left":"210px"
              
              
            });
           $(will_disappear).css("z-index",0).animate({"left":"100px"})
             $(will_appear).css({"z-index":1}).animate({
                "left":"0px",
                "height":"190px"
                
              });
          current_play = getLeftPosition(current_play);
          var button = "#rotator_button" + current_play;
           $(".rotator_button").css("color","blue");
            $(button).css("color","red");
       
        })

         $('#rotator_right_cover').click(function(){
          if($(".rotator_image").is(":animated")){$(".rotator_image").stop(false,true).animate();}
            var will_left = "#rotator_images" + current_play;
            var will_play = "#rotator_images" + getRightPosition(current_play);
            var will_disappear = "#rotator_images" + getLeftPosition(current_play);
            var will_appear = "#rotator_images" + getRightPosition(getRightPosition(current_play));

             $(will_play).css({"z-index":3}).animate({
                
                "left":"100px",
                "height":"200px",
                "top":"0px"
              });

             $(will_left).css({"z-index":1, "height":"190px","top":"10px"}).animate({
                "left":"0px",
               
                
              });
             $(will_disappear).css("z-index",0).animate({"left":"100px"});
             $(will_appear).css({"z-index":1}).animate({
                  "left":"210px",
                  "height":"190px"
                  
                })
            current_play = getRightPosition(current_play);
            var button = "#rotator_button" + current_play;
            $(".rotator_button").css("color","blue");
            $(button).css("color","red");
            
         })


          var timeer = setInterval(function(){
               $('#rotator_right_cover').trigger('click');
          },2000)

          $(".rotator_button").hover(function(e){
            if($(".rotator_image").is(":animated")){$(".rotator_image").stop(false,true).animate();}
            clearInterval(timeer);
            var index = $(".rotator_button").index(this);
            if(issides(index) == 1){
              $('#rotator_left_cover').trigger('click');
              console.log("left")
            }else if(issides(index) == 2){
              $('#rotator_right_cover').trigger('click');
              console.log("right")
            }else if(issides(index) == 0){
              console.log("luan")
              var did_left = "#rotator_images" + getLeftPosition(current_play);
              var did_play = "#rotator_images" + current_play;
              var did_right = "#rotator_images" +  getRightPosition(current_play);
              current_play = index;
              var will_left = "#rotator_images" + getLeftPosition(current_play);
              var will_play = "#rotator_images" + current_play;
             
              var will_right = "#rotator_images" +  getRightPosition(current_play);
            
              $(".rotator_image").css({"z-index":0,"left":"100px","height":"190px","top":"10px"});
            
              $(will_left).css({"z-index":1}).animate({
                "left":"0px",
                "top":"10px",
                "height":"190px"
              });
              $(will_right).css({"z-index":1}).animate({
                 "left":"210px",
                 "top":"10px",
                 "height":"190px"
               });
               $(will_play).css({"z-index":3}).animate({
                "height":"200px",
                "top":0,
                "left":"100px"
              });
            var button = "#rotator_button" + current_play;
            $(".rotator_button").css("color","blue");
            $(button).css("color","red");
            
            }
          },function(){
             timeer = setInterval(function(){
               $('#rotator_right_cover').trigger('click');
          },2000)
          })
      })(jQuery);
      //========================================================================
      //register
        $("#register").click(function(){
          var width = getClientWidthAndHeight().width;
          var height = getClientWidthAndHeight().height;
          var scroll = getScrollPosition();
          $("#form").css({
            "display":"block",
            "left":(width<=400?0:((width-400)/2)+scroll.left),
            "top":(height<=300?0:((height-300)/2)+scroll.top)
          });
          $("#cover").css({
            "height":height+scroll.top+10+"px",
            "width":width+scroll.left+10+'px',
            "display":"block"
          })
          $("body").css("overflow-x","hidden");
          $("body").css("overflow-y","hidden");
          })
          $(window).resize(function(e){
            var width = getClientWidthAndHeight().width;
          var height = getClientWidthAndHeight().height;
          var scroll = getScrollPosition();
          $("#form").css({
            
            "left":(width<=400?0:((width-400)/2)+scroll.left),
            "top":(height<=300?0:((height-300)/2)+scroll.top)
          });
          $("#cover").css({
            "height":height+scroll.top+"px",
            "width":width+scroll.left+'px'
          })
          })
          $("#register_close").click(function(){
            
            $("#form").css({
              "display":"none"
            });
            $('#cover').css({
              "display":"none"
            })
            $("body").css("overflow-x","scroll");
            $("body").css("overflow-y","scroll");
          })
      $("#form h2").drag("#form");
      //=========================================================================

      $('#user').focus(function(){
        $('.user').css('display','none');
        $('.user_focus').css('display','block');
       
      }).blur(function(){
        
        $('.user_focus').css('display','none');
        if (judje('#user')) {
          $('.user_judge').css('display','block');
          $.ajax({
            type:"GET",
            url:'/judje_name',
            data:{
              userName : $('#user').val()
            },
            success:function(data){
              if(data.isExist){
                $('.user_judge').css('display','none');
                $('.user_errorReName').css('display','block');
              }else{
                $('.user_judge').css('display','none');
                $('.user_success').css('display','block');  
              }
            }
          })

              
        } else {  
          $('.user_error').css('display','block');
        }
      })

       $('#password').focus(function(){
        $('.password').css('display','none');
        $('.password_focus').css('display','block');
       
      }).blur(function(){
        
        $('.password_focus').css('display','none');
        if (judje('#password')) {
          $('.password_success').css('display','block');      
        } else {  
          $('.password_error').css('display','block');
        }
      })

      $('#re_password').focus(function(){
        $('.re_password').css('display','none');
        $('.re_password_focus').css('display','block');
       
      }).blur(function(){
        
        $('.re_password_focus').css('display','none');
        if (judje_repassword()) {
          $('.re_password_success').css('display','block');      
        } else {  
          $('.re_password_error').css('display','block');
        }
      })

      $('#email').focus(function(){
        $('.email').css('display','none');
        $('.email_focus').css('display','block');
       
      }).blur(function(){
        
        $('.email_focus').css('display','none');
        if (judje_email()) {
          $('.email_success').css('display','block');      
        } else {  
          $('.email_error').css('display','block');
        }
      })
      
      //===============================================================
      //email
      $('#email').focus(function(){
        
        $('.email_extend').css('display','block');
        var li_index = 0 ;
        $('#email').keyup(function(e){
          
          var index = $('#email').val().indexOf('@')
          if(index == -1){
            $('.email_li_span').html($('#email').val());
          }else{
            for(var i = 1 ; i < 7;i++){
              var string_com = $('.email_li_com' + i).html();
              var string_input =$('#email').val().slice(index)
              if(!equ(string_com,string_input)){
                $('.email_li' + i).css('display','none');
              }else{
                $('.email_li' + i).css('display','block');
              }
            }
            
          }
          if(e.which == 38){
            li_index = (li_index - 1 == 0 ? 6:li_index - 1);
            console.log(li_index);
           
            $('.email_li').css('background','red');
             $('.email_li' + li_index).css('background','blue');
          }else if(e.which == 40){

            li_index = (li_index  + 1 == 7 ? 1:li_index + 1);
            console.log(li_index);
            
            $('.email_li').css('background','red');
            $('.email_li' + li_index).css('background','blue');
          }else if(e.which == 13){
            $('.email_extend').css('display','none');

            
            var index_ = $('#email').val().indexOf('@')
            if(index_ == -1){
              var string = $('#email').val() + $('.email_li_com' +li_index).html();
              
            }else{

              var string = $('#email').val();
             
              string = string.replace(/@[\w]+\.[\w]+/,$('.email_li_com' + li_index).html());
              
            }
            
            $('#email').val(string);
          }


          

        })
      })
      $('#email').blur(function(){
        setTimeout(function(){
          $('.email_extend').css('display','none');
        },200)
        
      })

      $('.email_li').hover(function(){
        var index = $('.email_li').index(this)+1;
        $('.email_li'+index).css('background','blue');
      },function(){
        $('.email_li').css('background','red');
      });

      $('.email_li').click(function(){
        $('.email_extend').css('display','none');

        var index = $('.email_li').index(this)+1;
        
        var index_ = $('#email').val().indexOf('@')
        if(index_ == -1){
          var string = $('#email').val() + $('.email_li_com' +index).html();
          
        }else{

          var string = $('#email').val();
         
          string = string.replace(/@[\w]+\.[\w]+/,$('.email_li_com' + index).html());
          
        }
        
        $('#email').val(string);
        
      })
      //============================================================
      // user's form submit and button click event
      $('#submit').click(function(e){
        var flag = true;
        if(!judje('#user')){
          $('.user').css('display','none');
          $('.user_error').css('display','block');
           flag = false;
        }
       
        if(!judje('#password')){
          $('.password').css('display','none');
          $('.password_error').css('display','block');
           flag = false;
        }
        if(!judje_repassword()){
          $('.re_password').css('display','none');
          $('.re_password_error').css('display','block');
           flag = false;
        }
        if(!judje_email()){
          $('.email').css('display','none');
          $('.email_error').css('display','block');
           flag = false;
        }
       
         if(judje("#user")){

           $.ajax({
            type:"GET",
            url:'/judje_name',
            data:{
              userName : $('#user').val()
            },
            success:function(data){
              if(data.isExist){
                console.log('exit=st')
                $('.user_judge').css('display','none');
                $('.user_errorReName').css('display','block');
                flag=false;
                
              }else{
                $('.user_judge').css('display','none');
                $('.user_success').css('display','block');  
              }
              if(flag){
                $.ajax({
                  url:'/new',
                  type:'POST',
                  data:$('form').serialize(),
                  success:function(data,textStatus){
                    console.log(data);
                  }
                });
                $('#form').css('display','none');
                $('#cover').css('display','none');
              }

            }
          })
        }
      })
      //========================================================================
      //login ajax and judje the user_name and password
      $('#login_button').click(function(){

        $.ajax({
          type:'POST',
          url:'/login',
          data:{
            userName:$('#login_name').val(),
            userPassword:$('#login_password').val()
          },
          success:function(data){
             

            if(data.isExist !== undefined){
              $('#login_error').css('display','block');
              
            }else{
               window.location.reload();
              $('#login_error').css('display','none');
              $('#log_in_kuang').css('display','none');
              $('#cover').css('display','none');
            }
          }

        })
      })
      //==========================================================================
      //logout

      $('#logout').click(function(){
        $.ajax({
           type:'POST',
           url:'/logout',
           success:function(data){
            
            window.location.reload();
           }
        })
      })
      //========================================================
      //weibo_comment
      $('.comment').click(function(e){
        var _id = $(this).parent().parent().attr('_id');
        var $comment = $(this).parent().next();
        var userName = $('#login_part_name').text();
        if(userName == ""){
          alert('请先登录');
        }else{
          $.ajax({
            type:'POST',
            url:'/comment',
            data:{
              _id:_id,
              userName:userName
            },
            success:function(data){
               if($comment.html() == ''){
                  $comment.html(data);
               }else{
                $comment.html('');
               }
              
               $('.weibo_comment').on('click','.comment_button',function(){
                 var _id  = $(this).parents('.weibo_part').attr('_id');
                 var comment_content = $(this).prev().val();
                 var name = $('.comment_user_name').text();
                 $.ajax({
                  url:'/other_comment',
                  type:'POST',
                  data:{
                    _id : _id,
                    comment_content:comment_content,
                    reply_name:name,
                    userName:userName
                  },
                  success:function(data){
                      $('.comment span').html(data.length);
                      console.log(data.html)
                      $comment.html(data.html);

                  }
                  
                 })
               })

               $('.weibo_comment').on('click',".reply_bottom",function(){
                 var insert =  $(this).parents('.other_comment_bottom').next();
                 insert.css('display','block');
                 var comment_username = $(this).parent().parent().siblings('.other_comment_userName').html();
                 var string = '回复@' + comment_username+': ';
                 $('.reply_comment').val(string);

               })
               $('.weibo_comment').on('click','.reply_button',function(){
                 var comment_id = $(this).parents('.other_comments').attr('_id');
                 var weibo_id = $(this).parents('.weibo_part').attr('_id');
                 var value = $('.reply_comment').val();
                 var comment_username = $(this).parent().siblings('.other_comment_userName').val();
                 var user_name = $('#login_part_name').html();
                 console.log(user_name)
                 var content = $('.reply_comment').val();
                   $.ajax({
                    url:'/other_comment',
                    type:'POST',
                    data:{
                      _id : weibo_id,
                      comment_content:content,
                      reply_name:user_name,
                      userName:userName
                    },
                    success:function(data){
                      $('.other_comment_bottom_part1').css('display','none');
                      $('.comment span').html(data.length);
                      $comment.html(data.html)

                    }
                    
                   })             
               })
               $('.weibo_comment').on('click','.comment_dianzan',function(){
                  var weibo_id = $(this).parents('.weibo_part').attr('_id');
                  var comment_id = $(this).attr('_id');
                
                  var _this = this
                  $.ajax({
                    type:"POST",
                    url:'/comment_dianzan',
                    data:{
                      weibo_id : weibo_id,
                      comment_id : comment_id

                    },success:function(data){
                     
                       $(_this).next().html(data.sum)
                    }
                  })
                 
                 
                  
               }) 
                


             }
          })
        }
      })

      //===================================================================
      //click fabo_button
      $('#fabo_button').click(function(){

        if($('#login_part_name').text() == ""){
          alert('请登录');
        }else{
          $.ajax({
              url:'/fabo',
              type:'POST',
              data:{
                content:$('#fabo_textarea').val(),
                user_name:$('#login_part_name').text()
              }
          })
        }
      })
      //==========================================
      //dianzan
      $('.weibo_dianzan').click(function(){
         var id = $(this).attr('_id')
         $.ajax({
           url:'/weibo_dianzan',
           type:'POST',
           data:{ 

             _id:id
           },
           success:function(data){
              var sum = "" + data.likes;
              $('.weibo_dianzansum').html(sum);
              
           }
         })
      })
    
      
});
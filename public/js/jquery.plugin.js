;(function($){
	$.fn.extend({
		drag:function(string){  
		//string is the real be moved,that is the kuang
		//_this is the  header of the kuang
			_this = this;
			var $_kuang = $(string);
			this.eq(0).bind("mousedown",function(e){
			  var mouse_x = e.pageX;
				var mouse_y = e.pageY;
				var kuang_left = parseInt($_kuang.css("left"));
        var kuang_top = parseInt($_kuang.css("top"));
        console.log($_kuang.css("top"));
        var x = mouse_x-kuang_left;
        var y = mouse_y-kuang_top;
        
        e.preventDefault();
			$(document).mousemove(function(m){
				 mouse_x = m.pageX;
				 mouse_y = m.pageY;
				 var left = mouse_x - x;
				 var top = mouse_y - y;
				 
				 var total = getTotalWidAndHeig();
				 
				 if(left < getScrollPosition().left ){
				 	left = getScrollPosition().left
				 }else if(left > total.width - parseInt($_kuang.css("width"))){
				 	left = total.width - parseInt($_kuang.css("width"));
				 }

				 if(top < getScrollPosition().top ){
				 	top = getScrollPosition().top;
				 }else if(top > total.height - parseInt($_kuang.css("height"))){
				 	top = total.height - parseInt($_kuang.css("height"));
				 }
				 
				 

				 // kuang.style.left = left+"px";
				 // kuang.style.top = top + "px";
				 $_kuang.css({"left":left,"top":top});
				 m.preventDefault();

	    		});
			});	
		    // unbind the mouseup handler
		    this.bind("mouseup",function(){
		    	
		    	$(document).unbind("mousemove");
		    })
    	},
    	
	})
})(jQuery)
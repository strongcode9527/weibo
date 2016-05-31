function getClientWidthAndHeight(){
	var width = document.documentElement.clientWidth ;
	var height = document.documentElement.clientHeight;
	return {
		width:width,
		height:height
	}
}

function getScrollPosition(){
	var top = $(document).scrollTop();
	var left = $(document).scrollLeft();
	return {
		top: top,
		left:left
	}
}

function getTotalWidAndHeig(){
	return {
		width: getClientWidthAndHeight().width + getScrollPosition().left,
		height: getClientWidthAndHeight().height + getScrollPosition().top
	}
}

function judje(string){

	return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,8}$/.test($(string).val());
	
}

function judje_repassword () {
	return $('#re_password').val() === $('#password').val() 
}

function judje_email(){
	return /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z0-9_\.\-]+)\.([a-zA-Z]{2,4})$/.test($('#email').val());	
}

function equ(a,b){
	for(var i = 0 ; i < b.length; i++){
		if (a[i] !== b[i]){
			return false;
		}
	}
	return true;
}
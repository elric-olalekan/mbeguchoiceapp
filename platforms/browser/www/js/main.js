$(function()
{
	//new WOW().init();
 
	
 
  var windowHeight=$(window).innerHeight()-80;
 
  // $('.loginbg').css('min-height',windowHeight);
 // $('.content').css('min-height',windowHeight);
  // $('.talktous').css('min-height',windowHeight);
  $('.talk-to-us').click(function(e) {
	 // alert('here');
    $('.direct-chat-messages').scrollTop( $(".direct-chat-messages")[0].scrollHeight );
  });
  
 
});

$(document).ready(function(e) {

	$('.arrow-left').on('click',function(e) {
		if($('#menu').hasClass('canvas-slid')){
			$('#footermenu').trigger('click');
		}else{
	        window.history.back();
		}
	});
	$('.arrow-right').on('click',function(e) {
	window.history.forward();
	});

});

       
		
		
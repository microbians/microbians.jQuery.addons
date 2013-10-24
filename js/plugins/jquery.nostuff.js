/* 
* jQuery NO SELECT NO CONTEXT MENU ... -- microbians.com
* Released under the MIT license. 
*/ 

;(function($) {
	$.fn.disableSelection = function()
	{
		$(this).bind('',function(){return false;});
		$(this).each(function() { 
			if($.browser.msie){
				$(this).bind('selectstart',function(){return false;});
				$(this).bind('ondragstart',function(){return false;});
			}else{
				//$(this).css('user-select', 'none');
				$(this).bind('mousedown', function(event){
					if (event.target.nodeName!='IMG' && event.target.nodeName!='BODY' && event.target.id!='content'  && event.target.id!='canvas' && event.target.id!='projectlistcanvas'  && event.target.id.indexOf('menu')==-1 ) {
							return true;
					}
					return false;
				});
				$(this).bind('touchstart', function(){return false;});
			} 
		});
	}
})(jQuery);
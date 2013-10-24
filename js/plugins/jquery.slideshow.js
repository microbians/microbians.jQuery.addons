/* 
* jQuery slideshow - microbians.com
* version 0.1 
* Released under the MIT license. 
*/ 

;(function($) {
	$.fn.slideshow = function(stopTimeInSlide, fadeVelocity, afterSlide)
	{
		if (fadeVelocity   	==undefined) $(this).data('fadeVelocity', 'slow');
		else 							 $(this).data('fadeVelocity', fadeVelocity);
		
		if (afterSlide		!=undefined) $(this).data('afterSlide', afterSlide);
		
		if (stopTimeInSlide	!=undefined) $(this).data('stopTimeInSlide', stopTimeInSlide);
		else							 $(this).data('stopTimeInSlide', 1000);
		
		var slideshowItems	= $(this).find('.slideshow');
		var obj				= $(this);

		var firstElm=$(this).find('.slideshow').first();
		var clonespacer=firstElm.clone().appendTo(obj);
		clonespacer.css('visibility', 'hidden');
		clonespacer.css('position', 'static');
		clonespacer.removeClass('slideshow');
		clonespacer.attr('SPACER', true);
		
		slideshowItems.each(function(index){
			$(this).css('position', 'absolute');
			$(this).css('top' ,'0px');
			$(this).css('left','0px');
			$(this).css('z-index', slideshowItems.length-index-1 )
			$(this).hide({queue:'slideshow'});
			if (index==0) {
				$(this).attr('old', true);
				if ($.isFunction(obj.data('afterSlide'))) obj.data('afterSlide').call(obj[0], $(this));
			} 
		});
		
		waituntilLoaded=function(o) {
			var slideshowItems	= o.find('.slideshow');
			var allLoaded=true;
			slideshowItems.each(function(){
				if ($(this).is('img') && !$(this).attr('complete')) {
					allLoaded=false;
				}
			});
			if (allLoaded==true) {
				o.data('slideshow', setTimeout(function(){o.nextSlide()}, 100) );
			} else {
				o.data('slideshow', setTimeout(function(){waituntilLoaded(o)}, 100) );
			}
		}
		// Start the first slide
		obj.data('slideshow', setTimeout(function(){waituntilLoaded(obj)}, 100) );
	}
	$.fn.nextSlide=function()
	{
		var slideshowItems	= $(this).find('.slideshow');
		var obj				= $(this);
		
		slideshowItems.each(function(){
			var z=parseInt($(this).css('z-index'));
			if (z==slideshowItems.length) {
				$(this).attr('old','true');
			} else {
				$(this).removeAttr('old');
			}
			z++;
			if (z>slideshowItems.length) z=1;
			$(this).css('z-index',z)
		});
		slideshowItems.each(function(){
			var z=parseInt($(this).css('z-index'));
			if (z==slideshowItems.length) {
				$(this).css('display', 'inherit');
				$(this).fadeIn({stop:true, duration:obj.data('fadeVelocity'), queue:'slideshow', complete:function(){
					var tmp=obj.find('[old=true]');
					tmp.hide({queue:'slideshow'});
					tmp.removeAttr('old');
					obj.data('slideshow', setTimeout(function(){obj.nextSlide()},obj.data('stopTimeInSlide')) );
				}});
				if ($.isFunction(obj.data('afterSlide'))) obj.data('afterSlide').call(obj[0], $(this));
			}
		});
	}
	$.fn.stopSlide=function()
	{
		clearTimeout($(this).data('slideshow'));
		// Stop of one the current animation
		$('.slideshow', this).each(function(){
			$(this).stop('slideshow');
		});
	}
})(jQuery);		

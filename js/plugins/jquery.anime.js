/* 
* jQuery FADES
* per ID (uid) animation fx by default works like is not queued if queued=false||undefined - microbians.com
* version 0.5 
* Released under the MIT license.
* Based partialy on jquery.fxqueues.js
* version 0.5 - BUG's on stop corrected
* version 0.4 - Added CSS3 transitions for animate in modern browsers
* version 0.1 - Added multiple queue for each obj and indivifual opacity per queue
* CSS3 Timming table by André Fiedler from script: Fx.Tween.CSS3.js
* CSS2 Timming table by ease jquery plugin based on Robert P. equations & based on easing jQuery plugin by George McGinley Smith
*
* Requieres: jquery.css3.js
* Requieres: jquery.is.js
*
*/ 

ANIMATIONFRAMESxSECOND=60;
ANIMATIONTICK=Math.floor(1000/ANIMATIONFRAMESxSECOND);
MAXIMUNOPACITY = .999; // Solve a bug in safari that over print antialiasing

;(function($) {

	var transitionTimingsCSS3={
	       'linear'     	: 'cubic-bezier(0,0,1,1)',
	       'easein'			: 'cubic-bezier(0.14,0.01,0.49,0)',
	       'easeout'		: 'cubic-bezier(0.01,0,0.43,1)',
	       'easeinout'		: 'cubic-bezier(0.47,0.04,0.53,0.96)',
	       'expoin'     	: 'cubic-bezier(0.71,0.01,0.83,0)',
	       'expoout'      	: 'cubic-bezier(0.14,1,0.32,0.99)',
	       'expoinout'   	: 'cubic-bezier(0.85,0,0.15,1)',
	       'circin'       	: 'cubic-bezier(0.34,0,0.96,0.23)',
	       'circout'      	: 'cubic-bezier(0,0.5,0.37,0.98)',
	       'circinout'   	: 'cubic-bezier(0.88,0.1,0.12,0.9)',
	       'sinein'      	: 'cubic-bezier(0.22,0.04,0.36,0)',
	       'sineout'      	: 'cubic-bezier(0.04,0,0.5,1)',
	       'sineinout'   	: 'cubic-bezier(0.37,0.01,0.63,1)',
	       'quadin'       	: 'cubic-bezier(0.14,0.01,0.49,0)',
	       'quadout'      	: 'cubic-bezier(0.01,0,0.43,1)',
	       'quadinout'   	: 'cubic-bezier(0.47,0.04,0.53,0.96)',
	       'cubicin'      	: 'cubic-bezier(0.35,0,0.65,0)',
	       'cubicout'     	: 'cubic-bezier(0.09,0.25,0.24,1)',
	       'cubicinout'  	: 'cubic-bezier(0.66,0,0.34,1)',
	       'quartin'      	: 'cubic-bezier(0.69,0,0.76,0.17)',
	       'quartout'     	: 'cubic-bezier(0.26,0.96,0.44,1)',
	       'quartinout'  	: 'cubic-bezier(0.76,0,0.24,1)',
	       'quintin'      	: 'cubic-bezier(0.64,0,0.78,0)',
	       'quintout'     	: 'cubic-bezier(0.22,1,0.35,1)',
	       'quintinout'  	: 'cubic-bezier(0.9,0,0.1,1)',
	       'applescroll'  	: 'cubic-bezier(0,0,0.25,1)'
	};
	
	var transitionTimingsCSS2={
	       'linear'     	: function( p, n, firstNum, diff ) {return firstNum + diff * p;},
	       'easein'			: function (x, t, b, c, d) { return c*(t/=d)*t + b;},
	       'easeout'		: function (x, t, b, c, d) { return -c *(t/=d)*(t-2) + b;},
	       'easeinout'		: function (x, t, b, c, d) { if ((t/=d/2) < 1) { return c/2*t*t + b;}; return -c/2 * ((--t)*(t-2) - 1) + b;},
	       'expoin'     	: function (x, t, b, c, d) { return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;},
	       'expoout'      	: function (x, t, b, c, d) { return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;},
	       'expoinout'   	: function (x, t, b, c, d) { if (t==0) {return b;}; if (t==d) {return b+c;}; if ((t/=d/2) < 1) {return c/2 * Math.pow(2, 10 * (t - 1)) + b;}; return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;},
	       'circin'       	: function (x, t, b, c, d) { return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;},
	       'circout'      	: function (x, t, b, c, d) { return c * Math.sqrt(1 - (t=t/d-1)*t) + b;},
	       'circinout'   	: function (x, t, b, c, d) { if ((t/=d/2) < 1) {return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;}; return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;},
	       'sinein'      	: function (x, t, b, c, d) { return -c * Math.cos(t/d * (Math.PI/2)) + c + b;},
	       'sineout'      	: function (x, t, b, c, d) { return c * Math.sin(t/d * (Math.PI/2)) + b;},
	       'sineinout'   	: function (x, t, b, c, d) { return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;},
	       'quadin'       	: function (x, t, b, c, d) { return c*(t/=d)*t + b;},
	       'quadout'      	: function (x, t, b, c, d) { return -c *(t/=d)*(t-2) + b;},
	       'quadinout'   	: function (x, t, b, c, d) { return -c *(t/=d)*(t-2) + b;},
	       'cubicin'      	: function (x, t, b, c, d) { return c*(t/=d)*t*t + b;},
	       'cubicout'     	: function (x, t, b, c, d) { return c*((t=t/d-1)*t*t + 1) + b;},
	       'cubicinout'  	: function (x, t, b, c, d) { if ((t/=d/2) < 1) {return c/2*t*t*t + b;}; return c/2*((t-=2)*t*t + 2) + b;},
	       'quartin'      	: function (x, t, b, c, d) { return c*(t/=d)*t*t*t + b;},
	       'quartout'     	: function (x, t, b, c, d) { return -c * ((t=t/d-1)*t*t*t - 1) + b;},
	       'quartinout'  	: function (x, t, b, c, d) { if ((t/=d/2) < 1) {return c/2*t*t*t*t + b;}; return -c/2 * ((t-=2)*t*t*t - 2) + b;},
	       'quintin'      	: function (x, t, b, c, d) { return c*(t/=d)*t*t*t*t + b;},
	       'quintout'     	: function (x, t, b, c, d) { return c*((t=t/d-1)*t*t*t*t + 1) + b;},
	       'quintinout'  	: function (x, t, b, c, d) { if ((t/=d/2) < 1) { return c/2*t*t*t*t*t + b;}; return c/2*((t-=2)*t*t*t*t + 2) + b;}
	};

	// Backup core jQuery functions
	var $animate = $.fn.animate;
	var $fadeIn  = $.fn.fadeIn;
	var $fadeOut = $.fn.fadeOut;
	var $fadeTo  = $.fn.fadeTo;
	var $show 	 = $.fn.show;
	var $hide 	 = $.fn.hide;
	var $delay 	 = $.fn.delay;
	var $stop    = $.fn.stop;
   
	// Unique ID generator
	var UID=0;
	$.fn.UID = function(){
		var obj=$(this);
		if (obj.data('UID')==undefined) {
			obj.data('UID', UID);
			UID++;
		}
		return obj.data('UID');
	}

	now=function(){
		return (new Date).getTime();
	}

	getUIDQueueName = function(obj, q){
		return 'F_'+obj.UID()+'_'+q+'';
	}

	$.fn.animationQueue = function(queueName, renew){
		var obj=$(this);
		var q=getUIDQueueName(obj, queueName);
		
		if ( (renew!==undefined||renew===true) && obj.data(q)!=undefined ){
				obj.data(q).status='stop';
				obj.data(q).isAnimQueue='false';
				obj.removeData(q);
		}
		
		if (obj.data(q)==undefined) {
			obj.data(q, new Array());
			obj.data(q).status='start';
			obj.data(q).isAnimQueue=true;
		}
		return obj.data(q);
	}	

	$.fn.addAnimationToQueue=function(queueName, anim){
		var obj=$(this);
		var animQueue=obj.animationQueue(queueName); // Init the queue and/or return it
		animQueue.push(anim);
		return animQueue;
	}

	$.fn.animate = function(prop, opt) {
		if ( typeof(opt)!='object' ) {
		    return $animate.apply( this, arguments );
		}
		return $(this).each(function(){	
			var obj=$(this);
			var stop=opt.stop;
			var queueName=opt.queue;
			var animQueue=obj.animationQueue(queueName);

			if (animQueue==null) return;
			if (animQueue.length===0) stop=false;
			
			if (queueName==false) { stop=true;  queueName=''; }
			if (queueName==true)  { stop=false; queueName=''; }
	
			if (stop==undefined) stop=false;
	
			if (stop===true && animQueue.length>0) obj.stop(queueName);

			// IF the queue is stoped then start it because we start on each animate call
			// IF the queue is in pause will not start until user set to play with .play
		 	if (animQueue.status=='stop') {
		 		// Clean preview queue because it become from a stop
		 		var animQueue=obj.animationQueue(queueName,true);
		 		animQueue.status='start';
		 	}
	
			var duration=opt.duration;
				 if (opt.duration=='fast') 			 var duration=200;
			else if (opt.duration=='slow') 			 var duration=600;
			else if (opt.duration==undefined) 		 var duration=400;
			else if (typeof(opt.duration)=='string') var duration=400;
	
			var type=opt.type;
			
			if (type===undefined && (isiPad||isiPhone||isiPod)) type='TRANSITION';
			
			if (CSS3TransitionProperty===undefined) type='JS';
			
			if (type===undefined||type.toUpperCase()==='JS') {
				if (opt.easing==undefined) 	var easing=transitionTimingsCSS2['linear'];
				else 						var easing=transitionTimingsCSS2[opt.easing.toLowerCase()];
			} else {
				if (opt.easing==undefined) 	var easing=transitionTimingsCSS3['linear'];
				else 						var easing=transitionTimingsCSS3[opt.easing.toLowerCase()];
			}

			var animQueue=obj.addAnimationToQueue(queueName, {prop:prop, opt:{type:type, queue: queueName, duration:duration, easing:easing, step:opt.step, complete:opt.complete} });
	
			if (animQueue.status==='start') obj.play(queueName);
					
		});
	}

	$.fn.startAnimation_JS = function(queueName){
			var obj=$(this);
			var animQueue=obj.animationQueue(queueName);
	
			// Queue was destroy somewhere so return.
			if (animQueue!=undefined && animQueue!='') {
	
				var curAnim=animQueue[0];
						
				var prop=curAnim.prop;
				var opt=curAnim.opt;

				curAnim.startTime=now();
				curAnim.start=true
				curAnim.initialProp=new Object();
				
				var that=curAnim.initialProp;

				var is3DTransform=($(this).css('backface-visibility')!=='visible'||$(this).css('perspective')!=='none'||$(this).css('transform').indexOf('Z')!=-1||$(this).css('transform').indexOf('3d')!=-1);
				
				if (!is3DTransform) {
					for (var p in curAnim.prop) {
						if (p==='translate'||p==='scale'||p==='rotate') {
							is3DTransform=true;
							break;
						}
					}
				}

				if (!is3DTransform) {
					// Hack to get hardware acceleration part1
					var property3D	='transform';
					var hardwareAcceletarion3D=obj.css(property3D);
					if (hardwareAcceletarion3D==undefined||'none') 	var value3D='scale3d(1,1,1)';
					else											var value3D=hardwareAcceletarion3D;
					
					obj.css(property3D, value3D);
				}

				curAnim.timer=setInterval(function(){
					// This "if" is necesary because queue anim can be destroy somewhere in the middle...
					if (curAnim!=undefined) {
						var t=now();
						var n=t-curAnim.startTime;
						var c=n/curAnim.opt.duration;
					}
					
					if (animQueue!=undefined && animQueue!='' && animQueue.status=='play') {
						var value=curAnim.opt.easing(c, n, 0, 1, curAnim.opt.duration);
			
						if (t < curAnim.startTime+curAnim.opt.duration ) {
							// The first captures the current state of the properties
							if (curAnim.start==true) {
								curAnim.start=false;
								for (var p in curAnim.prop) {
									switch(p) {
										case 'opacity':
											that[p]=obj.opacity(undefined, queueName); // Set a opacity for this queue (if the opacty name for this queue not exist it will be created)
										break;
										case 'translate':
											that[p]=obj.translate(); // Copy start values for p
										break;
										case 'scale':
											that[p]=obj.scale(); 	// Copy start values for p
										break;
										case 'rotate':
											that[p]=obj.rotate(); 	// Copy start values for p
										break;
										default:
											that[p]=parseFloat(obj.css(p));
											if (that[p]+''=='NaN') {
												that[p]=0;
											}
									}
								}
							}
							
							// Then whe make the prop changes
							for (var p in curAnim.prop) {
								// This "if" is because a bug on iPad
								if (that[p]!==undefined) {
									switch(p) {
										case 'opacity':
											obj.opacity(value*parseFloat(curAnim.prop[p])+(1-value)*that[p], queueName); // Set a opacity for this queue (if the opacty name for this queue not exist it will be created)
										break;
										case 'translate':
											var val=curAnim.prop[p];
											var x=val.x!=undefined?value*parseFloat(val.x)+(1-value)*that[p].x:undefined;
											var y=val.y!=undefined?value*parseFloat(val.y)+(1-value)*that[p].y:undefined;
											var z=val.z!=undefined?value*parseFloat(val.z)+(1-value)*that[p].z:undefined;
											obj.translate(x,y,z);
										break;
										case 'scale':
											var val=curAnim.prop[p];
											var x=val.x!=undefined?value*parseFloat(val.x)+(1-value)*that[p].x:undefined;
											var y=val.y!=undefined?value*parseFloat(val.y)+(1-value)*that[p].y:undefined;
											var z=val.z!=undefined?value*parseFloat(val.z)+(1-value)*that[p].z:undefined;
											obj.scale(x,y,z);
										break;
										case 'rotate':
											var val=curAnim.prop[p];
											var x=val.x!=undefined?value*parseFloat(val.x)+(1-value)*that[p].x:undefined;
											var y=val.y!=undefined?value*parseFloat(val.y)+(1-value)*that[p].y:undefined;
											var z=val.z!=undefined?value*parseFloat(val.z)+(1-value)*that[p].z:undefined;
											obj.rotate(x,y,z);
										break;
										default:
											obj.css( p, value*parseFloat(curAnim.prop[p])+(1-value)*that[p] );
									}
								}

							}
							if ( $.isFunction(curAnim.opt.step) ) curAnim.opt.step.call(obj);
			
						} else {

							// We need to finish... complete
							clearInterval(curAnim.timer); // Stop timer
							
							// Is las time we put the last value
							for (var p in curAnim.prop) {
								switch(p) {
									case 'opacity':
										obj.opacity(parseFloat(curAnim.prop[p]), queueName); // Set a opacity for this queue (if the opacty name for this queue not exist it will be created)
									break;
									case 'translate':
										var values=curAnim.prop[p];
										var x=values.x!=undefined?parseFloat(values.x):undefined;
										var y=values.y!=undefined?parseFloat(values.y):undefined;
										var z=values.z!=undefined?parseFloat(values.z):undefined;
										obj.translate(x,y,z);
									break;
									case 'scale':
										var values=curAnim.prop[p];
										var x=values.x!=undefined?parseFloat(values.x):undefined;
										var y=values.y!=undefined?parseFloat(values.y):undefined;
										var z=values.z!=undefined?parseFloat(values.z):undefined;
										obj.scale(x,y,z);
									break;
									case 'rotate':
										var values=curAnim.prop[p];
										var x=values.x!=undefined?parseFloat(values.x):undefined;
										var y=values.y!=undefined?parseFloat(values.y):undefined;
										var z=values.z!=undefined?parseFloat(values.z):undefined;
										obj.rotate(x,y,z);
									break;
									default:
										obj.css( p, parseFloat(curAnim.prop[p]) );
								}
							}

							if (!is3DTransform) {
								// Hack to get hardware acceleration part2
							 	obj.css(property3D, hardwareAcceletarion3D);
							}
			
							animQueue.splice(0, 1);
			
							if (animQueue.length>0) {
								setTimeout(function(){
									obj.startAnimation(queueName);
								},1);
							} else {
								animQueue.status='stop';
								animQueue.length=0;
							}
	
							if ( $.isFunction(curAnim.opt.complete) ) curAnim.opt.complete.call(obj);
						}
					}	
				}, ANIMATIONTICK);
			} else return;
	}

	$.fn.startAnimation_CSS3Transition = function(queueName){

			var obj=$(this);
			var animQueue=obj.animationQueue(queueName);
			var q=getUIDQueueName(obj, queueName);
			
			// Queue was destroy somewhere so return.
			if (animQueue!=undefined && animQueue!='') {
				var curAnim=animQueue[0];

				if (obj.data("transitions")==undefined){
					obj.data("transitions", new Array());
				}
				
				var is3DTransform=($(this).css('backface-visibility')!=='visible'||$(this).css('perspective')!=='none'||$(this).css('transform').indexOf('Z')!=-1||$(this).css('transform').indexOf('3d')!=-1);

				for (var p in curAnim.prop) {
					if (p==='translate'||p==='scale'||p==='rotate') {
						p=getCSS3Name['transform'];
						is3DTransform=true;
					}
					obj.data("transitions").push(p +' '+curAnim.opt.duration+'ms '+curAnim.opt.easing);
				}

				if (!is3DTransform) {
					// Hack to get hardware acceleration part1
					var property3D	='backface-visibility';
					var hardwareAcceletarion3D=obj.css(property3D);
					if (hardwareAcceletarion3D==undefined||'none') 	var value3D='hidden';
					else											var value3D=hardwareAcceletarion3D;
					
					obj.css(property3D, value3D);
				}
				
				// Hack to refresh page (because a bug??)
				if ($('#animeFakeDiv').length>0) {
					$('#animeFakeDiv').html();
				} else {
					$('body').append( '<div id="animeFakeDiv" style="display:none"></div>' ); 
				}

				// Generate transition - Executed & refresh browser
				obj.css('transition', obj.data("transitions").join(','));

				// Refresh animation
				for (var p in curAnim.prop) {
					switch(p) {
						case 'opacity':
							obj.opacity( parseFloat(curAnim.prop[p]), queueName, false); // Set a opacity for this queue (if the opacty name for this queue not exist it will be created)
						break;
						case 'translate':
							var values=curAnim.prop[p];
							var x=values.x!=undefined?parseFloat(values.x):undefined;
							var y=values.y!=undefined?parseFloat(values.y):undefined;
							var z=values.z!=undefined?parseFloat(values.z):undefined;
							obj.translate(x,y,z);
						break;
						case 'scale':
							var values=curAnim.prop[p];
							var x=values.x!=undefined?parseFloat(values.x):undefined;
							var y=values.y!=undefined?parseFloat(values.y):undefined;
							var z=values.z!=undefined?parseFloat(values.z):undefined;
							obj.scale(x,y,z);
						break;
						case 'rotate':
							var values=curAnim.prop[p];
							var x=values.x!=undefined?parseFloat(values.x):undefined;
							var y=values.y!=undefined?parseFloat(values.y):undefined;
							var z=values.z!=undefined?parseFloat(values.z):undefined;
							obj.rotate(x,y,z);
						break;
						default:
							obj.css(p, parseFloat(curAnim.prop[p]));
					}
				}

				curAnim.timerFinish=false;
				curAnim.transitionFinish=false;
				
				curAnim.timerEnd=function(){
					curAnim.finish=true;
					if (curAnim.timeStart+curAnim.opt.duration+100>(new Date()).getTime() && curAnim.transitionFinish==false) {
						setTimeout(curAnim.timerEnd,1);
						return;
					}
					obj.unbind( CSS3TransitionEvent );
					animQueue.splice(0, 1);

					// Clear transitions in use
					for (var p in curAnim.prop) {
						if (p==='translate'||p==='scale'||p==='rotate') {
							p=getCSS3Name['transform'];
						}
						
						if (obj.data("transitions")!=undefined) {
							for (var i=0; i<obj.data("transitions").length; i++){
								if (obj.data("transitions")[i].indexOf(p)!=-1) {
									obj.data("transitions").splice(i,1);
								}
							}
						}
					}								
					// Reset transition as we take out some properties
					if (obj.data("transitions")!=undefined) {
						obj.css('transition', obj.data("transitions").join(','));
					}

					if (animQueue.length>0) {
						// Set visibility - Executed & refresh browser
						setTimeout(function(){
							// First check if is needed to change visibility before start the animation
							// This is needed because a bug do not set visibility until the end of the transition
							var curAnim=animQueue[0];
							
							if (curAnim!==undefined) {
								if (curAnim.prop['opacity']!==undefined) {
									var new_opacity=obj.opacityGetRealValues()+parseFloat(curAnim.prop['opacity']);
									if (new_opacity>0) 	obj.css('visibility','visible');
									else 				obj.css('visibility','hidden');
								}
							}
							
							if (!is3DTransform) {
								// Hack to get hardware acceleration part2
							 	obj.css(property3D, hardwareAcceletarion3D);
							}
							
							// Next queue - Executed & refresh browser
							setTimeout(function(){
								obj.startAnimation(queueName);
							},1);
						},1);
					} else {
						animQueue.status='stop';
						animQueue.length=0;
					}
					if ( $.isFunction(curAnim.opt.complete) ) curAnim.opt.complete.call(obj);
				};
				
				curAnim.timeStart=(new Date()).getTime();
				obj.bind( CSS3TransitionEvent, function(){
					curAnim.transitionFinish=true;
					if (curAnim.finish==false) {
						clearTimeout(curAnim.timer);
						obj.unbind( CSS3TransitionEvent );
						setTimeout(curAnim.timerEnd,1);
					}
				});
				curAnim.timer=setTimeout(curAnim.timerEnd, curAnim.opt.duration);

			}
	}

	$.fn.startAnimation=function(queueName){
		var obj=$(this);
		var animQueue=obj.animationQueue(queueName);
		// Queue was destroy somewhere so return.
		if (animQueue!=undefined && animQueue!='') {
			var curAnim=animQueue[0];

			if (curAnim.opt.type===undefined||curAnim.opt.type.toUpperCase()==='JS') {
				obj.startAnimation_JS(queueName);
			} else {

				// Check there is a 3D prop to anim and check if the object wasn't 3d before and activates as 3D
				// because ipad if not start the scale as 0,0,0
				var is3DTransform=($(this).css('backface-visibility')!=='visible'||$(this).css('perspective')!=='none'||$(this).css('transform').indexOf('Z')!=-1||$(this).css('transform').indexOf('3d')!=-1);
				
				for (var p in curAnim.prop) {
					if (p==='translate'||p==='scale'||p==='rotate') {
						// init the object for transition 3D
						if (!is3DTransform) obj.scale(1,1,1);
						break;
					}
				}

				obj.startAnimation_CSS3Transition(queueName);
			} 
		}	
	}

	$.fn.stop=function(queueName){
		if ( typeof(queueName)!='string' ) {
		    return $stop.apply( this, arguments );
		}
		
		return $(this).each(function(){	
			var obj=$(this);
			var q=getUIDQueueName(obj, queueName);
			
			var animQueue=obj.animationQueue(queueName); // Init the queue and/or return it
			
			for (var i=animQueue.length-1; i>=0; i--) {
				var curAnim=animQueue[i];
				if (curAnim!=undefined && curAnim.timer) clearTimeout(curAnim.timer);
				animQueue.splice(i,1);
			}
			animQueue.length=0;
			
			if (CSS3TransitionProperty!==undefined) {
				obj.css('transition','');
				obj.css('transition-duration','');
				obj.unbind(CSS3TransitionEvent);
			}
			
			animQueue.status='stop';
		});
	}

	$.fn.play=function(queueName){
		return $(this).each(function(){	
			var obj=$(this);
			var animQueue=obj.animationQueue(queueName); // Init the queue and/or return it

			if (animQueue.status==='start'||animQueue.status==='pause') {
				animQueue.status='play';
				obj.startAnimation(queueName);
			} else {
				if (animQueue.status!=='play') {
					animQueue.status='play';
					obj.startAnimation(queueName);
				}
			}
		});
	}

	$.fn.pause=function(queueName){
		return $(this).each(function(){	
			var obj=$(this);
			var animQueue=obj.animationQueue(queueName); // Init the queue and/or return it
			var curAnim=animQueue[0];
			if (curAnim!=undefined && curAnim.timer) {
				clearTimeout(curAnim.timer);
			}

			if (CSS3TransitionProperty!==undefined) {
				obj.unbind(CSS3TransitionEvent);
			}

			animQueue.status='pause';
		});
	}
	
	$.fn.fadeTo=function(opt, o, c){
		if ( typeof(opt)!='object') return $fadeTo.apply( this, arguments );
		return $(this).animate({opacity: opt.value}, opt);
	}

	$.fn.fadeIn=function(opt, c){
		if ( typeof(opt)!='object') return $fadeIn.apply( this, arguments );
		return $(this).animate({opacity:1}, opt);
	}

	$.fn.fadeOut=function(opt, c){
		if ( typeof(opt)!='object') return $fadeOut.apply( this, arguments );
		return $(this).animate({opacity:0}, opt);
	}

	$.fn.show=function(opt, c){
		if ( typeof(opt)!='object') return $show.apply( this, arguments );

		var value    = ((opt.value===undefined)?1:opt.value);
		var duration = ((opt.duration===undefined)?0:opt.duration);

		if (duration===0) {
			$(this).animate({opacity:value}, {type:opt.type, stop:opt.stop, global:opt.global, queue:opt.queue, duration:0		, step:opt.step, easing:opt.easing, complete:opt.complete });
		} else {
			$(this).animate({opacity:value}, {type:opt.type, stop:opt.stop, global:opt.global, queue:opt.queue, duration:0		, step:opt.step, easing:opt.easing });
			$(this).animate({opacity:value}, {type:opt.type, stop:false   , global:opt.global, queue:opt.queue, duration:duration	, step:opt.step, easing:opt.easing, complete:opt.complete });
		}
		return $(this);
	}

	$.fn.hide=function(opt, c){
		if ( typeof(opt)!='object') return $hide.apply( this, arguments );
		return $(this).show({value:0, type:opt.type, stop:opt.stop, global:opt.global, queue:opt.queue, duration:opt.duration, step:opt.step, easing:opt.easing, complete:opt.complete });
	}
	
	$.fn.delay=function(opt, arg2) {
		if ( typeof(opt)!='object') return $delay.apply( this, arguments );
		// Delay is a void fake animation
		return $(this).animate({}, opt);
	}
	
})(jQuery);
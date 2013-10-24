/* 
* jQuery.is set variables for properties in browser
* version 0.1 
* Released under the MIT license. 
*/ 

// Extra browser checks;
var isiPad 		= navigator.userAgent.match(/iPad/i) 	!= null;
var isiPhone 	= navigator.userAgent.match(/iPhone/i) 	!= null;
var isiPod 		= navigator.userAgent.match(/isiPod/i) 	!= null;
var isAppleMobileBrowser = ( isiPad || isiPhone || isiPod );


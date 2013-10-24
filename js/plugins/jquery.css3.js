/* 
* jQuery add ajax css3 and checks for the beta names of the css3 fro mozilla and webkit browsers - microbians.com
* version 0.5 
* Released under the MIT license.
* Requieres: jquery.is.js
*/ 

// http://lea.verou.me/2009/02/find-the-vendor-prefix-of-the-current-browser/
function getVendorPrefix() {
	if('result' in arguments.callee) return arguments.callee.result;
	var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/;
	var someScript = document.getElementsByTagName('script')[0];
	for(var prop in someScript.style){
		if(regex.test(prop)){
			// test is faster than match, so it's better to perform
			// that on the lot and match only when necessary
			return arguments.callee.result = prop.match(regex)[0];
		}
	}
	// Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
	// However (prop in style) returns the correct value, so we'll have to test for
	// the precence of a specific property
	if('WebkitOpacity' in someScript.style) return arguments.callee.result = 'Webkit';
	if('KhtmlOpacity' in someScript.style) return arguments.callee.result = 'Khtml';
	return arguments.callee.result = '';
}

// Set prefix for each browser
var BROWSERPrefix=getVendorPrefix().toLowerCase();

// -------------------------------------------------------------------------

// Set CSS3 styles in beta fase
var getCSS3Name ={
	'transform':null, 'transform-origin':null, 
	'animation':null, 'animation-name':null, 'animation-delay':null, 'animation-play-state':null, 'animation-direction':null, 'animation-iteration-count':null, 'animation-timing-function':null, 'animation-duration':null,
	'transition':null, 'transition-delay':null, 'transition-duration':null, 'transition-property':null, 'transition-timing-function':null,
	'perspective':null,	'perspective-origintransform-style':null,
	'backface-visibility':null,
	'appearance':null,
	'background-clip':null,	'background-composite':null, 'background-inline-policy':null, 'background-origin':null, 'background-size':null,
	'binding':null,
	'border-bottom-colors':null, 'border-bottom-left-radius':null, 'border-bottom-right-radius':null, 'border-end':null, 'border-end-color':null, 'border-end-style':null, 'border-end-width':null, 'border-fit':null, 'border-horizontal-spacing':null, 'border-image':null, 'border-left-colors':null, 'border-radius':null, 'border-radius-bottomleft':null, 'border-radius-bottomright':null, 'border-radius-topleft':null, 'border-radius-topright':null, 'border-right-colors':null, 'border-start':null, 'border-start-color':null, 'border-start-style':null, 'border-start-width':null, 'border-top-colors':null, 'border-top-left-radius':null, 'border-top-right-radius':null, 'border-vertical-spacing':null,
	'box-align':null, 'box-direction':null, 'box-flex':null, 'box-flex-group':null, 'box-flexgroup':null, 'box-lines':null, 'box-ordinal-group':null, 'box-orient':null, 'box-pack':null, 'box-shadow':null, 'box-sizing':null,
	'column-break-after':null, 'column-break-before':null,	'column-break-inside':null,	'column-count':null, 'column-gap':null,	'column-rule':null,	'column-rule-color':null,	'column-rule-style':null,	'column-rule-width':null,	'column-width':null,	'columns':null,
	'dashboard-region':null,
	'float-edge':null,
	'font-size-delta':null,
	'force-broken-image-icon':null,
	'highlight':null,
	'image-region':null,
	'line-break':null,	'line-clamp':null,
	'margin-bottom-collapse':null,	'margin-collapse':null,	'margin-end':null,	'margin-start':null,	'margin-top-collapse':null,
	'marquee':null,	'marquee-direction':null,	'marquee-increment':null,	'marquee-repetition':null,	'marquee-speed':null,	'marquee-style':null,
	'match-nearest-mail-blockquote-color':null,
	'nbsp-mode':null,
	'outline':null,	'outline-color':null,	'outline-offset':null,	'outline-radius':null,	'outline-radius-bottomleft':null,	'outline-radius-bottomright':null,	'outline-radius-topleft':null,	'outline-radius-topright':null,	'outline-style':null,	'outline-width':null,
	'padding-end':null,	'padding-start':null,
	'rtl-ordering':null,
	'stack-sizing':null,
	'text-decorations-in-effect':null,	'text-fill-color':null,	'text-security':null,	'text-size-adjust':null,	'text-stroke':null,	'text-stroke-color':null,	'text-stroke-width':null,
	'user-drag':null,	'user-focus':null,	'user-input':null,	'user-modify':null,	'user-select':null,
	'window-shadow':null
};

CSS3capitalize = function(s){ 
	if (s!==undefined) {
	    return s.replace(/\w+/g, function(a){return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();}).replace(/-+/g,'');
    } else return undefined;
};
  
function CSS3PrefixedName(n){
	return '-'+BROWSERPrefix+'-'+n;
}


function CSS3exist(n){
	return (n in document.documentElement.style);
}

// Return the CSS3Name
function CSS3Name(n){
	// If the property is final release return n el se add the prefix
	if (CSS3exist(CSS3capitalize(n))) 					return n;
	if (CSS3exist(CSS3capitalize(CSS3PrefixedName(n))))	return CSS3PrefixedName(n);
	return undefined
}

function CSS3Check(){
	// Check if the styles are final release or beta css3
	for (i in getCSS3Name) {
		getCSS3Name[i]=CSS3Name(i);
	}
}

// Run CSS3 check
CSS3Check();

// Return the CSS3Name
function HTML5Name(n){
	return CSS3capitalize(CSS3Name(n));
}

// Return the CSS3Name
function HTML5Function(n){
	if (document[n])					return document[n];
	console.log(CSS3capitalize(BROWSERPrefix)+n)
	if (document[CSS3capitalize(BROWSERPrefix)+n])	return document[CSS3capitalize(BROWSERPrefix)+n];
	return undefined
}

// Look if transition is avaliable
var CSS3TransformProperty  = HTML5Name('transform');

var CSS3TransitionProperty = HTML5Name('transition');
var CSS3TransitionEvent    = CSS3TransitionProperty===undefined?undefined:CSS3TransitionProperty+'End';

var CSS3D                  = HTML5Name('backface-visibility');

/* NOT WORKING AND NOT FINISHED

// CSS3 MAtrix constructor
var CSS3Matrix             = window.CSSMatrix||window.WebKitCSSMatrix||window.MozCSSMatrix||window.OCSSMatrix||window.MsCSSMatrix;

function CSS3GenerateMatrix(mtrx){
	if (mtrx!=='none') {
		// because a bug in WebKitCSSMatrix some returned values by computedStyle like precision numbers return errors
		mtrx = mtrx.replace(/\(/g, ',').replace(/\)/g, '').split(',');
		var tmpName = mtrx[0];
		mtrx.splice(0,1);
		
		for (var i in mtrx) {
			mtrx[i]=Math.round(parseFloat(mtrx[i])*1000)/1000;
		};
		mtrx=tmpName+'('+mtrx.join(',')+')';
	}

	return new CSS3Matrix(mtrx);
}
*/

;(function($) {

	//-- CSS3 ----------------------------------------------------------------------------------------------------------------------------
	// Backup original function
	var $css  = $.fn.css;
	$.fn.css = function(name,value){
		var name=getCSS3Name[name]||name;
		if (name===undefined) return;
		if (value!==undefined) {
			return $css.call(this, name, value);
		} else {
			return $css.call(this, name);
		}
	}
	
	$.fn.computedStyle = function(){
		if (window.getComputedStyle) {
			return window.getComputedStyle(this[0]);
		} else {
			return this[0].style;
		}
	}

	//-- POSITION ------------------------------------------------------------------------------------------------------------------------

	// Return de regular position for jQuery or real position+translateposition for modern browsers
	var $position  = $.fn.position;
	$.fn.position = function () {
		var translate	= $(this).translate();
		var x = $position.call(this).top 	+ translate.y;
		var y = $position.call(this).left	+ translate.x;
		return {top:x, left:y, x:x, y:y }
	}

	// Return de regular width for jQuery or real width*scale for modern browsers
	var $width  = $.fn.width;
	$.fn.width = function () { return $width.call(this) * $(this).scale().x; }
	
	// Return de regular width for jQuery or real width*scale for modern browsers
	var $height  = $.fn.height;
	$.fn.height = function () { return $height.call(this) * $(this).scale().y; }
	
	//-- TRANFORM ------------------------------------------------------------------------------------------------------------------------
	
	$.fn.setTransformation = function (translate, scale, rotate) {
		if (translate===undefined && scale===undefined && rotate===undefined) {
			var translate	= $(this).translate();
			var scale		= $(this).scale();
			var rotate		= $(this).rotate();
			return { translate: {x:translate.x, y:translate.y, z:translate.z}, scale: {x:scale.x, y:scale.y, z:scale.z}, rotate: {x:rotate.x, y:rotate.y, z:rotate.z} };
		} else {
			if (translate	=== undefined) var translate	= $(this).translate();
			if (scale	 	=== undefined) var scale		= $(this).scale();
			if (rotate 		=== undefined) var rotate		= $(this).rotate();
			if (CSS3D!==undefined) { 
				var t='translate3d('+translate.x+'px,'+translate.y+'px,'+translate.z+'px)';
				var s='scale3d('+scale.x+','+scale.y+','+scale.z+')';
				var rx='rotateX('+rotate.x+'deg)';
				var ry='rotateY('+rotate.y+'deg)';
				var rz='rotateZ('+rotate.z+'deg)';
				var r=rx+' '+ry+' '+rz;
			} else {
				var t='translate('+translate.x+'px,'+translate.y+'px)';
				var s='scale('+scale.x+','+scale.y+')';
				var r='rotate('+rotate.z+'deg)';
			}
			var transform=( t+' '+s+' '+r );
			$(this).css('transform', transform);
		}
	}

	//-- TRANFORM TRANSLATE --------------------------------------------------------------------------------------------------------------
	
	$.fn.translate = function (x,y,z){
		if ($(this).data('translate')==undefined) {
			$(this).data('translate', {x:0,y:0,z:0});
		}
		var translate=$(this).data('translate');
		
		if (x===undefined && y===undefined && z===undefined) {
			return {x:translate.x,y:translate.y,z:translate.z};
		} else {
			if (x===undefined) var x=translate.x;
			if (y===undefined) var y=translate.y;
			if (z===undefined) var z=translate.z;
			$(this).data('translate', {x:x,y:y,z:z});
			$(this).setTransformation({x:x,y:y,z:z});
		}
	}
	
/* NOT WORKING AND NOT FINISHED
	$.fn.getCurrentTranslate = function(){
		if (CSS3D!==undefined && CSS3Matrix!==undefined) {
			var curTrn = $(this).computedStyle()[CSS3TransformProperty];
			var matrix = new CSS3GenerateMatrix(curTrn);
			var x=matrix.m41;
			var y=matrix.m42;
			var z=matrix.m43;
		} else {
			if ($(this).data('translate')==undefined) {
				$(this).data('translate', {x:0,y:0,z:0});
			}
			var translate=$(this).data('translate');
			var x=translate.x;
			var y=translate.y;
			var z=translate.z;
		}
		return {x:x,y:y,z:z};
	}
*/

	//-- TRANFORM SCALE ---------------------------------------------------------------------------------------------------------------------

	$.fn.scale = function (x,y,z){
		if ($(this).data('scale')==undefined) {
			$(this).data('scale', {x:1,y:1,z:1});
		}
		var scale=$(this).data('scale');
		if (x===undefined && y===undefined && z===undefined) {
			return {x:scale.x, y:scale.y, z:scale.z};
		} else {
			if (x===undefined) var x=scale.x;
			if (y===undefined) var y=scale.y;
			if (z===undefined) var z=scale.z;
			$(this).data('scale', {x:x,y:y,z:z});
			$(this).setTransformation(undefined, {x:x,y:y,z:z});
		}
	}

/* NOT WORKING AND NOT FINISHED
	function CSS3Sign( x ){ if (x!==0) return x / Math.abs( x ); else return 1;}
	$.fn.getCurrentScale = function(){
		if (CSS3D!==undefined && CSS3Matrix!==undefined) {
			var curTrn = $(this).computedStyle()[CSS3TransformProperty];
			var matrix = new CSS3GenerateMatrix(curTrn);
			var x = Math.sqrt( matrix.m11*matrix.m11 + matrix.m12*matrix.m12 + matrix.m13*matrix.m13 ); 
			var y = Math.sqrt( matrix.m14*matrix.m14 + matrix.m21*matrix.m21 + matrix.m22*matrix.m22 ); 
			var z = Math.sqrt( matrix.m23*matrix.m23 + matrix.m24*matrix.m24 + matrix.m31*matrix.m31 );
			var D = matrix.m11 * (matrix.m21 * matrix.m31 - matrix.m24 * matrix.m22) - matrix.m14 * (matrix.m12 * matrix.m31 - matrix.m24 * matrix.m13) + matrix.m23 * (matrix.m12 * matrix.m22 - matrix.m21 * matrix.m13);
			x = x*CSS3Sign( D ); 
			y = y*CSS3Sign( D ); 
			z = z*CSS3Sign( D );
		} else {
			if ($(this).data('scale')==undefined) {
				$(this).data('scale', {x:1,y:1,z:1});
			}
			var scale=$(this).data('scale');
			var x=scale.x;
			var y=scale.y;
			var z=scale.z;
		}
		return {x:x,y:y,z:z};
	}
*/

	//-- TRANFORM ROTATE ----------------------------------------------------------------------------------------------------------------------

	$.fn.rotate = function (x,y,z){
		if ($(this).data('rotate')==undefined) {
			$(this).data('rotate', {x:0,y:0,z:0});
		}
		var rotate=$(this).data('rotate');
		if (x===undefined && y===undefined && z===undefined) {
			return {x:rotate.x, y:rotate.y, z:rotate.z};
		} else {
			if (x===undefined) var x=rotate.x;
			if (y===undefined) var y=rotate.y;
			if (z===undefined) var z=rotate.z;
			$(this).data('rotate', {x:x,y:y,z:z});
			$(this).setTransformation(undefined, undefined, {x:x,y:y,z:z});
		}
	}
	
	$.fn.rotation = function (z){
		$(this).rotate(undefined, undefined, z);
	}

/* NOT WORKING AND NOT FINISHED
	$.fn.getCurrentRotate = function(){
		if (CSS3D!==undefined && CSS3Matrix!==undefined) {
			var curTrn = $(this).computedStyle()[CSS3TransformProperty];
			var matrix = new CSS3GenerateMatrix(curTrn);

			var currentLoopCount=rotate.z>=0?parseInt(rotate.z/360):-1*parseInt(Math.abs(rotate.z-360)/360);
			console.log(currentLoopCount)
			
			var y=matrix.m12;
			var x=matrix.m11;
			
			var r=undefined;
			if (x==0&&y>0) var r=Math.PI/2;
			if (x==0&&y<0) var r=3*Math.PI/2;
			if (x>0&&y==0) var r=0;
			if (x<0&&y==0) var r=Math.PI;
			
			if (r===undefined) {
				if (x>0&&y>0) r=Math.atan2(y,x);
				if (x<0&&y>0) r=Math.PI-Math.atan2(y,x);
				if (x<0&&y<0) r=Math.PI+Math.atan2(y,x);
				if (x>0&&y<0) r=Math.PI*2+Math.atan2(y,x);
			}
			
			rotate.z=currentLoopCount*360+Math.atan2(y,x)/Math.PI*180;//x=Math.atan2(matrix.m23,matrix.m22);
		} else {
			if ($(this).data('scale')==undefined) {
				$(this).data('scale', {x:1,y:1,z:1});
			}
			var scale=$(this).data('scale');
			var x=scale.x;
			var y=scale.y;
			var z=scale.z;
		}
		return {x:x,y:y,z:z};
	}
*/

	//-- OPACITY -------------------------------------------------------------------------------------------------------------------------------

	getUIDOpacityName = function(obj, q){
		return 'O_'+obj.UID()+'_'+q+'';
	}

	$.fn.opacityDebug = function(){
		var obj=$(this);
		var elm=$(this)[0];
		console.log(elm.id);
		for (var i in obj.data('opacityarray')) {
			console.log("|"+obj.data('opacityarray')[i]+"="+obj.data(obj.data('opacityarray')[i])+"<br/>");
		}
			console.log(elm.id+"|opacityCSS="+obj.data('opacityCSS')+"<br/>");
	}
	
	$.fn.opacityInit = function(queueName){
		var obj=$(this);
		var o=getUIDOpacityName(obj, queueName);
		
		if (obj.data(o)==undefined) {
			if (obj.data('opacityCSS')==undefined) 	obj.data('opacityCSS', parseFloat(obj.css('opacity')) ); // Backup current opacity value for the first time
			if (obj.css('visibility')=='hidden') 	obj.data(o,0);
			else									obj.data(o,1);
			if (obj.data('opacityarray')==undefined) {
				var tmp= new Array();
				obj.data('opacityarray', tmp);
			}
			obj.data('opacityarray').push(o);
		}
	}

	$.fn.opacity = function(value, queueName, setVisibility){
		var obj=$(this);
		var o=getUIDOpacityName(obj, queueName);
		
		obj.opacityInit(queueName); // Init the first time
		if (value==undefined) {
			return obj.data(o);
		} else {
			obj.data(o,value);
			obj.opacitySetRealValues(setVisibility);
		}
	}
	
	$.fn.opacitySetRealValues = function(setVisibility){
		var obj=$(this);
		var finalopc=$(this).opacityGetRealValues();
		if (setVisibility!==false) {
			if (finalopc>0) obj.css('visibility','visible');
			else 			obj.css('visibility','hidden');
		}	
		obj.css('opacity', finalopc);
	}

	$.fn.opacityGetRealValues = function(){
		var obj=$(this);
		
		if (obj.data('opacityarray')!=undefined) {
			var finalopc=1;
			for (var i in obj.data('opacityarray')) {
				finalopc=finalopc*obj.data(obj.data('opacityarray')[i]);
			}
			finalopc=finalopc*obj.data('opacityCSS'); // Get final opacity forced by the one in the CSS stylesheet
		} else {
			finalopc=parseFloat(obj.css('opacity')); // Get final opacity forced by the one in the CSS stylesheet
		}
		return Math.min(finalopc,MAXIMUNOPACITY);
	}

})(jQuery);		

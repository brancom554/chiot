/*! echo-js v1.7.3 | (c) 2016 @toddmotto | https://github.com/toddmotto/echo */
(function (root, factory) {
if (typeof define === 'function' && define.amd) {
define(function() {
return factory(root);
});
} else if (typeof exports === 'object') {
module.exports = factory;
} else {
root.echo = factory(root);
}
})(this, function (root) {
'use strict';
var echo = {};
var callback = function () {};
var offset, poll, delay, useDebounce, unload;
var getClientRect = function(el) {
var rect = el.getBoundingClientRect();
if (rect.left == 0 && rect.right == 0 && rect.top == 0 && rect.bottom == 0) {
if (el.parentNode) rect = el.parentNode.getBoundingClientRect();
}
return rect;
}
var isHidden = function (el, rect) {
function getComputedStyle(el, prop){
if (el.currentStyle) return el.currentStyle[prop];
else return tf.content.document.defaultView.getComputedStyle(el, '')[prop];
}
while (el && el.nodeType === 1) {
if (getComputedStyle(el, 'display') == 'none' || getComputedStyle(el, 'visibility') == 'hidden') {
return true;
}
el = el.parentNode;
if (el.offsetWidth <= 0 && el.offsetHeight <= 0 && !el.getClientRects().length) return true;
}
return false;
};
var inView = function (element, view) {
if (tf.jQuery && $(element).parents('.Index1,.Index2').length > 0 && isHidden(element, box)) {
return false;
}
var box = getClientRect(element);
return (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b);
};
var debounceOrThrottle = function () {
if(!useDebounce && !!poll) {
return;
}
clearTimeout(poll);
poll = setTimeout(function(){
echo.render();
poll = null;
}, delay);
};
echo.init = function (opts) {
opts = opts || {};
var offsetAll = opts.offset || 0;
var offsetVertical = opts.offsetVertical || offsetAll;
var offsetHorizontal = opts.offsetHorizontal || offsetAll;
var optionToInt = function (opt, fallback) {
return parseInt(opt || fallback, 10);
};
offset = {
t: optionToInt(opts.offsetTop, offsetVertical),
b: optionToInt(opts.offsetBottom, offsetVertical),
l: optionToInt(opts.offsetLeft, offsetHorizontal),
r: optionToInt(opts.offsetRight, offsetHorizontal)
};
delay = optionToInt(opts.throttle, 250);
useDebounce = opts.debounce !== false;
unload = !!opts.unload;
callback = opts.callback || callback;
setTimeout(echo.render, 20);
if (document.addEventListener) {
root.addEventListener('load', debounceOrThrottle, false);
root.addEventListener('scroll', debounceOrThrottle, false);
if (document.body) document.body.addEventListener('scroll', debounceOrThrottle, false);
} else {
root.attachEvent('onload', debounceOrThrottle);
root.attachEvent('onscroll', debounceOrThrottle);
if (document.body) document.body.attachEvent('onscroll', debounceOrThrottle);
}
};
echo.render = function () {
var nodes = document.querySelectorAll('img[data-echo], [data-echo-background]');
var length = nodes.length;
if (!length) return;
var src, elem;
var view = {
l: 0 - offset.l,
t: 0 - offset.t,
b: (root.innerHeight || document.documentElement.clientHeight) + offset.b,
r: (root.innerWidth || document.documentElement.clientWidth) + offset.r
};
for (var i = 0; i < length; i++) {
elem = nodes[i];
if (inView(elem, view)) {
if (unload) {
elem.setAttribute('data-echo-placeholder', elem.src);
}
if (elem.getAttribute('data-echo-background') !== null) {
elem.style.backgroundImage = "url(" + elem.getAttribute('data-echo-background') + ")";
}
else {
elem.src = elem.getAttribute('data-echo');
}
if (!unload) {
elem.removeAttribute('data-echo');
elem.removeAttribute('data-echo-background');
}
callback(elem, 'load');
}
else if (unload && !!(src = elem.getAttribute('data-echo-placeholder'))) {
if (elem.getAttribute('data-echo-background') !== null) {
elem.style.backgroundImage = "url(" + src + ")";
}
else {
elem.src = src;
}
elem.removeAttribute('data-echo-placeholder');
callback(elem, 'unload');
}
}
/*if (!length) {
echo.detach();
}*/
};
echo.detach = function () {
if (document.removeEventListener) {
root.removeEventListener('scroll', debounceOrThrottle);
} else {
root.detachEvent('onscroll', debounceOrThrottle);
}
clearTimeout(poll);
};
return echo;
});
// $Revision: 40062 $
// $HeadURL: svn://3d3-p432/ShopFactory/branches/V12_30/bin/SFXTemplates/shared_files/echo.js $

(function($){
$.fn.sfMegaMenu = function(options){
var defaults = {
onLoad: function(){},
onBeforeOpen: function(){},
onAfterOpen: function(){},
onBeforeClose: function(){},
hoverIntentTimeout:500,
/* layout: 'base', 'grid', 'mega' */
layout:'base',
showImages:false,
/* submenuDirection: 'below', 'above', 'right' */
submenuDirection:'below',
subSubmenuDirection:'below',
iconOpenRight:'icon-arrow-right3',
iconOpenDown:'icon-arrow-down3',
iconNoImage:'icon-image',
iconPin:'icon-pushpin',
idxNum: 1,
cloneParentItem: false
};
//call in the default otions
var options = $.extend(defaults, options);
var $sfmmObj = this;
var GCNum = [
{'top':'GC28', 'tophover':'GC29', 'sub':'GC30', 'subhover':'GC31'},
{'top':'GC32', 'tophover':'GC33', 'sub':'GC34', 'subhover':'GC35'}
][options.idxNum-1];
var sfmmSetupLayout = {};
function fixGCRules() {
var newCSSText = '';
for (var n in GCNum) {
var cls = '.'+GCNum[n], oRule = getStyleClass(cls);
if (!oRule) continue;
var cssTextNew = oRule.cssText.replace(/:.*?;/g, ':inherit;')
+ oRule.cssText.replace(cls+', '+cls+' a, a '+cls, cls+','+cls+' > a,a > '+cls);
newCSSText += cssTextNew;
}
$('head').append('<style type="text/css">'+newCSSText+'</style>');
}
var startS=0;
var startR=0;
function getStyleClass(className) {
var ss;
try {
if (d.all) {
for (var s = startS; s < d.styleSheets.length; s++) {
startS = s+1;
// Opera doesn't have this attribute so check for it
if (!d.styleSheets[s].imports||d.styleSheets[s].imports.length==0) continue;
ss=d.styleSheets[s].imports[0];
for(var r=startR; r<ss.rules.length; r++){
startR=r+1;
if(ss.rules[r].selectorText==className||ss.rules[r].selectorText.indexOf(className+',')==0){startS=s;return ss.rules[r];}
}}}
else if(d.getElementById){
for (var s=startS; s<d.styleSheets.length; s++){
startS=s+1;
if(!d.styleSheets[s].cssRules||d.styleSheets[s].cssRules.length==0)continue;
if(d.styleSheets[s].cssRules[0].type!=3)continue;
ss=d.styleSheets[s].cssRules[0].styleSheet;
for (var r=startR; r<ss.cssRules.length; r++){
startR=r+1;
if(ss.cssRules[r].selectorText==className||ss.cssRules[r].selectorText.indexOf(className+',')==0){return ss.cssRules[r];}
}
}
}
}catch(e){return null;}
return null;
}
return $sfmmObj.each(function(){
var hovering = false;
var hoverIntentTimer = null;
function sfmmSetupLayout_Base(showImages){
$sfmmObj.addClass('layout-base '+options.submenuDirection);
if (showImages) $sfmmObj.addClass('show-images');
options.subSubmenuDirection = 'right';
$('> li > ul > li > ul > li > ul',$sfmmObj)
.prev('a')
.append('<i class="'+options.iconOpenDown+' vcenter"></i>')
.parent()
.addClass('has-children')
.find('> ul')
.remove()
;
$('li:not(.see-all) > a',$sfmmObj).each(function(){
if (options.cloneParentItem) {
$(this).parent()
.clone(true).prependTo($(this).next('ul'))
.removeClass('has-children '+GCNum['top']+' '+GCNum['sub']).addClass(GCNum['sub']+' see-all')
.find('a.idx'+options.idxNum)
.removeClass('idx'+options.idxNum+' '+GCNum['top']).addClass('idx'+options.idxNum+'Sub')
.attr({'sf:object': 'idx'+options.idxNum+'Sub', 'id': $(this).attr('id').replace(/(idx\d+)(.*)/, '$1Sub$2')})
.end()
.find('ul,i').remove()
;
if ($(this).next('ul').length > 0) {
$(this).attr('name',$(this).attr('href')).removeAttr('href').css({cursor:'pointer'});
}
}
});
$('> li > a + ul > li > a',$sfmmObj).not('+ ul')
.parent()
.append('<ul class="no-items"></ul>')
;
if (showImages) {
$('> li > a + ul > li > a + ul',$sfmmObj)
.prepend('<div class="image-area"><img class="image-area vcenter" border="0" /><i class="'+options.iconNoImage+' no-image vcenter" /></div>')
;
}
$('> li > a + ul > li > a + ul',$sfmmObj)
.addClass(GCNum['sub'])
.addClass('sfmm-flyout')
.parent().parent()
.addClass('sfmm-dropdown-content')
.wrap('<div class="'+GCNum['sub']+' sfmm-dropdown" style="display:none;" />')
.parent()
.prepend('<i class="pin '+options.iconPin+'" />')
.prev()
.addClass('sfmm-dropdown-trigger')
;
$('> li > a + ul',$sfmmObj)
.addClass('sfmm-dropdown-content')
.wrap('<div class="'+GCNum['sub']+' sfmm-dropdown" />')
.parent()
.prepend('<i class="pin '+options.iconPin+'" />')
.prev()
.addClass('sfmm-dropdown-trigger')
;
$('.sfmm-dropdown-content li > a + ul.no-items',$sfmmObj)
.addClass('is-hidden')
.parent()
.addClass('has-children')
;
$('.sfmm-dropdown-content li > a + ul',$sfmmObj).not('.no-items')
.addClass('is-hidden')
.prev('a')
.append('<i class="'+options.iconOpenRight+' vcenter"></i>')
.parent()
.addClass('has-children')
;
$('.no-items:empty',$sfmmObj).remove();
$('.sfmm-flyout li',$sfmmObj)
.on('mouseover', function(){sfmmMouseover(this);})
.on('mouseout', function(){sfmmMouseout(this);})
;
}
function sfmmSetupLayout_Grid(showImages){
$sfmmObj.addClass('layout-grid '+options.submenuDirection);
if (showImages) $sfmmObj.addClass('show-images');
options.subSubmenuDirection = options.submenuDirection;
$('> li > ul > li > ul',$sfmmObj)
.parent()
.addClass('has-children')
.find('> ul')
.remove()
;
$('li:not(.see-all) > a',$sfmmObj).each(function(){
if ($('> img',this).attr('src')) {
$(this).addClass('thumbnail');
$('> img', this).wrapAll('<div class="thumbnail-inner"></div>');
}
else if ($('> .thumbnail-inner',this).length > 0) {
$(this).addClass('thumbnail');
}
else {
$(this).addClass('thumbnail no-image').find('> img').remove();
}
if (options.cloneParentItem) {
$(this).parent()
.clone(true).prependTo($(this).next('ul'))
.removeClass('has-children '+GCNum['top']).addClass(GCNum['sub']+' see-all')
.find('a.idx'+options.idxNum)
.removeClass('idx'+options.idxNum+' '+GCNum['top']).addClass('idx'+options.idxNum+'Sub')
.attr({'sf:object': 'idx'+options.idxNum+'Sub', 'id': $(this).attr('id').replace(/(idx\d+)(.*)/, '$1Sub$2')})
.end()
.find('ul,i').remove()
;
if ($(this).next('ul').length > 0) {
$(this).attr('name',$(this).attr('href')).removeAttr('href').css({cursor:'pointer'});
}
}
});
$('> li > a + ul',$sfmmObj)
.addClass('sfmm-dropdown-content')
.wrap('<div class="'+GCNum['sub']+' sfmm-dropdown" style="display:none;" />')
.parent()
.prepend('<i class="pin '+options.iconPin+'" />')
.prev()
.addClass('sfmm-dropdown-trigger')
;
$('.sfmm-dropdown-content .no-image',$sfmmObj).prepend('<i class="'+options.iconNoImage+' no-image" />');
$('.sfmm-dropdown-content .thumbnail > span',$sfmmObj).addClass(GCNum['sub'] + ' ellipsis');
$('.sfmm-dropdown-content > li', $sfmmObj)
.addClass('image-container')
.find('img').on('imageLoaded load', function() {
if (tf.utils && tf.utils.equaldiv) tf.utils.equaldiv('image-container');
})
;
}
function sfmmSetupLayout_Mega(showImages){
$sfmmObj.addClass('layout-mega '+options.submenuDirection);
if (showImages) $sfmmObj.addClass('show-images');
options.subSubmenuDirection = options.submenuDirection;
$('> li > ul > li > ul > li > ul',$sfmmObj)
.prev('a')
.append('<i class="'+options.iconOpenDown+' vcenter"></i>')
.parent()
.addClass('has-children')
.find('> ul')
.remove()
;
$('> li:not(.see-all) > a',$sfmmObj).each(function(){
if (options.cloneParentItem) {
$(this).parent()
.clone(true).prependTo($(this).next('ul'))
.removeClass('has-children '+GCNum['top']+' '+GCNum['sub']).addClass(GCNum['sub']+' see-all')
.find('a.idx'+options.idxNum)
.removeClass('idx'+options.idxNum+' '+GCNum['top']).addClass('idx'+options.idxNum+'Sub')
.attr({'sf:object': 'idx'+options.idxNum+'Sub', 'id': $(this).attr('id').replace(/(idx\d+)(.*)/, '$1Sub$2')})
.end()
.find('ul,i').remove()
;
if ($(this).next('ul').length > 0) {
$(this).attr('name',$(this).attr('href')).removeAttr('href').css({cursor:'pointer'});
}
}
});
$('> li > a + ul > li > a',$sfmmObj).not('+ ul')
.parent()
.append('<ul class="no-items"></ul>')
;
$('> li > a + ul > li > a + ul',$sfmmObj)
.addClass(GCNum['sub'])
.addClass('sfmm-flyout')
.parent().parent()
.addClass('sfmm-dropdown-content')
.wrap('<div class="'+GCNum['sub']+' sfmm-dropdown" style="display:none;" />')
.parent()
.prepend('<i class="pin '+options.iconPin+'" />')
.prev()
.addClass('sfmm-dropdown-trigger')
;
$('> li > a + ul',$sfmmObj)
.addClass('sfmm-dropdown-content')
.wrap('<div class="'+GCNum['sub']+' sfmm-dropdown" />')
.parent()
.prepend('<i class="pin '+options.iconPin+'" />')
.prev()
.addClass('sfmm-dropdown-trigger')
;
$('.sfmm-dropdown-content li > a + ul',$sfmmObj).not('.no-items')
.addClass('is-hidden')
.prev('a')
.parent()
.addClass('has-children')
;
if (showImages) {
$('.sfmm-dropdown-content',$sfmmObj)
.after('<div class="image-area"><img class="image-area vcenter" border="0" /><i class="'+options.iconNoImage+' no-image vcenter" /></div>')
;
}
$('.no-items:empty',$sfmmObj).remove();
$('.sfmm-dropdown-content li',$sfmmObj)
.parent()
.addClass('has-children')
.end()
.find('.has-children').parent()
.removeClass('has-children')
;
$('.sfmm-flyout li, .see-all-wrapper > li',$sfmmObj)
.on('mouseover', function(){sfmmMouseover(this);})
.on('mouseout', function(){sfmmMouseout(this);})
;
}
function pin($o) {
if ($o.hasClass('dropdown-is-pinned')) {
$o.removeClass('dropdown-is-pinned');
sfmmDropdownClose($o, $o.next('.sfmm-dropdown'));
}
else {
$('.sfmm-dropdown-trigger.dropdown-is-pinned',$sfmmObj).each(function(){
sfmmDropdownClose($o,$o.next('.sfmm-dropdown'));
});
$o.removeClass('dropdown-is-active');
sfmmActivate($o);
$o.addClass('dropdown-is-pinned');
}
}
(function sfmmSetup() {
//fixGCRules();
switch (options.layout) {
case 'base':
sfmmSetupLayout_Base(options.showImages);
break;
case 'grid':
sfmmSetupLayout_Grid(options.showImages);
break;
case 'mega':
sfmmSetupLayout_Mega(options.showImages);
break;
}
$('.sfmm-dropdown-trigger',$sfmmObj)
.on('click', function(event){
if (options.cloneParentItem) {
event.preventDefault();
pin($(this));
}
})
.find('+ .sfmm-dropdown .pin')
.on('click', function(event){
event.preventDefault();pin($(this).parents('.sfmm-dropdown').siblings('.sfmm-dropdown-trigger'));
})
;
$sfmmObj.menuAim({
activate: function(item) {
clearTimeout(hoverIntentTimer);
var targetItem = $('> a', item);
if (hovering) {
sfmmActivate($(targetItem));
}
else {
hovering = true;
hoverIntentTimer = setTimeout(function(){ sfmmActivate($(targetItem)); }, options.hoverIntentTimeout);
}
},
deactivate: function(item) {
clearTimeout(hoverIntentTimer);
var targetItem = $('> a', item);
if (!$(targetItem).hasClass('dropdown-is-pinned')) {
sfmmDropdownClose($(targetItem),$(targetItem).next('.sfmm-dropdown'));
}
},
exitMenu: function() {
hovering = false;
clearTimeout(hoverIntentTimer);
$('.sfmm-dropdown-trigger.dropdown-is-active',$sfmmObj).not('.dropdown-is-pinned').each(function(){
sfmmDropdownClose($(this),$(this).next('.sfmm-dropdown'));
});
return true;
},
tolerance: 1000,
submenuDirection: options.submenuDirection
});
$('.sfmm-dropdown-content',$sfmmObj).menuAim({
enter: function(row) {
//$('*',row).addClass('is-active').removeClass('fade-out');
sfmmMouseover(row);
},
exit: function(row) {
//$('*',row).removeClass('is-active');
sfmmMouseout(row);
},
activate: function(row) {
if (options.layout == 'base') {
$(row).siblings().children('.is-active').each(function(){sfmmFlyin($(this).parent());});
sfmmFlyout(row, true);
}
},
deactivate: function(row) {
if (options.layout == 'base') {
sfmmFlyin(row, true);
}
},
exitMenu: function() {
clearTimeout(hoverIntentTimer);
sfmmFlyin($('.'+GCNum['subhover'], $sfmmObj));
var continueDefault = ($('.dropdown-is-pinned',$sfmmObj).length == 0);
return continueDefault;
},
rowSelector: '> li, .see-all-wrapper > li',
tolerance: 1000,
submenuDirection: options.subSubmenuDirection
});
$(window).on('resize', function(){
if ($('.dropdown-is-pinned',$sfmmObj).length > 0) {
sfmmFlyout($('.dropdown-is-pinned + .sfmm-dropdown li',$sfmmObj).first(), false);
}
});
options.onLoad.call(this);
})();
function sfmmDropdownOpen(oTrigger, oDD){
if (!oDD) options.onBeforeOpen.call($sfmmObj, oTrigger, oDD);
var anchorClass = $(oTrigger).attr('class');
if (anchorClass) $(oTrigger).attr('class', anchorClass.replace(new RegExp('(idx'+options.idxNum+'(?:Sub)?)( |$)'), '$1Mouseover$2'));
$(oDD).toggleClass('dropdown-is-active', true);
$(oTrigger)
.toggleClass('dropdown-is-active', true)
.parent('li')
.removeClass(GCNum['top']+' '+GCNum['tophover'])
.attr('class', GCNum['tophover'] + ' ' + $(oTrigger).parent('li').attr('class'))
;
$(oDD).css('display','');
var $idxParent = $(oTrigger).parents('#Index'+options.idxNum), h = $idxParent.outerHeight(true) + $(oDD).outerHeight(true) + 10;
if ($('.sfmm-dropdown-trigger.dropdown-is-pinned',$sfmmObj).length == 0) {
$('.flickity-viewport', $idxParent).height(h);
if (options.submenuDirection == 'above') {
$('.flickity-viewport', $idxParent).css('top', -(h - $('.flickity-slider > li', $idxParent).outerHeight(true)));
}
}
if (tf.autoText && tf.autoText.localApply) tf.autoText.localApply($(oTrigger).parent('li').parent());
if (!oDD) options.onAfterOpen.call($sfmmObj, oTrigger, oDD);
}
function sfmmDropdownClose(oTrigger, oDD){
options.onBeforeClose.call(this);
var $idxParent = $(oTrigger).parents('#Index'+options.idxNum);
if ($('.sfmm-dropdown-trigger.dropdown-is-pinned',$sfmmObj).length == 0) {
$('.flickity-viewport', $idxParent).css({'height':'', 'top':''});
}
var anchorClass = $(oTrigger).attr('class');
if (anchorClass) $(oTrigger).attr('class', anchorClass.replace(new RegExp('(idx'+options.idxNum+'(?:Sub)?)Mouseover'), '$1'));
$(oDD).toggleClass('dropdown-is-active', false);
$(oTrigger)
.toggleClass('dropdown-is-active dropdown-is-pinned', false)
.parent('li')
.removeClass(GCNum['top']+' '+GCNum['tophover'])
.attr('class', GCNum['top'] + ' ' + $(oTrigger).parent('li').attr('class'))
;
$(oDD).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
$('.has-children ul',this).addClass('is-hidden');
$('.is-active',$(this).parent()).removeClass('is-active');
});
if (tf.autoText && tf.autoText.localApply) tf.autoText.localApply($(oTrigger).parent('li').parent());
}
function sfmmFlyout(row, mouseover){
if ($(row).length == 0) return;
if (!mouseover) options.onBeforeOpen.call($sfmmObj, row, mouseover);
var dropdown = $(row).parents('.sfmm-dropdown');
if (tf.echo) tf.echo.render();
var flyout = $('.sfmm-flyout', $(row));
$(flyout).height('auto');
$(dropdown).css({'height':'auto', 'left':'auto', 'max-width':'none'});
var pinWidth = $('.pin', dropdown).outerWidth(true);
if (options.submenuDirection == 'below' || options.submenuDirection == 'above') {
var maxReferenceWidth = $('#WebSiteContent, #Content').outerWidth();
var $idxParent = $(row).parents('#Index'+options.idxNum);
if ($('.flickity-enabled', $idxParent).length > 0) maxReferenceWidth -= ($idxParent.width() - $('.flickity-enabled', $idxParent).width() + 5);
var offsetParent = $idxParent;
if ($(offsetParent).width() != $(offsetParent).parent().width()) {
offsetParent = $(offsetParent).offsetParent();
}
var rightEdge = $('#WebSiteContent, #Content').offset().left + maxReferenceWidth;
var dropdownOffset = $(dropdown).offset(), dropdownWidth = $(dropdown).outerWidth(), flyoutWidth = $(flyout).outerWidth();
if (options.layout == 'grid') {
var $container = $(dropdown), $items = $('.sfmm-dropdown-content > li', $container);
var outerSpace = $items.outerWidth() - $items.width() + parseFloat($items.css('margin-left')) + parseFloat($items.css('margin-right'));
var minColumns = 3, maxColumns = 6, itemMinWidth = 140 + outerSpace, w = 0;
var maxAvailableWidth = ($items.length > maxColumns ? maxReferenceWidth : rightEdge - dropdownOffset['left']) - pinWidth;
if (maxAvailableWidth < (minColumns * itemMinWidth)) maxAvailableWidth = maxReferenceWidth;
for (var n = maxColumns; n >= minColumns; n--) {
w = (maxAvailableWidth / n) - outerSpace;
if (w >= itemMinWidth) break;
}
w += outerSpace;
if (n < $items.length && $items.length < maxColumns) {
n = $items.length;
}
$items.width(w - outerSpace)
.find('.thumbnail').css({'width':'auto'})
;
flyoutWidth = 0;
dropdownWidth = (w * Math.min(n, $items.length)) + pinWidth;
$container.width(dropdownWidth);
}
if (options.layout == 'mega') {
var $container = $(dropdown), $items = $('.sfmm-dropdown-content > li', $container);
var outerSpace = $items.outerWidth(true) - $items.width();
var imageAreaWidth = 0;
if (($('div.image-area', dropdown).css('display')||'').indexOf('inline') != -1 || ($('div.image-area', dropdown).css('float')||'') == 'right') {
imageAreaWidth = $('div.image-area', dropdown).outerWidth(true);
}
var maxOuterSpace = ($('.sfmm-dropdown-content', dropdown).outerWidth(true) - $('.sfmm-dropdown-content', dropdown).width());
var maxAvailableWidth = rightEdge - dropdownOffset['left'] - imageAreaWidth - maxOuterSpace;
var minColumns = 3, maxColumns = 6, itemMinWidth = 150 + outerSpace, w = 0;
for (var n = maxColumns; n >= minColumns; n--) {
w = parseInt((maxAvailableWidth / n) - outerSpace);
if (w >= itemMinWidth) break;
}
if (n < minColumns) {
n = minColumns;
w = itemMinWidth;
}
$items.width(w);
flyoutWidth = 0;
dropdownWidth = (w + outerSpace) * Math.min(n, $items.length) + imageAreaWidth + maxOuterSpace;
$container.width(dropdownWidth);
}
if (dropdownOffset && (dropdownOffset['left'] + dropdownWidth + flyoutWidth >= rightEdge)) {
if (options.layout == 'grid') {
dropdownOffset['left'] = rightEdge - flyoutWidth - dropdownWidth;
}
else {
dropdownOffset['left'] = Math.max(rightEdge - flyoutWidth - dropdownWidth, $(offsetParent).offset().left + parseInt($(offsetParent).css('padding-left')));
}
dropdownOffset['top'] = '100%';
$(dropdown).offset(dropdownOffset);
$(dropdown).css('max-width', maxReferenceWidth);
}
}
else {
var rowParent = $(row).parents('li');
var rowOffset = $(rowParent).offset(), rowWidth = $(rowParent).outerWidth();
rowOffset['left'] += (rowWidth - 1);
$(dropdown).offset(rowOffset);
if (options.layout == 'mega') {
var $container = $(dropdown), $items = $('.sfmm-dropdown-content > li', $container);
var outerSpace = $items.outerWidth(true) - $items.width();
var imageAreaWidth = 0;
if (($('div.image-area', dropdown).css('display')||'').indexOf('inline') != -1) {
imageAreaWidth = $('div.image-area', dropdown).outerWidth(true);
}
var maxOuterSpace = ($('.sfmm-dropdown-content', dropdown).outerWidth(true) - $('.sfmm-dropdown-content', dropdown).width());
var maxAvailableWidth = $('#Content').width() - imageAreaWidth - maxOuterSpace;
if ($(dropdown).parents('#Content').length > 0) {
if ($(dropdown).parents('#SideBar_L').length > 0) maxAvailableWidth -= $(dropdown).parents('#SideBar_L').outerWidth(true);
else maxAvailableWidth -= $(dropdown).offsetParent().outerWidth(true);
}
var maxColumns = 5, itemMaxWidth = (1170 / maxColumns), w = 0;
for (var n = 1; n <= maxColumns; n++) {
w = parseInt((maxAvailableWidth / n) - outerSpace);
if (w <= itemMaxWidth) break;
}
$items.width(w);
$container.width((w + outerSpace) * Math.min(n, $items.length) + imageAreaWidth + maxOuterSpace);
}
if (options.layout == 'grid') {
var w = pinWidth + $('> ul', dropdown).children().outerWidth(true) * $('> ul', dropdown).children().length + ($(dropdown).outerWidth(true) - $(dropdown).width());
$(dropdown).width(w);
var wMax = $(dropdown).parents('[id^=WebSite]').width() - rowWidth - pinWidth;
wMax = $('li',dropdown).first().outerWidth(true) * parseInt(wMax / $('li',dropdown).first().outerWidth(true)) + pinWidth + 1;
w = Math.min(w, wMax);
$(dropdown).width(w);
$(dropdown).css({'max-width':w});
}
}
if (mouseover) $('*',row).addClass('is-active').removeClass('fade-out');
if ($('.sfmm-dropdown-content .fade-in',$sfmmObj).length == 0 ) $(row).children('ul').addClass('fade-in');
var mh = Math.max($(dropdown).outerHeight(), $('.sfmm-flyout', $(row)).height());
if (options.layout == 'base') {
$(dropdown).height(mh);
$(flyout).height(mh);
}
if (options.submenuDirection == 'above') {
$(dropdown).css('top', -mh);
}
if (mouseover) sfmmMouseover(row);
if (!mouseover) options.onAfterOpen.call($sfmmObj, row, mouseover);
}
function sfmmFlyin(row){
options.onBeforeClose.call(this);
$('*',row).removeClass('is-active');
sfmmMouseout(row);
}
function sfmmMouseover(row){
var srcImg = $('> a > img', row), hasImg = (!!srcImg.attr('src') || !!srcImg.attr('data-echo')), src = srcImg.data('echo') || srcImg.attr('src');
if (tf.isEntryPage && src) src = src.replace(/\.\.\/media\//g,(tf.lang!=tf.baseLang?'../':'')+'contents/media/');
$(row).siblings('div.image-area').add($('> ul div.image-area', row)).add($(row).parents('.sfmm-dropdown-content').siblings('div.image-area')).find('img.image-area')
.attr({'src':src, 'title':srcImg.attr('title'), 'alt':srcImg.attr('alt')})
.css('display', hasImg ? 'block' : 'none')
.next('.no-image')
.css('display', hasImg ? 'none' : 'block')
;
$('img.image-area', row).each(function(){
if (!$(this).attr('src')) $(this).hide(); else $(this).show();
});
if ($(row).hasClass(GCNum['sub'])) {
$(row).removeClass(GCNum['sub']).attr('class', GCNum['subhover'] + ' ' + $(row).attr('class'));
}
var $anchor = $('> a[class^=idx'+options.idxNum+']', row), anchorClass = $anchor.attr('class');
if (anchorClass) $anchor.attr('class', anchorClass.replace(new RegExp('(idx'+options.idxNum+'(?:Sub)?)( |$)'), '$1Mouseover$2'));
if (tf.autoText && tf.autoText.localApply) tf.autoText.localApply($(row).parent());
}
function sfmmMouseout(row){
$('.no-image', row).show();
if ($(row).hasClass(GCNum['subhover'])) {
$(row).removeClass(GCNum['subhover']).attr('class', GCNum['sub'] + ' ' + $(row).attr('class'));
}
var $anchor = $('> a[class^=idx'+options.idxNum+']', row), anchorClass = $anchor.attr('class');
if (anchorClass) $anchor.attr('class', anchorClass.replace(new RegExp('(idx'+options.idxNum+'(?:Sub)?)Mouseover'), '$1'));
if (tf.autoText && tf.autoText.localApply) tf.autoText.localApply($(row).parent());
}
function sfmmActivate(item) {
if (!$(item).hasClass('dropdown-is-active')) {
if ($('.dropdown-is-pinned',$sfmmObj).length > 0) {
sfmmDropdownOpen($(item), null);
}
else {
sfmmDropdownOpen($(item), $(item).next('.sfmm-dropdown'));
sfmmFlyout($(item).next('.sfmm-dropdown').find('li:first'), options.layout == 'base');
}
}
}
});
};
})(jQuery);
// $Revision: 42065 $
// $HeadURL: svn://3d3-p432/ShopFactory/branches/V14_50/bin/SFXTemplates/shared_files/jquery.megamenu.js $

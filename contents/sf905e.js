// <script>
var tf=tf||this,LD=tf,tfc=tf.content||this,tfcd=tfc.document,$=tfc.$;
if(tf.isInSF()){
var wx=window.external,arrLoad=[];
function addEvent(e,f,t){if(!t)var t=window;if (t.addEventListener)t.addEventListener(e.replace(/^on/,''),f,false);else if (t.attachEvent)t.attachEvent(e,f);}
}
var isIEBefore7=parseFloat(navigator.appVersion.split('MSIE')[1])<7;
if ($) { (function($) { $.support.placeholder = ('placeholder' in document.createElement('input')); })(jQuery); }
var prpgmap={
pgMap:{},
prMap:{},
requested:{},
loaded:{},
onloadPgMap:function(oResp,fn){
tf.merge(this.pgMap,tf.sfJSON.parse(oResp.req.responseText));
if(fn)fn.call(this);
},
onloadPrMap:function(oResp,fn){
tf.merge(this.prMap,tf.sfJSON.parse(oResp.req.responseText));
if(fn)fn.call(this);
},
getParentPage:function(prid,pgid,fn){
if(!pgid){pgid=tf.content.pgid;}
pgid=pgid.toLowerCase();
prid=prid.toLowerCase();
var pridNum=parseInt(prid.substr(1)),pgidNum=parseInt(pgid.substr(1)),pgidFound=0;
if(pgid.indexOf('/'+tf.enterFilename)!=-1)pgidNum=-2;
var prmapURL='prpgmap/prmap_'+Math.floor(pridNum/2000)+'.js';
if(isNaN(pridNum)||this.prMap[pridNum]){
if(isNaN(pridNum))pgidFound=pgidNum;
else {
var a=this.prMap[pridNum];
if(typeof(a.length)=='number'&&typeof(a)!='string'){
pgidFound=a[0];
for(var n=1,num=a.length;n<num;n++){
if(a[n]==pgidNum||a[n].toString().indexOf(pgidNum+'_')==0){
pgidFound=a[n];
break;
}
}
}
else pgidFound=a;
}
var pgidSplit=(isNaN(pgidFound)?pgidFound.split('_'):[pgidFound]);
if(typeof(this.pgMap[pgidSplit[0]])!='undefined'){
var s=this.pgMap[pgidSplit[0]], internalURL=((s==''||s.indexOf('_')==0)||unescape(s).indexOf('://')==-1),specialPage=(parseInt(pgidSplit[0])<0&&parseInt(pgidSplit[0])>-10000);
if(parseInt(pgidSplit[0])==-2&&pgid.indexOf('/'+tf.enterFilename)!=-1)s=tf.enterFilename.replace(/\.[^.]*$/,'');
var f=(internalURL&&!specialPage?'d'+pgidSplit[0]:'')+s+(pgidSplit[1]?'_'+pgidSplit[1]:'')+(internalURL||(specialPage&&internalURL)?'.html':'');
return fn(f,prid,'d'+pgidSplit[0]);
}
else{
var pgmapURL='prpgmap/pgmap_'+Math.floor(Math.abs(pgidSplit[0])/2000)+'.js';
if(!tf.utils.prpgmap.requested[pgmapURL]){
tf.utils.prpgmap.requested[pgmapURL]=true;
new net.ContentLoader(
tf.wm.url(pgmapURL,'-'),
function(){tf.utils.prpgmap.onloadPgMap.call(tf.utils.prpgmap,this,function(){this.loaded[pgmapURL]=true;this.getParentPage(prid,pgid,fn);});},
null, null, 'GET', '');
}
else if(tf.utils.prpgmap.loaded[pgmapURL])return fn('',prid,pgid);
else setTimeout(function(){tf.utils.prpgmap.getParentPage(prid,pgid,fn)},0);
}
}
else{
if(!tf.utils.prpgmap.requested[prmapURL]){
tf.utils.prpgmap.requested[prmapURL]=true;
new net.ContentLoader(
tf.wm.url(prmapURL,'-'),
function(){tf.utils.prpgmap.onloadPrMap.call(tf.utils.prpgmap,this,function(){this.loaded[prmapURL]=true;this.getParentPage(prid,pgid,fn);});},
null, null, 'GET', '');
}
else if(tf.utils.prpgmap.loaded[prmapURL])return fn('',prid,pgid);
else setTimeout(function(){tf.utils.prpgmap.getParentPage(prid,pgid,fn)},0);
}
}
};
if ($) {
var mobileMenusLoaded = false;
function loadMobileMenu() {
$('.idx-menu').each(function(){
var o = $(this);
$.get(tf.wm.url(o.data('deptid')+'.html','-',true),function(data){
o.html(data.replace(/<img[^>]*?>/g,''));
if(o.data('branchid')){
$('> ul:first',o).replaceWith($('[id^=idx][id$='+o.data('branchid')+']',o).next('ul'));
}
o.find('.idx1List,.idx1,.idx2List,.idx2').removeClass('idx1List idx1 idx2List idx2');
if(o.data('folding')!==false){
o.find('li a').each(function(){
$(this).parent().clone(true).prependTo($(this).next('ul')).find('ul,i').remove();
if ($(this).next('ul').length > 0) {
$(this)
.attr('name',$(this).attr('href'))
.click(function(event){
event.preventDefault();
event.stopPropagation();
return true;
})
;
}
});
}
if(tf.isEntryPage){
o.find('a[href]').not('a[href^=http]').each(function(){
if(this.id.match(/D-2$/)) this.href=tf.wm.url((tf.lang==tf.baseLang?'../../':'../../'+tf.lang+'/')+this.href.replace(/.*\//,''),'-');
else this.href=tf.wm.url(this.href.replace(/.*\//,''),'-',true);
});
}
o.find('a[href]').each(function(){
if(o.data('folding')!==false){
if($(this).next('ul').get(0)) $(this).append('<i class="icon-arrow-down3"></i>');
}
});
$('#Index1 #idx1D-2').parents('body').find('#idx2D-2', o).parent('li').remove();
$('#Index2 #idx2D-2').parents('body').find('#idx1D-2', o).parent('li').remove();
o.find('[class^=GC]').each(function(){this.className=this.className.replace(/GC\d+ ?/,'');});
o.find('li a:has(i)').click(function(event){
event.preventDefault();
event.stopPropagation();
if (!$(this).hasClass('active')){
if (!$(this).parents('ul').prev().hasClass('active')) {
$('li ul', o).slideUp('fast');
$('li a', o).removeClass('active')
;
}
$(this)
.addClass('GC32 active').next().slideToggle('fast')
.end()
;
}
else {
$(this)
.removeClass('GC32 active').next().slideToggle('fast')
.end()
;
}
});
o.find('li a').not(':has(i)')
.removeClass('idx1 idx1Sub idx2 idx2Sub')
.click(function(event){
$.sidr('close','Sidemap');
});
o.find('[id$='+tf.pgid+']').addClass('selected').parents('ul').prev().find('i').click();
mobileMenusLoaded = true;
o.trigger('load');
});
});
}
$(document).ready(function(){
$(document).on('keypress', 'input.prd_qty', function(e){
if(e.which==13){
e.preventDefault();
e.stopPropagation();
$(this).parents('.product').find('.calculate').click();
}
});
$('.ProductQuantity > input[id*=_Quantity]').on('keypress', function(e){
if(e.which==13){
e.preventDefault();
e.stopPropagation();
$(this).parents('.Product').find('.AddToBasketButton,.AddToBasketButton > *').click();
}
});
function applysidr() {
if(!$('#sidemap-button').sidr) {setTimeout(applysidr,100); return;}
$('#sidemap-button').sidr({ name:'Sidemap', displace:false,
onOpen:function() {
if (mobileMenusLoaded) $('.idx-menu').trigger('load'); else loadMobileMenu();
$('html').css('overflow-x','');
},
onOpenEnd:function() {
mobile_fallbackColours();
}
});
}
applysidr();
$('#sidemap-button').click(function(e){
e.preventDefault();
e.stopPropagation();
$('#Sidemap').css('visibility','visible').animate({'left':'0'});
$.sidr('open', 'Sidemap');
});
$('#sidemap-close').click(function(e){
e.preventDefault();
e.stopPropagation();
$.sidr('close','Sidemap');
return false;
});
function mobile_fallbackColours(){
$('.header.mobile,.footer.mobile,#Sidemap').each(function(){
var GC=this.className.replace(/.*(GC\d+).*/,'$1');
if($(this).css('background-color')=='transparent'||$(this).css('background-color')=='rgba(0, 0, 0, 0)'){
$(this).css('background-color',tf.autoText.lightText);
}
if($(this).css('color')==$(this).css('background-color')||typeof(tf.autoText.GCUsesAutoText[GC])=='undefined'){
$(this).add('*',this).css('color',tf.autoText.isColorDark(tf.content.document,this)?tf.autoText.lightText:tf.autoText.darkText);
}
});
}
mobile_fallbackColours();
$('#gototop-button').click(function(e){
e.preventDefault();
tf.content.document.body.scrollTop = 0;
tf.content.document.documentElement.scrollTop = 0;
return false;
});
showMobileUtils = function(){
$(window).scroll(function(){
if ($(window).scrollTop() >= 50) {
$('.utils.group').addClass('fixed-header');
$('.utils.group').addClass('visible-title');
}
else {
$('.utils.group').removeClass('fixed-header');
$('.utils.group').removeClass('visible-title');
}
});
};
retractMobileUtils = function() {
if ($('.header.mobile:visible').length == 0) return;
if ($('#mobile_search input:focus').length > 0) return;
if ($(tf.content).height() >= $(tf.content.document).height()) return;
if (($(tf.content).scrollTop() == 0) || ($(tf.content).scrollTop() + $(tf.content).height() >= $(tf.content.document).height() - $('.footer.mobile:visible').height())) {
$('html').css({'margin-top':0, 'margin-bottom':0});
}
$('.header.mobile:visible').css({top:-($('.header.mobile:visible').height())}, 'fast', 'swing', function(){$(tf.content).bind('scroll', showMobileUtils)});
$('.footer.mobile:visible').css({bottom:-($('.footer.mobile:visible').height())}, 'fast');
$(tf.content).data({'mobile-utils-scrolltop':$(tf.content).scrollTop()});
}
$(tf.content).data({'mobile-utils-scrolltop':$(tf.content).scrollTop()}).bind({'scroll resize':showMobileUtils});
$('#sidemap-close').click(showMobileUtils);
});
}
var tmplParser = {
parse:function(tmplName, vars) {
var el=(typeof(tmplName)=='string'?tf.extra.document.getElementById(tmplName):tmplName);
if(!el)return false;
var result=el.innerHTML.replace('<!--','').replace('-->','').replace('<![CDATA[','').replace(']]>','');
if(vars){
for(var param in vars){
var reg=eval('/__'+param+'__(?:="")?/gi'),val=new String(vars[param]);
result=result.replace(reg, val.replace(/\$/g,'&#36;'));
}
}
var reg = /__(LD_.+?)__/g;
result = result.replace(reg,
function($0, $1) {
var str = eval('tf.'+$1);
if (str) return str;
else return $1;
}
);
return result;
}
};
var sfMediaBox={
closeBox:function(redirectTo){
this.unrender('sfLightBox');
this.unrender('sfLightBoxOverlay');
this.showDropDowns(true);
tfc.document.body.style.overflow='';
tfc.document.documentElement.style.overflow='';
tfcd.body.className=tfcd.body.className.replace(' mobileBox','');
tf.delEvent('onkeydown',this.keyHandler,tfcd.body);
tf.delEvent('onresize',this.centerBox);
if(this.fnAfterClose)this.fnAfterClose();
if(typeof redirectTo === "string") {
tf.wm.rld(tf.content,redirectTo,'-',1);
}
},
centerBox:function(o,custW,custH){
var meme=tf.utils.sfMediaBox;
if(custW)meme.cacheW=custW;
if(custH)meme.cacheH=custH;
var w=tf.innerWidth,h=tf.innerHeight;
var elLB=gl('sfLightBox');
if(elLB){
if(tf.isMobile_SmallLandscape||tf.isMobile_SmallPortrait||tf.isMobile_Small||tf.isMobile_LargePortrait){
if(tfcd.body.className.indexOf('mobileBox')==-1)tfcd.body.className+=' mobileBox';
elLB.style.marginLeft=(-w/2)+'px';
elLB.style.marginTop=(-h/2)+'px';
w-=(parseInt(elLB.style.paddingLeft)+parseInt(elLB.style.paddingRight));
h-=(parseInt(elLB.style.paddingTop)+parseInt(elLB.style.paddingBottom));
if(meme.useOffsetTop)h-=24;
}
else{
tfcd.body.className=tfcd.body.className.replace(' mobileBox','');
var rc=elLB.getBoundingClientRect(),rc2=gl('sfLightBoxTopBar').getBoundingClientRect();
var padh=(parseInt(elLB.style.paddingTop)+parseInt(elLB.style.paddingBottom));
w=meme.getVirtualWidth(meme.cacheW);
h=meme.getVirtualHeight(meme.cacheH);
var sflbc=gl('sfLightBoxContents');
sflbc.style.overflowX='';
sflbc.style.overflowY='';
if(rc2.width>0&&rc2.height>0){
if(meme.cacheH<=(rc.height-rc2.height-((rc2.top-rc.top)*2))) {
if(meme.cacheH>=sflbc.scrollHeight)sflbc.style.overflowY='hidden';
}
else w+=22;
if(meme.cacheW<=rc2.width){}// sflbc.style.overflowX='hidden';
else h+=22;
}
elLB.style.marginLeft=(-w/2)+'px';
elLB.style.marginTop=((-(h+(rc2.bottom-rc2.top)+padh))/2)+'px';
}
var IDs={'sfLightBoxBody':[w+'px',null],'sfLightBoxContents':[w+'px',h+'px'],'sfLightBoxLoading':[w+'px',h+'px'],'sfPopupFrame':[w+'px',h+'px']};
for(var n in IDs){
var el=gl(n);
if(el){
if(IDs[n][0]!=null)el.style.width=IDs[n][0];
if(IDs[n][1]!=null)el.style.height=IDs[n][1];
}
}
IDs=['sfLightBoxNavLeft','sfLightBoxNavRight'];
for(var n=0;n<IDs.length;n++){
var el=gl(IDs[n]);
if(el){
el.style.height=h+'px';
}
}
}
},
hide:function(id){ if(gl(id))gl(id).style.display='none'; },
show:function(id){ if(gl(id))gl(id).style.display='block'; },
showDropDowns:function(show){
function looper(a,show){
for(var i=0,num=a.length;i<num;i++){
a[i].style.visibility=(show?'visible':'hidden');
}
}
if(tf.isIE6)looper(tfcd.getElementsByTagName('SELECT'),show);
looper(tfcd.getElementsByTagName('OBJECT'),show);
looper(tfcd.getElementsByTagName('EMBED'),show);
looper(tfcd.getElementsByTagName('IFRAME'),show);
},
content_onload:function(o){
var $el2=$(o).parents('#sfLightBoxContents'),oi1=o.getAttribute('index'),oi2=$el2.attr('index');
if(oi1!=oi2)return;
if(o.width==0||o.height==0)return;
$el2.parent().find('#sfLightBoxLoading').hide();
},
render:function(o,a,isMM){
var el=tfcd.createElement('div');
el.innerHTML=(typeof(a)=='function'?a(o):a);
for(var i=0,num=el.childNodes.length;i<num;i++){
if(tf.isIE&&!el.childNodes[0].style){el.removeChild(el.childNodes[0]);continue;}
if(tf.isIE&&isMM)el.childNodes[0].style.visibility='hidden';
var elNew=o.tfcdb().appendChild(el.childNodes[0]);
if(tf.isIE6&&elNew.currentStyle.position=='fixed')elNew.style.position='absolute';
if(tf.isIE&&isMM)setTimeout(function(){elNew.style.visibility='visible';},20);
}
},
unrender:function(id){ var el=gl(id); if(el)el.parentNode.removeChild(el); },
scale:function(mW, mH, cW, cH){
if(cW<mW&&cH<mH)return[cW,cH];
var r=cH/cW,cx=mW,cy=parseInt((mW*r)+0.5);
if(cy>mH){ r=cW/cH; cx=parseInt((mH*r)+0.5); cy=mH; }
return [cx,cy];
},
getVirtualWidth:function(w){ return Math.max(100,Math.min(w,tf.innerWidth * 0.9)); },
getVirtualHeight:function(h){ return Math.max(100,Math.min(h,tf.innerHeight * 0.85)) + 5; },
mw:-1,
mh:-1,
useOffsetTop:true,
useLargestSize:true,
gl:function(s){try{return tf.extra.document.getElementById(s);}catch(e){return null;}},
fnAfterClose:null,
tfcdb:function(){return (tf.isSafari?tfcd.documentElement:tfcd.body);},
relPrefix:(tf.isEntryPage?(tf.lang!=tf.baseLang?'../':'')+'contents/':'../'),
close_onclick:'tf.utils.sfMediaBox.closeBox();return false;',
prevnext_onmouseover:function(el,dir){
el.style.backgroundImage='url('+(tf.isEntryPage?(tf.lang!=tf.baseLang?'../':'')+'contents/':'../')+'media/mediabox_large_'+dir+'.png)';
},
prevnext_onmouseout:function(el){
el.style.backgroundImage='url('+(tf.isEntryPage?(tf.lang!=tf.baseLang?'../':'')+'contents/':'../')+'media/trans.gif)';
},
aHTML:[
function(o){ return tmplParser.parse(o.gl('tmplSFLightBoxOverlay'), { height:'100%', close_onclick:o.close_onclick, className:'', contents:'' }); },
function(o){ return tmplParser.parse(o.gl('tmplSFLightBox'), o.data); }
],
aRef:[],
aPrefetch:[],
hasTitle:false,
hasDescription:false,
currIdx:-1,
onMobile:tf.isMobile,
cacheW:-1,
cacheH:-1,
useFlickity:true,
keyHandler:function(evt){
var me=tf.utils.sfMediaBox;
switch(evt.keyCode){
case 27: me.closeBox(); break;
case 37: me.showContents(me.currIdx==0?me.aRef.length-1:me.currIdx-1); break;
case 39: me.showContents(me.currIdx==me.aRef.length-1?0:me.currIdx+1); break;
}
},
init:function(names,jumptoid){
this.closeBox();
this.fnAfterClose=null;
this.aRef=[];
this.aPrefetch=[];
this.mw=this.mh=-1;
var a=tfcd.querySelectorAll('a[rel^=sfMediaBox]'),jumptoidx=0;
for(var m=0,mm=names.length;m<mm;m++){
for(var n in a){
if(a[n].rel=='sfMediaBox['+names[m]+']'&&a[n].href!=unescape(tf.wm.host)){
this.aRef.push(a[n]);
if(a[n].title)this.hasTitle=true;
if(a[n].getAttribute('description'))this.hasDescription=true;
if(a[n].id==jumptoid)jumptoidx=this.aRef.length-1;
if(this.useLargestSize){
var mw=parseInt(a[n].getAttribute('mw')),mh=parseInt(a[n].getAttribute('mh'));
if(mw>this.mw)this.mw=mw;
if(mh>this.mh)this.mh=mh;
}
}
}
}
if(this.aRef.length>0 && this.aRef[0].mediaType!='MM'){
this.render(this, this.aHTML[0]);
var me=this;
this.aPrefetch[jumptoidx]=new Image();
this.aPrefetch[jumptoidx].onload=function(){
this.loaded=true;
if(me.aRef.length==1){
me.showContents(jumptoidx);
tf.addEvent('onkeydown',me.keyHandler,tfcd.body);
}
if(!me.useFlickity){
for(var n=0,nn=me.aRef.length;n<nn;n++){
if(!me.aPrefetch[n]){
var img=new Image();
img.loaded=false;
img.onload=function(){this.loaded=true;}
img.src=me.aRef[n].href;
me.aPrefetch[n]=img;
}
}
}
}
this.aPrefetch[jumptoidx].src=this.aRef[jumptoidx].href;
if(me.aRef.length>1){
this.showContents(jumptoidx);
tf.addEvent('onkeydown',this.keyHandler,tfcd.body);
}
}
},
showContents:function(n){
this.currIdx=n;
var el=gl('sfLightBox');if(el)el.parentNode.removeChild(el);
var o=this.aPrefetch[n],oo=this.aRef[n];
if(!o){this.aPrefetch[0].onload();o=this.aPrefetch[n];}
var type=oo.getAttribute('mediaType'),isMM=(type=='MM'),isHTML=(type=='HTML'),w=o.width,h=o.height;
if(isMM){w=oo.getAttribute('mw');h=oo.getAttribute('mh');}
if(this.useLargestSize&&this.mw>-1&&this.mh>-1){w=this.mw;h=this.mh;}
var vw=this.getVirtualWidth(w), vh=this.getVirtualHeight(h);
this.cacheW=w;this.cacheH=h;
this.useOffsetTop=true;
this.data={
navdisplay:(this.aRef.length>1?'block':'none'), captiondisplay:oo.title||oo.getAttribute('description')?'block':'none', relprefix:this.relPrefix,
close_onclick:this.close_onclick,
prev_visible:(this.aRef.length==1?'hidden':'visible'), next_visible:(this.aRef.length==1?'hidden':'visible'),
count:this.aRef.length, index:n+1,
prev_onclick:'tf.utils.sfMediaBox.showContents('+(n==0?this.aRef.length-1:n-1)+');return false;',
next_onclick:'tf.utils.sfMediaBox.showContents('+(n==this.aRef.length-1?0:n+1)+');return false;',
prev_onmouseover:'tf.utils.sfMediaBox.prevnext_onmouseover(this,\'left\');',
prev_onmouseout:'tf.utils.sfMediaBox.prevnext_onmouseout(this);',
next_onmouseover:'tf.utils.sfMediaBox.prevnext_onmouseover(this,\'right\');',
next_onmouseout:'tf.utils.sfMediaBox.prevnext_onmouseout(this);',
width:vw+'px', height:vh+'px',
overflow:'auto',
title:(oo.title?oo.title:(this.hasTitle?'&nbsp;':'')), description:(oo.getAttribute('description')?oo.getAttribute('description'):(this.hasDescription?'&nbsp;':'')),
loadingdisplay:(o.loaded||isMM||isHTML?'none':'block'),loadingmessage:'',
position:'fixed',
marginleft:(-vw/2+this.tfcdb().scrollLeft)+'px', margintop:(-vh/2+this.tfcdb().scrollTop)+'px',
decorationborder:'5px',
className:'',
imagecontrols:'',
contents:''
};
if(this.useFlickity){
for(var i=0;i<this.aRef.length;i++){
var _o=this.aPrefetch[i],_oo=this.aRef[i];
var type=_oo.getAttribute('mediaType'),isMM=(type=='MM'),isHTML=(type=='HTML'),w=0,h=0;
if(!_o){
var img=null;
if(!isMM&&!isHTML){
img=new Image();
img.loaded=false;
img.onload=function(){this.loaded=true;}
img.src=this.aRef[i].href;
}
this.aPrefetch[i]=img;
if(this.aPrefetch[i])this.aPrefetch[i].onload();
_o=this.aPrefetch[i];
}
if(!isMM&&!isHTML){w=_o.width;h=_o.height;}
if(isMM){w=_oo.getAttribute('mw');h=_oo.getAttribute('mh');}
this.data['captiondisplay']=_oo.title||_oo.getAttribute('description')?'block':'none';
this.data['title']=(_oo.title?_oo.title:(this.hasTitle?'&nbsp;':''));
this.data['description']=(_oo.getAttribute('description')?_oo.getAttribute('description'):(this.hasDescription?'&nbsp;':''));
this.data['loadingdisplay']=(isMM||isHTML||_o.loaded?'none':'block');
this.data['contents']+=tmplParser.parse(this.gl('tmplSFLightBoxFlickityItem'),
{
code:(isMM?this.getMMHTML(_oo.id,_oo.href,_oo.getAttribute('filetype'),w,h,_oo.title):
(isHTML
?this.getMMHTMLUsingExtraction(_oo.id,unescapeUTF8(_oo.getAttribute('href')),vw,vh)
:'<img src="'+_o.src+'" class="slide-item" '+(vw<w?'width="100%"':'')+' index="'+(i+1)+'" border="0" onload="'+(_o.loaded?'':'tf.utils.sfMediaBox.content_onload(this);')+'" />'
)
),
title:this.data['title'],
description:this.data['description']
}
);
}
this.data['title']='';
this.data['description']='';
this.data['contents']=tmplParser.parse(this.gl('tmplSFLightBoxFlickity'), this.data);
}
else{
this.data['contents']=(isMM?
this.getMMHTML(oo.id,oo.href,oo.getAttribute('filetype'),w,h,oo.title):
(isHTML?
this.getMMHTMLUsingExtraction(oo.id,oo.href,vw,vh):
tmplParser.parse(this.gl('tmplSFLightBoxImage'),
{ wh:'height:'+vh+'px;', src:o.src, wide:(vw<w)?'width="100%"' : '', index:n+1, onload:(o.loaded?'':'tf.utils.sfMediaBox.content_onload(this);') }
)
)
);
this.data['imagecontrols']=tmplParser.parse(this.gl('tmplSFLightBoxImageControls'), this.data);
}
this.showDropDowns(false);
this.render(this, this.aHTML[1], isMM);
this.centerBox();
tf.$(tfc).on('resize',this.centerBox);
tfc.document.body.style.overflow='hidden';
if(this.useFlickity){
var $=tf.$;
var $lightBoxCarousel = $('.LightBoxCarousel .gallery-box').flickity({
wrapAround: true,
autoPlay: false,
draggable: true,
freeScroll: false,
setGallerySize: false,
prevNextButtons: true,
pageDots: true
});
$lightBoxCarousel
.flickity('resize')
.on('cellSelect', function() {
$lightBoxCarousel.flickity('bindDrag');
var flkty = $(this).data('flickity');
$('#sfLightBoxBottomBar .title').html($('.title', flkty.selectedElement).html());
$('#sfLightBoxBottomBar .description').html($('.introduction', flkty.selectedElement).html());
$('object,embed',flkty.selectedElement).each(function(){
var w=$(this).attr('width'),h=$(this).attr('height');
if(w&&h){
var ratio=h/w;
w=$(this).parents('.box').width();
h=w*ratio;
$(this).attr({'width':w,'height':h});
}
});
})
.flickity('select',n,true,true)
;
$('#sfLightBoxContents,#sfLightBoxContents > div:last-child').css('overflow','');
$(tfc).on('resize',function(){
var $coll=$lightBoxCarousel.add($('.box',$lightBoxCarousel)).add($('#sfLightBoxContents'));
if(tf.isMobile_SmallLandscape||tf.isMobile_SmallPortrait||tf.isMobile_Small||tf.isMobile_LargePortrait){
$('#sfLightBox').attr('style',$('#sfLightBox').attr('style')+'height:100%!important;');
$coll.height($('#sfLightBox').height()-$('#sfLightBoxTopBar').outerHeight(true)-$('#sfLightBoxBottomBar').outerHeight(true));
}
else{
$('#sfLightBox').height('');
$coll.height('');
}
}).trigger('resize');
tfc.Flickity.prototype._dragPointerDown=function(event,pointer){
this.pointerDownPoint=tfc.Unipointer.getPointerPoint(pointer);
var isTouchstart = event.type == 'touchstart';
var targetNodeName = event.target.nodeName;
if ( !isTouchstart && targetNodeName != 'SELECT' && targetNodeName != 'OBJECT' && targetNodeName != 'EMBED') {
event.preventDefault();
}
}
}
},
getMMHTML:function(id,s,t,w,h,title){
if((typeof(isInLL)=='undefined'||!isInLL)&&s.indexOf('http')!=0){if(s.indexOf('file:/')==0)s=unescape(s.replace(/^file:\/+/,'').replace(/\//g,'\\'));if(!tf.wm.online){s=tf.wm.url(unescape(s),'-');s=s.replace(/\\/g,'/').replace(/^(?:file:\/+)?(.*)$/,'file:///$1');}}
var src=unescape(s);
return sfMM([id,'',t,src,w,h,w,h,title]);
},
getMMHTMLUsingExtraction:function(id,s,mw,mh){
var w=this.mw,h=this.mh,src='',html='';
if(s.match(/width=['"](.*?)['"]/i))w=RegExp.$1;
if(s.match(/height=['"](.*?)['"]/i))h=RegExp.$1;
var dim=this.scale(mw,mh,w,h);
w=dim[0];h=dim[1];
html=s.replace(/ width="(.*?)"/,' width="'+w+'"').replace(/ height="(.*?)"/,' height="'+h+'"');
return html;
}
}
function populatePrice(arr,idx){
var a=arr||tfc.ppriceArr;if(!a||!tf.core.region){setTimeout('tf.utils.populatePrice()',1000);return;}
for(var i=0,l=a.length;i<l;i++){
if(typeof(idx)!='undefined'&&a[i][0]!=idx)continue;
if(!tf.wm.pProp(a[i][0]))continue;
var el=gl('ProductPrice-'+a[i][0]);
if($('input[name=ProductPriceLayout]').length>0){tf.core.ppriceTemplateLayout(el,a[i]);$('.ShippingChargeForProduct',el).html($('.ShippingChargeForProduct',el).html());}
else if(el||a[i][1]!=''){var s=tf.core.pprice(el,a[i]);if(el&&s)el.innerHTML=s;}
el=gl('Product-'+a[i][0]);
}
if(tf.content.pgid.indexOf('P')==0)populateCrossPromotionPrice();
else {
if(tfc.equalHeight)tfc.equalHeight();
if($) {$(tf.content.document).trigger('domChanged');}
}
}
function populateCrossPromotionPrice(arr,idx){
var a=arr||tfc.ppriceCrossPromotionArr;if(!a||!tf.core.region){setTimeout('tf.utils.populateCrossPromotionPrice()',1000);return;}
var changed=false;
for(var i=0,l=a.length;i<l;i++){
if(typeof(idx)!='undefined'&&a[i][0]!=idx)continue;
if(!tf.wm.pProp(a[i][0]))continue;
var el=gl('ProductCrossPromotionPrice-'+a[i][0]);
if(el&&tf.wm.pProp(a[i][0])){
if($('input[name=ProductPriceLayout]').length>0) {
tf.core.ppriceTemplateLayout(el,a[i],'CrossPromotion');
$('.ShippingChargeForProduct',$(el).parent()).each(function(){
$(this).html($('.Product .ShippingChargeForProduct').filter(function(){return $(this).parents('.ProductCrossPromotion').length==0;}).html().replace('add_'+tf.pgid,'add_'+a[i][0]));
});
changed = true;
}
else{
var s=tf.core.pprice(el,a[i],'CrossPromotion');
if(s){if(s!=el.innerHTML)changed=true;el.innerHTML=s;}
}
el=gl('ProductCrossPromotion-'+a[i][0]);
}
}
a=tfc.bpriceCrossPromotionArr;
if(a&&a.length){
for(var i=0,l=a.length;i<l;i++){
if(typeof(idx)!='undefined'&&a[i][0]!=idx)continue;
var p=tf.wm.pProp(a[i][0]);
if(!p)continue;
var el=gl('ProductCrossPromotionBasePrice-'+a[i][0]);
if(el){
if(!a[i][3]){a[i][1]=p[18];a[i][2]=p[19];a[i][3]=p[20];}
if(a[i][3]){
var s=core.bprice(a[i]);
if(s!=el.innerHTML)changed=true;
el.innerHTML=s;
}
else el.style.display='none';
}
}
}
if(changed) {
if(tf.content.equalHeight)tf.content.equalHeight();
if($) {$(tf.content.document).trigger('domChanged');}
}
}
function populatedata(){
tfc.specialLoading=true;
if(wx&&typeof(wx.getPageID)=='function'&&(wx.getPageID()=='D-34'||wx.getPageID()=='D-33'))return;
if(!tf.conf){tf.load('conf.html','conf',true);}
core=tf.core;
if(!tfc.ppriceArr||!tf.conf||!core||!core.confLoaded||!tf.coreLoaded||!core.tsI){setTimeout('populatedata()',50);return;}
populatePrice();
a=tfc.weightArr;for(var i=0,l=a.length;i<l;i++){var s=a[i][1].toString(),el=gl('ProductWeightFormatted-'+a[i][0]);if(el)el.innerHTML=core.nfmt.display(s,s.length-s.indexOf('.')-1,'');}
a=tfc.bpriceArr;for(var i=0,l=a.length;i<l;i++){var el=gl('ProductBasePrice-'+a[i][0]);if(el)el.innerHTML=core.bprice(a[i]);}
populateOpt();
if(tf.core.loadPricesForIDs&&tfc.ppriceCrossPromotionArr)tf.core.loadPricesForIDs(tfc.ppriceCrossPromotionArr);
tfc.specialLoading=false;
displayProductQuantityDiscounts();
$(tfc).trigger('_sfEvt_PopulateData_End');
}
function populateOpt(origA, idx, optid) {
var a = tfc.crFFldArr || [], origa = origA || tf.wm._pArr, optHTML = { length : 0 };
for (var i = 0, l = a.length; i < l; i++) {
var choicesOnly= typeof(optid) != 'undefined', id = a[i][8];
if(typeof(idx) != 'undefined' && id != idx)
continue;
if (typeof(optid) != 'undefined' && a[i][2] != optid)
continue;
if (!tf.wm.pProp(id))
continue;
if (!optHTML[id]) {
optHTML[id] = '';
optHTML.length++;
}
optHTML[id] += tf.core.crFFld(a[i], origa[id]);
}
for (var i in optHTML) {
var el = gl(choicesOnly ? ('ProductOptionInner-' + optid) : ('ProductOptions-' + i));
if (el) {
var lock=(!choicesOnly && !$(el).data('initialised'));
el.innerHTML = optHTML[i];
if (lock) {
$(el).find('.locker').remove().end().css('position','relative').append(_sfEvt_htmlLocker.replace(/title=""/g,'title="'+((LD&&LD.LD_LOADING)||'').replace(/"/g,'&quot;')+'"'));
var removeLocker = debounce2(function(){
$('.ProductOptions').data('initialised',true).find('.locker').remove();
$('.ProductIcons').find('.locker').remove();
}, 2000);
$(tfc).off('_sfEvt_PopulateOpt.locker').on('_sfEvt_PopulateOpt.locker', removeLocker);
}
}
}
$(tfc).off('_sfEvt_PopulateOpt.hash').on('_sfEvt_PopulateOpt.hash', function(){
if(location.hash)location.hash=location.hash;
});
function fnEqualWidth() {
tf.equalWidth('.ProductOptionInner[data-option-type=radio], .ProductOptionInner[data-option-type=checkbox]', '.ProductChoiceName', 185, 5, true);
if(tf.equalHeight)tf.equalHeight();
}
var fnPopulateOpt=tfc['fnPopulateOpt']||fnEqualWidth;
fnPopulateOpt();
$(tfc).off('resize.populateOpt imageLoaded.populateOpt');
$(tfc).on('resize.populateOpt imageLoaded.populateOpt', function() {
setTimeout(function(){fnPopulateOpt();},20);
});
$(tfc).trigger('_sfEvt_PopulateOpt');
setTimeout(displaySelectedOpt, 20);
}
var _sfEvt_htmlLocker='<div class="locker" style="position:absolute;overflow:hidden;left:0;right:0;top:0;bottom:0;width:100%;height:100%;background-color:#ffffff;opacity:.5;z-index:1;" title=""></div><progress class="locker" style="height:5px;top:0;width:100%;position:absolute;left:0;right:0;z-index:1;"></progress>';
if ($) {
$(function () {
$('.ProductIcons').each(function () {
productIconsLocker($(this).attr('id').replace('ProductIcons-', ''));
});
});
}
function displaySelectedOpt(){
var tfc=tf.content,core=tf.core;
if(typeof(tfc.pgid)=='undefined'||tfc.pgid.substr(0,1)!='P')return;
var el=gl('ProductSelectedOptions-'+tf.pgid);
if(!el||!tf.wm.pProp(tf.pgid))return;
var s='',itm=core.Basket.createTemp(tfc.pgid,tfc.document,tfc.opt,1,'','','','','',tfc.ppriceArr[0][2],'',false,true);
if (typeof(itm)!='object'||!itm){
el.innerHTML='';
return;
}
var opt=itm.options.start();
while (opt!=null) {
if (opt.choice()!=='') {
s+='<div class="ProductSelectedOptionsItem"><div class="ProductSelectedOptionsName">'+opt.title+':</div>'+opt.choice()+'</div>';
}
opt=itm.options.next();
}
if(s){
s='<div class="ProductSelectedOptions"><div class="ProductSelectedOptionsHead">'+tf.LD.LD_SELECTEDOPTIONS+'</div><div class="ProductSelectedOptionsBody">'+s+'</div></div>';
el.innerHTML=s;
}
}
function displayProductQuantityDiscounts(prid){
var tfc=tf.content, core=tf.core;
if(prid)displayProductQuantityDiscountsWorker(prid);
else if(typeof tfc._sfProductsInPage!='undefined'){
for(var n=0,nn=tfc._sfProductsInPage.length;n<nn;n++){
displayProductQuantityDiscountsWorker(tfc._sfProductsInPage[n]);
}
}
}
function displayProductQuantityDiscountsWorker(prid){
var elPQD = gl('ProductQuantityDiscounts-'+prid);
if(!elPQD)return;
var tfc=tf.content, core=tf.core;
if(!tf.core||!tf.wm.pProp(prid)||tfc.specialLoading){setTimeout(function(){tf.utils.displayProductQuantityDiscountsWorker(prid);},100);return;}
var bsk=core.Basket, outstr='', bskqnty=1, p=tf.wm.pProp(prid);
bsk.disc.eAdd(prid,[p[5], p[6], p[7]]);
var disc=bsk.disc.get(prid),ranges=disc.rg.cnt(),qtyUnit=p[22];
var itm=bsk.createTemp(prid,tfc.document,tfc.opt,1,'','','','','',tfc.ppriceArr[0][2],'',false);
if (typeof(itm) != 'object' || !itm){
elPQD.innerHTML = '';
return;
}
for (var n=0;n<ranges;n++){
var range=disc.getNextRange(bskqnty), nmin=parseFloat(range.min);
if(nmin==0) continue;
if(typeof(range)=='object'){
if (disc.getData(nmin)) {
outstr+='<div class="ProductQuantityDiscountsRange" id="ProductQuantityDiscountsRange-'+prid+'R'+range.idtag+'">';
itm.quantity=nmin;
var atagB = '<div>', atagE = '</div><div><div class="GC14 sf-button"><a href="#" onclick="if(isInSF())return;cancelBuble(event);var elQty=tf.content.document.getElementById(\''+prid+'_Quantity\');elQty.value=\''+nmin+'\';sfAddPop();if(add_'+prid+'()!=0){sfAddUnpop();}return false;">'+LD.LD_OK+'</a></div></div>';
switch (disc.type.toString()) {
case '4': case '5':
var adprice=itm.calc('pur',null,0)/nmin;
var a=[nmin,qtyUnit,'<strong>'+core.showPrc(adprice)+'</strong>',qtyUnit];
outstr+=atagB;
outstr+=(tf.content.ld('LD_BUY_FOR','',a)).replace(/\s+\.$/, '.');
outstr+=atagE;
break;
case '2': if (!bsk.fbsk.checkBasket(tf.pgid)) {
var a=[nmin,qtyUnit,disc.getData(nmin),qtyUnit];
outstr+=atagB;
outstr+=(bskqnty>0)?tf.content.ld('LD_BUY_MORE_AND_GET_FREE','',a):tf.content.ld('LD_BUY_AND_GET_FREE','',a);
outstr+=atagE;
}
break;
case '3': if (!bsk.fbsk.checkBasket(tf.pgid)) {
var a=[nmin,qtyUnit,bsk.fbsk.getTitles(disc.getData(nmin))];
outstr+=atagB;
outstr+=(bskqnty>0)?tf.content.ld('LD_BUY_MORE_AND_GET_FREE','',a):tf.content.ld('LD_BUY_AND_GET_FREE','',a);
outstr+=atagE;
}
break;
}
outstr+='</div>';
}
bskqnty=parseFloat(range.min);
}
}
elPQD.innerHTML=outstr;
}
function sfMM(a){
var wm, id=a[0],lmd=a[1],t=a[2],src=a[3],w=parseInt(a[4]),h=parseInt(a[5]),mw=parseInt(a[6]),mh=parseInt(a[7]),alt=a[8];
if(src.toLowerCase().lastIndexOf(t)==src.length-t.length){
if(typeof(isInLL)=='undefined'||!isInLL){src=tf.wm.url(src,'-');src=src.replace(/\\/g,'/');if(!tf.wm.online)src=src.replace(/^(file:\/\/)?(.*)$/,'file://$2');}
src=unescape(src); w=(w>0?w:mw); h=(h>0?h:mh);
var dim=' width="'+w+'" height="'+h+'"',s='';
switch(t){
case 'mp4': case 'webm':case 'ogg':
s+='<video controls><source src="'+src+'" type="audio/'+t+'"></video>';
break;
case 'mp3': case 'wav':case 'ogg':
s+='<audio controls><source src="'+src+'" type="audio/'+t+'"></audio>';
break;
case 'mov': case 'avi': case 'mpg':
s+='<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="//www.apple.com/qtactivex/qtplugin.cab" '+dim+' title="'+alt+'"> <param name="src" value="'+src+'" /> <param name="autoplay" value="false" /> <param name="controller" value="true" /> <param name="scale" value="aspect" /> <param name="wmode" value="opaque" /> <embed type="video/mpeg" src="'+src+'" '+dim+' title="'+alt+'" autoplay="false" scale="aspect" controller="true" wmode="opaque" pluginspage="//www.apple.com/quicktime/download/" /> </object>';
break;
case 'wmv':
s+='<object classid="clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6" type="video/x-ms-wmv" '+dim+' title="'+alt+'"> <param name="URL" value="'+src+'" /> <param name="AutoStart" value="false" /> <param name="ShowTracker" value="true" /> <param name="ShowControls" value="true" /> <param name="ShowGotoBar" value="false" /> <param name="ShowDisplay" value="false" /> <param name="ShowStatusBar" value="false" /> <param name="AutoSize" value="false" /> <param name="StretchToFit" value="true" /> <param name="wmode" value="transparent" /> <object type="application/x-ms-wmp" '+dim+' title="'+alt+'"> <param name="URL" value="'+src+'" /> <param name="AutoStart" value="true" /> <param name="ShowTracker" value="true" /> <param name="ShowControls" value="true" /> <param name="ShowGotoBar" value="false" /> <param name="ShowDisplay" value="false" /> <param name="ShowStatusBar" value="false" /> <param name="AutoSize" value="false" /> <param name="StretchToFit" value="true" /> <param name="wmode" value="transparent" /> <a></a><!--IE workaround--> </object></object>';
break;
case 'swf':
s+='<object classid="CLSID:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" '+dim+' title="'+alt+'">	<param name="movie" value="'+src+'" /> <param name="src" value="'+src+'" /> <param name="wmode" value="opaque" /> <param name="menu" value="false" /> <embed src="'+src+'" '+dim+' title="'+alt+'"  type="application/x-shockwave-flash" wmode="opaque" pluginspage="//www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" menu="false" /> </object>';
break;
default:
s+='<embed src="'+src+'" quality="high" '+dim+' title="'+alt+'"></embed>';
}
}
return s;
}
function sfMMDraw(){var a=tfc.aMM;if(a){for(var i=0,num=a.length;i<num;i++){if(a[i]){var aa=a[i],el=gl(aa[0]);if(el){if(tf.isIE)el.style.visibility='hidden';el.innerHTML=sfMediaBox.getMMHTML(aa[0],aa[3],aa[2],aa[4],aa[5],aa[8]);a[i]=null;if(tf.isIE)setTimeout('gl("'+aa[0]+'").style.visibility="visible"',20);}}}}}
function rmvwmode(){
var d=tfc.document,a=d.embeds;
for(var i=0,ii=a.length;i<ii;i++){ if (a[i].id.indexOf('DSObject_') == 0)a[i].setAttribute('wmode','window'); }
var els = d.getElementsByTagName('object'),obj = [];
for(var i = 0; i < els.length; i++){ if (els[i].getElementsByTagName('param').length==0)continue; obj.push(els[i]); }
for(var i = 0; i < obj.length; i++){
var html = obj[i].outerHTML;
var wrapper = d.createElement('div');
obj[i].parentNode.appendChild(wrapper);
obj[i].parentNode.removeChild(obj[i]);
wrapper.innerHTML = html.replace(/<param name="wmode" value="[^"]*?"[^>]*?>/gi,'<param name="wmode" value="window" />');
}
}
function embwmode(d){ d=d?d:tfc.document,a=d.embeds; for(var i=0,ii=a.length;i<ii;i++){ a[i].setAttribute('wmode','transparent'); } }
function imgs(){sfMMDraw();if(tf.isInSF()&&navigator.userAgent.indexOf('Trident/6.0')!=-1)rmvwmode();else embwmode();}
function imgEntryPageFix(ss){if(tf.isEntryPage)ss=ss.replace(/\.\.\/media\//g,(tf.lang!=tf.baseLang?'../':'')+'contents/media/');return ss;}
function applyms(){
if(typeof(ms)=='function'&&(!tf.extra||tf.extra.loadInProgress<1)){
var aMS=tf.content.aMS;
if(aMS){
var cnt=aMS.length,a;
for(var n=0;n<cnt;n++){a=aMS[n];ms(a[0],a[1],a[2],a[3]);}
}
}
else{setTimeout('applyms()',100);}
}
var ms_rv,ms_lv,ms_dv,ms_uv,ms_oldn,ms_n,ms_sp=3,ms_sp2=20;
function ms_rt(id){var el=gl('ms_'+id),x=el.offsetLeft;if(x>(ms_n-ms_oldn-(tf.isChrome?36:0)))el.style.left=(x-ms_sp)+'px';ms_rv=setTimeout('ms_rt(\''+id+'\')',ms_sp2);}
function ms_lt(id){var el=gl('ms_'+id),x=el.offsetLeft;if(x<0)el.style.left=(x+ms_sp)+'px';ms_lv=setTimeout('ms_lt(\''+id+'\')',ms_sp2);}
function ms_dn(id){var el=gl('ms_'+id),y=el.offsetTop;if(y>(ms_n-ms_oldn-(tf.isChrome?18:0)))el.style.top=(y-ms_sp)+'px';ms_dv=setTimeout('ms_dn(\''+id+'\')',ms_sp2);}
function ms_up(id){var el=gl('ms_'+id),y=el.offsetTop;if(y<0)el.style.top=(y+ms_sp)+'px';ms_uv=setTimeout('ms_up(\''+id+'\')',ms_sp2);}
var ms_right=ms_rt,ms_left=ms_lt,ms_down=ms_dn;
function ms_stop(dir){clearTimeout(eval('ms_'+dir.substr(0,1)+'v'));}
function ms_set(oldn,n,sp,sp2){ms_oldn=oldn;ms_n=n;if(typeof(sp)!='undefined')ms_sp=sp;if(typeof(sp2)!='undefined')ms_sp2=sp2;}
function applyFlickityToIndex(idxNum){
var $idxSlider = $('#Index'+idxNum+' > .idx'+idxNum+'List');
$('> li', $idxSlider)
.each(function(){ $(this).outerHeight($(this).outerHeight()); })
.last().clone().appendTo($idxSlider).children().remove()
;
function setIdxSlider() {
$idxSlider.parent().width('100%').css('float','none');
$idxSlider
.on('cellSelect', function(){
var flkty = $(this).data('flickity');
if (flkty) {
if (flkty.selectedIndex == $(this).data('selectedIndex')) return;
if ($(this).data('translateX') == $('.flickity-slider', this).css('transform')) {
if (flkty.selectedIndex > $(this).data('selectedIndex')) flkty.selectedIndex = $(this).data('selectedIndex');
else if (flkty.selectedIndex < $(this).data('selectedIndex')) flkty.selectedIndex--;
}
$(this).data({'selectedIndex':flkty.selectedIndex, 'translateX':$('.flickity-slider', this).css('transform')});
}
})
.on('settle', function(){
var $last = $('.flickity-slider > li', this).last(), shifted = $('.flickity-slider', this).css('transform').match(/matrix\((.+)\)/) || $('.flickity-slider', this).css('transform').match(/matrix3d\((.+)\)/), shiftedpx = 0;
if (shifted && shifted.length > 1) shiftedpx = parseFloat((shifted[1].split(', ')[12]) || (shifted[1].split(', ')[4]));
if (parseFloat($last.css('left')) + $last.outerWidth(true) <= $('.flickity-slider', this).width() + Math.abs(shiftedpx)) $('.next', this).attr('disabled', 'disabled');
else $('.next', this).removeAttr('disabled');
})
.flickity({
cellAlign: 'left',
contain: true,
wrapAround: false,
autoPlay: false,
draggable: true,
freeScroll: true,
setGallerySize: false,
prevNextButtons: true,
pageDots: false,
percentPosition: false
})
.flickity('resize')
.find('.flickity-viewport')
.find('.flickity-slider').addClass('idx'+idxNum+'List').each(function(){ $(this).height($('> li', this).outerHeight(true)).css('bottom', 0); })
.end()
.parentsUntil('[id^=WebSite]').each(function(){
var zIndex = $(this).css('z-index');
if (zIndex == 'auto' || parseInt(zIndex) <= 0) $(this).css('z-index', idxNum == 2 ? 1000 : 1001);
})
;
}
function unsetIdxSlider() {
if ($idxSlider.hasClass('flickity-enabled')) {
$idxSlider
.flickity('destroy')
;
}
$idxSlider.parent().css({'float':''});
}
$(window).on('resize', function () {
unsetIdxSlider(); $idxSlider.parent().css({'width':'', 'float':'none'});
if ($('#WebSite').width() > 619) {
var w = 0, wContainer = ($idxSlider.parent().outerWidth(true)||$idxSlider.outerWidth(true))+1;
$('> li, .flickity-slider > li', $idxSlider).each(function(){ w += $(this).outerWidth(true); $(this).css('height',''); if($(this).outerHeight()>0)$(this).outerHeight($(this).outerHeight()); });
if (w-1 > wContainer) {
setIdxSlider();
$idxSlider.flickity('resize');
setTimeout(function(){$idxSlider.flickity('reposition');}, 200);
}
else if (w < wContainer) unsetIdxSlider();
}
});
$(window).trigger('resize');
}
function searchload(url,force){
var tfcd=tfc.document;
if(tf.isMobile && $('.mobile').is(':visible')) {
tf.searchPhrase=(tf.searchPhrase||tfcd.mobile_search.phrase.value);
}
else {
if(tfcd.search.phrase)tf.searchPhrase=tfcd.search.phrase.value;
else{
for(var n=0;n<tfcd.search.length&&!tf.searchPhrase;n++)tf.searchPhrase=tfcd.search[n].phrase.value;
}
}
tf.searchPhrase=tf.searchPhrase.toLowerCase();
if (tf.searchPhrase==''&&!force) return;
var searchStringLength = $.trim(tf.searchPhrase).length;
if (searchStringLength > 0 && searchStringLength < 2){
alert (LD.LD_SEARCH_ENTER2CHARACTERS);
return false;
}
tf.nametag.add('searchPhrase',tf.searchPhrase);
tf.nametag.add('shopEnabled','false');
if(encodeURIComponent)url+='?searchphrase='+encodeURIComponent(tf.searchPhrase);
else url+='?searchphrase='+window.encodeURI(tf.searchPhrase);
tfc.location=tf.wm.url(url,'-');
}
function search(){searchload(tf.lang+'/search.php')}
function search_all(advanced)
{
if ( (tf.loc.hostname=='localhost' && tf.loc.port!='') || tf.loc.hostname=='')
{
alert(tf.LD.LD_PHPSEARCH_ONLY_WHEN_PUBLISHED);
}
else
{
tf.searchAdvanced=advanced;
if(typeof(tf.searchAdvanced)!='undefined')tf.nametag.add('searchAdvanced',tf.searchAdvanced);
searchload(tf.lang+'/search.php',false);
}
}
var varShowShippingChargesAfterAddToBasket={};
function showShippingChargesAfterAddToBasket(){
var prid=varShowShippingChargesAfterAddToBasket['prid'];
tf.content.sfAddPop('shipping_charge',true);
tf.content.sfAddRef['core']={};
tf.utils.sfMediaBox.fnAfterClose=function(){
if(tf.content['add_'+prid]){
varShowShippingChargesAfterAddToBasket['disponly']=true;
tf.content.sfAddPop();
tf.content['add_'+prid]();
}
else if(tf.pgid=='D-10'&&tf.content.add){ // Favorites page
varShowShippingChargesAfterAddToBasket['disponly']=true;
var itm=tf.core.Favorite.items.get(prid);
if(itm){
var idx=tf.core.Favorite.items.idx(itm.idtag);
tf.content.add(idx);
}
}
};
varShowShippingChargesAfterAddToBasket={};
}
function showPopup(url, width, height, useOverlay, showdecorations, delay, className, HTML){
function gl(s){try{return tf.extra.document.getElementById(s);}catch(e){return null;}}
var tfcd=tfc.document,tfcdb=(tf.isSafari?tfcd.documentElement:tfcd.body);
var w=width||640, h=height||480;
sfMediaBox.cacheW=w;sfMediaBox.cacheH=h;
showdecorations=typeof(showdecorations)=='undefined'||showdecorations;
delay=typeof(delay)!='undefined'&&delay;
sfMediaBox.fnAfterClose=null;
sfMediaBox.useOffsetTop=false;
var contents='';
if(url){
if(url.match(/^[#.]/)&&$(url).length>0){
contents=tmplParser.parse(gl('tmplSFLightBoxHTMLCode'),{'HTML':$(url).html()});
}
else{
contents=tmplParser.parse(gl('tmplSFLightBoxFrame'),
{
src:url,
height:showdecorations==true?'height="'+h+'px"':'100%',
onload:showdecorations==true?'tf.utils.sfMediaBox.centerBox();tf.utils.sfMediaBox.hide(\'sfLightBoxLoading\');return false;':''
});
}
}
else if(!url&&HTML){
contents=tmplParser.parse(gl('tmplSFLightBoxHTMLCode'),{'HTML':HTML});
}
var a=[
(useOverlay?tmplParser.parse(gl('tmplSFLightBoxOverlay'), { height:tfcdb.scrollHeight+'px', close_onclick:'return false;', className:className, contents:'' }):''),
tmplParser.parse(
gl('tmplSFLightBox'),
{
relprefix:(tf.isEntryPage?(tf.lang!=tf.baseLang?'../':'')+'contents/':'../'),
captiondisplay:'none', navdisplay:'none', counterdisplay:'none',
loadingdisplay:(delay||(!url&&HTML)?'none':'block'), loadingmessage:(delay?'':tf.LD.LD_LOADING),
overflow:(delay?'auto':'hidden'),
cssborder:'border:1px #999999 solid;',
contents:contents,
close_onclick:tf.utils.sfMediaBox.close_onclick,
width:w+'px', height:h+'px',
position:'fixed',
marginleft:(-w/2+tfcdb.scrollLeft)+'px', margintop:(-h/2+tfcdb.scrollTop)+'px',
cssborder:showdecorations==true?'border:1px #999999 solid;':'border:1px #000000 solid;',
decorationborder:showdecorations==true?'5px':'0',
displaybottompart:showdecorations==true?'display:block;':'display:none;',
className:' '+className,
title:'',
description:'',
imagecontrols:''
}
)
];
sfMediaBox.showDropDowns(false);
for(var n=0,nn=a.length;n<nn;n++){
sfMediaBox.render(sfMediaBox,a[n]);
}
sfMediaBox.centerBox();
tf.addEvent('onresize',sfMediaBox.centerBox);
if(delay){
sfMediaBox.hide('sfLightBox');
sfMediaBox.hide('sfLightBoxOverlay');
}
tfc.document.body.style.overflow='hidden';
}
var dlgModal={
win:null,
w:-1,h:-1,
fnClose:function(){},
init:function(url,name,options,width,height,fnCreate,fnClose,fnComplete){
options=options||('scrollbars,resizable,width='+width+',height='+height);
this.win=(tf.external&&tf.external.IsInSF?null:window.open(url,name,options));
if(this.win){
this.w=width;
this.h=height;
sfMediaBox.render(sfMediaBox,
tmplParser.parse(tf.extra.document.getElementById('tmplSFLightBoxOverlay'),{
height:tfc.document.body.scrollHeight+'px',
close_onclick:'',
className:'',
contents:tmplParser.parse(tf.extra.document.getElementById('tmplSFPurchaseOverlayContents'),{})
})
);
var me=this;
$('#sfLightBoxOverlay')
.focus()
.on('click focus',function(){
setTimeout(function(){me.win.focus();}, 200);
me.win.focus();
}
);
tf.$(window)
.on('focus',function(){
$('#sfLightBoxOverlay').focus().click();
}
);
if(fnClose)this.fnClose=fnClose;
function close(){
clearInterval(interval);
if(fnClose)fnClose();
}
this.win.focus();
tf.$(window).on('beforeunload',function(){me.win.close();});
if(fnCreate)fnCreate();
var leftDomain=false;
var interval=window.setInterval(function(){
try {
if(me.win==null||me.win.closed){ close(); }
else if(me.win.document.domain===document.domain){
if(leftDomain){
if(fnComplete)fnComplete();
close();
}
}
else leftDomain=true;
}
catch(e){
if(me.win.closed){ close(); return; }
leftDomain=true;
}
},500);
}
return this.win;
},
center:function(){
if(!this.win||this.win.closed)return;
var l=Math.max((this.win.opener.outerWidth-this.w)/2,0)+this.win.opener.screenLeft,
t=Math.max((this.win.opener.outerHeight-this.h)/2,0);
this.win.moveTo(l,t);
}
};
var equalDivPoll=[];
var equaldiv = function (c) {
if(!c)c='EqualHeight';
clearTimeout(equalDivPoll[c]);
equalDivPoll[c] = setTimeout(function(){
equaldivCall(c);
equalDivPoll[c] = null;
}, 500);
};
function equaldivCall(c) {
var tfcd=tfc.document,coll=[],t=tfcd.querySelectorAll('.'+c);
for (var x = 0, cnt=t.length; x<cnt; x++) {
if (t[x].scrollHeight > 0) {
t[x].style.height='auto';
coll.push(t[x]);
}
}
if(coll.length>0){
equaldivWorker(coll);
}
}
function equaldivWorker(coll) {
var maxh=0;
if(typeof(tf.content.fnEqualDivGetHeight)=='function'){
for (x=0,cnt=coll.length; x<cnt; x++) {
maxh = Math.max(maxh, tf.content.fnEqualDivGetHeight(coll[x]));
}
}
else {
for (x=0,cnt=coll.length; x<cnt; x++) {
maxh = Math.max(maxh, $(coll[x]).outerHeight());
}
}
for (x=0,cnt=coll.length; x<cnt; x++) {
$(coll[x]).outerHeight(maxh);
}
}
var cookieWarning = {
_loadOptInOut:function(){
var $=tfc.$;
function handleData($o, data){
var js='',HTML=data.replace(/(<scr\ipt[^>]*>)((?:[\n\r]|.)*?)(<\/scr\ipt>)/gim,
function($0, $1, $2, $3){js+=$2;return $1+''+$3;}
);
$o.empty().html(HTML);
eval(js);
$(window).trigger('cookieOptInApprovedLoaded.cookiewarning');
}
if($('#optinout_dept').length>0){
$.get(tf.wm.url(pgid.toLowerCase()+'_optinout.html',lmd['optinout'],true), function(data){
handleData($('#optinout_dept'),data);
});
}
},
_optInApproved:function(){
var $=tfc.$;
tf.nametag.add('cookieOptInApproved',true);
tf.savCookStr('cookieOptInApproved',true,-1);
$(function () {
tf.cookieWarning['_loadOptInOut']();
});
},
_optOut:function(){
var $=tfc.$;
tf.nametag.del('cookieOptInApproved');
tf.delCookStr('cookieOptInApproved');
$('[name=optinout]').empty();
$('#optinout_dept').empty();
},
_render:function(a,show){
var el=tfcd.createElement('div'),html=(typeof(a)=='function'?a(o):a);
if(show){if(tf.isEntryPage)html=html.replace(/\.\.\/media\//g,(tf.lang!=tf.baseLang?'../':'')+'contents/media/');}
el.innerHTML=html;
for(var i=0,num=el.childNodes.length;i<num;i++){
var elNew=el.childNodes[i];
if(elNew){
if (elNew.nodeType!=3&&tfc.gl(elNew.id)){
tfcd.body.removeChild(tfc.gl(elNew.id));
}
if(show&&elNew.nodeType!=3)elNew=tfcd.body.appendChild(elNew);
}
}
},
show:function(){
if (!tf.extra || !tf.extra.document.getElementById('tmplSFCookieWarningBar')){setTimeout(cookieWarning['show'],100);return;}
if (tf.getCookStr('showCookieWarning')=='false') {
if (tf.getCookStr('cookieOptInApproved')=='true') tf.cookieWarning['_optInApproved']();
return;
}
var langvalues={'fr':['Ce site utilise des cookies pour garantir une expérience sur mesure aux visiteurs.','privacy.html#cookiePrivacy','En savoir plus','Accepter']};
var a=[tmplParser.parse(tf.extra.document.getElementById('tmplSFCookieWarningBar'),
{
warningtext:langvalues[tf.lang][0], privacyhref:(tf.isEntryPage?(tf.lang!=tf.baseLang?'../':'')+'contents/':'../')+tf.lang+'/'+langvalues[tf.lang][1], privacypagetitle:langvalues[tf.lang][2], 'LD_ACCEPT':langvalues[tf.lang][3]
})];
for(var n=0,nn=a.length;n<nn;n++){ cookieWarning._render(a[n],true); }
var $=tfc.$;
$('#sfCookieWarningBar .Close').off('click.cookiewarning').on('click.cookiewarning', function(e){
e.stopPropagation();
e.preventDefault();
tf.cookieWarning['_optOut']();
tf.cookieWarning.close();
})
;
$('#sfCookieWarningBar .OK').remove();
tf.cookieWarning['_optInApproved']();
$(window).off('resize.cookiewarning').on('resize.cookiewarning', function(e){
if($('.footer.mobile:visible').get(0))$('#sfCookieWarningBar').css('bottom',$('.footer.mobile').height()+'px');
});
},
close:function(){
tf.nametag.add('showCookieWarning',false);
tf.savCookStr('showCookieWarning',false, -1);
var a=[tmplParser.parse(tf.extra.document.getElementById('tmplSFCookieWarningBar'), {})];
for(var n=0,nn=a.length;n<nn;n++){ cookieWarning._render(a[n],false); }
}
}
if(!tf.isInSF()){
$(function () { tf.cookieWarning['show'](); });
}
var sfIFramer = {
iframeHandler: null,
fnReceive:null,
msgHandlers:{},
pingQualifier:'',
iframeInit: function(name,fnReceive,initNotifyData){
sfIFramer.iframeHandler = gl(name);
if (sfIFramer.iframeHandler) {
if(fnReceive)sfIFramer.fnReceive=fnReceive;
tf.addEvent("onmessage", sfIFramer.embedReceiveMessage);
tf.addEvent("onresize", sfIFramer.embedNotifyResize);
sfIFramer.embedPing();
if(initNotifyData)sfIFramer.sendInitNotifyData(initNotifyData);
}
},
embedReceiveMessage: function (e) {
e = e || window.event();
if (e.data.indexOf && e.data.indexOf('santuiframe') == 0) {
var dt = e.data.split('|');
if (!dt[1] || dt[1].indexOf('h') == -1) return;
var dth = dt[1].split('='),height=dth[1];
if(sfIFramer.iframeHandler&&(sfIFramer.iframeHandler.height!=height||sfIFramer.iframeHandler.getAttribute('origheightattribute')!=height)){
if(sfIFramer.iframeHandler.style.height)sfIFramer.iframeHandler.style.height='';
sfIFramer.iframeHandler.height = height;
if(sfIFramer.iframeHandler.getAttribute('height')!=sfIFramer.iframeHandler.getAttribute('origheightattribute'))sfIFramer.iframeHandler.setAttribute('origheightattribute',height);
tf.content.equalHeight();
if($) {$(tf.content.document).trigger('domChanged');}
gl('WebSiteContent').style.height='auto';
gl('WebSite').style.height='auto';
var tfc=tf.content.document;
tfc.body.style.height='auto';
tfc.documentElement.style.height='auto';
tfc.body.style.overflowY='auto';
tfc.documentElement.style.overflowY='auto';
if (tf.isMobile) setTimeout(function(){sfIFramer.iframeHandler.height = height;},1000);
if(sfIFramer.fnReceive)sfIFramer.fnReceive();
}
sfIFramer.pingQualifier='?lmd='+Math.random();
}
if (e.data.split) {
var edata = e.data.split('|'), emsg = edata[0], emsgdata = edata[1] || '';
if (sfIFramer.msgHandlers[emsg]) sfIFramer.msgHandlers[emsg](emsgdata);
}
},
embedNotifyResize: function () {
if (sfIFramer.iframeHandler)sfIFramer.iframeHandler.contentWindow.postMessage('resize', sfIFramer.iframeHandler.domain||sfIFramer.iframeHandler.src);
},
embedPing: function () {
setInterval(function () {
if (sfIFramer.iframeHandler && sfIFramer.iframeHandler.src.indexOf('http')==0)
sfIFramer.iframeHandler.contentWindow.postMessage('ping|' + document.location.href+sfIFramer.pingQualifier, sfIFramer.iframeHandler.domain||sfIFramer.iframeHandler.src);
}, 200);
},
sendInitNotifyData: function (data) {
setInterval(function () {
if (sfIFramer.iframeHandler && sfIFramer.iframeHandler.src.indexOf('http')==0)
sfIFramer.iframeHandler.contentWindow.postMessage(data, sfIFramer.iframeHandler.domain||sfIFramer.iframeHandler.src);
}, 800);
},
addMsgHandler: function(msg, fn) {
this.msgHandlers[msg] = fn;
}
};
tf.addEvent('onload',
function(){
try {
var aIfr = tf.content.document.getElementsByTagName('IFRAME');
for (var n = 0; n < aIfr.length; n++) {
if (aIfr[n].src && aIfr[n].src.indexOf('santu.com') != -1) tf.utils.sfIFramer.iframeInit(aIfr[n].id);
}
}
catch(e){}
}, tf.content
);
if (!tf.isInSF() && tf !== window.top) { // Iframe!
var iframeholderdomain= false;
var iframeresize = function () {
if (iframeholderdomain) {
tf.parent.postMessage("santuiframe|h=" + $('html').height() + "|w=" + $('html').width(), iframeholderdomain);
}
};
var receiveMessage = function (event) {
if (event.data && event.data=='resize') {
iframeresize();
}
if (event.data && event.data.indexOf) {
if(event.data.indexOf('ping|')==0) {
var iframeholderdomain2 = event.data.substr(5,512);
if(iframeholderdomain!= iframeholderdomain2){
iframeholderdomain = iframeholderdomain2;
setTimeout(iframeresize,1000);
}
}
if (event.data.indexOf('getheight=') == 0) {
$('html').css('height','auto');
var domain = event.data.substr(10, 512);
tf.parent.postMessage("santuheight=" + $('html').height(), domain);
}
}
};
tf.addEventListener ? tf.addEventListener("message", receiveMessage, false) : tf.attachEvent("onmessage", receiveMessage);
}
if(!tf.isInSF() && $){
$(document).ready(function(){
if(tf.content.pgid && tf.content.pgid.indexOf('P')==0&&!tf.isTablet&&!tf.isMobile){
$('.ProductImage a img:not(.pici)')
.wrap('<span style="display:inline-block"></span>')
.css('display', 'block')
.parent()
.on('imageLoaded', function(e){
$(this).zoom({
duration:250,
callback:function(){$(this).attr('title',$(this).parent().find('img:first').attr('title'));},
onZoomIn:function(){$(this).prev('img').stop().animate({'opacity':'0'},'fast');},
onZoomOut:function(){$(this).siblings('img').stop().animate({'opacity':'1'},'fast');$(this).siblings('img.zoomImg').remove();}
});
})
;
$('a.ThumbnailSliderItem[onclick]')
.click(function(){
function waitForRealImage(el){
if($(el).attr('src')&&$(el).attr('src').indexOf('media/progress')==-1&&$(el).attr('src')!=$(el).next('.zoomImg').attr('src')){
$(el).trigger('zoom.destroy').parent().zoom();
}
else{
setTimeout(function(){waitForRealImage(el);},250);
}
}
waitForRealImage($(this).parents('.ProductImageContainer').find('.ProductImage a img').get(0));
})
;
}
});
}
if ($) {
$(document).ready(function(){
if(!tf.isInSF()) {
$('#Content div[id^="WebSite"] table, #Content div[id^="Shop"] table, #Content div[id^="Page"] table, #Content div[id^="Product"] table, .WebSiteFootnote table, #Content div[id^="Htmlcode"] table, #Content div[id^=IndexCode] table').not('.sf-scrollbar-table, #Content div[id^="Page"] table.PageImage, #Content div[id^="ProductIcons"] table').wrap('<div class="sf-scrollbar-table"></div>');
} else {
while($('div.sf-scrollbar-table > table').length > 0) {
$('div.sf-scrollbar-table > table').unwrap();
}
}
});
}
var layoutModer = {
_modeNone:0,
_modeDesktop:1,
_modeMobile:2,
switchTo: function(mode) {
var oSS = $('#global-responsive-css');
if (oSS) {
var $mainContentArea=tfc.$('#SideBar_L').next('[class*=content], #Content');
switch (mode) {
case this._modeNone:
case this._modeDesktop:
oSS.attr('disabled', true);
if (parseFloat($mainContentArea.css('min-width')) != 0) $mainContentArea.width($mainContentArea.css('min-width'));
tf.nametag.add('layoutMode', this._modeDesktop);
if(tf.content.makeResponsive)tf.content.makeResponsive();
break;
case this._modeMobile:
oSS.attr('disabled', false);
$mainContentArea.width('');
tf.nametag.add('layoutMode', this._modeMobile);
break;
}
if (tf.content.equalHeight) setTimeout(tf.content.equalHeight);
}
},
init: function() {
$('#mobile_switchview a.mobile-xor, #util_switchview a.mobile-xor').click(function(){
tf.utils.layoutModer.switchTo(tf.utils.layoutModer._modeDesktop);
return false;
});
$('#mobile_switchview a.desktop-xor, #util_switchview a.desktop-xor').click(function(){
tf.utils.layoutModer.switchTo(tf.utils.layoutModer._modeMobile);
return false;
});
var mode = parseInt(tf.nametag.get('layoutMode'))||parseInt('2');
tf.nametag.add('layoutMode', mode);
this.switchTo(mode);
}
}
if ($) {
$(document).ready(function () {
if (!$.support.placeholder) {
$('[placeholder]')
.focus(function () { if ($(this).val() == $(this).attr('placeholder')) $(this).val(''); })
.blur(function () { if ($(this).val() == '') $(this).val($(this).attr('placeholder')); })
.blur();
$('[placeholder]').parents('form').submit(function () {
$(this).find('[placeholder]').each(function() {
if ($(this).val() == $(this).attr("placeholder")) {
$(this).val('');
}
});
});
}
var makeResponsivPoll=0;
tf.content.makeResponsiveCall = function(){
$('img:not([src=""])').each(function(){
var img = $(this);
if(this.getAttribute('data-echo')) return;
img.toggleClass('responsive',false);
if(img.parents('.sf-scrollbar-table, .no-responsive, .ThumbnailSlider, .ProductIcons').length > 0 || img.hasClass('zoomImg')) return;
if(img.parents('#Content').length == 0 || $(this.offsetParent).parents('#Content').length == 0) return;
var w = img.width(), h = img.height();
if (typeof(img.data('origwidth')) == 'undefined') {
img.data('origwidth', w);
img.data('origheight', h);
}
var w=img.data('origwidth')||w;
if(w!=0){
var $offsetParent=$(this.offsetParent);
if($offsetParent.hasClass('ProductImage')){
if($offsetParent.css('display').indexOf('inline')!=-1){
$offsetParent.css('display','block');
img.css({'margin-left':'auto','margin-right':'auto'});
}
if(w >= $offsetParent.width()) img.toggleClass('responsive',true);
}
else{
if(w > $offsetParent.width()) img.toggleClass('responsive',true);
}
}
});
if (tf.content.equalHeight) tf.content.equalHeight();
if($) {$(tf.content.document).trigger('domChanged');}
}
tf.content.makeResponsive = function(){
clearTimeout(makeResponsivPoll);
makeResponsivPoll = setTimeout(function(){
tf.content.makeResponsiveCall();
makeResponsivPoll = null;
}, 500);
}
$(tf.content.window).resize(tf.content.makeResponsive);
tf.content.makeResponsive();
layoutModer.init();
$('.SwitchCurrencyLink').attr('href', tf.wm.url('changecurrency.html',null,true));
$('.SwitchLangLink').on('click', function(e){
e.preventDefault();
tf.utils.change_lang($(this).data('langparm'));
});
if($('#Search #phrase ~ [class*=cross-icon]').length==0)$('#Search #phrase').after('<span class="cross-icon-1234" title="LD_CANCEL"><i class="icon-cross"></i></span>');
$('.SearchButton').each(function(){
if ($(this).attr('href') == '#') {
if ($(this).hasClass('SearchButtonAdvanced')) $(this).on('click', function(){tf.utils.search_all(1); });
else $(this).on('click', function(e){
e.stopPropagation();
e.preventDefault();
tf.utils.search_all();
});
}
});
$('.SearchTextField').parents('form').on('submit', function(e){
e.preventDefault();
tf.utils.search_all();
});
$(document).on('click', '[class^=cross-icon-123]', function (e) {
e.stopPropagation();
$(this).parent().children('input').val('').focus();
});
});
}
var navRO=tf.navRO,navOvr=tf.navOvr,navOut=tf.navOut,navClk=tf.navClk;
if(typeof(SymRealWinOpen)!='undefined')window.open=SymRealWinOpen;
if(window.NS_ActualOpen){window.open=NS_ActualOpen;}
var str_sep1='~|`';
var shopName='France Chiots',shopRegion='FRB8';
var confLoaded=false;
var region='',regionChanged=false,method='',pmKey='--';
function getCoreProperties(){
return {'active_servers':active_servers,'region':region,'regionChanged':regionChanged,'method':method,'ResellerID':ResellerID,'gmtTime':gmtTime,'reseller':reseller,'pmKey':pmKey};
}
function setCoreProperties(arr){
for(var s in arr){
if(s=='reseller'){tf.merge(reseller,arr[s]);}
else this[s]=arr[s];
}
}
function ld(name,sf,args){var s;if(LD&&name)s=LD[name];if(!LD||!s)s=sf||'';if(args){var sa=s.split('%%');s='';for(var i=0;i<sa.length;i++)if(args[i])s+=sa[i]+args[i];else s+=sa[i];}return s.replace('%%','');}
var d=document;function dw(s){d.write(s);}function gl(s){return d.getElementById(s);}
function isInSFClassic(){try{if(window.external&&typeof(window.external.isInSF)=='number')return window.external.isInSF();else return false;}catch(e){return false;}}
function isInSFull(){try{if(window.external&&typeof(window.external.isFullViewEdit)=='number')return window.external.isFullViewEdit();else return false;}catch(e){return false;}}
function isInSF(){return isInSFClassic()||isInSFull();}
function isInDesigner(){try{return typeof(tf.parent.applyColorScheme)!='undefined';}catch(e){return false;}}
function dw(s){document.write(s);}
if(tf.wm){
tf.wm.rld=function(w,u,p,h){if(w==null)return;if(u==null)w.location.reload();else setTimeout(function(){w.location.assign(tf.wm.url(u,p,h));},100);return;}
tf.wm.pProp=function(id,prop){if(this._pArr==null)this._pArr=[];if(prop!=null)this._pArr[id]=prop;return this._pArr[id];}
tf.wm.pPropStk=function(id,fld,val){if(this._pArr[id])if(typeof(val)!='undefined')this._pArr[id][fld]=val;else return this._pArr[id][fld]}
tf.wm.pPropMin=function(id,val){return this.pPropStk(id,2,val);}
tf.wm.pPropMax=function(id,val){return this.pPropStk(id,3,val);}
tf.wm.pPropQty=function(id,val){return this.pPropStk(id,4,val);}
}
var lang=tf.lang?tf.lang:'fr';
function regionalSettingsObj(rulesList) {
this.defDecimal='.';
this.defThousand=',';
this.defPosition=0;
this.regions=[];
this.region=function(dec,thous,pos) {
this.decimal=dec;
this.thousand=thous;
this.position=pos;
}
for (var i in rulesList) {
switch (rulesList[i].length) {
case 1: this.regions[rulesList[i][0]]=new this.region(this.defDecimal,this.defThousand,this.defPosition);break;
case 3: this.regions[rulesList[i][0]]=new this.region(rulesList[i][1],rulesList[i][2],this.defPosition);break;
case 4: this.regions[rulesList[i][0]]=new this.region(rulesList[i][1],rulesList[i][2],rulesList[i][3]);break;
}
}
this.getCurrentSettings=function() {
return this.getSettings(navigator.language?navigator.language.toLowerCase():navigator.userLanguage.toLowerCase());
}
this.getSettings=function(lang)  {
if(lang&&this.regions[lang])return this.regions[lang];
else if (lang&&lang.length>2&&this.regions[lang.substr(0,2)])return this.regions[lang.substr(0,2)];
else return this.defRegion;
}
this.getMerchantSettings=function() {
return this.getSettings('fr');
}
this.defRegion=new this.region(this.defDecimal,this.defThousand,this.defPosition);
}
var regionalSettings=new regionalSettingsObj([["af",".",",",2],["ar",".",",",2],
["az",",","",3],["be",",","",3],["bg",",","",3],["ca",",",".",3],["cs",",","",3],
["da",",",".",2],["de",",",".",3],["de-at",",",".",2],["de-ch",".","'",2],
["de-li",".","'",2],["de-lu",",",".",3],["div",".",",",3],["el",",",".",3],
["en"],["es",",",".",3],["es-ar",",",".",2],["es-bo",",",".",2],["es-cl",",",".",2],
["es-co",",",".",2],["es-cr",",",".",0],["es-do"],["es-ec",",",".",2],
["es-es",",",".",3],["es-gt"],["es-hn",".",",",2],["es-mx"],["es-ni",".",",",2],
["es-pa",".",",",2],["es-pe",".",",",2],["es-pr",".",",",2],["es-py",",",".",2],
["es-sv"],["es-uy",",",".",2],["es-ve",",",".",2],["et",".","",3],["eu",",",".",3],
["fa","/",",",2],["fi",",","",3],["fo",",",".",2],["fr",",","",3],["fr-be",",",".",3],
["fr-ca",",","",3],["fr-ch",".","'",2],["fr-lu",",","",3],["fr-mc",",","",3],
["gl",",",".",2],["gu",".",",",2],["he",".",",",2],["hi",".",",",2],
["hr",",",".",3],["hu",",","",3],["hy",".",",",3],["id",",",".",0],
["is",",",".",3],["it",",",".",2],["it-ch",".","'",2],["ja"],["ka",",","",3],
["kk","-","",0],["kn",".",",",2],["ko"],["kok",".",",",2],["ky","-","",3],
["lt",",",".",3],["lv",",","",2],["mk",",",".",3],["mn",",","",1],
["mr",".",",",2],["ms",",",".",0],["ms-bn",",",".",0],["nb",",","",2],
["nl",",",".",2],["nl-be",",",".",3],["nn-no",",","",2],["pa",".",",",2],
["pl",",","",3],["pt",",",".",0],["pt-pt",",",".",3],["ro",",",".",3],
["ru",",","",1],["sa",".",",",2],["sk",",","",3],["sl",",",".",3],
["sq",",",".",1],["sr",",",".",3],["sv",",",".",3],["sv-fi",",","",3],
["sw"],["syr",".",",",2],["ta",".",",",2],["te",".",",",2],["th"],
["tr",",",".",3],["tt",",","",3],["uk",",","",3],["ur"],["uz",",","",3],
["vi",",",".",3],["zh"]]);
function def(str) {return (str==null)?'':str;}
function ckCodeStr(obj, order, sep, str)
{
if (str==null) str = '';
function delim(i, s) {return (i==0)?'':s}
var cstr = [];
var arr  = str.split(sep);
var len  = arr.length;
for (var i=0,ii=order.length; i<ii; i++){
var val='';
if(typeof(arr[i])=='string'){
if(len>1){
val=unescape(arr[i]);
val=val.replace(/\\"/g,'"').replace(/&#44;/g,',').replace(/&#45;/g,'-');
}
else val=arr[i].replace(/"/g,'\\"').replace(/,/g,'&#44;').replace(/-/g,'&#45;');
}
else{arr[i];}
if(val=='false'||val=='true')val=eval(val);
else {
if (typeof(val)=='string')val=val.replace(/[\n\r]/g,' ').replace(/"/g,'\\"');
val = (isNaN(val)||val=='')?'"'+val+'"':parseFloat(val);
}
val	= (len>1)?'='+val:'';
val = eval('obj.'+order[i]+val);
val = (val == 'undefined'||typeof(val)=='undefined'?'':val);
cstr.push(delim(i,sep) + def(len>1?val:escape(val)));
}
if (typeof(obj.xcode)=='function') cstr.push(sep + obj.xcode((str!='')?arr[i]:''));
return cstr.join('');
}
var ResellerID='';
var ResellerPasswd='';
function smart_unescape(s) {
try {
return unescape(s);
} catch (e) { return s;}
}
function smart_escape(s) {
if(window.encodeURI) return encodeURI(s);
else return escape(s)
}
function savCookStr(name,val,days) { tf.sfPersist.set(name,val,days); }
function delCookStr(name) { tf.sfPersist.set(name,'',0); }
function getCookStr(name) { return tf.sfPersist.get(name); }
function numeric(fmt, dp)
{
this.cvt = numCvt;
this.fmt = numFmt;
this.display = numDisplay;
this.parse = numParse;
this.delim = numDelim;
this.round = numRnd;
this.toLoc = numToLoc;
this.fromLoc = numFromLoc;
this.getDecPlaces=numDecimalPlaces;
this.roundTotalTable=[];
this.roundTotal=numRndTotal;
this.roundTotalSetup=numRndTotalSetup;
this.roundTotalSetup();
this.fmt(fmt, dp);
return this;
}
function numDelim() {return this.del2};
function numFmt(fmt, dp)
{
if(!regionalSettings.getCurrentSettings())
this.settings=regionalSettings.getMerchantSettings();
else
this.settings=regionalSettings.getCurrentSettings();
this.del2=this.settings.decimal;
this.del1=this.settings.thousand;
this.pos=this.settings.position;
this.dec_sep='.';
this.dec_num=tf.currentCurrency.decimal_places;
this.dec = (!dp||isNaN(dp))?1/Math.pow(10,this.dec_num):parseFloat(dp);
}
function numCvt(val, del)
{
var len = val.length;
if (len <= 3) return val;
if (val < 0 && len <= 4) return val;
var rem = this.cvt(val.substring(0, len - 3), del);
var dig = val.substring(len - 3, len);
if (rem == '') del = '';
return rem+del+dig;
}
function numToLoc(val)
{
val=''+val;val=val.replace(/^0*/,'');
var a=val.split(this.dec_sep);
if(a.length==1)return ''+parseFloat(val.replace(this.del2,''));
if(a.length>1){
if(!a[0])a[0]='0';if(!a[1])a[1]='0';
return ''+parseInt(a[0])+this.del2+a[1];
}
else return val;
}
function numFromLoc(val)
{
val=''+val;val=val.replace(/^0*/,'');
var a=val.split(this.del2);
if(a.length==1)return ''+parseFloat(val.replace(this.del1,''));
if(a.length>1){
if(!a[0])a[0]='0';if(!a[1])a[1]='0';
return ''+parseInt(a[0])+this.dec_sep+a[1];
}
else return val;
}
function numRnd(val,dp,roff)
{
var ret=val;
if (dp==null){ dp = this.dec; var dn=parseFloat(this.dec_num); }
else var dn=(1/dp).toString().length-1;
if (roff) return Math.round(val/roff)*roff;
if(!dp)return val;
var pow=Math.pow(10, dn+1);
return Math.round((val/dp)+(dn>0?1/pow:0))/(1/dp);
}
function numDecimalPlaces(v)
{
var s=v.toString();
s=s.substr(s.indexOf('.')+1);
return 1/Math.pow(10,s.length);
}
function numDisplay(val, dp, curSym)
{
if (dp==null) dp = this.dec;
val = this.round(val,1/Math.pow(10,dp)).toString();
var idx = val.indexOf(this.dec_sep);
var itr = (idx == -1)?val:val.substring(0, idx);
var dec = (idx == -1)?'':val.substring(idx+1, idx+dp+1);
itr = this.cvt(itr, this.del1);
for (var i=dec.length;i<dp; i++) dec += '0';
var ret=(dp<1)?itr:itr + this.del2 + dec;
switch(this.pos) {
case 1: ret=ret+curSym;break;
case 2: ret=curSym+' '+ret;break;
case 3: ret=ret+' '+curSym;break;
default: ret=curSym+ret;break;
}
return ret;
}
function numParse(str,dec)
{
str=str.toString();
if (str=='') return 0;
function _chg(s,del) {
var idx = s.indexOf(del);
if (idx == -1) return s;
var ts = s.substring(0, idx) + _chg(s.substring(idx+1, s.length));
return ts;
}
var pwr = Math.pow(10, (dec==null)?1:dec);
return (Math.round(parseFloat(_chg(str,this.del1))*pwr)/pwr);
}
function numRndTotalSetup()
{
var a='CHF,0.05;'.split(';');
for(var n=0,l=a.length;n<l;++n)
{
if(a[n])
{
var nv=a[n].split(',');
if(nv[0]&&nv[1])this.roundTotalTable[nv[0]]=parseFloat(nv[1]);
}
}
}
function numRndTotal(val,iso)
{
var rnd=this.roundTotalTable[iso];
if(rnd){
val=Math.round(val/rnd)*rnd;
}
return val;
}
var hexdelim	= "O";
var chrsz	= 8;
var hexcase = 0;
var b64pad  = "";
function add(s) {return binb2hex(core_sha1(str2binb(s),s.length * chrsz))}
function core_sha1(x, len)
{
x[len >> 5] |= 0x80 << (24 - len % 32)
x[((len + 64 >> 9) << 4) + 15] = len
var w = Array(80)
var a =  1732584193
var b = -271733879
var c = -1732584194
var d =  271733878
var e = -1009589776
for(var i = 0,ii=x.length; i < ii; i += 16)
{
var olda = a,oldb = b,oldc = c,oldd = d,olde = e;
for(var j = 0; j < 80; j++)
{
if(j < 16) w[j] = x[i + j];
else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1)
var t = safe_add(safe_add(rol(a, 5), ft(j, b, c, d)),
safe_add(safe_add(e, w[j]), kt(j)))
e = d
d = c
c = rol(b, 30)
b = a
a = t
}
a = safe_add(a, olda)
b = safe_add(b, oldb)
c = safe_add(c, oldc)
d = safe_add(d, oldd)
e = safe_add(e, olde)
}
return Array(a, b, c, d, e)
function ft(t, b, c, d)
{
if(t < 20) return (b & c) | ((~b) & d);
if(t < 40) return b ^ c ^ d;
if(t < 60) return (b & c) | (b & d) | (c & d);
return b ^ c ^ d;
}
function kt(t)
{
return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
(t < 60) ? -1894007588 : -899497514;
}
}
function safe_add(x, y)
{
var lsw = (x & 0xFFFF) + (y & 0xFFFF)
var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
return (msw << 16) | (lsw & 0xFFFF)
}
function rol(num, cnt)
{
return (num << cnt) | (num >>> (32 - cnt))
}
function str2binb(str)
{
var bin = Array()
var mask = (1 << chrsz) - 1
for(var i = 0,ii=str.length * chrsz; i < ii; i += chrsz)
bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32)
return bin
}
function binb2hex(binarray)
{
var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", a = [];
for(var i = 0, num = binarray.length * 4; i < num; i++)
{
a.push(hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF));
}
return a.join('');
}
function place(s) {
var a=[];
for (var x = 0, num = s.length; x < num; x++) {
a.push(s.charCodeAt(x).toString(16));
}
return a.join('');
}
function show(v) {
var a=[];
if((v.length%2)==0){
for (var x = 0, num = v.length; x < num; x+=2) {
a.push(String.fromCharCode(parseInt(v.charAt(x)+v.charAt(x+1),16)));
}
}
return a.join('');
}
var crFFldImager={
img:new Image(),
prgImg:null,
gl:function(id){return tf.content.document.getElementById(id);},
elParS:null,
outerHTML:function(el){
var elPar=el.parentNode;
var elNew=tf.content.document.createElement(elPar.nodeName);
elNew.appendChild(el);
var html=elNew.innerHTML;
elPar.appendChild(el);
return html;
},
scale:function(mW, mH, cW, cH){
if(cW<mW&&cH<mH)return[cW,cH];
var r=cH/cW,cx=mW,cy=parseInt((mW*r)+0.5);
if(cy>mH){ r=cW/cH; cx=parseInt((mH*r)+0.5); cy=mH; }
return [cx,cy];
},
replace:function(prid,id){
if(this.busy){setTimeout(function(){tf.core.crFFldImager.replace(prid,id);},50);return;}
this.busy=true;
var elImg=this.gl('I'+prid),elPImg=this.gl('ProductImage-'+[prid]);
if(elImg&&elPImg){
this.elParS=elPImg.style;
var elChImg=this.gl('ChoiceImage-'+id)||this.gl('ProductMoreImages-'+id)||this.gl('ChoiceImage-'+prid)||this.gl('ProductThumbnailImage-'+prid),isHTML=elChImg&&(elChImg.getAttribute('filetype')=='html'||elChImg.getAttribute('mediatype')=='HTML');
var elPar=elImg.parentNode,origw=elPImg.parentNode.offsetWidth||elImg.offsetWidth,origh=elPImg.parentNode.offsetHeight||elImg.offsetHeight;
if(!elImg.getAttribute('origsrc')){
var elPImgParS=elPImg.parentNode.style,origsrc=elImg.src||this.outerHTML(elImg);
elPImgParS.height=elPImg.parentNode.offsetHeight+'px';
elPImgParS.width=elPImg.parentNode.offsetWidth+'px';
if(elPImg.parentNode.className.indexOf('ImgLink')!=-1)elPImg.parentNode.style.overflow='hidden';
}
function createNew(nodeName,prid,el,elPar){
if(el.nodeName!=nodeName){
el.parentNode.removeChild(el);
el=tf.content.document.createElement(nodeName);
el.id='I'+prid;
el.setAttribute('origmm',true);
if(!el.parentNode){
el=elPar.insertBefore(el,elPar.childNodes[0]||null);
}
}
return el;
}
if(isHTML){
elImg=createNew('SPAN',prid,elImg,elPar);
}
else{
elImg=createNew('IMG',prid,elImg,elPar);
}
if(!elImg.getAttribute('origsrc')){
elImg.setAttribute('origsrc',origsrc);
}
elImg.setAttribute('origw',origw);
elImg.setAttribute('origh',origh);
jQuery(elImg).siblings('.zoomImg').remove();
if(elChImg){
this.elParS.margin='0 auto';
var elImgCap=this.gl('ProductImageCaption-'+prid);
if(elImgCap&&!elImgCap.getAttribute('origtext')){
elImgCap.setAttribute('origtext',elImgCap.innerHTML);
}
if(id||elChImg.className.indexOf('NoImage')==-1){
this.img=new Image();
this.img.onload=function(){
elImg.src='';
var cfi=tf.core.crFFldImager,newSize=cfi.scale(elImg.getAttribute('origw'),elImg.getAttribute('origh'),this.width,this.height);
elImg.src=this.src;
elImg.width=newSize[0];
elImg.height=newSize[1];
elImg.setAttribute('border','0');
elImg.style.marginTop='0';
elImg.style.top='0';
$(elPar).toggleClass('no-responsive', true);
cfi.prgImg.style.visibility='hidden';
cfi.elParS.width=newSize[0]+'px';
cfi.elParS.height=newSize[1]+'px';
var pici=cfi.gl('pici-'+prid);
if(pici){
pici.style.display='block';
pici.style.position='absolute';
pici.style.right='5px';
pici.style.bottom='5px';
}
if(elImgCap){
elImgCap.innerHTML=elChImg.getAttribute('title')||elChImg.getAttribute('description')||'&nbsp;';
if(!tf.isIE7){
elImgCap.style.position='relative';
elImgCap.style.clear='both';
}
}
jQuery(elImg).siblings('.zoomImg').remove();
cfi.busy=false;
}
this.img.onerror=function(){
var cfi=tf.core.crFFldImager;
cfi.busy=false;
elImg.style.visibility='hidden';
}
elPImg.setAttribute('jumptoid',elChImg.id);
if(!this.prgImg){
this.prgImg=tf.content.document.createElement('i');
this.prgImg.className='icon-spinner2 icon-fa-spin';
this.prgImg.style.position='absolute';
this.prgImg.style.marginTop='-0.5em';
this.prgImg.style.top='50%';
this.prgImg.style.marginLeft='-2em';
this.prgImg.style.left='50%';
this.prgImg.style.fontSize='2em';
this.prgImg=elPImg.parentNode.insertBefore(this.prgImg,elPImg.parentNode.childNodes[0]||null);
}
var mysrc=elChImg.getAttribute('tn')||elChImg.getAttribute('href');
if(mysrc!==''){
if(isHTML){
elImg.parentNode.style.background = '';
elImg.style.visibility='visible';
var newSize=this.scale(elImg.getAttribute('origw'),elImg.getAttribute('origh'),elChImg.getAttribute('mw'),elChImg.getAttribute('mh'));
newSize[1]=elImg.getAttribute('origh')-18;
elImg.innerHTML=tf.utils.sfMediaBox.getMMHTMLUsingExtraction('',window.decodeURIComponent(mysrc),newSize[0],newSize[1]);
elImg.style.display='inline-block';
elImg.style.width='auto';
elImg.style.height='auto';
elPImg.parentNode.style.height='auto';
var pici=this.gl('pici-'+prid);
if(pici){
pici.style.position='static';
pici.style.styleFloat='right';
pici.style.cssFloat='right';
elPar.appendChild(pici);
}
this.busy=false;
}
else{
elImg.parentNode.style.background = '';
elImg.style.visibility='visible';
this.prgImg.style.visibility='visible';
elImg.style.position='relative';
elImg.style.display='block';
if(this.gl('pici-'+prid))this.gl('pici-'+prid).style.display='none';
this.img.src=tf.wm.url(mysrc).replace('contents/contents/media/','contents/media/');
}
if(tf.content['ProductImageGroupSizer_'+prid])setTimeout(tf.content['ProductImageGroupSizer_'+prid],100);
jQuery(elImg).siblings('.zoomImg').remove();
} else {
this.busy = false;
}
}
else{
elImg.parentNode.style.background='url(../media/no_image.png) center no-repeat';
elImg.style.visibility='hidden';
this.busy=false;
}
}
else{
this.busy=false;
}
}
}
};
var tsI=[],tsIx=[];
function load_add(d,type,id,title,weight,orderNo,useDec,esd,taxes,prd_cd,man_cd,dst_cd,prc_cd,opt,issf,s,minorder,temp) {
var ret=false;
if (!isNaN(prd_cd)) prd_cd+='%%P';
var qnty;
if (isNaN(qnty) || !qnty || (qnty<0)) qnty=1;
if (tf.coreLoaded&&issf!=true) {
var bt;
ret=bt.parse(id,d,qnty,title,weight,orderNo,useDec,esd,taxes,opt,prd_cd,man_cd,dst_cd,prc_cd,null,false,temp,type);
} else if (confirm(ld('LD_ENTER_SHOP','Pour acheter ce produit vous devez entrer dans la boutique. Souhaitez-vous accéder à la boutique maintenant ?'))) {
location = s+'#'+id.toLowerCase();
}
return ret;
}
function prodTypeCode(type,prd) {
var code = '';
switch (type){
case 0: // Brand
code = prd[14];
break;
case 1: // ManufacturerCode
code = prd[11];
break;
case 2: // ProductCode
code = prd[9];
break;
case 3: // DistributorCode
code = prd[12];
break;
case 4: // PriceCode
code = prd[13];
break;
case 5: // DiscountCode
code = prd[23];
break;
}
return code;
}
var nfmt=new numeric(',','');
tf.coreLoaded=true;
try{tf.content.core=this.window;}catch(e){}
tf.core=core=this.window;
tf.core=this.window;
tf.utils=this.window;
if($)$(tf).trigger('coreLoaded');
ldjs('../../../shared_files/menu_scroller.js');
/*$Revision: 45678 $
$HeadURL: svn://3d3-p432/ShopFactory/branches/V14_60/bin/Common%20Files/parseLang/sf.js $*/
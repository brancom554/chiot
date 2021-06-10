// <script>
// Begin: init.js
function escapeUTF8(fld) {
if(fld=='')return'';
var s=fld,encodedField=(typeof encodeURIComponent=='function'?encodeURIComponent(s):escape(s));
return encodedField;
}
function unescapeUTF8(fld){
if(fld=='')return'';
var s=fld,encodedField='';
if(typeof decodeURIComponent=='function'){
try {encodedField=decodeURIComponent(s);}
catch(e){encodedField=unescape(s);}
}
else encodedField=unescape(s);
return encodedField;
}
var XML_CHAR_MAP = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' };
function escapeForXML(s) { return s.replace(/[<>&"']/g, function(ch){ return XML_CHAR_MAP[ch]; }); }
function isInSFClassic(){try{if(window.external&&typeof(window.external.isInSF)=='number')return window.external.isInSF();else return false;}catch(e){return false;}}
function isInSFull(){try{if(window.external&&typeof(window.external.isFullViewEdit)=='number')return window.external.isFullViewEdit();else return false;}catch(e){return false;}}
function isInSF(){return isInSFClassic()||isInSFull();}
function isInDesigner(){try{return typeof(tf.parent.applyColorScheme)!='undefined';}catch(e){return false;}}
function dw(s){document.write(s);}
var d=document,loc=d.location,nav=navigator,wnd=window;
var tf=t=LD=this,content=this,s;
var av=navigator.appVersion,ua=navigator.userAgent,isOpera=window.opera,isIE5=(av.indexOf('MSIE 5')!=-1),isIE6=window.ActiveXObject&&!window.XMLHttpRequest,isIE8=(av.indexOf('MSIE 8')!=-1),isIE9=(av.indexOf('MSIE 9')!=-1),isIE10=(av.indexOf('Trident/6.0')!=-1),isIE11=(av.indexOf('Trident/7.0')!=-1),isIE7=window.ActiveXObject&&window.XMLHttpRequest&&!isIE8&&!isIE9&&!isIE10&&!isIE11,isIE=isIE5||isIE6||isIE7||isIE8||isIE9||isIE10||isIE11,isIEBefore10=isIE5||isIE6||isIE7||isIE8||isIE9,isiPhone=ua.match(/(?:iPhone|iPod)/i),isTabletDevice=!!ua.match(/(?:tablet)/i),isMobileDevice=!!ua.match(/(?:mobile)/i),isSafari=(d.childNodes&&!d.all&&!navigator.taintEnabled),isChrome=(ua.toLowerCase().indexOf('chrome')>-1),isMobile_LargePortrait=false,isMobile_SmallLandscape=false,isMobile_SmallPortrait=false,isMobile=isMobile_LargePortrait||isMobile_SmallLandscape||isMobile_SmallPortrait;
var mobileDetectorHandlers={};
function mobileDetector(){
var wWin=Math.min(window.screen.width,window.innerWidth),hWin=Math.min(window.screen.height,window.innerHeight);
isMobile_LargeLandscape=((wWin>=768&&wWin<=1240)&&(wWin>hWin));
isMobile_LargePortrait=((wWin>=768&&wWin<=978)&&(wWin<hWin));
isMobile_SmallLandscape=((wWin<=767)&&(wWin>hWin));
isMobile_SmallPortrait=((wWin<=395)&&(wWin<hWin));
isMobile_Small=(wWin<=767);
isMobile=isMobile_LargeLandscape||isMobile_LargePortrait||isMobile_SmallLandscape||isMobile_SmallPortrait||isMobile_Small;
var hl=mobileDetectorHandlers;for(var n in hl)hl[n]();
}
mobileDetector();
var core,utils,ship_obj,shipping,conf,price,minicart,resellerForm,resell='',lang=d.documentElement.lang,baseLang='fr',currRates=[],lastpage='',lastdeptpage='',testShop=0,isSFXTheme=true;
var enterFilename='index.html';
var xLoaded=false,coreLoaded=false,greyLoaded=false,LD_loaded=false,xCalled=false,cntyListLoaded=false,langEnterLoaded=false,bskLoaded=false;
var LMD_this='44348.653819',lmd=[],wssig=loc.href.replace(/\\/g,'/').replace(new RegExp('(\/'+tf.lang+')?\/contents\/.*?$|(\/'+tf.lang+')?\/([^/]*){1}$'),'/');
var sfFilters={listStyle:'sfx-372_1',gridStyle:'sfx-102_1',defStyleType:'L',dispFilterTypes:';'.replace(/;/g,','),sub:1,fold:parseInt('1'),pv:'http://localhost:50324/'};
var scr={
load:function(id,url,onload){
this.rmv(id);
var scr=d.createElement('script');
scr.type='text/javascript';
if(onload)scr.onload=onload;
scr.id=id;
scr.src=url;
d.getElementsByTagName("head")[0].appendChild(scr);
},
rmv:function(id){var el=gl(id);if(el)d.getElementsByTagName("head")[0].removeChild(el);}
};
var cssLink = {
load:function(id, url, d){
var doc = d || document;
this.rmv(id);
var s = doc.createElement('link');
s.rel = 'stylesheet';
s.type = 'text/css';
s.id = id;
s.href = url;
doc.getElementsByTagName("head")[0].appendChild(s);
},
rmv:function(id, d){
var doc = d || document;
var el = doc.getElementById(id);
if (el) doc.getElementsByTagName("head")[0].removeChild(el);
}
};
var sfNameStorage = {
storageType:'nameStorage',
getItem : function (t) {
if (t != 'sig' && t != 'wssig' && !this.valid())
return '';
var tt = '<' + t + '>',
p = tf.name.indexOf(tt);
if (p == -1)
return '';
else
return tf.name.substring(p + tt.length, tf.name.indexOf('</' + t + '>'));
},
setItem : function (t, v) {
if (this.valid())
this.removeItem(t);
tf.name = tf.name + '<' + t + '>' + v + '</' + t + '>';
},
removeItem : function (t) {
tf.name = tf.name.replace(new RegExp('<' + t + '>(?:.|[\n\r])*?</' + t + '>'), '');
},
valid : function () {
var ss = '<sig>' + tf.wssig + '</sig>';
if (typeof(tf.wssig) != 'undefined' && this.getItem('sig') == '')
tf.name += ss;
else if (this.getItem('sig') != tf.wssig) {
this.removeItem('sig');
tf.name += (tf.wssig ? ss : '');
return false;
}
return true;
}
};
function sfStore(t) {
try {
this.oStore = window[t + 'Storage'] || null;
if (typeof this.oStore === 'object') {
try {
this.oStore.setItem('localStorage', 1);
this.oStore.removeItem('localStorage');
} catch (e) {
// We have to revert to using window.name here
this.oStore = sfNameStorage;
}
}
}
catch (e) {
this.oStore = sfNameStorage;
}
this.id = '44348.653819';
this.idName = wssig;
this.idGrace = (parseInt(this.id)-2)+'.'+this.id.split('.')[1];
this.del = function (name) {
var idName=(this.oStore.storageType=='nameStorage'?name:name+'|'+this.idName);
if (this.oStore) {
this.oStore.removeItem(idName + '_test');
this.oStore.removeItem(idName);
this.oStore.removeItem(idName + '_expires');
}
}
this.get = function (name) {
var me = this,sCookie = '',idName=(me.oStore.storageType=='nameStorage'?name:name+'|'+me.idName);
if (me.oStore) {
var sTest = me.oStore.getItem(idName + '_test');
if (sTest >= me.idGrace) {
var sDate = me.oStore.getItem(idName + '_expires'),
date = new Date(sDate),
now = new Date();
if (date > now) {
sCookie = unescape(me.oStore.getItem(idName)) || '';
}
}
if (!sCookie) {
me.del(idName);
}
} else {
sCookie = document.cookie;
var aCookie = sCookie.split('; '),
sTest = aCookie['test'];
for (var n = 0, nn = aCookie.length; n < nn; n++) {
var ss = aCookie[n].split('=');
if (ss[0] == 'test')
sTest = ss[1];
else if (ss[0] == idName)
sCookie = unescape(ss[1]);
}
sCookie = (sTest >= me.idGrace ? sCookie : '');
if (!sCookie) {
var sGMT = '=0000; expires=Fri, 31 Dec 1990 23:59:59 GMT';
document.cookie = 'test' + sGMT;
document.cookie = idName + sGMT;
}
}
return sCookie;
}
this.set = function (name, val, days) {
var me = this,exp = new Date(),idName=(me.oStore.storageType=='nameStorage'?name:name+'|'+me.idName);
if (typeof(days) == 'undefined')
days = -1;
if (days != '') {
if (days == -1) {
exp.setYear(2030);
exp.setMonth(1);
exp.setDate(1);
} else
exp.setTime(exp.getTime() + (24 * 60 * 60 * 1000 * days));
}
var sTest = me.id,
sCookie = (days == 0 ? '' : escape(val));
if (me.oStore) {
try {
if (days == 0) {
me.del(name);
} else {
me.oStore.setItem(idName + '_test', sTest);
me.oStore.setItem(idName, sCookie);
me.oStore.setItem(idName + '_expires', exp.toGMTString());
}
} catch (e) {
if (e.name == 'QUOTA_EXCEEDED_ERR') {
return sCookie;
}
}
} else {
document.cookie = 'test=' + sTest + '; expires=' + exp.toGMTString();
document.cookie = idName + '=' + sCookie + '; expires=' + exp.toGMTString();
}
return sCookie;
}
};
var sfSession=new sfStore('session');
var sfPersist=new sfStore('local');
//add refcount for multiple browser session. Increment for each new window. Decrement each onclose. When count is 0 onclose, clear the storage.
var nametag={
get:function(t){if(t!='sig'&&t!='wssig'&&!this.valid())return'';var val=sfSession.get(t);return(val?val:'');},
add:function(t,v){if(this.valid())this.del(t);sfSession.set(t,v);},
del:function(t){sfSession.set(t,null,0);},
valid:function(){if(typeof(tf.wssig)!='undefined'&&this.get('sig')=='')sfSession.set('sig',tf.wssig);else if(this.get('sig')!=tf.wssig){this.del('sig');sfSession.set('sig',tf.wssig?tf.wssig:'');return false;}return true;}
};
var sfqs=nametag.get('sfqs'),q=loc.search+'&'+sfqs,parm=[];
nametag.del('sfqs');
if(q!=""){
var pairs=q.substring(1,q.length).split('&'),len=pairs.length;
for(var i=0;i<len;i++){
temp=pairs[i].split('=');
parm[unescapeUTF8(temp[0])]=unescapeUTF8(temp[1]).replace(/\+/g,' ');
}
}
if(nametag.get('lang'))parm['lang']=nametag.get('lang');
if(parm['product']){tf.location.hash='#'+parm['product'];}
if(!isInSF()){
function buildURL(qtarget,qlang){
var hrefpart='',target=tf.location.pathname.replace(/([^\?]*[\/\\])?(.*?)/,'$2'),isRoot=((target==enterFilename||!target)&&!tf.location.pathname.match(/\/contents\//));
var h=(loc.protocol.indexOf('file:')==-1?'':'file://')+loc.pathname.replace(/\\/g,'/'),re=new RegExp((tf.lang==tf.baseLang?'':'(?:\/'+tf.lang+')?')+'(?:\/contents\/.*?$|\/([^/]*){1}$)');
hrefpart=h.replace(re,'/');if(!qlang)qlang=tf.lang;
if((target&&!isRoot)||qtarget)hrefpart+='contents/';
if((qlang&&qlang!=baseLang)||(target&&!isRoot)||qtarget){hrefpart+=qlang+'/';}
if(qtarget.indexOf('://')==-1){
if(qtarget&&target!=qtarget){hrefpart+=qtarget;}
if(!qtarget&&target){hrefpart+=target;}
if(!qtarget&&!target){hrefpart+=enterFilename;}
}
else hrefpart+='otherurl.html?url='+escape(qtarget);
var q=[];for(var n in tf.parm){if(n!=''&&n!='target'&&n!='lang')q.push(n+'='+tf.parm[n]);}
return hrefpart+(q.length>0?'?':'')+q.join('&');
}
var qtarget=parm['target'],qlang=parm['lang'];
if(qtarget||qlang){
var hrefpart=buildURL(qtarget?qtarget:'',qlang);
s=hrefpart+location.hash;
if(hrefpart.indexOf(location.pathname) != 0) location.replace(s);
else if(location.pathname!=hrefpart)location.replace(s);
}
}
// End: init.js
var clickThrough=getARMID('mid'),rid=getARMID('rid');
var sfqsLinkTo='';
function linkTo(pr,pg){
if(!tf.utils){setTimeout(function(){linkTo(pr,pg);},100);return;}
function linkToCallback(f,prid,pgid){
if(tf.pgid.toLowerCase()!=prid&&(tf.content.location.href.indexOf('/'+f)==-1||tf.content.location.hash!='#'+prid)){
f=unescapeUTF8(f);
tf.content.location=tf.wm.url(f,'-',true)+sfqsLinkTo+(prid?'#'+prid.toLowerCase():'');
}
}
if(tf.isIE){
function descroll() {
var el=gl('WebSite'),tfcdb=tf.content.document.body;
if(!el||(el.scrollWidth>el.offsetWidth&&el.scrollLeft==0&&tfcdb.scrollLeft==0)){setTimeout(descroll,50);return;}
el.scrollLeft=0;
if(tfcdb)tfcdb.scrollLeft=0;
}
setTimeout(descroll,100);
}
if(typeof(pg)=='undefined')pg='';
tf.utils.prpgmap.getParentPage(pr,pg,linkToCallback);
}
if(location.hash){
if(location.hash.substr(1))linkTo(location.hash.substr(1),location.pathname.replace(/.*\/(d\d*)(_.*)?\.html/,'$1'));
}
else if(tf.parm['targetid']){
var q=[];for(var n in tf.parm){if(n!=''&&n!='targetid'&&n!='target'&&n!='lang')q.push(n+'='+tf.parm[n]);}
if(q.length>0)sfqsLinkTo='?'+q.join('&');
linkTo('',tf.parm['targetid']);
}
var splitNum=100;
if(parm['lang']){lang=langNav=parm['lang'];}
function debounce(fn, wait) {
var timeout=null;
var c=function(){ clearTimeout(timeout); timeout=null; };
var t=function(fn){ timeout=setTimeout(fn,wait); };
return function() {
var context=this;
var args=arguments;
var f=function(){ fn.apply(context,args); };
timeout ? c()||t(f) : t(f);
}
}
var debounce2=debounce;
function winMgr(){this._a=[];this._rnd=Math.random();this.online=(loc.protocol.indexOf('file:')==-1);var h=(this.online?'':'file://')+loc.pathname.replace(/\\/g,'/');var re=new RegExp((tf.lang==tf.baseLang?'':'(?:\/'+tf.lang+')?')+'(?:\/contents\/.*?$|\/([^/]*){1}$)');this.baseurl=(isInDesigner()?unescape(this.path(tf.location)).replace(/\/contents\/.*/,'').replace(/\/$/,'')+'/contents/':h.replace(re,'/')+'contents/');var hostRaw=this.path(tf.location);this.host=escape(hostRaw);this.hostbaseurl=hostRaw.replace(/\/contents\/.*/,'') + '/';}
winMgr.prototype.url=function(f,a,l){
var ff=unescapeUTF8(f),unescaped=(ff!=f);
if(ff.indexOf(':\\')!=-1||ff.indexOf('://')!=-1)return f;
if(ff.substr(0,3)=='../'){f=ff.substr(3);if(unescaped) { f=escapeUTF8(f); f = f.replace(/\%2F/g, '/');}}
if(!a&&a!='-'){
// Reload loader every minute
var d = new Date(); var exp = 60000;
var loaderDate=tf.nametag.get('winMgr_loaderDate');
if (!loaderDate) {
loaderDate = Math.round(d.getTime() / exp);
tf.nametag.add('winMgr_loaderDate', loaderDate);
}
var n = Math.round(d.getTime() / exp);
if(n != loaderDate)
{
loaderDate = n;
tf.nametag.add('winMgr_loaderDate', loaderDate);
}
a = loaderDate;
}
if(a=='f' && tf.lmd && lmd['index'])
a = lmd['index'];
if(typeof(l)!='undefined'&&l==true)f=tf.lang+'/'+f;
return (a=='-')?this.baseurl+f:this.add2Q(this.baseurl+f,'lmd',a);
}
winMgr.prototype.add2Q=function(h,p,v){
if(h.indexOf('?')==-1)return h+'?'+p+'='+v;
if(h.indexOf(p)==-1)return h+'&'+p+'='+v;
var t=h.replace('?','&').split('&');
for(var i=0;i<t.length;i++)if(t[i].indexOf(p+'=')==0)t[i]=p+'='+v;
if(t.length>1) t[1]='?'+t[1];return t.join('&').replace('&?','?');
}
winMgr.prototype.jfile=function(f,q){
var ff=unescape(f),unescaped=(ff!=f);
if(ff.indexOf('?')>-1){ff=ff.substr(0,ff.indexOf('?'));if(unescaped)f=escape(ff);}
var m=Math.max(f.lastIndexOf('/'),f.lastIndexOf('\\'));
return (m>-1)?f.substring(m+1):f;
}
winMgr.prototype.path=function(p){
p=p.toString();
var pp=unescape(p.toString()),unescaped=(pp!=p);
var i=pp.indexOf('?');if(i!=-1)pp=pp.substring(0,i);
if(unescaped)p=escape(pp);
return (p.charAt(p.length-1)=='/')?p:p.substring(0,p.lastIndexOf('/')+1);
}
var wm=new winMgr();
dw('<scr'+'ipt src="'+wm.url('date.js')+'"><\/sc'+'ript>');
function showalerts(){
if(!langEnterLoaded){setTimeout('showalerts()',100);return;}
}
if(typeof(lmd['index'])=='string'&&LMD_this!=lmd['index']&&location.href.indexOf('lmd=')==-1)
loc.replace(tf.enterFilename+location.search+(location.search?'&':'?')+'lmd='+lmd['index']+location.hash);
else{
showalerts();
tf.sfPersist.set('storebasket',1,-1);
var currencies={};
function currency(i,a,m,d,s){
this.iso=i;
this.abbrev=a;
this.multiplier=m;
this.decimal_places=d;
this.sign=s;
this.getSignedID=function(){return this.iso+'/'+this.sign;}
}
var shopCurrency=new currency("EUR","€",1.0,2,'3DA60434798B9497E869E158C43F5C28');
var currentCurrency=new currency("EUR","€",1.0,2,'3DA60434798B9497E869E158C43F5C28');
var secondCurrency=null;
var mfhObj=null;
function mfh(id,idx1H,idx2H,forFullWidth){
var tfc=content;
this.forFullWidth=forFullWidth;
this.gl=function(s){return tfc.document?tfc.document.getElementById(s):null;}
this.initialised=false;
this.isDescendantOf=function(idParent,idChild){
var ret=false,el=gl(idChild),elParent=null;
if(el)elParent=el.parentNode;
while(elParent){
if(elParent.id==idParent){ret=true;break;}
elParent=elParent.parentNode;
}
return ret;
}
this.applyms=function(){
if(utils&&typeof(utils.ms)=='function'&&gl('idx1Navigation')&&gl('idx2Navigation')){
var h=Math.max(mfhObj.height, 0),idxMinHeightApplyMS=100;
for(var i=1;i<=2;i++){
var idNav='idx'+i+'Navigation',idxH=(i==1?idx1H:idx2H),elNav=gl(idNav),elId=gl(id);
if(mfhObj.isDescendantOf(id,idNav)){
var hh=h;
if(elNav){
var el=elNav,elParent=el.offsetParent;
while(elParent&&elParent.id!=id){
el=elParent;
elParent=elParent.offsetParent;
}
var rectOuter=el.getBoundingClientRect(),rect=elNav.getBoundingClientRect();
var offh=0;
for(var j=0,jj=el.childNodes.length;j<jj;j++){
if(el.childNodes[j].nodeType==1&&!mfhObj.isDescendantOf(el.childNodes[j].id,idNav)){
offh+=(el.childNodes[j].innerHTML.length>0?el.childNodes[j].offsetHeight:0);
}
}
hh=el.offsetHeight-offh-16;
if(hh<idxMinHeightApplyMS)hh=idxMinHeightApplyMS;
if(hh>rectOuter.bottom-rect.top){
hh=rectOuter.bottom-rect.top;
}
}
if(idxH>0&&idxH<hh)hh=idxH;else if(idxH<0)hh+=idxH;
for(var n=0,num=tfc.aMS.length;n<num;n++){if(tfc.aMS[n][0]==idNav){tfc.aMS[n]=[idNav,0,hh,true];break;}}
}
else{
var elPar=elNav.offsetParent;
if(elPar){
if(elPar&&elPar.currentStyle)var pos=elPar.currentStyle.position;
else var pos=d.defaultView.getComputedStyle(elPar, '').position;
var hh=(pos=='absolute'?elNav.offsetTop:elPar.offsetTop);
for(var n=0,num=tfc.aMS.length;n<num;n++){if(tfc.aMS[n][0]==idNav&&tfc.aMS[n][2]){tfc.aMS[n]=[idNav,0,tfc.aMS[n][2]-hh,true];break;}}
}
}
if(elNav){
var w=elNav.parentNode.parentNode.offsetWidth-4;
for(var n=0,num=tfc.aMS.length;n<num;n++){if(tfc.aMS[n][0]==idNav&&tfc.aMS[n][1]){tfc.aMS[n]=[idNav,w,tfc.aMS[n][2],true];break;}}
}
}
var cnt=tfc.aMS.length,a;
for(var n=0;n<cnt;n++){a=tfc.aMS[n];utils.ms(a[0],a[1],a[2],a[3]);if(tf.isIE6)mfhObj.redraw(tf.content.document.getElementById(a[0]));}
}
else setTimeout('mfhObj.applyms()',100);
}
this.redraw=function(el){if(!el)return;el.style.zoom='0.99';el.style.zoom='1';}
this.resize=function(evt,notOnResize){
if(tfc.specialLoading||content.document&&content.document.readyState&&content.document.readyState!='complete'){setTimeout('mfhObj.resize(null,'+notOnResize+')',25);return;}
var tfcd=tfc.document,tfcdb=tfcd.body,el=gl(id),ws=gl('WebSite');
if(!el){setTimeout('mfhObj.resize(null,'+notOnResize+')',25);return;}
if(!this.forFullWidth){
function getOffsetTop(el){
var y=0;
while(el){y+=el.offsetTop;el=el.offsetParent;}
return y;
}
if(!mfhObj.initialised){
var tfcdbS=tfcdb.style,tfcddeS=tfcd.documentElement.style;
tfcdbS.width='auto';
tfcddeS.height='100%';
tfcdbS.overflowY='hidden';
tfcddeS.overflowY='hidden';
ws.style.minHeight='';
ws.style.height='auto';
mfhObj.initialised=true;
}
var actualDocHeight=0;
for(var n=0,num=tfcdb.childNodes.length;n<num;n++){
var tfcdb_cn=tfcdb.childNodes[n];
if(!tfcdb_cn||tfcdb_cn.nodeType!=1||!tfcdb_cn.id||tfcdb_cn.offsetHeight==0||tfcdb_cn.style.visibility=='hidden'||tfcdb_cn.style.display=='none')continue;
if(tf.isIE7&&tfcdb_cn.currentStyle.position=='static'&&tfcdb_cn.offsetHeight>0&&tfcdb_cn.clientHeight==0)continue;
actualDocHeight+=tfcdb_cn.offsetHeight;
}
var cyTop=getOffsetTop(el),cyBottom=actualDocHeight-ws.offsetTop-ws.offsetHeight+(ws.offsetHeight-el.offsetTop-el.offsetHeight);
el.style.minHeight='';
var h=tfcd.documentElement.offsetHeight-cyTop-cyBottom-parseFloat($('html').css('margin-top'))-parseFloat($('html').css('margin-bottom'));
if(h>0){el.style.height=h+'px';mfhObj.height=h;}
el.style.overflow='hidden';
for(var n=0,num=el.childNodes.length;n<num;++n){
var nd=el.childNodes[n],ndS=nd.style;
if(nd.nodeType==1&&nd.className.indexOf('LayoutObject')==-1){
ndS.minHeight='';
if(nd.className&&nd.className.indexOf('EqualHeight')!=-1&&(h-nd.offsetTop)>=0)ndS.height=(h-nd.offsetTop)+'px';
if(nd.id=='Content'){if(window.opera||isSafari)ndS.overflow='auto';else{ndS.overflowY='auto';if(typeof(ndS.zoom)!='undefined'){ndS.zoom='0.99';ndS.zoom='1';}}}
else{ndS.overflow='hidden';}
}
}
mfhObj.redraw(gl('WebSiteHeader'));
mfhObj.redraw(gl('WebSiteFooter'));
helpBrowserJumpToAnchor();
}
if(notOnResize)setTimeout(mfhObj.applyms,20);
}
if(!mfhObj){
mfhObj=this;
addEvent('onresize',mfhObj.resize);
}
mfhObj.resize(null,true);
}
var arrObj=[],bgstyleadded=false;
function load(url,id,isLang,force,replaceInnerHTML){
if(content){
try{
var cfe=content.frameElement;
if(!bgstyleadded&&cfe&&cfe.style.cssText){
cfe.style.cssText=cfe.style.cssText.replace(/url\(\.\./,'url(contents');
bgstyleadded=true;
}
}catch(e){}
if(replaceInnerHTML)arrObj[id]=content.document.getElementById(id);
if(xLoaded&&tf.extra.loadExecute&&(LD_loaded||id=='lang')){tf.extra.loadExecute(url,id,isLang,force);}
else{setTimeout('load("'+url+'","'+id+'",'+isLang+','+force+')',100);}
}
}
var sfJSON=function(){function k(a){return 10>a?"0"+a:a}function h(a,e,b){var c,f,d,l;c=/["\\\x00-\x1f\x7f-\x9f]/g;var g;switch(typeof a){case "string":return c.test(a)?'"'+a.replace(c,function(a){var b=m[a];if(b)return b;b=a.charCodeAt();return"\\u00"+Math.floor(b/16).toString(16)+(b%16).toString(16)})+'"':'"'+a+'"';case "number":return isFinite(a)?String(a):"null";case "boolean":case "null":return String(a);case "object":if(!a)return"null";if("function"===typeof a.toJSON)return h(a.toJSON());c=
[];if("number"===typeof a.length&&!a.propertyIsEnumerable("length")&&!b){l=a.length;for(f=0;f<l;f+=1)c.push(h(a[f],e,b)||"null");return"["+c.join(",")+"]"}if(e)for(l=e.length,f=0;f<l;f+=1)d=e[f],"string"===typeof d&&(g=h(a[d],e,b))&&c.push(h(d,e,b)+":"+g);else for(d in a)"string"===typeof d&&(g=h(a[d],e,b))&&c.push(h(d,e,b)+":"+g);return"{"+c.join(",")+"}"}}Date.prototype.toJSON=function(){return this.getUTCFullYear()+"-"+k(this.getUTCMonth()+1)+"-"+k(this.getUTCDate())+"T"+k(this.getUTCHours())+
":"+k(this.getUTCMinutes())+":"+k(this.getUTCSeconds())+"Z"};var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};return{stringify:h,parse:function(a,e){function b(a,d){var c,g;if(d&&"object"===typeof d)for(c in d)Object.prototype.hasOwnProperty.apply(d,[c])&&(g=b(c,d[c]),void 0!==g&&(d[c]=g));return e(a,d)}if(!a)return{};var c;cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;cx.lastIndex=0;cx.test(a)&&(a=
a.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?::?[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return c=eval("("+a+")"),"function"===typeof e?b("",c):c;throw new SyntaxError("parseJSON");},parseClone:function(a){a=this.parse(a);return this.clone(a)},clone:function(a){var e=[],b;for(b in a)e[b]="object"==typeof a[b]&&"undefined"==typeof a[b].tagName?
this.clone(a[b]):a[b];return e}}}();
function saveBskToName(){
var toJSON=tf.sfJSON.stringify,bsks=[tf.core.Basket,tf.core.Favorite];
for(var n=0;n<bsks.length;n++){
var bt=bsks[n];
if(bt.items.cnt()>0||tf.core.ResellerID!=''){
bt.fbsk.bsk='';
var i=bt.items.start();
while(i){i.parent='';i=bt.items.next()}
i=bt.fbsk.items.start();
while(i){i.parent='';i=bt.fbsk.items.next()}
bt.wssig=tf.wssig;
nametag.add(n==0?'bsk':'fav',toJSON(bt));
i=bt.items.start();
while(i){i.parent=bt;i=bt.items.next()}
i=bt.fbsk.items.start();
while(i){i.parent=bt;i=bt.fbsk.items.next()}
bt.fbsk.bsk=bt;
}
else nametag.del(n==0?'bsk':'fav');
}
if(tf.wm._pArr){
tf.wm._pArr['wssig']=tf.wssig;
nametag.add('_pArr',toJSON(tf.wm._pArr,null,true));
}
tf.shopCurrency['wssig']=tf.wssig;
tf.nametag.add('currShop',tf.sfJSON.stringify(tf.shopCurrency));
if(tf.secondCurrency){
tf.secondCurrency['wssig']=tf.wssig;
tf.nametag.add('currSec',tf.sfJSON.stringify(tf.secondCurrency));
}
tf.currentCurrency['wssig']=tf.wssig;
tf.nametag.add('currCurr',tf.sfJSON.stringify(tf.currentCurrency));
nametag.add('coreProperties',toJSON(tf.core.getCoreProperties()));
}
function loadBskFromName(){
var tf=this,fromJSON=tf.sfJSON.parse;
if(!tf.conf){setTimeout('loadBskFromName()',100);return;}
var bskStr=nametag.get('bsk');
if(bskStr){
tf.conf.coreSettings();
var obskStr=fromJSON(bskStr);
if(obskStr&&obskStr.wssig==tf.wssig){
tf.core.Basket.merge(obskStr);
}
}
var favStr=nametag.get('fav');
if(favStr){
var ofavStr=fromJSON(favStr);
if(ofavStr){
tf.core.Favorite.merge(ofavStr);
}
}
var _pArrStr=nametag.get('_pArr');
if(_pArrStr){
if(typeof(tf.wm._pArr)=='undefined')tf.wm._pArr={};
var oldArr=tf.sfJSON.parseClone(_pArrStr);
if(oldArr&&oldArr['wssig']==tf.wssig){
merge(oldArr,tf.wm._pArr); // Part of SF-1098 also fixes SF-2244
tf.wm._pArr=oldArr; // Part of SF-1098 also fixes SF-2244
}
}
var currStr=tf.nametag.get('currShop');
if(currStr){
var oCurr=tf.sfJSON.parse(currStr);
if(oCurr&&oCurr['wssig']==tf.wssig)merge(tf.shopCurrency,oCurr);
}
currStr=tf.nametag.get('currSec');
if(currStr){
var oCurr=tf.sfJSON.parse(currStr);
if(oCurr&&oCurr['wssig']==tf.wssig)merge(tf.secondCurrency,oCurr);
}
currStr=tf.nametag.get('currCurr');
if(currStr){
var oCurr=tf.sfJSON.parse(currStr);
if(oCurr&&oCurr['wssig']==tf.wssig)merge(tf.currentCurrency,oCurr);
}
tf.core.setCoreProperties(fromJSON(nametag.get('coreProperties')));
bskLoaded=true;
tf.lastpage=nametag.get('lastpage');
tf.lastdeptpage=nametag.get('lastdeptpage');
}
function merge(lhs,rhs){if(!lhs)lhs=[];for(var n in rhs)lhs[n]=rhs[n];}
if(lang=='fr'){
}
var langEnterLoaded=true;
function gl(s){return d.getElementById(s);}function ldjs(f){dw('<sc'+'ript src="'+unescapeUTF8(isInSF()?f:tf.wm.url(f.replace('contents/'+tf.lang+'/',''),'f',1))+'"><\/sc'+'ript>');}
function addOnload(f){addEvent('onload',f);}
function addEvent(e,f,t){if(!t)var t=window;if (t.addEventListener)t.addEventListener(e.replace(/^on/,''),f,false);else if (t.attachEvent)t.attachEvent(e,f);}
function delEvent(e,f,t){if(!t)var t=window;if (t.removeEventListener)t.removeEventListener(e.replace(/^on/,''),f,false);else if (t.detachEvent)t.detachEvent(e,f);}
function addEventOnClass(e,f,c,del) {
var tfcd=tf.content.document,maxh=0,coll=[],re = new RegExp(' ?'+c+'( |$)');
var atag=['DIV','SPAN','H1','H2','H3','TD'];
for(var ntag=0,nntag=atag.length;ntag<nntag;ntag++){
var t=tfcd.getElementsByTagName(atag[ntag]);
for (var x = 0, cnt=t.length; x<cnt; x++) {
var tx=t[x],cls=tx.getAttribute('class') || tx.getAttribute('className');
if (cls && cls.match(re)) {
if(!del)addEvent(e,f,tx);else delEvent(e,f,tx);
}
}
}
}
function delEventOnClass(e,f,c) { addEventOnClass(e,f,c,true); }
function ld(name,sf,args){var s;if(LD&&name)s=LD[name];if(!LD||!s)s=sf||'';if(args){var sa=s.split('%%');s='';for(var i=0;i<sa.length;i++)if(args[i])s+=sa[i]+args[i];else s+=sa[i];}return s.replace('%%','');}
var specialLoading=false,nameStr='';
var aMS=[],aMM=[];
function imgs2(){var tfu=tf.utils;if(tfu&&tfu.imgs)tfu.imgs();else setTimeout('imgs2()',50)};
addOnload(imgs2);
if(mobileDetector)addEvent('onresize',mobileDetector);
var ldwriteArr=[];
function ldwrite(){if(!tf.LD_loaded||tf.extra&&tf.extra.loadInProgress>0){setTimeout(ldwrite,100);return;}for(var n=0,l=tf.ldwriteArr.length;n<l;n++){var o=tf.ldwriteArr[n],name=o[0],uniq=o[1],args=o[3],s=ld(name,o[2],args);if(s){var el=gl(name+uniq);if(el)el.innerHTML=s;}}}addOnload(ldwrite);
function ldwriteadd(name,def,args){if(LD[name])return ld(name,def,args);var uniq=Math.random();tf.ldwriteArr.push([name,uniq,def,args]);return'<span id="'+name+uniq+'"></span>';}
function helpBrowserJumpToAnchor(){
if(location.hash.substr(1)){
var el=tf.content.document.getElementById('Product-'+location.hash.substr(1).toUpperCase());
if(el&&el.scrollIntoView) el.scrollIntoView();
}
}
if(!tf.isInLL)addOnload(helpBrowserJumpToAnchor);
var sfMakeSpace = {
subscribers:'',
go: function(bool,styleid,displayid){
var dispid=displayid||'none';
this.subscribers.replace(dispid+'|','');
if(bool)this.subscribers+=dispid+'|';
else if(this.subscribers!=''&&this.subscribers!='none|')return;
if(styleid){
var ss=d.styleSheets;
for(var n=0,num=ss.length;n<num;n++){
if(ss[n].title==styleid)ss[n].disabled=!bool;
}
}
if(displayid!=''){
el=gl(displayid);
if(el){
el.style.display=(bool?'block':'none');
}
}
},
isDisabled:function(styleid){
var disabled=false;
if(styleid){
var ss=d.styleSheets;
for(var n=0,num=ss.length;n<num;n++){
if(ss[n].title==styleid)disabled=ss[n].disabled;
}
}
return disabled;
}
};
var themeColors=['#1e2283','#dcf4ff','#ffe1ff','#af00da','#ffe1ff','#ffffff','#000000','#875fb8','#ffffff','#e3e3e3','#d5d5d5','#565656','#'];
var autoText = {
GCUsesAutoText:{},
lightText:'',
darkText:'',
classes:"",
colorCache: [],
localApplyOptimised:false,
rgbToHsl: function (rgb) {},
hslToRgb: function (hsl) {},
isColorDark:function(doc, el){},
parser:function(doc, node, ancestorGC) {},
apply:function(ancestorGC) {},
localApply:function(el, ancestorGC) {}
};
autoText.GCUsesAutoText={GC2:0,GC3:0,GC5:1,GC9:1,GC10:1,GC14:1,GC15:1,GC16:0,GC17:0,GC20:0,GC21:0,GC22:0,GC26:0,GC29:1,GC30:1,GC31:1,GC33:1,GC34:1,GC36:0,GC39:0,GC40:0,GC45:1,GC47:0,GC48:1,GC49:1,GC50:0,GC51:0,GC53:0,GC54:0,GC55:0,GC57:0,GC58:0,GC59:0,GC60:0,GC63:1,GC64:1,GC65:0,GC66:0,GC67:0,GC69:0,GC70:0,GC71:0,GC72:0,GC75:0,GC79:0,GC87:0};
autoText.lightText='#f7f7f7';
autoText.darkText='#565656';
autoText.specialText='#EC006c';
autoText.rgbToHsl=function(rgb) {
var r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
var max = Math.max(r, g, b), min = Math.min(r, g, b);
var h, s, l = (max + min) / 2;
if(max == min){
h = s = 0; // achromatic
}else{
var d = max - min;
s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
switch(max){
case r: h = (g - b) / d + (g < b ? 6 : 0); break;
case g: h = (b - r) / d + 2; break;
case b: h = (r - g) / d + 4; break;
}
h /= 6;
}
return {h:h, s:s, l:l};
}
autoText.hslToRgb=function(hsl) {
var h = hsl.h, s = hsl.s, v = hsl.v;
var r, g, b;
if(s == 0){
r = g = b = l; // achromatic
}else{
function hue2rgb(p, q, t){
if(t < 0) t += 1;
if(t > 1) t -= 1;
if(t < 1/6) return p + (q - p) * 6 * t;
if(t < 1/2) return q;
if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
return p;
}
var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
var p = 2 * l - q;
r = hue2rgb(p, q, h + 1/3);
g = hue2rgb(p, q, h);
b = hue2rgb(p, q, h - 1/3);
}
return {r:r * 255, g:g * 255, b:b * 255};
}
autoText.isColorDark=function(doc, el) {
var cc = '', node = el;
if (typeof(node.currentStyle) != 'undefined') {
while (node && node.nodeName != 'HTML' && (!node.currentStyle.backgroundColor || node.currentStyle.backgroundColor == 'transparent')) {
node = node.parentNode;
}
if (node) cc = node.currentStyle.backgroundColor;
}
else
{
while (node && node.nodeName != 'HTML' && (doc.defaultView.getComputedStyle(node, '').backgroundColor.indexOf('rgb') == -1 || doc.defaultView.getComputedStyle(node, '').backgroundColor.indexOf('rgba') != -1)) {
node = node.parentNode;
}
if (node) cc = doc.defaultView.getComputedStyle(node, '').backgroundColor;
}
if (node) {
return autoText._isColorDark(cc);
}
return cc <= 0.6;
};
autoText._isColorDark=function(cc) {
var ccc = '';
if(autoText.colorCache[cc]) return autoText.colorCache[cc] <= 0.6;
ccc = cc;
var hsl = null;
if (cc.substring(0, 1) == '#') {
cc = cc.substring(1);
if(cc.length==3)cc=cc.replace(/(\d)(\d)(\d)/,function($0,$1,$2,$3){return $1+$1+$2+$2+$3+$3;});
var rgb = {r:parseInt(cc.substr(0, 2), 16), g:parseInt(cc.substr(2, 2), 16), b:parseInt(cc.substr(4, 2), 16)};
hsl = autoText.rgbToHsl(rgb);
cc = hsl.l;
}
else {
cc = cc.replace(/rgba?\((\d+), (\d+), (\d+)[^)]*?\)/, function($0, $1, $2, $3) {
var rgb = {r:parseInt($1), g:parseInt($2), b:parseInt($3)};
hsl = autoText.rgbToHsl(rgb);
return hsl.l;
});
}
autoText.colorCache[ccc] = cc;
return cc <= 0.6;
};
autoText.getAutoColor=function(ccc) {
return (autoText._isColorDark(ccc) ? autoText.lightText : autoText.darkText);
};
autoText.parser=function(doc, node, ancestorGC) {
if(!(node instanceof jQuery) && (!node || !node.childNodes))
return;
if(autoText.classes.length == 0) {
var classes = "";
$.each(autoText.GCUsesAutoText, function(index, value) {
if(classes.length == 0)
classes += '.' + index;
else
classes += ',.' + index;
});
autoText.classes = classes;
}
if (autoText.localApplyOptimised) {
$(node).find('[class^=GC]').each(function() {
var el = this, GC = el.className.match(/^GC\d+/), GCNum=GC?parseInt(GC[0].replace('GC','')):-1;
if (GCNum >= 28 && GCNum <= 35) {
jQuery(el).find('a').css('color','');
}
el.style.color='';
});
}
$(node).find(autoText.classes).each(function() {
var el = this;
var GC = el.className.match(/^GC\d+/),GCNum=GC?parseInt(GC[0].replace('GC','')):-1;
if (GC && typeof(autoText.GCUsesAutoText[GC[0]]) != 'undefined' || el.nodeName == 'A' && autoText.GCUsesAutoText[ancestorGC] == 1) {
var cc = (autoText.isColorDark(doc, el.nodeName == 'A' && el.parentNode && !GC ? el.parentNode : el) ? autoText.lightText : autoText.darkText);
el.style.color = cc;
if (GCNum >= 28 && GCNum <= 35 && autoText.GCUsesAutoText[GC[0]] == 1) {
jQuery(el).find('a').each(function() {
this.style.color = cc;
});
}
}
else if (GC) {
el.style.color = '';
if (GCNum >= 28 && GCNum <= 35) {
jQuery(el).find('a').each(function() {
this.style.color = '';
});
}
}
else if (el.nodeName == 'A' && ancestorGC && typeof(autoText.GCUsesAutoText[ancestorGC]) == 'undefined') {
el.style.color = '';
}
if (GC && GC[0] && ancestorGC)ancestorGC = GC[0];
});
};
autoText.apply=function(ancestorGC) {
autoText.localApplyOptimised = false;
if (d.frames) {
for (var i=0,num=d.frames.length;i<num;i++){
try{if(typeof(d.frames[i].document)=='object')autoText.parser(d.frames[i].document, d.frames[i].document.body);}catch(e){/* catch access denied errors.*/}
}
}
autoText.parser(document, document.body, ancestorGC=='ancestorGC'?ancestorGC:null);
}
autoText.localApply = function (el, ancestorGC) {
autoText.localApplyOptimised = true;
autoText.parser(document, el, ancestorGC == 'ancestorGC' ? ancestorGC : null);
}
if(!tf.isInLL&&typeof(autoText)!='undefined')addOnload(autoText.apply);
function navRO(ovr,o,id,gc){
function rmGC(s){var ss=s.split(' ');return(ss[1] && ss[0].substr(0,2)=='GC')?ss[1]:s;}
function addOvr(o){
o.className=gc+rmGC(o.className);
o.className=o.className.replace(/(idx[12](Sub)?)(Mouseover)?/, '$1Mouseover');
if(gc == ' ') {
var tfc=tf.content;
if(typeof(tfc.autoText)!='undefined') {
function isDarker(cc) {
if (cc.substring(0, 1) == '#') {
cc = cc.substring(1);
var rgb = {r:parseInt(cc.substr(0, 2), 16), g:parseInt(cc.substr(2, 2), 16), b:parseInt(cc.substr(4, 2), 16)};
hsl = autoText.rgbToHsl(rgb);
cc = hsl.l;
}
else {
cc = cc.replace(/rgba?\((\d+), (\d+), (\d+)[^)]*?\)/, function($0, $1, $2, $3) {
var rgb = {r:parseInt($1), g:parseInt($2), b:parseInt($3)};
hsl = autoText.rgbToHsl(rgb);
cc = hsl.l;
});
}
return cc <= 0.5;
}
function getBackgroundColor($dom) {
var bgColor = "";
while($dom[0].tagName.toLowerCase() != "html") {
bgColor = $dom.css("background-color");
if(bgColor != "rgba(0, 0, 0, 0)" && bgColor != "transparent") {
break;
}
$dom = $dom.parent();
}
return bgColor;
}
if($(o).children('a').css('color')){
var darker = isDarker(getBackgroundColor($(o)));
if(darker == isDarker($(o).children('a').css('color'))) {
$(o).children('a').css('color', darker ? '#ffffff' : '#000000');
}
}
}
}
}
function rmOvr(o){o.className=gc+rmGC(o.className).replace(/Mouseover( |$)/g,'$1');}
if(gc.length>0)gc+=' ';
var className=rmGC(o.className),s=className.replace(/(?:Left|Right)?(?:Mouseover)?$/,''),movr='Mouseover';
var ell=gl(s+'Left'+id),elc=gl(s+id),elr=gl(s+'Right'+id);
if(ell&&elc&&elr){
if(ovr){addOvr(ell);addOvr(elc);addOvr(elr);}
else{rmOvr(ell);rmOvr(elc);rmOvr(elr);}
} else{
if(ovr) addOvr(o);
else rmOvr(o);
}
var tfc=tf.content;
if(typeof(tfc.autoText)!='undefined')tfc.autoText.parser(tfc.document, o, o.className.split(' ')[0]);
}
function navOvr(o,id,gc){navRO(true,o,id,gc);}function navOut(o,id,gc){navRO(false,o,id,gc);}
var aOtherURL={};
function navClk(o,h,id){var url=unescape(tf.wm.url(h,'-',1));
if(typeof(aOtherURL[id])=='undefined'){tf.content.location.href=url;}
else{
if(aOtherURL[id]==0){tf.content.location=tf.wm.url('otherurl.html?ourl='+id,'-',1);}
else{window.open(url);}
}}
function cancelBuble(evt){try{var e=(typeof(evt)!='undefined')?evt:event;e.cancelBubble=true;}catch(e){}}
function dynLoadPrice(id,p,pd,fnEnd){
core=tf.core
if(core&&tf.utils){
if(p.length==0) return;
if(core.regPrc)core.regPrc(p);
if(fnEnd){fnEnd(id);}
if(pd)tf.utils.populatedata();
}
else setTimeout(function(){dynLoadPrice(id,p,pd,fnEnd);},100);
}
var equalHeightClass=[];
function equalHeightOnClass(ignoreWithPrefix,onlyWithPrefix){
for(var n=0,nn=equalHeightClass.length;n<nn;n++){
var ok=(!onlyWithPrefix&&!ignoreWithPrefix);
if(!ok)ok=ignoreWithPrefix&&equalHeightClass[n].indexOf(ignoreWithPrefix)!=0;
if(!ok)ok=onlyWithPrefix&&equalHeightClass[n].indexOf(onlyWithPrefix)==0;
if(ok)tf.utils.equaldiv(equalHeightClass[n]);
}
}
function equalWidth(containerSelector, itemSelector, itemMaxWidth, maxColumns, itemsOnly) {
var mw = itemMaxWidth || 260, mcol = maxColumns || 5;
var $container = $(containerSelector), $items = $(itemSelector, $container);
var outerSpace = $items.outerWidth(true) - $items.outerWidth();
var w = 0, maxAvailableWidth = $container.css('width','auto').width();
for (var n = 1; n <= mcol; n++) {
w = parseInt((maxAvailableWidth / n) - outerSpace);
if (w <= mw) break;
}
if (itemsOnly) {
$(itemSelector, $container).width(w);
}
else {
$(itemSelector, $container).outerWidth(w);
$container.width((w + outerSpace) * Math.min(n, $items.length));
}
}
var moreHistory = {
push:function(from_pgidx,to_pgidx,append_prid){
if (tf.isInSF()) return;
this._load();
this._stack.push({from:(from_pgidx?from_pgidx:tf.pgidx)+(append_prid?'#'+to_pgidx.replace(/(?:_.*|)\.html?/,''):''),to:to_pgidx});
this._save();
},
pop:function(pgidx){
if (tf.isInSF()) return '';
this._load();
var o=this._stack[this._stack.length-1],fromURL='';
if(o&&o['to']==pgidx)fromURL=o['from'];
if(fromURL){
if((sfFilters&&sfFilters['deptEnabled']==tf.pgid)||fromURL.indexOf('search.php')==0)fromURL='';else{this._stack.pop();this._save();}
}
return fromURL;
},
_load:function(){
var s=tf.nametag.get('moreHistory');
if(s){this._stack=tf.sfJSON.parse(s);}
},
_save:function(){
tf.nametag.add('moreHistory',tf.sfJSON.stringify(this._stack));
},
_stack:[]
};
if(!tf.isInLL){
addOnload(function(){
addEvent('onclick', function(evt){
var el = evt.srcElement || evt.target;
while (el && el != d.body && el.nodeName != 'A') { el = el.parentNode; }
if (el && el.nodeName == 'A' && el.getAttribute('href')) {
if (el.href.match(/p\d+_?.*?\.html/) && !el.onclick || (el.onclick && !el.onclick.toString().match('tf.moreHistory.push'))) tf.moreHistory.push((tf.sfFilters['deptEnabled']?'search.php':tf.pgidx),tf.wm.jfile(el.href),false);return true;
}
}, d.body);
});
}
// Try to reload the frame if the F5 refresh fails to load it properly. (For FF4.)
if(!tf.isInLL){
tf.addEvent('onload',function(){
var ids=['index1','index2'];
for(var i=0,ii=ids.length;i<ii;i++){
if(gl(ids[i]+'holder')&&gl(ids[i]+'holder').innerHTML==''){
if(gl(ids[i]+'frame'))gl(ids[i]+'frame').src=gl(ids[i]+'frame').src+'?'+Math.random();
}
}
window.hasFlash=false;
try {
var fo=new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
if(fo){
window.hasFlash=true;
}
}catch(e){
if (navigator.mimeTypes
&& navigator.mimeTypes['application/x-shockwave-flash']!=undefined
&& navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin){
window.hasFlash=true;
}
}
if(!window.hasFlash){
$('object[id^=DSObject_], embed[name^=DSObject_]').hide();
}
},tf);
}
var pageID=(window.external&&window.external['getPageID']?window.external['getPageID']():'');
if(pageID!='D-42')tf.load('lang.html','lang');
}
function productIconsLocker(prid) {
if(typeof(_sfEvt_htmlLocker)=='undefined') return;
if($('#ProductOptions-'+prid).length==0||$('#ProductOptions-'+prid).text().trim()=='')return;
if($('.ProductOptions').data('initialised'))return;
$('#ProductIcons-'+prid).filter(':not(.locker)').css('position','relative')
.append(_sfEvt_htmlLocker.replace(/title=""/g,'title="'+((LD&&LD.LD_LOADING)||'').replace(/"/g,'&quot;')+'"'))
;
}
// </script>
// $Revision: 45015 $
// $HeadURL: svn://3d3-p432/ShopFactory/branches/V14_60/bin/Common%20Files/parse/loader.js $
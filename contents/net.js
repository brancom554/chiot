var isIE=(isIE||!!(window.ActiveXObject));
var net=new Object();
net.READY_STATE_UNINITIALIZED=0;
net.READY_STATE_LOADING=1;
net.READY_STATE_LOADED=2;
net.READY_STATE_INTERACTIVE=3;
net.READY_STATE_COMPLETE=4;
net.ContentLoader=function(url,onload,onerror,onupdate,method,params,contentType){
this.req=null;
this.onload=onload;
this.onerror=(onerror?onerror:this.defaultError);
this.onupdate=onupdate;
this.loadXMLDoc(url,method,params,contentType);
}
net.ContentLoader.prototype.loadXMLDoc=function(url,method,params,contentType){
if(!method){method="GET";}
if(!contentType&&method=="POST"){contentType='application/x-www-form-urlencoded; charset=utf-8;';}
if(!tf.isInSF()&&window.XMLHttpRequest&&(!isIE||url.indexOf('file:')==-1)){this.req=new XMLHttpRequest();}
else if(window.ActiveXObject){
try{this.req=new ActiveXObject("Microsoft.XMLHTTP");}
catch(e){this.req=null;}
}
if(this.req){
try{
var loader=this;
this.req.onreadystatechange=function(){net.ContentLoader.onReadyState.call(loader);}
this.req.open(method,url,true);
if(contentType){this.req.setRequestHeader('Content-Type', contentType);}
this.req.send(params);
}
catch(err){this.onerror.call(this);}
}
}
net.ContentLoader.onReadyState=function(){
var req=this.req,ready=req.readyState;
if(ready==net.READY_STATE_COMPLETE){
var httpStatus=req.status;
if(httpStatus==200||httpStatus==0){this.onload.call(this);}
else{this.onerror.call(this);}
}
}
net.ContentLoader.prototype.defaultError=function(){
alert("error fetching data!"+"\n\nreadyState:"+this.req.readyState
+"\nstatus: "+this.req.status+"\nheaders: "+this.req.getAllResponseHeaders());
}
net.cmdQueues=[];
net.CommandQueue=function(id,url,data,freq,immediate,onLoad,onError,onUpdate){
this.id=id;
this.url=url;
this.data=data;
this.onLoad=(onLoad?onLoad:net.CommandQueue.onload);
this.onError=(onError?onError:net.CommandQueue.onerror);
this.onUpdate=(onUpdate?onUpdate:net.CommandQueue.onupdate);
this.lastUpdateTime=0;
if(immediate)this.fireRequest();
if(freq)this.repeat(freq);
net.cmdQueues[id]=this;
}
net.CommandQueue.prototype.fireRequest=function(){
if(!this.onUpdate){return;}
this.loader=new net.ContentLoader(this.url,this.onLoad,this.onError,this.onUpdate,"POST",this.data);
}
net.CommandQueue.onload=function(loader){
var jsonText=this.req.responseText;
var o=tf.sfJSON.parse(jsonText);
if(o){this.onupdate.call(this,o);}
}
net.CommandQueue.prototype.repeat=function(freq){
this.unrepeat();
if (freq>0){
this.freq=freq;
var cmd="net.cmdQueues['"+this.id+"'].fireRequest()";
this.repeater=setInterval(cmd,freq*1000);
}
}
net.CommandQueue.prototype.unrepeat=function(){
if (this.repeater){clearInterval(this.repeater);}
this.repeater=null;
}
// $Revision: 41588 $
// $HeadURL: svn://3d3-p432/ShopFactory/branches/V12_30/bin/Common%20Files/copy/net.js $

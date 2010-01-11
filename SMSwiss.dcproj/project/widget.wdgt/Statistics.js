var _uacct = "UA-4090079-3";

function TrackWidget(what){
	urchinTracker("SMSwissWidget:"+what);
}



//  HAKED VERSION TO ENABLE (FILE:) PROTOCOL TRAKING
//-- Google Analytics Urchin Module
//-- Copyright 2007 Google, All Rights Reserved.

//-- Urchin On Demand Settings ONLY
//var _uacct="";			// set up the Urchin Account
var _userv=1;			// service mode (0=local,1=remote,2=both)

//-- UTM User Settings
var _ufsc=1;			// set client info flag (1=on|0=off)
var _udn="auto";		// (auto|none|domain) set the domain name for cookies
var _uhash="on";		// (on|off) unique domain hash for cookies
var _utimeout="1800";   	// set the inactive session timeout in seconds
var _ugifpath="/__utm.gif";	// set the web path to the __utm.gif file
var _utsp="|";			// transaction field separator
var _uflash=1;			// set flash version detect option (1=on|0=off)
var _utitle=1;			// set the document title detect option (1=on|0=off)
var _ulink=0;			// enable linker functionality (1=on|0=off)
var _uanchor=0;			// enable use of anchors for campaign (1=on|0=off)
var _utcp="/";			// the cookie path for tracking
var _usample=100;		// The sampling % of visitors to track (1-100).

//-- UTM Campaign Tracking Settings
var _uctm=1;			// set campaign tracking module (1=on|0=off)
var _ucto="15768000";		// set timeout in seconds (6 month default)
var _uccn="utm_campaign";	// name
var _ucmd="utm_medium";		// medium (cpc|cpm|link|email|organic)
var _ucsr="utm_source";		// source
var _uctr="utm_term";		// term/keyword
var _ucct="utm_content";	// content
var _ucid="utm_id";		// id number
var _ucno="utm_nooverride";	// don't override

//-- Auto/Organic Sources and Keywords
var _uOsr=new Array();
var _uOkw=new Array();
_uOsr[0]="google";	_uOkw[0]="q";
_uOsr[1]="yahoo";	_uOkw[1]="p";
_uOsr[2]="msn";		_uOkw[2]="q";
_uOsr[3]="aol";		_uOkw[3]="query";
_uOsr[4]="aol";		_uOkw[4]="encquery";
_uOsr[5]="lycos";	_uOkw[5]="query";
_uOsr[6]="ask";		_uOkw[6]="q";
_uOsr[7]="altavista";	_uOkw[7]="q";
_uOsr[8]="netscape";	_uOkw[8]="query";
_uOsr[9]="cnn";	_uOkw[9]="query";
_uOsr[10]="looksmart";	_uOkw[10]="qt";
_uOsr[11]="about";	_uOkw[11]="terms";
_uOsr[12]="mamma";	_uOkw[12]="query";
_uOsr[13]="alltheweb";	_uOkw[13]="q";
_uOsr[14]="gigablast";	_uOkw[14]="q";
_uOsr[15]="voila";	_uOkw[15]="rdata";
_uOsr[16]="virgilio";	_uOkw[16]="qs";
_uOsr[17]="live";	_uOkw[17]="q";
_uOsr[18]="baidu";	_uOkw[18]="wd";
_uOsr[19]="alice";	_uOkw[19]="qs";
_uOsr[20]="yandex";	_uOkw[20]="text";
_uOsr[21]="najdi";	_uOkw[21]="q";
_uOsr[22]="aol";	_uOkw[22]="q";
_uOsr[23]="club-internet"; _uOkw[23]="query";
_uOsr[24]="mama";	_uOkw[24]="query";
_uOsr[25]="seznam";	_uOkw[25]="q";
_uOsr[26]="search";	_uOkw[26]="q";
_uOsr[27]="wp";	_uOkw[27]="szukaj";
_uOsr[28]="onet";	_uOkw[28]="qt";
_uOsr[29]="netsprint";	_uOkw[29]="q";
_uOsr[30]="google.interia";	_uOkw[30]="q";
_uOsr[31]="szukacz";	_uOkw[31]="q";
_uOsr[32]="yam";	_uOkw[32]="k";
_uOsr[33]="pchome";	_uOkw[33]="q";
_uOsr[34]="kvasir";	_uOkw[34]="searchExpr";
_uOsr[35]="sesam";	_uOkw[35]="q";
_uOsr[36]="ozu"; _uOkw[36]="q";
_uOsr[37]="terra"; _uOkw[37]="query";
_uOsr[38]="nostrum"; _uOkw[38]="query";
_uOsr[39]="mynet"; _uOkw[39]="q";
_uOsr[40]="ekolay"; _uOkw[40]="q";

//-- Auto/Organic Keywords to Ignore
var _uOno=new Array();
//_uOno[0]="urchin";
//_uOno[1]="urchin.com";
//_uOno[2]="www.urchin.com";

//-- Referral domains to Ignore
var _uRno=new Array();
//_uRno[0]=".urchin.com";

//-- **** Don't modify below this point ***
var _uff,_udh,_udt,_ubl=0,_udo="",_uu,_ufns=0,_uns=0,_ur="-",_ufno=0,_ust=0,_ubd=document,_udl=_ubd.location,_udlh="",_uwv="1.2";
var _ugifpath2="http://www.google-analytics.com/__utm.gif";
if (_udl.hash) _udlh=_udl.href.substring(_udl.href.indexOf('#'));
if (_udl.protocol=="https:") _ugifpath2="https://ssl.google-analytics.com/__utm.gif";
if (!_utcp || _utcp=="") _utcp="/";
function urchinTracker(page) {

 //HACKED CODE
 //--------------------------------------
 //if (_udl.protocol=="file:") return;
 //if (_uff && (!page || page=="")) return;
 //page ="SMSunriseWidget"; 
 //--------------------------------------

 var a,b,c,xx,v,z,k,x="",s="",f=0,nv=0;
 var nx=" expires="+_uNx()+";";
 var dc=_ubd.cookie;
 _udh=_uDomain();
 if (!_uVG()) return;
 _uu=Math.round(Math.random()*2147483647);
 _udt=new Date();
 _ust=Math.round(_udt.getTime()/1000);
 a=dc.indexOf("__utma="+_udh+".");
 b=dc.indexOf("__utmb="+_udh);
 c=dc.indexOf("__utmc="+_udh);
 if (_udn && _udn!="") { _udo=" domain="+_udn+";"; }
 if (_utimeout && _utimeout!="") {
  x=new Date(_udt.getTime()+(_utimeout*1000));
  x=" expires="+x.toGMTString()+";";
 }
 if (_ulink) {
  if (_uanchor && _udlh && _udlh!="") s=_udlh+"&";
  s+=_udl.search;
  if(s && s!="" && s.indexOf("__utma=")>=0) {
   if (!(_uIN(a=_uGC(s,"__utma=","&")))) a="-";
   if (!(_uIN(b=_uGC(s,"__utmb=","&")))) b="-";
   if (!(_uIN(c=_uGC(s,"__utmc=","&")))) c="-";
   v=_uGC(s,"__utmv=","&");
   z=_uGC(s,"__utmz=","&");
   k=_uGC(s,"__utmk=","&");
   xx=_uGC(s,"__utmx=","&");
   if ((k*1) != ((_uHash(a+b+c+xx+z+v)*1)+(_udh*1))) {_ubl=1;a="-";b="-";c="-";xx="-";z="-";v="-";}
   if (a!="-" && b!="-" && c!="-") f=1;
   else if(a!="-") f=2;
  }
 }
 if(f==1) {
  _ubd.cookie="__utma="+a+"; path="+_utcp+";"+nx+_udo;
  _ubd.cookie="__utmb="+b+"; path="+_utcp+";"+x+_udo;
  _ubd.cookie="__utmc="+c+"; path="+_utcp+";"+_udo;
 } else if (f==2) {
  a=_uFixA(s,"&",_ust);
  _ubd.cookie="__utma="+a+"; path="+_utcp+";"+nx+_udo;
  _ubd.cookie="__utmb="+_udh+"; path="+_utcp+";"+x+_udo;
  _ubd.cookie="__utmc="+_udh+"; path="+_utcp+";"+_udo;
  _ufns=1;
 } else if (a>=0 && b>=0 && c>=0) {
   b = _uGC(dc,"__utmb="+_udh,";");
   b = ("-" == b) ? _udh : b;  
  _ubd.cookie="__utmb="+b+"; path="+_utcp+";"+x+_udo;
 } else {
  if (a>=0) a=_uFixA(_ubd.cookie,";",_ust);
  else {
   a=_udh+"."+_uu+"."+_ust+"."+_ust+"."+_ust+".1";
   nv=1;
  }
  _ubd.cookie="__utma="+a+"; path="+_utcp+";"+nx+_udo;
  _ubd.cookie="__utmb="+_udh+"; path="+_utcp+";"+x+_udo;
  _ubd.cookie="__utmc="+_udh+"; path="+_utcp+";"+_udo;
  _ufns=1;
 }
 if (_ulink && xx && xx!="" && xx!="-") {
   xx=_uUES(xx);
   if (xx.indexOf(";")==-1) _ubd.cookie="__utmx="+xx+"; path="+_utcp+";"+nx+_udo;
 }
 if (_ulink && v && v!="" && v!="-") {
  v=_uUES(v);
  if (v.indexOf(";")==-1) _ubd.cookie="__utmv="+v+"; path="+_utcp+";"+nx+_udo;
 }
 var wc=window;
 var c=_ubd.cookie;
 if(nv>0 && wc && wc.gaGlobal && !wc.gaGlobal.from_cookie){
  var g=wc.gaGlobal;
  var ua=c.split("__utma=")[1].split(";")[0].split(".");
  if(g.sid)ua[4]=g.sid;
  ua[3]=ua[4];
  if(g.vid){
   var v=g.vid.split(".");
   ua[1]=v[0];
   ua[2]=v[1];
  }
  _ubd.cookie="__utma="+ua.join(".")+"; path="+_utcp+";"+nx+_udo;
 }
 _uInfo(page);
 _ufns=0;
 _ufno=0;
 if (!page || page=="") _uff=1;
}
function _uGH() {
 var hid;
 var wc=window;
 if (wc && wc.gaGlobal && wc.gaGlobal.hid) {
  hid=wc.gaGlobal.hid;
 } else {
  hid=Math.round(Math.random()*0x7fffffff);
  if (!wc.gaGlobal) wc.gaGlobal={};
  wc.gaGlobal.hid=hid;
 }
 return hid;
}
function _uInfo(page) {
 var p,s="",dm="",pg=_udl.pathname+_udl.search;
 if (page && page!="") pg=_uES(page,1);
 _ur=_ubd.referrer;
 if (!_ur || _ur=="") { _ur="-"; }
 else {
  dm=_ubd.domain;
  if(_utcp && _utcp!="/") dm+=_utcp;
  p=_ur.indexOf(dm);
  if ((p>=0) && (p<=8)) { _ur="0"; }
  if (_ur.indexOf("[")==0 && _ur.lastIndexOf("]")==(_ur.length-1)) { _ur="-"; }
 }
 s+="&utmn="+_uu;
 if (_ufsc) s+=_uBInfo();
 if (_uctm) s+=_uCInfo();
 if (_utitle && _ubd.title && _ubd.title!="") s+="&utmdt="+_uES(_ubd.title);
 if (_udl.hostname && _udl.hostname!="") s+="&utmhn="+_uES(_udl.hostname);
 if (_usample && _usample != 100) s+="&utmsp="+_uES(_usample);
 s+="&utmhid="+_uGH();
 s+="&utmr="+_ur;
 s+="&utmp="+pg;
 if ((_userv==0 || _userv==2) && _uSP()) {
  var i=new Image(1,1);
  i.src=_ugifpath+"?"+"utmwv="+_uwv+s;
  i.onload=function() { _uVoid(); }
 }
 if ((_userv==1 || _userv==2) && _uSP()) {
  var i2=new Image(1,1);
  i2.src=_ugifpath2+"?"+"utmwv="+_uwv+s+"&utmac="+_uacct+"&utmcc="+_uGCS();
  i2.onload=function() { _uVoid(); }
 }
 return;
}
function _uVoid() { return; }
function _uCInfo() {
 if (!_ucto || _ucto=="") { _ucto="15768000"; }
 if (!_uVG()) return;
 var c="",t="-",t2="-",t3="-",o=0,cs=0,cn=0,i=0,z="-",s="";
 if (_uanchor && _udlh && _udlh!="") s=_udlh+"&";
 s+=_udl.search;
 var x=new Date(_udt.getTime()+(_ucto*1000));
 var dc=_ubd.cookie;
 x=" expires="+x.toGMTString()+";";
 if (_ulink && !_ubl) {
  z=_uUES(_uGC(s,"__utmz=","&"));
  if (z!="-" && z.indexOf(";")==-1) { _ubd.cookie="__utmz="+z+"; path="+_utcp+";"+x+_udo; return ""; }
 }
 z=dc.indexOf("__utmz="+_udh+".");
 if (z>-1) { z=_uGC(dc,"__utmz="+_udh+".",";"); }
 else { z="-"; }
 t=_uGC(s,_ucid+"=","&");
 t2=_uGC(s,_ucsr+"=","&");
 t3=_uGC(s,"gclid=","&");
 if ((t!="-" && t!="") || (t2!="-" && t2!="") || (t3!="-" && t3!="")) {
  if (t!="-" && t!="") c+="utmcid="+_uEC(t);
  if (t2!="-" && t2!="") { if (c != "") c+="|"; c+="utmcsr="+_uEC(t2); }
  if (t3!="-" && t3!="") { if (c != "") c+="|"; c+="utmgclid="+_uEC(t3); }
  t=_uGC(s,_uccn+"=","&");
  if (t!="-" && t!="") c+="|utmccn="+_uEC(t);
  else c+="|utmccn=(not+set)";
  t=_uGC(s,_ucmd+"=","&");
  if (t!="-" && t!="") c+="|utmcmd="+_uEC(t);
  else  c+="|utmcmd=(not+set)";
  t=_uGC(s,_uctr+"=","&");
  if (t!="-" && t!="") c+="|utmctr="+_uEC(t);
  else { t=_uOrg(1); if (t!="-" && t!="") c+="|utmctr="+_uEC(t); }
  t=_uGC(s,_ucct+"=","&");
  if (t!="-" && t!="") c+="|utmcct="+_uEC(t);
  t=_uGC(s,_ucno+"=","&");
  if (t=="1") o=1;
  if (z!="-" && o==1) return "";
 }
 if (c=="-" || c=="") { c=_uOrg(); if (z!="-" && _ufno==1)  return ""; }
 if (c=="-" || c=="") { if (_ufns==1)  c=_uRef(); if (z!="-" && _ufno==1)  return ""; }
 if (c=="-" || c=="") {
  if (z=="-" && _ufns==1) { c="utmccn=(direct)|utmcsr=(direct)|utmcmd=(none)"; }
  if (c=="-" || c=="") return "";
 }
 if (z!="-") {
  i=z.indexOf(".");
  if (i>-1) i=z.indexOf(".",i+1);
  if (i>-1) i=z.indexOf(".",i+1);
  if (i>-1) i=z.indexOf(".",i+1);
  t=z.substring(i+1,z.length);
  if (t.toLowerCase()==c.toLowerCase()) cs=1;
  t=z.substring(0,i);
  if ((i=t.lastIndexOf(".")) > -1) {
   t=t.substring(i+1,t.length);
   cn=(t*1);
  }
 }
 if (cs==0 || _ufns==1) {
  t=_uGC(dc,"__utma="+_udh+".",";");
  if ((i=t.lastIndexOf(".")) > 9) {
   _uns=t.substring(i+1,t.length);
   _uns=(_uns*1);
  }
  cn++;
  if (_uns==0) _uns=1;
  _ubd.cookie="__utmz="+_udh+"."+_ust+"."+_uns+"."+cn+"."+c+"; path="+_utcp+"; "+x+_udo;
 }
 if (cs==0 || _ufns==1) return "&utmcn=1";
 else return "&utmcr=1";
}
function _uRef() {
 if (_ur=="0" || _ur=="" || _ur=="-") return "";
 var i=0,h,k,n;
 if ((i=_ur.indexOf("://"))<0 || _uGCse()) return "";
 h=_ur.substring(i+3,_ur.length);
 if (h.indexOf("/") > -1) {
  k=h.substring(h.indexOf("/"),h.length);
  if (k.indexOf("?") > -1) k=k.substring(0,k.indexOf("?"));
  h=h.substring(0,h.indexOf("/"));
 }
 h=h.toLowerCase();
 n=h;
 if ((i=n.indexOf(":")) > -1) n=n.substring(0,i);
 for (var ii=0;ii<_uRno.length;ii++) {
  if ((i=n.indexOf(_uRno[ii].toLowerCase())) > -1 && n.length==(i+_uRno[ii].length)) { _ufno=1; break; }
 }
 if (h.indexOf("www.")==0) h=h.substring(4,h.length);
 return "utmccn=(referral)|utmcsr="+_uEC(h)+"|"+"utmcct="+_uEC(k)+"|utmcmd=referral";
}
function _uOrg(t) {
 if (_ur=="0" || _ur=="" || _ur=="-") return "";
 var i=0,h,k;
 if ((i=_ur.indexOf("://"))<0 || _uGCse()) return "";
 h=_ur.substring(i+3,_ur.length);
 if (h.indexOf("/") > -1) {
  h=h.substring(0,h.indexOf("/"));
 }
 for (var ii=0;ii<_uOsr.length;ii++) {
  if (h.toLowerCase().indexOf(_uOsr[ii].toLowerCase()) > -1) {
   if ((i=_ur.indexOf("?"+_uOkw[ii]+"=")) > -1 || (i=_ur.indexOf("&"+_uOkw[ii]+"=")) > -1) {
    k=_ur.substring(i+_uOkw[ii].length+2,_ur.length);
    if ((i=k.indexOf("&")) > -1) k=k.substring(0,i);
    for (var yy=0;yy<_uOno.length;yy++) {
     if (_uOno[yy].toLowerCase()==k.toLowerCase()) { _ufno=1; break; }
    }
    if (t) return _uEC(k);
    else return "utmccn=(organic)|utmcsr="+_uEC(_uOsr[ii])+"|"+"utmctr="+_uEC(k)+"|utmcmd=organic";
   }
  }
 }
 return "";
}
function _uGCse() {
 var h,p;
 h=p=_ur.split("://")[1];
 if(h.indexOf("/")>-1) {
  h=h.split("/")[0];
  p=p.substring(p.indexOf("/")+1,p.length);
 }
 if(p.indexOf("?")>-1) {
  p=p.split("?")[0];
 }
 if(h.toLowerCase().indexOf("google")>-1) {
  if(_ur.indexOf("?q=")>-1 || _ur.indexOf("&q=")>-1) {
   if (p.toLowerCase().indexOf("cse")>-1) {
    return true;
   }
  }
 }
}
function _uBInfo() {
 var sr="-",sc="-",ul="-",fl="-",cs="-",je=1;
 var n=navigator;
 if (self.screen) {
  sr=screen.width+"x"+screen.height;
  sc=screen.colorDepth+"-bit";
 } else if (self.java) {
  var j=java.awt.Toolkit.getDefaultToolkit();
  var s=j.getScreenSize();
  sr=s.width+"x"+s.height;
 }
 if (n.language) { ul=n.language.toLowerCase(); }
 else if (n.browserLanguage) { ul=n.browserLanguage.toLowerCase(); }
 je=n.javaEnabled()?1:0;
 if (_uflash) fl=_uFlash();
 if (_ubd.characterSet) cs=_uES(_ubd.characterSet);
 else if (_ubd.charset) cs=_uES(_ubd.charset);
 return "&utmcs="+cs+"&utmsr="+sr+"&utmsc="+sc+"&utmul="+ul+"&utmje="+je+"&utmfl="+fl;
}
function __utmSetTrans() {
 var e;
 if (_ubd.getElementById) e=_ubd.getElementById("utmtrans");
 else if (_ubd.utmform && _ubd.utmform.utmtrans) e=_ubd.utmform.utmtrans;
 if (!e) return;
 var l=e.value.split("UTM:");
 var i,i2,c;
 if (_userv==0 || _userv==2) i=new Array();
 if (_userv==1 || _userv==2) { i2=new Array(); c=_uGCS(); }

 for (var ii=0;ii<l.length;ii++) {
  l[ii]=_uTrim(l[ii]);
  if (l[ii].charAt(0)!='T' && l[ii].charAt(0)!='I') continue;
  var r=Math.round(Math.random()*2147483647);
  if (!_utsp || _utsp=="") _utsp="|";
  var f=l[ii].split(_utsp),s="";
  if (f[0].charAt(0)=='T') {
   s="&utmt=tran"+"&utmn="+r;
   f[1]=_uTrim(f[1]); if(f[1]&&f[1]!="") s+="&utmtid="+_uES(f[1]);
   f[2]=_uTrim(f[2]); if(f[2]&&f[2]!="") s+="&utmtst="+_uES(f[2]);
   f[3]=_uTrim(f[3]); if(f[3]&&f[3]!="") s+="&utmtto="+_uES(f[3]);
   f[4]=_uTrim(f[4]); if(f[4]&&f[4]!="") s+="&utmttx="+_uES(f[4]);
   f[5]=_uTrim(f[5]); if(f[5]&&f[5]!="") s+="&utmtsp="+_uES(f[5]);
   f[6]=_uTrim(f[6]); if(f[6]&&f[6]!="") s+="&utmtci="+_uES(f[6]);
   f[7]=_uTrim(f[7]); if(f[7]&&f[7]!="") s+="&utmtrg="+_uES(f[7]);
   f[8]=_uTrim(f[8]); if(f[8]&&f[8]!="") s+="&utmtco="+_uES(f[8]);
  } else {
   s="&utmt=item"+"&utmn="+r;
   f[1]=_uTrim(f[1]); if(f[1]&&f[1]!="") s+="&utmtid="+_uES(f[1]);
   f[2]=_uTrim(f[2]); if(f[2]&&f[2]!="") s+="&utmipc="+_uES(f[2]);
   f[3]=_uTrim(f[3]); if(f[3]&&f[3]!="") s+="&utmipn="+_uES(f[3]);
   f[4]=_uTrim(f[4]); if(f[4]&&f[4]!="") s+="&utmiva="+_uES(f[4]);
   f[5]=_uTrim(f[5]); if(f[5]&&f[5]!="") s+="&utmipr="+_uES(f[5]);
   f[6]=_uTrim(f[6]); if(f[6]&&f[6]!="") s+="&utmiqt="+_uES(f[6]);
  }
  if (_udl.hostname && _udl.hostname!="") s+="&utmhn="+_uES(_udl.hostname);
  if (_usample && _usample != 100) s+="&utmsp="+_uES(_usample);

  if ((_userv==0 || _userv==2) && _uSP()) {
   i[ii]=new Image(1,1);
   i[ii].src=_ugifpath+"?"+"utmwv="+_uwv+s;
   i[ii].onload=function() { _uVoid(); }
  }
  if ((_userv==1 || _userv==2) && _uSP()) {
   i2[ii]=new Image(1,1);
   i2[ii].src=_ugifpath2+"?"+"utmwv="+_uwv+s+"&utmac="+_uacct+"&utmcc="+c;
   i2[ii].onload=function() { _uVoid(); }
  }
 }
 return;
}
function _uFlash() {
 var f="-",n=navigator;
 if (n.plugins && n.plugins.length) {
  for (var ii=0;ii<n.plugins.length;ii++) {
   if (n.plugins[ii].name.indexOf('Shockwave Flash')!=-1) {
    f=n.plugins[ii].description.split('Shockwave Flash ')[1];
    break;
   }
  }
 } else {
  var fl;
  try {
   fl = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
   f = fl.GetVariable("$version");
  } catch(e) {}
  if (f == "-") {
   try {
    fl = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
    f = "WIN 6,0,21,0";
    fl.AllowScriptAccess = "always";
    f = fl.GetVariable("$version");
   } catch(e) {}
  }
  if (f == "-") {
   try {
    fl = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
    f = fl.GetVariable("$version");
   } catch(e) {}
  }
  if (f != "-") {
   f = f.split(" ")[1].split(",");
   f = f[0] + "." + f[1] + " r" + f[2];
  }
 }
 return f;
}
function __utmLinkerUrl(l,h) {
 var p,k,a="-",b="-",c="-",x="-",z="-",v="-";
 var dc=_ubd.cookie;
 var iq = l.indexOf("?");
 var ih = l.indexOf("#");
 var url=l;
 if (dc) {
  a=_uES(_uGC(dc,"__utma="+_udh+".",";"));
  b=_uES(_uGC(dc,"__utmb="+_udh,";"));
  c=_uES(_uGC(dc,"__utmc="+_udh,";"));
  x=_uES(_uGC(dc,"__utmx="+_udh,";"));
  z=_uES(_uGC(dc,"__utmz="+_udh+".",";"));
  v=_uES(_uGC(dc,"__utmv="+_udh+".",";"));
  k=(_uHash(a+b+c+x+z+v)*1)+(_udh*1);
  p="__utma="+a+"&__utmb="+b+"&__utmc="+c+"&__utmx="+x+"&__utmz="+z+"&__utmv="+v+"&__utmk="+k;
 }
 if (p) {
  if (h && ih>-1) return;
  if (h) { url=l+"#"+p; }
  else {
   if (iq==-1 && ih==-1) url=l+"?"+p;
   else if (ih==-1) url=l+"&"+p;
   else if (iq==-1) url=l.substring(0,ih-1)+"?"+p+l.substring(ih);
   else url=l.substring(0,ih-1)+"&"+p+l.substring(ih);
  }
 }
 return url;
}
function __utmLinker(l,h) {
 if (!_ulink || !l || l=="") return;
 _udl.href=__utmLinkerUrl(l,h);
}
function __utmLinkPost(f,h) {
 if (!_ulink || !f || !f.action) return;
 f.action=__utmLinkerUrl(f.action, h);
 return;
}
function __utmSetVar(v) {
 if (!v || v=="") return;
 if (!_udo || _udo == "") {
  _udh=_uDomain();
  if (_udn && _udn!="") { _udo=" domain="+_udn+";"; }
 }
 if (!_uVG()) return;
 var r=Math.round(Math.random() * 2147483647);
 _ubd.cookie="__utmv="+_udh+"."+_uES(v)+"; path="+_utcp+"; expires="+_uNx()+";"+_udo;
 var s="&utmt=var&utmn="+r;
 if (_usample && _usample != 100) s+="&utmsp="+_uES(_usample);
 if ((_userv==0 || _userv==2) && _uSP()) {
  var i=new Image(1,1);
  i.src=_ugifpath+"?"+"utmwv="+_uwv+s;
  i.onload=function() { _uVoid(); }
 }
 if ((_userv==1 || _userv==2) && _uSP()) {
  var i2=new Image(1,1);
  i2.src=_ugifpath2+"?"+"utmwv="+_uwv+s+"&utmac="+_uacct+"&utmcc="+_uGCS();
  i2.onload=function() { _uVoid(); }
 }
}
function _uGCS() {
 var t,c="",dc=_ubd.cookie;
 if ((t=_uGC(dc,"__utma="+_udh+".",";"))!="-") c+=_uES("__utma="+t+";+");
 if ((t=_uGC(dc,"__utmx="+_udh,";"))!="-") c+=_uES("__utmx="+t+";+");
 if ((t=_uGC(dc,"__utmz="+_udh+".",";"))!="-") c+=_uES("__utmz="+t+";+");
 if ((t=_uGC(dc,"__utmv="+_udh+".",";"))!="-") c+=_uES("__utmv="+t+";");
 if (c.charAt(c.length-1)=="+") c=c.substring(0,c.length-1);
 return c;
}
function _uGC(l,n,s) {
 if (!l || l=="" || !n || n=="" || !s || s=="") return "-";
 var i,i2,i3,c="-";
 i=l.indexOf(n);
 i3=n.indexOf("=")+1;
 if (i > -1) {
  i2=l.indexOf(s,i); if (i2 < 0) { i2=l.length; }
  c=l.substring((i+i3),i2);
 }
 return c;
}
function _uDomain() {
 if (!_udn || _udn=="" || _udn=="none") { _udn=""; return 1; }
 if (_udn=="auto") {
  var d=_ubd.domain;
  if (d.substring(0,4)=="www.") {
   d=d.substring(4,d.length);
  }
  _udn=d;
 }
 _udn = _udn.toLowerCase(); 
 if (_uhash=="off") return 1;
 return _uHash(_udn);
}
function _uHash(d) {
 if (!d || d=="") return 1;
 var h=0,g=0;
 for (var i=d.length-1;i>=0;i--) {
  var c=parseInt(d.charCodeAt(i));
  h=((h << 6) & 0xfffffff) + c + (c << 14);
  if ((g=h & 0xfe00000)!=0) h=(h ^ (g >> 21));
 }
 return h;
}
function _uFixA(c,s,t) {
 if (!c || c=="" || !s || s=="" || !t || t=="") return "-";
 var a=_uGC(c,"__utma="+_udh+".",s);
 var lt=0,i=0;
 if ((i=a.lastIndexOf(".")) > 9) {
  _uns=a.substring(i+1,a.length);
  _uns=(_uns*1)+1;
  a=a.substring(0,i);
  if ((i=a.lastIndexOf(".")) > 7) {
   lt=a.substring(i+1,a.length);
   a=a.substring(0,i);
  }
  if ((i=a.lastIndexOf(".")) > 5) {
   a=a.substring(0,i);
  }
  a+="."+lt+"."+t+"."+_uns;
 }
 return a;
}
function _uTrim(s) {
  if (!s || s=="") return "";
  while ((s.charAt(0)==' ') || (s.charAt(0)=='\n') || (s.charAt(0,1)=='\r')) s=s.substring(1,s.length);
  while ((s.charAt(s.length-1)==' ') || (s.charAt(s.length-1)=='\n') || (s.charAt(s.length-1)=='\r')) s=s.substring(0,s.length-1);
  return s;
}
function _uEC(s) {
  var n="";
  if (!s || s=="") return "";
  for (var i=0;i<s.length;i++) {if (s.charAt(i)==" ") n+="+"; else n+=s.charAt(i);}
  return n;
}
function __utmVisitorCode(f) {
 var r=0,t=0,i=0,i2=0,m=31;
 var a=_uGC(_ubd.cookie,"__utma="+_udh+".",";");
 if ((i=a.indexOf(".",0))<0) return;
 if ((i2=a.indexOf(".",i+1))>0) r=a.substring(i+1,i2); else return "";  
 if ((i=a.indexOf(".",i2+1))>0) t=a.substring(i2+1,i); else return "";  
 if (f) {
  return r;
 } else {
  var c=new Array('A','B','C','D','E','F','G','H','J','K','L','M','N','P','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9');
  return c[r>>28&m]+c[r>>23&m]+c[r>>18&m]+c[r>>13&m]+"-"+c[r>>8&m]+c[r>>3&m]+c[((r&7)<<2)+(t>>30&3)]+c[t>>25&m]+c[t>>20&m]+"-"+c[t>>15&m]+c[t>>10&m]+c[t>>5&m]+c[t&m];
 }
}
function _uIN(n) {
 if (!n) return false;
 for (var i=0;i<n.length;i++) {
  var c=n.charAt(i);
  if ((c<"0" || c>"9") && (c!=".")) return false;
 }
 return true;
}
function _uES(s,u) {
 if (typeof(encodeURIComponent) == 'function') {
  if (u) return encodeURI(s);
  else return encodeURIComponent(s);
 } else {
  return escape(s);
 }
}
function _uUES(s) {
 if (typeof(decodeURIComponent) == 'function') {
  return decodeURIComponent(s);
 } else {
  return unescape(s);
 }
}
function _uVG() {
 if((_udn.indexOf("www.google.") == 0 || _udn.indexOf(".google.") == 0 || _udn.indexOf("google.") == 0) && _utcp=='/' && _udn.indexOf("google.org")==-1) {
  return false;
 }
 return true;
}
function _uSP() {
 var s=100;
 if (_usample) s=_usample;
 if(s>=100 || s<=0) return true;
 return ((__utmVisitorCode(1)%10000)<(s*100));
}
function urchinPathCopy(p){
 var d=document,nx,tx,sx,i,c,cs,t,h,o;
 cs=new Array("a","b","c","v","x","z");
 h=_uDomain(); if (_udn && _udn!="") o=" domain="+_udn+";";
 nx=_uNx()+";";
 tx=new Date(); tx.setTime(tx.getTime()+(_utimeout*1000));
 tx=tx.toGMTString()+";";
 sx=new Date(); sx.setTime(sx.getTime()+(_ucto*1000));
 sx=sx.toGMTString()+";";
 for (i=0;i<6;i++){
  t=" expires=";
  if (i==1) t+=tx; else if (i==2) t=""; else if (i==5) t+=sx; else t+=nx;
  c=_uGC(d.cookie,"__utm"+cs[i]+"="+h,";");
  if (c!="-") d.cookie="__utm"+cs[i]+"="+c+"; path="+p+";"+t+o;
 }
}
function _uCO() {
 if (!_utk || _utk=="" || _utk.length<10) return;
 var d='www.google.com';
 if (_utk.charAt(0)=='!') d='analytics.corp.google.com';
 _ubd.cookie="GASO="+_utk+"; path="+_utcp+";"+_udo;
 var sc=document.createElement('script');
 sc.type='text/javascript';
 sc.id="_gasojs";
 sc.src='https://'+d+'/analytics/reporting/overlay_js?gaso='+_utk+'&'+Math.random();
 document.getElementsByTagName('head')[0].appendChild(sc);  
}
function _uGT() {
 var h=location.hash, a;
 if (h && h!="" && h.indexOf("#gaso=")==0) {
  a=_uGC(h,"gaso=","&");
 } else {
  a=_uGC(_ubd.cookie,"GASO=",";");
 }
 return a;
}
var _utk=_uGT();
if (_utk && _utk!="" && _utk.length>10 && _utk.indexOf("=")==-1) {
 if (window.addEventListener) {
  window.addEventListener('load', _uCO, false); 
 } else if (window.attachEvent) { 
  window.attachEvent('onload', _uCO);
 }
}

function _uNx() {
  return (new Date((new Date()).getTime()+63072000000)).toGMTString();
}





/* NOT USED THIS 
var pageTracker = _gat._getTracker("UA-4090079-3");
	pageTracker._initData();
	pageTracker._trackPageview();


//To do widget usage statistics we use the google analytics tool


//Fallowing is the ga.js script taken from google
//http://www.google-analytics.com/ga.js

var _gat=new Object({c:"length",lb:"4.2",m:"cookie",b:undefined,cb:function(d,a){this.zb=d;this.Nb=a},r:"__utma=",W:"__utmb=",ma:"__utmc=",Ta:"__utmk=",na:"__utmv=",oa:"__utmx=",Sa:"GASO=",X:"__utmz=",lc:"http://www.google-analytics.com/__utm.gif",mc:"https://ssl.google-analytics.com/__utm.gif",Wa:"utmcid=",Ya:"utmcsr=",$a:"utmgclid=",Ua:"utmccn=",Xa:"utmcmd=",Za:"utmctr=",Va:"utmcct=",Hb:false,_gasoDomain:undefined,_gasoCPath:undefined,e:window,a:document,k:navigator,t:function(d){var a=1,c=0,g,
o;if(!_gat.q(d)){a=0;for(g=d[_gat.c]-1;g>=0;g--){o=d.charCodeAt(g);a=(a<<6&268435455)+o+(o<<14);c=a&266338304;a=c!=0?a^c>>21:a}}return a},C:function(d,a,c){var g=_gat,o="-",k,m,q=g.q;if(!q(d)&&!q(a)&&!q(c)){k=g.w(d,a);if(k>-1){m=d.indexOf(c,k);if(m<0)m=d[g.c];o=g.F(d,k+g.w(a,"=")+1,m)}}return o},Ea:function(d){var a=false,c=0,g,o;if(!_gat.q(d)){a=true;for(g=0;g<d[_gat.c];g++){o=d.charAt(g);c+="."==o?1:0;a=a&&c<=1&&(0==g&&"-"==o||_gat.P(".0123456789",o))}}return a},d:function(d,a){var c=encodeURIComponent;
return c instanceof Function?(a?encodeURI(d):c(d)):escape(d)},J:function(d,a){var c=decodeURIComponent,g;d=d.split("+").join(" ");if(c instanceof Function)try{g=a?decodeURI(d):c(d)}catch(o){g=unescape(d)}else g=unescape(d);return g},Db:function(d){return d&&d.hash?_gat.F(d.href,_gat.w(d.href,"#")):""},q:function(d){return _gat.b==d||"-"==d||""==d},Lb:function(d){return d[_gat.c]>0&&_gat.P(" \n\r\t",d)},P:function(d,a){return _gat.w(d,a)>-1},h:function(d,a){d[d[_gat.c]]=a},T:function(d){return d.toLowerCase()},
z:function(d,a){return d.split(a)},w:function(d,a){return d.indexOf(a)},F:function(d,a,c){c=_gat.b==c?d[_gat.c]:c;return d.substring(a,c)},uc:function(){var d=_gat.b,a=window;if(a&&a.gaGlobal&&a.gaGlobal.hid)d=a.gaGlobal.hid;else{d=Math.round(Math.random()*2147483647);a.gaGlobal=a.gaGlobal?a.gaGlobal:{};a.gaGlobal.hid=d}return d},wa:function(){return Math.round(Math.random()*2147483647)},Gc:function(){return(_gat.wa()^_gat.vc())*2147483647},vc:function(){var d=_gat.k,a=_gat.a,c=_gat.e,g=a[_gat.m]?
a[_gat.m]:"",o=c.history[_gat.c],k,m,q=[d.appName,d.version,d.language?d.language:d.browserLanguage,d.platform,d.userAgent,d.javaEnabled()?1:0].join("");if(c.screen)q+=c.screen.width+"x"+c.screen.height+c.screen.colorDepth;else if(c.java){m=java.awt.Toolkit.getDefaultToolkit().getScreenSize();q+=m.screen.width+"x"+m.screen.height}q+=g;q+=a.referrer?a.referrer:"";k=q[_gat.c];while(o>0)q+=o--^k++;return _gat.t(q)}});_gat.hc=function(){var d=this,a=_gat.cb;function c(g,o){return new a(g,o)}d.db="utm_campaign";d.eb="utm_content";d.fb="utm_id";d.gb="utm_medium";d.hb="utm_nooverride";d.ib="utm_source";d.jb="utm_term";d.kb="gclid";d.pa=0;d.I=0;d.wb="15768000";d.Tb="1800";d.ea=[];d.ga=[];d.Ic="cse";d.Gb="q";d.ab="google";d.fa=[c(d.ab,d.Gb),c("yahoo","p"),c("msn","q"),c("aol","query"),c("aol","encquery"),c("lycos","query"),c("ask","q"),c("altavista","q"),c("netscape","query"),c("cnn","query"),c("looksmart","qt"),c("about",
"terms"),c("mamma","query"),c("alltheweb","q"),c("gigablast","q"),c("voila","rdata"),c("virgilio","qs"),c("live","q"),c("baidu","wd"),c("alice","qs"),c("yandex","text"),c("najdi","q"),c("aol","q"),c("club-internet","query"),c("mama","query"),c("seznam","q"),c("search","q"),c("wp","szukaj"),c("onet","qt"),c("netsprint","q"),c("google.interia","q"),c("szukacz","q"),c("yam","k"),c("pchome","q"),c("kvasir","searchExpr"),c("sesam","q"),c("ozu","q"),c("terra","query"),c("nostrum","query"),c("mynet","q"),
c("ekolay","q"),c("search.ilse","search_for")];d.B=undefined;d.Kb=false;d.p="/";d.ha=100;d.Da="/__utm.gif";d.ta=1;d.ua=1;d.G="|";d.sa=1;d.qa=1;d.pb=1;d.g="auto";d.D=1;d.Ga=1000;d.Yc=10;d.nc=10;d.Zc=0.2};_gat.Y=function(d,a){var c,g,o,k,m,q,r,f=this,p=_gat,w=p.q,x=p.c,i,z=a;f.a=d;function A(h){var b=h instanceof Array?h.join("."):"";return w(b)?"-":b}function B(h,b){var e=[],j;if(!w(h)){e=p.z(h,".");if(b)for(j=0;j<e[x];j++)if(!p.Ea(e[j]))e[j]="-"}return e}function n(){return u(63072000000)}function u(h){var b=new Date,e=new Date(b.getTime()+h);return"expires="+e.toGMTString()+"; "}function l(h,b){f.a[p.m]=h+"; path="+z.p+"; "+b+f.Cc()}function s(h,b,e){var j=f.V,t,v;for(t=0;t<j[x];t++){v=j[t][0];
v+=w(b)?b:b+j[t][4];j[t][2](p.C(h,v,e))}}f.Jb=function(){return p.b==i||i==f.t()};f.Ba=function(){return m?m:"-"};f.Wb=function(h){m=h};f.Ma=function(h){i=p.Ea(h)?h*1:"-"};f.Aa=function(){return A(q)};f.Na=function(h){q=B(h)};f.Hc=function(){return i?i:"-"};f.Cc=function(){return w(z.g)?"":"domain="+z.g+";"};f.ya=function(){return A(c)};f.Ub=function(h){c=B(h,1)};f.K=function(){return A(g)};f.La=function(h){g=B(h,1)};f.za=function(){return A(o)};f.Vb=function(h){o=B(h,1)};f.Ca=function(){return A(k)};
f.Xb=function(h){k=B(h);for(var b=0;b<k[x];b++)if(b<4&&!p.Ea(k[b]))k[b]="-"};f.Dc=function(){return r};f.Uc=function(h){r=h};f.pc=function(){c=[];g=[];o=[];k=[];m=p.b;q=[];i=p.b};f.t=function(){var h="",b;for(b=0;b<f.V[x];b++)h+=f.V[b][1]();return p.t(h)};f.Ha=function(h){var b=f.a[p.m],e=false;if(b){s(b,h,";");f.Ma(f.t());e=true}return e};f.Rc=function(h){s(h,"","&");f.Ma(p.C(h,p.Ta,"&"))};f.Wc=function(){var h=f.V,b=[],e;for(e=0;e<h[x];e++)p.h(b,h[e][0]+h[e][1]());p.h(b,p.Ta+f.t());return b.join("&")};
f.bd=function(h,b){var e=f.V,j=z.p,t;f.Ha(h);z.p=b;for(t=0;t<e[x];t++)if(!w(e[t][1]()))e[t][3]();z.p=j};f.dc=function(){l(p.r+f.ya(),n())};f.Pa=function(){l(p.W+f.K(),u(z.Tb*1000))};f.ec=function(){l(p.ma+f.za(),"")};f.Ra=function(){l(p.X+f.Ca(),u(z.wb*1000))};f.fc=function(){l(p.oa+f.Ba(),n())};f.Qa=function(){l(p.na+f.Aa(),n())};f.cd=function(){l(p.Sa+f.Dc(),"")};f.V=[[p.r,f.ya,f.Ub,f.dc,"."],[p.W,f.K,f.La,f.Pa,""],[p.ma,f.za,f.Vb,f.ec,""],[p.oa,f.Ba,f.Wb,f.fc,""],[p.X,f.Ca,f.Xb,f.Ra,"."],[p.na,
f.Aa,f.Na,f.Qa,"."]]};_gat.jc=function(d){var a=this,c=_gat,g=d,o,k=function(){},m=function(q){var r=(new Date).getTime(),f;f=(r-q[3])*(g.Zc/1000);if(f>=1){q[2]=Math.min(Math.floor(q[2]*1+f),g.nc);q[3]=r}return q};a.O=function(q,r,f,p,w,x,i){var z,A=g.D,B=f.location;if(!o)o=new c.Y(f,g);o.Ha(p);z=c.z(o.K(),".");if(z[1]<500||w){if(x)z=m(z);if(w||!x||z[2]>=1){if(!w&&x)z[2]=z[2]*1-1;z[1]=z[1]*1+1;q="?utmwv="+_gat.lb+"&utmn="+c.wa()+(c.q(B.hostname)?"":"&utmhn="+c.d(B.hostname))+(g.ha==100?"":"&utmsp="+c.d(g.ha))+q;if(0==
A||2==A){var n=new Image(1,1);n.src=g.Da+q;var u=2==A?function(){k()}:i||function(){k()};n.onload=u}if(1==A||2==A){
var l=new Image(1,1);
l.src=("https:"==B.protocol?c.mc:c.lc)+q+"&utmac="+r+"&utmcc="+a.wc(f,p);
l.onload=i||function(){k()}}}}o.La(z.join("."));o.Pa()};a.wc=function(q,r){var f=[],p=[c.r,c.X,c.na,c.oa],w,x=q[c.m],i;for(w=0;w<p[c.c];w++){i=c.C(x,p[w]+r,";");if(!c.q(i))c.h(f,p[w]+i+";")}return c.d(f.join("+"))}};_gat.i=function(){this.la=[]};_gat.i.bb=function(d,a,c,g,o,k){var m=this;m.cc=d;m.Oa=a;m.L=c;m.sb=g;m.Pb=o;m.Qb=k};_gat.i.bb.prototype.S=function(){var d=this,a=_gat.d;return"&"+["utmt=item","utmtid="+a(d.cc),"utmipc="+a(d.Oa),"utmipn="+a(d.L),"utmiva="+a(d.sb),"utmipr="+a(d.Pb),"utmiqt="+a(d.Qb)].join("&")};_gat.i.$=function(d,a,c,g,o,k,m,q){var r=this;r.v=d;r.ob=a;r.bc=c;r.ac=g;r.Yb=o;r.ub=k;r.$b=m;r.xb=q;r.ca=[]};_gat.i.$.prototype.mb=function(d,a,c,g,o){var k=this,m=k.Eb(d),q=k.v,r=_gat;if(r.b==
m)r.h(k.ca,new r.i.bb(q,d,a,c,g,o));else{m.cc=q;m.Oa=d;m.L=a;m.sb=c;m.Pb=g;m.Qb=o}};_gat.i.$.prototype.Eb=function(d){var a,c=this.ca,g;for(g=0;g<c[_gat.c];g++)a=d==c[g].Oa?c[g]:a;return a};_gat.i.$.prototype.S=function(){var d=this,a=_gat.d;return"&"+["utmt=tran","utmtid="+a(d.v),"utmtst="+a(d.ob),"utmtto="+a(d.bc),"utmttx="+a(d.ac),"utmtsp="+a(d.Yb),"utmtci="+a(d.ub),"utmtrg="+a(d.$b),"utmtco="+a(d.xb)].join("&")};_gat.i.prototype.nb=function(d,a,c,g,o,k,m,q){var r=this,f=_gat,p=r.xa(d);if(f.b==
p){p=new f.i.$(d,a,c,g,o,k,m,q);f.h(r.la,p)}else{p.ob=a;p.bc=c;p.ac=g;p.Yb=o;p.ub=k;p.$b=m;p.xb=q}return p};_gat.i.prototype.xa=function(d){var a,c=this.la,g;for(g=0;g<c[_gat.c];g++)a=d==c[g].v?c[g]:a;return a};_gat.gc=function(d){var a=this,c="-",g=_gat,o=d;a.Ja=screen;a.qb=!self.screen&&self.java?java.awt.Toolkit.getDefaultToolkit():g.b;a.a=document;a.e=window;a.k=navigator;a.Ka=c;a.Sb=c;a.tb=c;a.Ob=c;a.Mb=1;a.Bb=c;function k(){var m,q,r,f,p="ShockwaveFlash",w="$version",x=a.k?a.k.plugins:g.b;if(x&&x[g.c]>0)for(m=0;m<x[g.c]&&!r;m++){q=x[m];if(g.P(q.name,"Shockwave Flash"))r=g.z(q.description,"Shockwave Flash ")[1]}else{p=p+"."+p;try{f=new ActiveXObject(p+".7");r=f.GetVariable(w)}catch(i){}if(!r)try{f=
new ActiveXObject(p+".6");r="WIN 6,0,21,0";f.AllowScriptAccess="always";r=f.GetVariable(w)}catch(z){}if(!r)try{f=new ActiveXObject(p);r=f.GetVariable(w)}catch(z){}if(r){r=g.z(g.z(r," ")[1],",");r=r[0]+"."+r[1]+" r"+r[2]}}return r?r:c}a.xc=function(){var m;if(self.screen){a.Ka=a.Ja.width+"x"+a.Ja.height;a.Sb=a.Ja.colorDepth+"-bit"}else if(a.qb)try{m=a.qb.getScreenSize();a.Ka=m.width+"x"+m.height}catch(q){}a.Ob=g.T(a.k&&a.k.language?a.k.language:(a.k&&a.k.browserLanguage?a.k.browserLanguage:c));a.Mb=
a.k&&a.k.javaEnabled()?1:0;a.Bb=o?k():c;a.tb=g.d(a.a.characterSet?a.a.characterSet:(a.a.charset?a.a.charset:c))};a.Xc=function(){return"&"+["utmcs="+g.d(a.tb),"utmsr="+a.Ka,"utmsc="+a.Sb,"utmul="+a.Ob,"utmje="+a.Mb,"utmfl="+g.d(a.Bb)].join("&")}};_gat.n=function(d,a,c,g,o){var k=this,m=_gat,q=m.q,r=m.b,f=m.P,p=m.C,w=m.T,x=m.z,i=m.c;k.a=a;k.f=d;k.Rb=c;k.ja=g;k.o=o;function z(n){return q(n)||"0"==n||!f(n,"://")}function A(n){var u="";n=w(x(n,"://")[1]);if(f(n,"/")){n=x(n,"/")[1];if(f(n,"?"))u=x(n,"?")[0]}return u}function B(n){var u="";u=w(x(n,"://")[1]);if(f(u,"/"))u=x(u,"/")[0];return u}k.Fc=function(n){var u=k.Fb(),l=k.o;return new m.n.s(p(n,l.fb+"=","&"),p(n,l.ib+"=","&"),p(n,l.kb+"=","&"),k.ba(n,l.db,"(not set)"),k.ba(n,l.gb,"(not set)"),
k.ba(n,l.jb,u&&!q(u.R)?m.J(u.R):r),k.ba(n,l.eb,r))};k.Ib=function(n){var u=B(n),l=A(n);if(f(u,k.o.ab)){n=x(n,"?").join("&");if(f(n,"&"+k.o.Gb+"="))if(l==k.o.Ic)return true}return false};k.Fb=function(){var n,u,l=k.Rb,s,h,b=k.o.fa;if(z(l)||k.Ib(l))return;n=B(l);for(s=0;s<b[i];s++){h=b[s];if(f(n,w(h.zb))){l=x(l,"?").join("&");if(f(l,"&"+h.Nb+"=")){u=x(l,"&"+h.Nb+"=")[1];if(f(u,"&"))u=x(u,"&")[0];return new m.n.s(r,h.zb,r,"(organic)","organic",u,r)}}}};k.ba=function(n,u,l){var s=p(n,u+"=","&"),h=!q(s)?
m.J(s):(!q(l)?l:"-");return h};k.Nc=function(n){var u=k.o.ea,l=false,s,h;if(n&&"organic"==n.da){s=w(m.J(n.R));for(h=0;h<u[i];h++)l=l||w(u[h])==s}return l};k.Ec=function(){var n="",u="",l=k.Rb;if(z(l)||k.Ib(l))return;n=w(x(l,"://")[1]);if(f(n,"/")){u=m.F(n,m.w(n,"/"));if(f(u,"?"))u=x(u,"?")[0];n=x(n,"/")[0]}if(0==m.w(n,"www."))n=m.F(n,4);return new m.n.s(r,n,r,"(referral)","referral",r,u)};k.sc=function(n){var u="";if(k.o.pa){u=m.Db(n);u=""!=u?u+"&":u}u+=n.search;return u};k.zc=function(){return new m.n.s(r,
"(direct)",r,"(direct)","(none)",r,r)};k.Oc=function(n){var u=false,l,s,h=k.o.ga;if(n&&"referral"==n.da){l=w(m.d(n.ia));for(s=0;s<h[i];s++)u=u||f(l,w(h[s]))}return u};k.U=function(n){return r!=n&&n.Fa()};k.yc=function(n,u){var l="",s="-",h,b,e=0,j,t,v=k.f;if(!n)return"";t=k.a[m.m]?k.a[m.m]:"";l=k.sc(k.a.location);if(k.o.I&&n.Jb()){s=n.Ca();if(!q(s)&&!f(s,";")){n.Ra();return""}}s=p(t,m.X+v+".",";");h=k.Fc(l);if(k.U(h)){b=p(l,k.o.hb+"=","&");if("1"==b&&!q(s))return""}if(!k.U(h)){h=k.Fb();if(!q(s)&&
k.Nc(h))return""}if(!k.U(h)&&u){h=k.Ec();if(!q(s)&&k.Oc(h))return""}if(!k.U(h))if(q(s)&&u)h=k.zc();if(!k.U(h))return"";if(!q(s)){var y=x(s,"."),E=new m.n.s;E.Cb(y.slice(4).join("."));j=w(E.ka())==w(h.ka());e=y[3]*1}if(!j||u){var F=p(t,m.r+v+".",";"),I=F.lastIndexOf("."),G=I>9?m.F(F,I+1)*1:0;e++;G=0==G?1:G;n.Xb([v,k.ja,G,e,h.ka()].join("."));n.Ra();return"&utmcn=1"}else return"&utmcr=1"}};_gat.n.s=function(d,a,c,g,o,k,m){var q=this;q.v=d;q.ia=a;q.ra=c;q.L=g;q.da=o;q.R=k;q.vb=m};_gat.n.s.prototype.ka=
function(){var d=this,a=_gat,c=[],g=[[a.Wa,d.v],[a.Ya,d.ia],[a.$a,d.ra],[a.Ua,d.L],[a.Xa,d.da],[a.Za,d.R],[a.Va,d.vb]],o,k;if(d.Fa())for(o=0;o<g[a.c];o++)if(!a.q(g[o][1])){k=g[o][1].split("+").join("%20");k=k.split(" ").join("%20");a.h(c,g[o][0]+k)}return c.join("|")};_gat.n.s.prototype.Fa=function(){var d=this,a=_gat.q;return!(a(d.v)&&a(d.ia)&&a(d.ra))};_gat.n.s.prototype.Cb=function(d){var a=this,c=_gat,g=function(o){return c.J(c.C(d,o,"|"))};a.v=g(c.Wa);a.ia=g(c.Ya);a.ra=g(c.$a);a.L=g(c.Ua);a.da=
g(c.Xa);a.R=g(c.Za);a.vb=g(c.Va)};_gat.Z=function(){var d=this,a=_gat,c={},g="k",o="v",k=[g,o],m="(",q=")",r="*",f="!",p="'",w={};w[p]="'0";w[q]="'1";w[r]="'2";w[f]="'3";var x=1;function i(l,s,h,b){if(a.b==c[l])c[l]={};if(a.b==c[l][s])c[l][s]=[];c[l][s][h]=b}function z(l,s,h){return a.b!=c[l]&&a.b!=c[l][s]?c[l][s][h]:a.b}function A(l,s){if(a.b!=c[l]&&a.b!=c[l][s]){c[l][s]=a.b;var h=true,b;for(b=0;b<k[a.c];b++)if(a.b!=c[l][k[b]]){h=false;break}if(h)c[l]=a.b}}function B(l){var s="",h=false,b,e;for(b=0;b<k[a.c];b++){e=l[k[b]];if(a.b!=
e){if(h)s+=k[b];s+=n(e);h=false}else h=true}return s}function n(l){var s=[],h,b;for(b=0;b<l[a.c];b++)if(a.b!=l[b]){h="";if(b!=x&&a.b==l[b-1]){h+=b.toString();h+=f}h+=u(l[b]);a.h(s,h)}return m+s.join(r)+q}function u(l){var s="",h,b,e;for(h=0;h<l[a.c];h++){b=l.charAt(h);e=w[b];s+=a.b!=e?e:b}return s}d.Kc=function(l){return a.b!=c[l]};d.N=function(){var l=[],s;for(s in c)if(a.b!=c[s])a.h(l,s.toString()+B(c[s]));return l.join("")};d.Sc=function(l){if(l==a.b)return d.N();var s=[l.N()],h;for(h in c)if(a.b!=
c[h]&&!l.Kc(h))a.h(s,h.toString()+B(c[h]));return s.join("")};d._setKey=function(l,s,h){if(typeof h!="string")return false;i(l,g,s,h);return true};d._setValue=function(l,s,h){if(typeof h!="number"&&(a.b==Number||!(h instanceof Number)))return false;if(Math.round(h)!=h||h==NaN||h==Infinity)return false;i(l,o,s,h.toString());return true};d._getKey=function(l,s){return z(l,g,s)};d._getValue=function(l,s){return z(l,o,s)};d._clearKey=function(l){A(l,g)};d._clearValue=function(l){A(l,o)}};_gat.ic=function(d,a){var c=this;c.jd=a;c.Pc=d;c._trackEvent=function(g,o,k){return a._trackEvent(c.Pc,g,o,k)}};_gat.kc=function(d){var a=this,c=_gat,g=c.b,o=c.q,k=c.w,m=c.F,q=c.C,r=c.P,f=c.z,p="location",w=c.c,x=g,i=new c.hc,z=false;a.a=document;a.e=window;a.ja=Math.round((new Date).getTime()/1000);a.H=d;a.yb=a.a.referrer;a.va=g;a.j=g;a.A=g;a.M=false;a.aa=g;a.rb="";a.l=g;a.Ab=g;a.f=g;a.u=g;function A(){if("auto"==i.g){var b=a.a.domain;if("www."==m(b,0,4))b=m(b,4);i.g=b}i.g=c.T(i.g)}function B(){var b=i.g,e=k(b,"www.google.")*k(b,".google.")*k(b,"google.");return e||"/"!=i.p||k(b,"google.org")>-1}function n(b,
e,j){if(o(b)||o(e)||o(j))return"-";var t=q(b,c.r+a.f+".",e),v;if(!o(t)){v=f(t,".");v[5]=v[5]?v[5]*1+1:1;v[3]=v[4];v[4]=j;t=v.join(".")}return t}function u(){return"fileXXX:"!=a.a[p].protocol&&B()}function l(b){if(!b||""==b)return"";while(c.Lb(b.charAt(0)))b=m(b,1);while(c.Lb(b.charAt(b[w]-1)))b=m(b,0,b[w]-1);return b}function s(b,e,j){if(!o(b())){e(c.J(b()));if(!r(b(),";"))j()}}function h(b){var e,j=""!=b&&a.a[p].host!=b;if(j)for(e=0;e<i.B[w];e++)j=j&&k(c.T(b),c.T(i.B[e]))==-1;return j}a.Bc=function(){if(!i.g||
""==i.g||"none"==i.g){i.g="";return 1}A();return i.pb?c.t(i.g):1};a.tc=function(b,e){if(o(b))b="-";else{e+=i.p&&"/"!=i.p?i.p:"";var j=k(b,e);b=j>=0&&j<=8?"0":("["==b.charAt(0)&&"]"==b.charAt(b[w]-1)?"-":b)}return b};a.Ia=function(b){var e="",j=a.a;e+=a.aa?a.aa.Xc():"";e+=i.qa?a.rb:"";e+=i.ta&&!o(j.title)?"&utmdt="+c.d(j.title):"";e+="&utmhid="+c.uc()+"&utmr="+a.va+"&utmp="+a.Tc(b);return e};a.Tc=function(b){var e=a.a[p];b=g!=b&&""!=b?c.d(b,true):c.d(e.pathname+unescape(e.search),true);return b};a.$c=
function(b){if(a.Q()){var e="";if(a.l!=g&&a.l.N().length>0)e+="&utme="+c.d(a.l.N());e+=a.Ia(b);x.O(e,a.H,a.a,a.f)}};a.qc=function(){var b=new c.Y(a.a,i);return b.Ha(a.f)?b.Wc():g};a._getLinkerUrl=function(b,e){var j=f(b,"#"),t=b,v=a.qc();if(v)if(e&&1>=j[w])t+="#"+v;else if(!e||1>=j[w])if(1>=j[w])t+=(r(b,"?")?"&":"?")+v;else t=j[0]+(r(b,"?")?"&":"?")+v+"#"+j[1];return t};a.Zb=function(){var b;if(a.A&&a.A[w]>=10&&!r(a.A,"=")){a.u.Uc(a.A);a.u.cd();c._gasoDomain=i.g;c._gasoCPath=i.p;b=a.a.createElement("script");
b.type="text/javascript";b.id="_gasojs";b.src="https://www.google.com/analytics/reporting/overlay_js?gaso="+a.A+"&"+c.wa();a.a.getElementsByTagName("head")[0].appendChild(b)}};a.Jc=function(){var b=a.a[c.m],e=a.ja,j=a.u,t=a.f+"",v=a.e,y=v?v.gaGlobal:g,E,F=r(b,c.r+t+"."),I=r(b,c.W+t),G=r(b,c.ma+t),C,D=[],H="",K=false,J;b=o(b)?"":b;if(i.I){E=c.Db(a.a[p]);if(i.pa&&!o(E))H=E+"&";H+=a.a[p].search;if(!o(H)&&r(H,c.r)){j.Rc(H);if(!j.Jb())j.pc();C=j.ya()}s(j.Ba,j.Wb,j.fc);s(j.Aa,j.Na,j.Qa)}if(!o(C))if(o(j.K())||
o(j.za())){C=n(H,"&",e);a.M=true}else{D=f(j.K(),".");t=D[0]}else if(F)if(!I||!G){C=n(b,";",e);a.M=true}else{C=q(b,c.r+t+".",";");D=f(q(b,c.W+t,";"),".")}else{C=[t,c.Gc(),e,e,e,1].join(".");a.M=true;K=true}C=f(C,".");if(K)if(v&&y&&!y.from_cookie){C[4]=y.sid?y.sid:C[4];C[3]=y.sid?y.sid:C[4];if(y.vid){J=f(y.vid,".");C[1]=J[0];C[2]=J[1]}}j.Ub(C.join("."));D[0]=t;D[1]=D[1]?D[1]:0;D[2]=undefined!=D[2]?D[2]:i.Yc;D[3]=D[3]?D[3]:C[4];j.La(D.join("."));j.Vb(t);if(!o(j.Hc()))j.Ma(j.t());j.dc();j.Pa();j.ec()};
a.Lc=function(){x=new c.jc(i)};a._initData=function(){var b;if(!z){a.Lc();a.f=a.Bc();a.u=new c.Y(a.a,i)}if(u())a.Jc();if(!z){if(u()){a.va=a.tc(a.Ac(),a.a.domain);if(i.sa){a.aa=new c.gc(i.ua);a.aa.xc()}if(i.qa){b=new c.n(a.f,a.a,a.va,a.ja,i);a.rb=b.yc(a.u,a.M)}}a.l=new c.Z;a.Ab=new c.Z;z=true}if(!c.Hb)a.Mc()};a._visitCode=function(){a._initData();var b=q(a.a[c.m],c.r+a.f+".",";"),e=f(b,".");return e[w]<4?"":e[1]};a._cookiePathCopy=function(b){a._initData();if(a.u)a.u.bd(a.f,b)};a.Mc=function(){var b=
a.a[p].hash,e;e=b&&""!=b&&0==k(b,"#gaso=")?q(b,"gaso=","&"):q(a.a[c.m],c.Sa,";");if(e[w]>=10){a.A=e;if(a.e.addEventListener)a.e.addEventListener("load",a.Zb,false);else a.e.attachEvent("onload",a.Zb)}c.Hb=true};a.Q=function(){return a._visitCode()%10000<i.ha*100};a.Vc=function(){var b,e,j=a.a.links;if(!i.Kb){var t=a.a.domain;if("www."==m(t,0,4))t=m(t,4);i.B.push("."+t)}for(b=0;b<j[w]&&(i.Ga==-1||b<i.Ga);b++){e=j[b];if(h(e.host))if(!e.gatcOnclick){e.gatcOnclick=e.onclick?e.onclick:a.Qc;e.onclick=function(v){var y=
!this.target||this.target=="_self"||this.target=="_top"||this.target=="_parent";y=y&&!a.oc(v);a.ad(v,this,y);return y?false:(this.gatcOnclick?this.gatcOnclick(v):true)}}}};a.Qc=function(){};a._trackPageview=function(b){if(u()){a._initData();if(i.B)a.Vc();a.$c(b);a.M=false}};a._trackTrans=function(){var b=a.f,e=[],j,t,v,y;a._initData();if(a.j&&a.Q()){for(j=0;j<a.j.la[w];j++){t=a.j.la[j];c.h(e,t.S());for(v=0;v<t.ca[w];v++)c.h(e,t.ca[v].S())}for(y=0;y<e[w];y++)x.O(e[y],a.H,a.a,b,true)}};a._setTrans=
function(){var b=a.a,e,j,t,v,y=b.getElementById?b.getElementById("utmtrans"):(b.utmform&&b.utmform.utmtrans?b.utmform.utmtrans:g);a._initData();if(y&&y.value){a.j=new c.i;v=f(y.value,"UTM:");i.G=!i.G||""==i.G?"|":i.G;for(e=0;e<v[w];e++){v[e]=l(v[e]);j=f(v[e],i.G);for(t=0;t<j[w];t++)j[t]=l(j[t]);if("T"==j[0])a._addTrans(j[1],j[2],j[3],j[4],j[5],j[6],j[7],j[8]);else if("I"==j[0])a._addItem(j[1],j[2],j[3],j[4],j[5],j[6])}}};a._addTrans=function(b,e,j,t,v,y,E,F){a.j=a.j?a.j:new c.i;return a.j.nb(b,e,
j,t,v,y,E,F)};a._addItem=function(b,e,j,t,v,y){var E;a.j=a.j?a.j:new c.i;E=a.j.xa(b);if(!E)E=a._addTrans(b,"","","","","","","");E.mb(e,j,t,v,y)};a._setVar=function(b){if(b&&""!=b&&B()){a._initData();var e=new c.Y(a.a,i),j=a.f;e.Na(j+"."+c.d(b));e.Qa();if(a.Q())x.O("&utmt=var",a.H,a.a,a.f)}};a._link=function(b,e){if(i.I&&b){a._initData();a.a[p].href=a._getLinkerUrl(b,e)}};a._linkByPost=function(b,e){if(i.I&&b&&b.action){a._initData();b.action=a._getLinkerUrl(b.action,e)}};a._setXKey=function(b,e,
j){a.l._setKey(b,e,j)};a._setXValue=function(b,e,j){a.l._setValue(b,e,j)};a._getXKey=function(b,e){return a.l._getKey(b,e)};a._getXValue=function(b,e){return a.l.getValue(b,e)};a._clearXKey=function(b){a.l._clearKey(b)};a._clearXValue=function(b){a.l._clearValue(b)};a._createXObj=function(){a._initData();return new c.Z};a._sendXEvent=function(b){var e="";a._initData();if(a.Q()){e+="&utmt=event&utme="+c.d(a.l.Sc(b))+a.Ia();x.O(e,a.H,a.a,a.f,false,true)}};a._createEventTracker=function(b){a._initData();
return new c.ic(b,a)};a._trackEvent=function(b,e,j,t){var v=true,y=a.Ab;if(g!=b&&g!=e&&""!=b&&""!=e){y._clearKey(5);y._clearValue(5);v=y._setKey(5,1,b)?v:false;v=y._setKey(5,2,e)?v:false;v=g==j||y._setKey(5,3,j)?v:false;v=g==t||y._setValue(5,1,t)?v:false;if(v)a._sendXEvent(y)}else v=false;return v};a.ad=function(b,e,j){a._initData();if(a.Q()){var t=new c.Z;t._setKey(6,1,e.href);var v=j?function(){a.rc(b,e)}:undefined;x.O("&utmt=event&utme="+c.d(t.N())+a.Ia(),a.H,a.a,a.f,false,true,v)}};a.rc=function(b,
e){if(!b)b=a.e.event;var j=true;if(e.gatcOnclick)j=e.gatcOnclick(b);if(j||typeof j=="undefined")if(!e.target||e.target=="_self")a.e.location=e.href;else if(e.target=="_top")a.e.top.document.location=e.href;else if(e.target=="_parent")a.e.parent.document.location=e.href};a.oc=function(b){if(!b)b=a.e.event;var e=b.shiftKey||b.ctrlKey||b.altKey;if(!e)if(b.modifiers&&a.e.Event)e=b.modifiers&a.e.Event.CONTROL_MASK||b.modifiers&a.e.Event.SHIFT_MASK||b.modifiers&a.e.Event.ALT_MASK;return e};a._setDomainName=
function(b){i.g=b};a.dd=function(){return i.g};a._addOrganic=function(b,e){c.h(i.fa,new c.cb(b,e))};a._clearOrganic=function(){i.fa=[]};a.hd=function(){return i.fa};a._addIgnoredOrganic=function(b){c.h(i.ea,b)};a._clearIgnoredOrganic=function(){i.ea=[]};a.ed=function(){return i.ea};a._addIgnoredRef=function(b){c.h(i.ga,b)};a._clearIgnoredRef=function(){i.ga=[]};a.fd=function(){return i.ga};a._setAllowHash=function(b){i.pb=b?1:0};a._setCampaignTrack=function(b){i.qa=b?1:0};a._setClientInfo=function(b){i.sa=
b?1:0};a._getClientInfo=function(){return i.sa};a._setCookiePath=function(b){i.p=b};a._setTransactionDelim=function(b){i.G=b};a._setCookieTimeout=function(b){i.wb=b};a._setDetectFlash=function(b){i.ua=b?1:0};a._getDetectFlash=function(){return i.ua};a._setDetectTitle=function(b){i.ta=b?1:0};a._getDetectTitle=function(){return i.ta};a._setLocalGifPath=function(b){i.Da=b};a._getLocalGifPath=function(){return i.Da};a._setLocalServerMode=function(){i.D=0};a._setRemoteServerMode=function(){i.D=1};a._setLocalRemoteServerMode=
function(){i.D=2};a.gd=function(){return i.D};a._getServiceMode=function(){return i.D};a._setSampleRate=function(b){i.ha=b};a._setSessionTimeout=function(b){i.Tb=b};a._setAllowLinker=function(b){i.I=b?1:0};a._setAllowAnchor=function(b){i.pa=b?1:0};a._setCampNameKey=function(b){i.db=b};a._setCampContentKey=function(b){i.eb=b};a._setCampIdKey=function(b){i.fb=b};a._setCampMediumKey=function(b){i.gb=b};a._setCampNOKey=function(b){i.hb=b};a._setCampSourceKey=function(b){i.ib=b};a._setCampTermKey=function(b){i.jb=
b};a._setCampCIdKey=function(b){i.kb=b};a._getAccount=function(){return a.H};a._getVersion=function(){return _gat.lb};a.kd=function(b){i.B=[];if(b)i.B=b};a.md=function(b){i.Kb=b};a.ld=function(b){i.Ga=b};a._setReferrerOverride=function(b){a.yb=b};a.Ac=function(){return a.yb}};_gat._getTracker=function(d){var a=new _gat.kc(d);return a};


*/




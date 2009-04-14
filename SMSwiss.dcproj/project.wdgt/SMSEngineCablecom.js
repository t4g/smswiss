function SMSEngineCablecom(theUsername,thePassword) {


var innerSessionID = -1;
var innerJSessionID = -1
var remainningSMS = -1;
var username = theUsername;
var password = thePassword;
var innerSMSCount=0;
var isJustAuthenticated = false;

//Since the AppleWebToolkit do not allow to set cookie
//we are using a home made implementation of the XMLHttpRequest
var xmlRequest = new SimpleHTTPRequest();// XMLHttpRequest();

var smsChars = 130;

this.getAvailSMS = function () {
	if(innerSessionID == -1)
		doAuthentication(null,null);
	else
		loadSMS();
};


this.Send = function (smsText,number) {
	sendSMS(smsText,number);
};


this.GetSMSCharsCount = function () {
	return smsChars;
};

this.getSMSCount = function () {
	return remainningSMS;
};

this.isConnected = function () {
	return innerSessionID != -1;
};

this.isSMSCountCritical = function () {
	return (innerSMSCount < 150);
};

this.isSMSCountWarning = function () {
	return (innerSMSCount < 350);
};


this.hasEnoughCredits = function (messLenght) {
	return (messLenght <= smsChars * innerSMSCount/25); //Estimate	
};


//The main function, only this function has to be calles

function sendSMS(smsText,number){
	
	if(smsText==null)
		return loadSMS(null,null);
	
	//Partition mess in multiple sms
	var queue_mess=new Array();
	while(smsText.length>smsChars){
		queue_mess.push(smsText.substring(0,smsChars));
		smsText=smsText.substring(smsChars, smsText.length);
	}
	queue_mess.push(smsText);
		
	sendSingleSMS(queue_mess,number);
}



function sendSingleSMS(queue_mess,number){

	engineStatusFeedBack("Sending");
		
	var mess = queue_mess[queue_mess.length-1]; //Mess to send

	var feedURL = "http://messenger.hispeed.ch/walrus/app/sms_send.do";
	
	var postData = "hostname=your.hispeed.ch&action=send&groupName=%3A%3A__DEFAULTGROUP__%3A%3A&message="+
					URLEncode(mess) +"&numCount=&sendDate=&sendTime=&notifAddress=notifNone&originator=originatorUser"+
					"&recipientChecked=yes&recipient="+URLEncode(number);
				
	var onloadHandler = function() {responseHandler(xmlRequest,queue_mess,number,false,true); };
	xmlRequest.onload = onloadHandler;
	xmlRequest.open("POST",feedURL,true);
	xmlRequest.setRequestHeader("Cookie", "TornadoAuth="+innerSessionID+";JSESSIONID="+innerJSessionID+";");	
	xmlRequest.send(postData);
}

function doAuthentication(queue_mess,number) 
{
	isJustAuthenticated=true;
	
	engineStatusFeedBack("Logging");
	
		
	
	
	var feedURL = "http://your.hispeed.ch/setcookie.cgi";

	
	var onloadHandler = function() { responseHandler(xmlRequest,queue_mess,number,true,false); };
	//var xmlRequest = new XMLHttpRequest();
	xmlRequest.onload = onloadHandler;
	
	xmlRequest.open("POST",feedURL,true);
	var postdata = "url=http%3A%2F%2Fyour.hispeed.ch%2F&mail="
					+URLEncode(username)+"&password="
					+URLEncode(password)+"&iscrizione.x=27&iscrizione.y=10"; 
	
	
	xmlRequest.send(postdata);

}



function loadSMS(queue_mess,number){

	engineStatusFeedBack("Updating");
	
	var feedURL = "http://your.hispeed.ch/glue.cgi?http://messenger.hispeed.ch/walrus/app/login.do?language=de&amp;hostname=your.hispeed.ch";	
	var onloadHandler = function() { responseHandler(xmlRequest,queue_mess,number,false,false); };
	
	xmlRequest.onload = onloadHandler;
	xmlRequest.open("GET",feedURL,true);
	xmlRequest.setRequestHeader("Cookie", "TornadoAuth="+innerSessionID);
	xmlRequest.send(null);
}


//----------------------------------------------------------------------------------
// Single Respones Handler
//----------------------------------------------------------------------------------

function responseHandler(xmlRequest,queue_mess,number,withAutentication,withSendSMS){
	
	
	if (xmlRequest.status != 200) {
		alert("Error fetching session id data: HTTP status " + xmlRequest.status);
		return engineFeedBack("ConnectionError");
	}
	
	
	if(getIsLogedIn(xmlRequest.responseText)){
		innerSessionID=getSessionID(xmlRequest.getAllResponseHeaders());
		innerJSessionID= getJSessionID(xmlRequest.getAllResponseHeaders())
	}else{
		innerSessionID=-1;
		if(withAutentication){ //In case we are doing the autentication do not check the session
			alert("Unable to log in!");
			return engineFeedBack("LogError");
		}else{
			if(isJustAuthenticated){
				alert("Unable to set cookies!");
				return engineFeedBack("CookieError");
			}else{
				return doAuthentication(queue_mess,number);
			}
		}
	}
	
	if(withAutentication){
		return loadSMS(queue_mess,number);
	}
	
	
	isJustAuthenticated = false;
	
	
	// Retreive remaining SMS
	remainningSMS= getSMSCount(xmlRequest.responseText);
	if (remainningSMS == -1) {
			alert("Unable to retreive remaining sms");
			return engineFeedBack("SMSCountError");
	}

	
	if(queue_mess == null) //There is no sms to send it was a simply login
		return engineFeedBack("LogOK");
	
	//If a sms was sent check it
	if(withSendSMS && !getSMSisSent(xmlRequest.responseText)){
		alert("Unable to send sms!");
		return engineFeedBack("SMSError");
	}
	
	//If we are here is because we have sent an sms
	queue_mess.pop(); //If no error happens remove the sent message from the queue
	
	//If there is other sms to send send it;
	if(queue_mess.length){
		return setTimeout(sendTimeOutedSingleSMS, 2000);
	}

	//This function exist to create a local scope for the setTimeout call
	function sendTimeOutedSingleSMS(){
		return sendSingleSMS(queue_mess,number);
	}

	//There is no sms to send
	return engineFeedBack("SMSOK");

}


//----------------------------------------------------------------------------------
// Check Functions
//----------------------------------------------------------------------------------

function getSessionID(header){

	var sessionDetecStr = "TornadoAuth=";
	
	if (header.indexOf(sessionDetecStr) == -1) {
		return innerSessionID; //If a new sessionID is not detected return the old one
	}
	
	var begin  = header.indexOf(sessionDetecStr) + sessionDetecStr.length;
	var end = header.indexOf(";",begin);
	
	return header.substring(begin, end);

}


function getJSessionID(header){

	var sessionDetecStr = "JSESSIONID=";
	
	if (header.indexOf(sessionDetecStr) == -1) {
		return innerSessionID; //If a new sessionID is not detected return the old one
	}
	
	var begin  = header.indexOf(sessionDetecStr) + sessionDetecStr.length;
	var end = header.indexOf(";",begin);
	
	return header.substring(begin, end);

}




function getSMSisSent(html){
	
	//Check if the page contains contents that you obtain when login is successfull		
	var index = html.indexOf("Sendeauftrag erfolgreich") ;
	if (index != -1) {
			return true;
	}
	
	//The loadSMS method set the german language for the current session
	//var index = html.indexOf("ha inoltrato con successo") ;
	//if (index != -1) {
	//		return true;
	//}
 
	return false;
}

function getIsLogedIn(html){
		
	//Check if the page contains contents that you obtain when login is successfull
	//should be to make better!!		
		
	if (html.indexOf("<!-- Get mail -->") != -1) {
			return true;
	}
	
	if (html.indexOf("<!-- BEGIN SEND MENU -->") != -1) {
			return true;
	}
	
	

	return false;
}



function getSMSCount(html){
		
		
	var smsDetecStr1 = "Punkte:";
	var smsDetecStr2 = "<td>&nbsp;";
	
	if (html.indexOf(smsDetecStr1) == -1) {
		alert("Unable to retreive session id!");
		return-1;
	}
	
	var begin  = html.indexOf(smsDetecStr1) + smsDetecStr1.length;
		begin  = html.indexOf(smsDetecStr2,begin) + smsDetecStr2.length;
		
	var end = html.indexOf("</td>",begin);
	
	if (end - begin  > 200 || end - begin  < 0) {
		alert("Unable to retreive remaining free sms from html!");
		return 0;
	}
	
	var gratisSMS = html.substring(begin, end).trim();
	
	innerSMSCount = parseInt(gratisSMS);
			
	return gratisSMS + " Points";
}

}

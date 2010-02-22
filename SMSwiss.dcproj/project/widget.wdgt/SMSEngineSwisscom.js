function SMSEngineSwisscom(theUsername,thePassword,extra) {

//Since the AppleWebToolkit do not allow to set cookie
//we are using a home made implementation of the XMLHttpRequest
var xmlRequest = new SimpleHTTPRequest();// XMLHttpRequest();


var innerSessionID = -1;
var remainningSMS = null;
var username = theUsername;
var password = thePassword;

var smsChars = 134;
var innerSMSCount=0;



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
	return (innerSMSCount < 10);
};

this.isSMSCountWarning = function () {
	return (innerSMSCount < 25);
	
};

this.hasEnoughCredits = function (messLenght) {
	return (messLenght <= smsChars * innerSMSCount);	
};



//The main function, only this function has to be calles

function sendSMS(smsText,number){
	
	if(smsText==null)
		return loadSMS(null,null);
        
	
   	engineStatusFeedBack(SMSEngineStatus.sendingSMS);
		
    
    var mess = smsText;

	var feedURL = "https://www.swisscom-mobile.ch/youth/sms_senden-de.aspx";
	var onloadHandler = function() {responseHandler(xmlRequest,smsText,number,false,true); };
	xmlRequest.onload = onloadHandler;
	xmlRequest.open("POST",feedURL,true);
    xmlRequest.setRequestHeader("Cookie", innerSessionID);
    
    var postData = "__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE_SCM=7&__VIEWSTATE=&CobYouthSMSSenden%3AtxtMessage="+URLEncode(mess)+"&CobYouthSMSSenden%3AtxtMessageDisabled=+-+sent+by+xtrazone.ch&CobYouthSMSSenden%3AtxtNewReceiver="+URLEncode(number)+"&CobYouthSMSSenden%3AbtnSend=Senden&FooterControl%3AhidNavigationName=SMS+senden&FooterControl%3AhidMailToFriendUrl=youth%2Fsms_senden-de.aspx";
									    		
	xmlRequest.send(postData);

}





//This is acctualy the authentication method but for this engine we have first to autenticate
function doAuthentication(queue_mess,number) 
{

	isJustAuthenticated=true;
	
	engineStatusFeedBack(SMSEngineStatus.registeringUser);
	
	var feedURL = "https://www.swisscom-mobile.ch/youth/youth_zone_home-de.aspx?login";

	var onloadHandler = function() { responseHandler(xmlRequest,queue_mess,number,true,false); };
	xmlRequest.onload = onloadHandler;
	xmlRequest.open("POST",feedURL,true);

	var postData = "isiwebuserid="+URLEncode(username)+"&isiwebpasswd="+URLEncode(password)+"&login.x=22&login.y=5&isiwebjavascript=No&isiwebappid=mobile&isiwebmethod=authenticate&isiweburi=%2Fyouth%2Fyouth_zone_home_it.aspx";
    
	xmlRequest.send(postData);
}




//----------------------------------------------------------------------------------
// Single Respones Handler
//----------------------------------------------------------------------------------

function responseHandler(xmlRequest,mess,number,withAutentication,withSendSMS){
	
	
	if (xmlRequest.status != 200) {
		alert("Error fetching session id data: HTTP status " + xmlRequest.status);
		return engineFeedBack(SMSEngineFeedBack.connectionError);
	}
	
	
	if(getIsLogedIn(xmlRequest.responseText)){
		innerSessionID=getSessionID(xmlRequest.getAllResponseHeaders());
	}else{
		innerSessionID=-1;
		if(withAutentication){ //In case we are doing the autentication do not check the session
			alert("Unable to log in!");
			return engineFeedBack(SMSEngineFeedBack.authenticationError);
		}else{
			if(isJustAuthenticated){
				alert("Unable to set cookies!");
				return engineFeedBack(SMSEngineFeedBack.cookieError);
			}else{
				return doAuthentication(mess,number);
			}
		}
	}
	
	
	if(withAutentication){
		if(mess != null){
			return sendSMS(mess,number);
        }
	}
	
	isJustAuthenticated=false; //This variable is to detect if the widget authentication is looping
	
	// Retreive remaining SMS
	remainningSMS= getSMSCount(xmlRequest.responseText);
	if (remainningSMS == null) {
			alert("Unable to retreive remaining sms");
			return engineFeedBack(SMSEngineFeedBack.smsCountError);
	}

	if(mess == null) //There is no sms to send it was a simply login
		return engineFeedBack(SMSEngineFeedBack.authenticationSuccessful);
	
	//If a sms was sent check it
	if(withSendSMS && !getSMSisSent(xmlRequest.responseText)){
		alert("Unable to send sms!");
		return engineFeedBack(SMSEngineFeedBack.smsSendingError);
	}
	
	
	//There is no sms to send
	return engineFeedBack(SMSEngineFeedBack.smsSent);

}


//----------------------------------------------------------------------------------
// Check Functions
//----------------------------------------------------------------------------------

function getSMSisSent(html){
	

    var first = html.indexOf("Deine Nachricht wurde gesendet");
    
    if (first!= -1) {
			return true;
	}
    
	return false;
}


function getIsLogedIn(html){
	
	if (html.indexOf("<li class=\"xtraWelcome\">") != -1) { //By authentication
			return true;
	}
	
	if (html.indexOf("SMSCommand") != -1) { //By sms sending
			return true;
	}	
	
	
	return false;
}


function getSessionID(header){

	var sessionDetecStr1 = "ARPT=";
	
    var sessionDetecStr2 = "ASP.NET_SessionId=";
    
    var sessionDetecStr3 = "Navajo=";
    
    
	if (header.indexOf(sessionDetecStr1) == -1) {
		return innerSessionID;
	}
	
	var begin  = header.indexOf(sessionDetecStr1) + sessionDetecStr1.length;
	var end = header.indexOf(";",begin);
    
    var begin2  = header.indexOf(sessionDetecStr2) + sessionDetecStr2.length;
	var end2 = header.indexOf(";",begin2);
    
    var begin3  = header.indexOf(sessionDetecStr3) + sessionDetecStr3.length;
	var end3 = header.indexOf(";",begin3);

	
    var newInnerSessionID = "ARPT=" + header.substring(begin, end) + "; "  +"ASP.NET_SessionId="+header.substring(begin2, end2)+ "; "  +"Navajo="+header.substring(begin3, end3)+";"
    
	return newInnerSessionID;

}


function getSMSCount(html){
		
	var smsDetecStr1 = "COBControl26644_lblGuthaben\">";
    var smsDetecStr2 = "CobYouthMMSSMSKonto_lblGuthaben\">";
	var smsDetecStr3 = "</span>";
	var begin = -1;
    
	if (html.indexOf(smsDetecStr1) == -1) {
    
        if (html.indexOf(smsDetecStr2) == -1) {
            alert("Unable to retreive session id!");
            return null;
        }else{
            begin  = html.indexOf(smsDetecStr2) + smsDetecStr2.length;
        }
	}else{
        begin  = html.indexOf(smsDetecStr1) + smsDetecStr1.length;
    }
	
	
    var end  =  html.indexOf(smsDetecStr3,begin);
		
	
	if (end - begin  > 200 || end - begin  < 0) {
		alert("Unable to retreive remaining free sms from html!");
		return 0;
	}
	
	var gratisSMS = html.substring(begin, end).trim();
	

	innerSMSCount = parseInt(gratisSMS);

	return parseInt(gratisSMS) + " SMS left";

}

}
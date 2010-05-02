function SMSEngineMBudget(theUsername,thePassword,extra) {

//Since the AppleWebToolkit do not allow to set cookie
//we are using a home made implementation of the XMLHttpRequest
var xmlRequest = new SimpleHTTPRequest();// XMLHttpRequest();


var innerSessionID = -1;
var remainningSMS = null;
var username = theUsername;
var password = thePassword;

var smsFooter = 37; // Mobile Budget Footer: M-Budget Mobile SMS: nur 10 Rp!
var smsChars = 160 - smsFooter;
var innerSMSCount=0;
var isJustAuthenticated = false;
var dailySms = 5;


this.getAvailSMS = function () {
	if(innerSessionID == -1)
		doAuthentication(null,null);
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
	return (innerSMSCount < 2);
};

this.isSMSCountWarning = function () {
	return (innerSMSCount < 3);
	
};

this.hasEnoughCredits = function (messLenght) {
	return (messLenght <= smsChars * innerSMSCount);	
}

//The main function, only this function has to be called

function sendSMS(smsText,number){
  if(smsText == null)
    return;

  number = number.replace("+","00");
  smsText = smsText + "\n";

  sendSingleSMS(smsText,number); //No need to split mess
}

function sendSingleSMS(mess,number){
	engineStatusFeedBack(SMSEngineStatus.sendingSMS);
	var onloadHandler = function() {responseHandler(xmlRequest,mess,number,false,true); };
    
	var feedURL = "http://www.company.ecall.ch/ecompurl/ECOMPURL.ASP?wci=Interface&Function=SendPage&Address=" + number + "&Message=" + escape(mess)+ "&LinkID=mbudget&UserName=" + escape(username) + "&UserPassword=" + escape(password) + "&Language=de" + "&fake=" + Math.floor(Math.random()*16384);

	xmlRequest.onload = onloadHandler;
	xmlRequest.open("GET",feedURL,true);		 
									    		
	xmlRequest.send();

}

//This is acctualy the authentication method but for this engine we have first to autenticate
function doAuthentication(mess,number) 
{
  alert("doing authenticatiuon");
  isJustAuthenticated=true;
  engineStatusFeedBack(SMSEngineStatus.registeringUser);
  var feedURL = "http://www.company.ecall.ch/ecompurl/ECOMPURL.ASP?wci=Interface&Function=GetInfoSend&LinkID=mbudget&UserName=" + escape(username) + "&UserPassword=" + escape(password) + "&Language=de" + "&fake=" + Math.floor(Math.random()*16384);
  var onloadHandler = function() { responseHandler(xmlRequest, null, null, true, false); };
  xmlRequest.onload = onloadHandler;
  xmlRequest.open("GET", feedURL, true);
  xmlRequest.send();
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
    
        // Retreive remaining SMS
        remainningSMS = getSMSCount(xmlRequest.responseText);

        if (remainningSMS == null) {
			alert("Unable to retreive remaining sms");
			return engineFeedBack(SMSEngineFeedBack.smsCountError);
        }
    
        if(getIsLogedIn(xmlRequest.responseText)){
            innerSessionID = 1;
            engineFeedBack(SMSEngineFeedBack.authenticationSuccessful);
            if(mess != null)
                return sendSingleSMS(mess, number);
        }
        else{
            innerSessionID = -1;
            alert("Unable to log in!  (SMSEngineMBudget)");
            return engineFeedBack(SMSEngineFeedBack.authenticationError);
        }
        
    return;
   }
	
	
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
	else {
		doAuthentication(null,null);
		remainningSMS = getSMSCount(xmlRequest.responseText);
	};
	
	
	//There is no sms to send
	return engineFeedBack(SMSEngineFeedBack.smsSent);

}

//----------------------------------------------------------------------------------
// Check Functions
//----------------------------------------------------------------------------------

function getSMSisSent(html){
	
//Init vars
    var code = -1;
    
    code = html.indexOf("ResultCode:0");
    if (code != -1) {
			return true;
	}

	return false;
}


function getIsLogedIn(html){
	
	if (html.indexOf("ResultCode:0") != -1) { //By authentication
			return true;
	}
	
	return false;
}


function getSessionID(header){

	var sessionDetecStr = "ASPSESSIONIDAABSASAR=";
	
	if (header.indexOf(sessionDetecStr) == -1) {
		return innerSessionID; //If a new sessionID is not detected return the old one
	}
	
	var begin  = header.indexOf(sessionDetecStr) + sessionDetecStr.length;
	var end = header.indexOf(";",begin);
	
	return header.substring(begin, end);
}



function getSMSCount(html){

	var smsDetecStr1 = "JobCount:";
	
	if (html.indexOf(smsDetecStr1) == -1) {
		alert("Unable to retrieve sms count!");
		return null;
	}
	
	var begin  = html.indexOf(smsDetecStr1) + smsDetecStr1.length;		
	var end = html.indexOf("FreeMsgText",begin);
    var gratisSMS = html.substring(begin,end);
	
	innerSMSCount = parseInt(gratisSMS);
	return parseInt(gratisSMS);
}


}

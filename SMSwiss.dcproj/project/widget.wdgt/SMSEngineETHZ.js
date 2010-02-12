function SMSEngineETHZ(theUsername,thePassword,extra) {

this.name = "SMSEngineETHZ";

// Since the AppleWebToolkit does not allow to set cookies
// we are using a home made implementation of the XMLHttpRequest
var xmlRequest = new SimpleHTTPRequest();// XMLHttpRequest();

var innerSessionID = -1;
var remainningSMS = null;
var username = theUsername;
var password = thePassword;

var smsChars = 160;
var innerSMSCount = 0;
var isJustAuthenticated = false;

this.getAvailSMS = function () {
  if(innerSessionID == -1)
    doAuthentication(null, null);
  //else
  //  loadSMS();
};

this.Send = function (smsText, number) {
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
  return false;
};

this.isSMSCountWarning = function () {
  return false;
};

this.hasEnoughCredits = function (messLenght) {
  if(remainningSMS == null) return true;  
  else return false; //if it is not null it means it is 0  
};


//The main function, only this function has to be called

function sendSMS(smsText,number){
  if(smsText == null)
    return;

  number = number.replace("+","00");

  sendSingleSMS(smsText,number); //No need to split mess
}

function sendSingleSMS(mess,number){
  engineStatusFeedBack(SMSEngineStatus.sendingSMS);
  var onloadHandler = function() {responseHandler(xmlRequest, mess, number, false, true);};
  xmlRequest.onload = onloadHandler;

  var smsgateway = "https://www.sms.ethz.ch/cgi-bin/sms/send.pl";	
  xmlRequest.open("POST", smsgateway);
  xmlRequest.setRequestHeader("Cache-Control", "no-cache");
			
  var params = "action=sendsms&username="+escape(username)+
							"&password="+escape(password)+
							"&originator=auto&message="+escape(mess)+
							"&number="+escape(number);
                            
                            
  xmlRequest.send(params);
}

//This is acctualy the authentication method but for this engine we have first to autenticate
function doAuthentication(mess,number) 
{
  isJustAuthenticated=true;
  engineStatusFeedBack(SMSEngineStatus.registeringUser);
  var feedURL = "https://www.sms.ethz.ch/cgi-bin/sms/send.pl?username="+escape(username)+"&password="+escape(password);
  var onloadHandler = function() { responseHandler(xmlRequest, mess, number, true, false); };
  xmlRequest.onload = onloadHandler;
  xmlRequest.open("GET", feedURL, true);
  xmlRequest.send();
}



//----------------------------------------------------------------------------------
// Single Respones Handler
//----------------------------------------------------------------------------------

function responseHandler(xmlRequest,mess,number,withAutentication,withSendSMS){
  
   if(checkIFsmsAreExided(xmlRequest.responseText)){
        remainningSMS=0;
        return engineFeedBack(SMSEngineFeedBack.smsSendingError);
   }else
        remainningSMS = null;
   
        
  
   if(withAutentication){
    
    if(getIsLogedIn(xmlRequest.responseText)){
        innerSessionID = 1;
        engineFeedBack(SMSEngineFeedBack.authenticationSuccessful);
        if(mess != null)
            return sendSingleSMS(mess, number);
    }else{
        innerSessionID = -1;
        alert("Unable to log in!  (SMSEngineETHZ)");
        return engineFeedBack(SMSEngineFeedBack.authenticationError);
    }
    return;
   }
   

  //If a sms was sent check it
  if(withSendSMS && !getSMSisSent(xmlRequest.responseText)){
        alert("Unable to send sms!, The Java Script Yallo SMS Engine was not able to find the key word in the returned html page  which identify a sucessfull sent sms.");
    return engineFeedBack(SMSEngineFeedBack.smsSendingError);
  }
  

  //There is no sms to send
  return engineFeedBack(SMSEngineFeedBack.smsSent);

}


//----------------------------------------------------------------------------------
// Check Functions
//----------------------------------------------------------------------------------

  
//Check if the page contains contents that you obtain when the sms was successfull sent
function getSMSisSent(html){
if (html.indexOf("200") != -1) { //By authentication
    return true;
  }
  return false;
}


function getIsLogedIn(html){
  if (html.indexOf("400 no action specified") != -1) { //By authentication
    return true;
  }
  return false;
}


function checkIFsmsAreExided(html){
  if (html.indexOf("500") != -1 && html.indexOf("exceeded") != -1) { 
    return true;
  }
  return false;
}



}
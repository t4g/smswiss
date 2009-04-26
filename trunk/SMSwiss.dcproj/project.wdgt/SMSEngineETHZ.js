function SMSEngineETHZ(theUsername,thePassword) {

this.name = "SMSEngineETHZ";

// Since the AppleWebToolkit does not allow to set cookies
// we are using a home made implementation of the XMLHttpRequest
var xmlRequest = new XMLHttpRequest();// XMLHttpRequest();

var innerSessionID = -1;
var remainningSMS = 100;
var username = theUsername;
var password = thePassword;

var smsChars = 130;
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
  return (innerSMSCount < 3);
};

this.isSMSCountWarning = function () {
  return (innerSMSCount < 5);
};

this.hasEnoughCredits = function (messLenght) {
  //return (messLenght <= smsChars * innerSMSCount);
  return true;  
};


//The main function, only this function has to be called

function sendSMS(smsText,number){
  if(smsText == null)
    return;

  //Partition mess in multiple sms
  var queue_mess = new Array();
  while(smsText.length>smsChars) {
    queue_mess.push(smsText.substring(0, smsChars));
    smsText=smsText.substring(smsChars, smsText.length);
  }
  queue_mess.push(smsText);
  sendSingleSMS(queue_mess,number);
}

function sendSingleSMS(queue_mess,number){
  engineStatusFeedBack(SMSEngineStatus.sendingSMS);
  var mess = queue_mess[queue_mess.length-1]; //Mess to send
  var feedURL = "https://www.sms.ethz.ch/send.pl?action=sendsms&username="+username
              +"&password="+password
              +"&originator=auto"
              +"&message="+mess
              +"&number="+number;
  
  var onloadHandler = function() {responseHandler(xmlRequest, queue_mess, number, false, true);};
  xmlRequest.onload = onloadHandler;
  xmlRequest.open("GET",feedURL, true);
  xmlRequest.send();
}

//This is acctualy the authentication method but for this engine we have first to autenticate
function doAuthentication(queue_mess,number) 
{
  isJustAuthenticated=true;
  engineStatusFeedBack(SMSEngineStatus.registeringUser);
  var feedURL = "https://www.sms.ethz.ch/send.pl?username="+username+"&password="+password;
  var onloadHandler = function() { responseHandler(xmlRequest, queue_mess, number, true, false); };
  xmlRequest.onload = onloadHandler;
  xmlRequest.open("GET", feedURL, true);
  xmlRequest.send();
}



//----------------------------------------------------------------------------------
// Single Respones Handler
//----------------------------------------------------------------------------------

function responseHandler(xmlRequest,queue_mess,number,withAutentication,withSendSMS){
  
   if(withAutentication){
    
    if(getIsLogedIn(xmlRequest.responseText)){
        innerSessionID = 1;
        engineFeedBack(SMSEngineFeedBack.authenticationSuccessful);
        if(queue_mess != null)
            return sendSingleSMS(queue_mess, number);
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
  
  //If we are here is because we have sent an sms
  queue_mess.pop(); //If no error happens remove the sent message from the queue

  //If there is other sms to send send it;
  if(queue_mess.length){
    return setTimeout(sendTimeOutedSingleSMS, 2000);
  }

  //This function exist to create a local scope for the setTimeout call
  function sendTimeOutedSingleSMS(){
    return sendSingleSMS(queue_mess, number);
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
  if (html.indexOf("400 Action not recognized") != -1) { //By authentication
    return true;
  }
  return false;
}

}
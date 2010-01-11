function SMSEngineYallo(theUsername,thePassword,extra) {

this.name = "SMSEngineYallo";

// Since the AppleWebToolkit does not allow to set cookies
// we are using a home made implementation of the XMLHttpRequest
var xmlRequest = new SimpleHTTPRequest();// XMLHttpRequest();

var innerSessionID = -1;
var remainningSMS = null;
var username = theUsername;
var password = thePassword;

var captchaCode = extra;

var smsChars = 130;
var innerSMSCount = 0;
var isJustAuthenticated = false;

this.getAvailSMS = function() {
  if (innerSessionID == -1)
    doAuthentication(null, null);
  else
    loadSMS();
};

this.Send = function(smsText, number) {
  sendSMS(smsText,number);
};


this.GetSMSCharsCount = function() {
  return smsChars;
};

this.getSMSCount = function() {
  return remainningSMS;
};

this.isConnected = function() {
  return innerSessionID != -1;
};

this.isSMSCountCritical = function() {
  return (innerSMSCount < 3);
};

this.isSMSCountWarning = function() {
  return (innerSMSCount < 5);
};

this.hasEnoughCredits = function(messLenght) {
  return (messLenght <= smsChars * innerSMSCount);  
};


//The main function, only this function has to be called

function sendSMS(smsText, number) {
  if (smsText == null)
    return loadSMS(null, null);

  //Partition mess in multiple sms
  var queue_mess = new Array();
  while (smsText.length > smsChars) {
    queue_mess.push(smsText.substring(0, smsChars));
    smsText=smsText.substring(smsChars, smsText.length);
  }
  queue_mess.push(smsText);
  sendSingleSMS(queue_mess, number);
}

function sendSingleSMS(queue_mess, number) {
  engineStatusFeedBack(SMSEngineStatus.sendingSMS);
  var mess = queue_mess[queue_mess.length-1]; //Mess to send
  var feedURL = "https://www.yallo.ch/kp/dyn/web/sec/acc/sms/sendSms.do";
  var onloadHandler = function() {responseHandler(xmlRequest, queue_mess, number, false, true);};
  xmlRequest.onload = onloadHandler;
  xmlRequest.open("POST", feedURL, true);
  xmlRequest.setRequestHeader("Cookie", "JSESSIONID=" + innerSessionID);
  var postData = "destination=" + URLEncode(number);
  postData += "&message=" + URLEncode(mess);
  postData += "&send=%A0senden";
  xmlRequest.send(postData);
}

//This is actually the authentication method but for this engine we have first to authenticate
function doAuthentication(queue_mess, number) {
  isJustAuthenticated = true;
  engineStatusFeedBack(SMSEngineStatus.registeringUser);
  var feedURL = "https://www.yallo.ch/kp/dyn/web/j_security_check.do";
  var onloadHandler = function() { responseHandler(xmlRequest, queue_mess, number, true, false); };
  xmlRequest.onload = onloadHandler;
  xmlRequest.open("POST", feedURL, true);
  var postData = "j_username=" + URLEncode(username) + "&j_password=" + URLEncode(password);
  xmlRequest.setRequestHeader("Cookie", "captcha="+captchaCode+";");
  xmlRequest.send(postData);
}



function loadSMS() {
  engineStatusFeedBack(SMSEngineStatus.loadingAccountStatus);
  var feedURL = "https://www.yallo.ch/kp/dyn/web/pub/home/home.do";
  var onloadHandler = function() { responseHandler(xmlRequest, null, null, false, false); };
  xmlRequest.onload = onloadHandler;
  xmlRequest.open("GET", feedURL, true);
  xmlRequest.setRequestHeader("Cookie", "JSESSIONID=" + innerSessionID + ";");
  xmlRequest.send(null);
}


//----------------------------------------------------------------------------------
// Single Respones Handler
//----------------------------------------------------------------------------------

function responseHandler(xmlRequest, queue_mess, number, withAutentication, withSendSMS) {

  if (xmlRequest.status != 200) {
    alert("Error fetching session id data: HTTP status " + xmlRequest.status + " (YalloSMSEngine)");
    return engineFeedBack(SMSEngineFeedBack.connectionError);
  }

  if (getIsLogedIn(xmlRequest.responseText)) {
    innerSessionID = getSessionID(xmlRequest.getAllResponseHeaders());
  } else {
    innerSessionID = -1;
    if (isJustAuthenticated) {
      if (getHasCaptcha(xmlRequest.responseText)) {
        alert("The captcha (cookie) did not work.")
        return engineFeedBack(SMSEngineFeedBack.authenticationError);
      }
    alert("Unable to log in!  (YalloSMSEngine)");
    return engineFeedBack(SMSEngineFeedBack.authenticationError);
    } else {
      return doAuthentication(queue_mess, number);
    }
  }
  
  if (withAutentication) {
    if (queue_mess == null) {
      return loadSMS();
    } else {
      return sendSingleSMS(queue_mess, number);
    }
  }
  
  isJustAuthenticated = false; //This variable is to detect if the widget authentication is looping
  
  // Retreive remaining SMS
  remainningSMS = getSMSCount(xmlRequest.responseText);
  if (remainningSMS == null) {
      alert("Unable to retreive remaining sms! (YalloSMSEngine)");
      return engineFeedBack(SMSEngineFeedBack.smsCountError);
  }

  if (queue_mess == null) //There is no sms to send it was a simple login
    return engineFeedBack(SMSEngineFeedBack.authenticationSuccessful);
  
  //If a sms was sent check it
  if (withSendSMS && !getSMSisSent(xmlRequest.responseText)) {
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
  function sendTimeOutedSingleSMS() {
    return sendSingleSMS(queue_mess, number);
  }

  //There is no sms to send
  return engineFeedBack(SMSEngineFeedBack.smsSent);

}


//----------------------------------------------------------------------------------
// Check Functions
//----------------------------------------------------------------------------------

  
//Check if the page contains contents that you obtain when the sms was successfull sent
function getSMSisSent(html) {

  //Init vars
  var first = -1;
  var second = -1;
  var maxDistance = 100;
  
  first = html.indexOf('<div class="formMessage">');
  second = html.indexOf('</div>');
  difference = second - first;
  if (first != -1 && second != -1 && second - first < maxDistance) {
    return true;
  }
  return false;
}


function getIsLogedIn(html) {
  if (html.indexOf("customer_balance") != -1) { //By authentication
    return true;
  }
  return false;
}

function getHasCaptcha(html) {
  var str1 = '<title>404 Not Found</title>';
  var str2 = '<input type="text" name="j_captcha" id="j_captcha"/>';
  if (html.indexOf(str1) != -1 || html.indexOf(str2) != -1) {
    return true;
  }
  return false;
}

function getSessionID(header) {
  var sessionDetecStr = "JSESSIONID=";
  if (header.lastIndexOf(sessionDetecStr) == -1) {
    return innerSessionID; //If a new sessionID is not detected return the old one
  }
  var begin = header.lastIndexOf(sessionDetecStr) + sessionDetecStr.length;
  var end = header.indexOf(";", begin);
    
  return header.substring(begin, end);
}


function getSMSCount(html) {
  var smsDetecStr1 = '<div id="sms_counter">';
  var smsDetecStr2 = '</div>';
  if (html.indexOf(smsDetecStr1) == -1) {
    alert("Unable to retreive SMS count!  (YalloSMSEngine)");
    return null;
  }
  var begin = html.indexOf(smsDetecStr1) + smsDetecStr1.length;
  var end = html.indexOf(smsDetecStr2, begin);
  if (end - begin  > 200 || end - begin  < 0) {
    alert("Unable to retreive remaining free sms from html! (YalloSMSEngine)");
    return 0;
  }
  var str = html.substring(begin, end).trim();
  var re = /\s*([0-9]+).*/; 
  a = re.exec(str);
  if (a == null) {
    alert("Unable to retrieve remaining free sms from html! (YalloSMSEngine)");
    return 0;
  }
  innerSMSCount = parseInt(a[1]);
  
  smsDetectStr1 = '<a href="/kp/dyn/web/sec/rf/sms/start.do">';
  smsDetectStr2 = '</a>';
  if (html.indexOf(smsDetectStr1) == -1) {
    alert('Unable to retreive purchased SMS count! (YalloSMSEngine)');
    return innerSMSCount;
  }
  begin = html.indexOf(smsDetectStr1) + smsDetectStr1.length;
  end = html.indexOf(smsDetectStr2, begin);
  if (end - begin > 20 || end - begin < 5) {
    alert("Unable to retreive remaining purchased SMS from html! (YalloSMSEngine)");
    return innerSMSCount;
  }
  str = html.substring(begin, end).trim();
  re = /([0-9]+) SMS.*/;
  a = re.exec(str);
  if (a == null) {
    alert("Unable to retrieve remaining purchased SMS from html! (YalloSMSEngine)");
    return innerSMSCount;
  }

  return innerSMSCount + parseInt(a[1]);
}

}
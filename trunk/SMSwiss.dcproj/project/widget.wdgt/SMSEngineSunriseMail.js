function SMSEngineSunriseMail(theUsername,thePassword,extra) {

//Since the AppleWebToolkit do not allow to set cookie
//we are using a home made implementation of the XMLHttpRequest
var xmlRequest = new SimpleHTTPRequest();// XMLHttpRequest();


var innerSessionID = -1;
var remainningSMS = null;
var username = theUsername;
var password = thePassword;

var smsChars = 160;
var innerSMSCount=0;
var isJustAuthenticated = false;


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
	
    /* OLD method with SMS splitting
	//Partition mess in multiple sms
	var queue_mess=new Array();
	while(smsText.length>smsChars){
		queue_mess.push(smsText.substring(0,smsChars));
		smsText=smsText.substring(smsChars, smsText.length);
	}
	queue_mess.push(smsText);
    sendSingleSMS(queue_mess,number);
    */
		
	sendSingleSMS(smsText,number);
}



function sendSingleSMS(queue_mess,number){

	engineStatusFeedBack(SMSEngineStatus.sendingSMS);
		
	//var mess = queue_mess[queue_mess.length-1]; //Mess to send
    
    var mess = queue_mess;

	var feedURL = "http://mip.sunrise.ch/mip/dyn/sms/sms?.lang=de";
	var onloadHandler = function() {responseHandler(xmlRequest,queue_mess,number,false,true); };
	xmlRequest.onload = onloadHandler;
	xmlRequest.open("POST",feedURL,true);
    xmlRequest.setRequestHeader("Cookie", "JSESSIONID="+innerSessionID+";");
	var postData = "task=send";

	postData +="&" + "recipient="+URLEncode(number);
	postData +="&"+URLEncode("message")+"="+URLEncode(mess);		 
									    		
	xmlRequest.send(postData);

}

//This is acctualy the authentication method but for this engine we have first to autenticate
function doAuthentication(queue_mess,number) 
{

	isJustAuthenticated=true;
	
	engineStatusFeedBack(SMSEngineStatus.registeringUser);
	
	var feedURL = "http://mip.sunrise.ch/mip/dyn/login/login?SAMLRequest=fVJLT8MwDL4j8R%2Bi3PsaQqBoLRogxCQe1dZx4Ja23hrW2iVON%2Fj3dB0T4wDHOJ%2B%2Fh%2B3x1UdTiw1YNoSxjPxQCsCCSoOrWC6yO%2B9SXiWnJ2PWTd2qSecqnMF7B%2BxE34msho9YdhYVaTasUDfAyhVqPnl8UCM%2FVK0lRwXVUkxvY4lr0%2BZ5uXwDRLOuqoZyXKOharkCg3n7ttZUEpEULwdbo52tKXMHU2Sn0fWlMLz0wnNvdJFFkTo%2FU%2BHoVYr0W%2Bna4D7Bf7byPYjVfZalXvo8zwaCjSnBPvXoWK6IVjX4BTVSTJjBut7ODSF3Ddg52I0pYDF7iGXlXMsqCLbbrf%2FTFOiAO7SG%2B1cV6IJ3IVLNbDY9ubMdyGQYrBqy2aOJ%2Fu9cH7zI5EdtHBxRJd8L2%2BWY3qZUm%2BJTTOqatjcWtDvIizuyjXZ%2Fq0V%2BNFRM6S0HqOqQWyjM0kApRZDsVX9fRn8vXw%3D%3D";

	var onloadHandler = function() { responseHandler(xmlRequest,queue_mess,number,true,false); };
	xmlRequest.onload = onloadHandler;
	xmlRequest.open("POST",feedURL,true);

	var postData = "username=" + URLEncode(username) +"&password=" +URLEncode(password);

	xmlRequest.send(postData);
}



function loadSMS(){

	engineStatusFeedBack(SMSEngineStatus.loadingAccountStatus);
	
		
	var feedURL = "https://mip.sunrise.ch/mip/dyn/sms/sms?up_contactsPerPage=6&lang=en&country=us&.lang=en&.country=us";
	var onloadHandler = function() { responseHandler(xmlRequest,null,null,false,false); };
	xmlRequest.onload = onloadHandler;
	xmlRequest.open("GET",feedURL,true);
	xmlRequest.setRequestHeader("Cookie", "JSESSIONID="+innerSessionID+";");
	xmlRequest.send(null);
	
}


//----------------------------------------------------------------------------------
// Single Respones Handler
//----------------------------------------------------------------------------------

function responseHandler(xmlRequest,queue_mess,number,withAutentication,withSendSMS){
	
	
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
				return doAuthentication(queue_mess,number);
			}
		}
	}
	
	
	if(withAutentication){
		if(queue_mess == null){
			return loadSMS();
		}else{
			return sendSingleSMS(queue_mess,number);
		}
	}
	
	isJustAuthenticated=false; //This variable is to detect if the widget authentication is looping
	
	// Retreive remaining SMS
	remainningSMS= getSMSCount(xmlRequest.responseText);
	if (remainningSMS == null) {
			alert("Unable to retreive remaining sms");
			return engineFeedBack(SMSEngineFeedBack.smsCountError);
	}

	if(queue_mess == null) //There is no sms to send it was a simply login
		return engineFeedBack(SMSEngineFeedBack.authenticationSuccessful);
	
	//If a sms was sent check it
	if(withSendSMS && !getSMSisSent(xmlRequest.responseText)){
		alert("Unable to send sms!");
		return engineFeedBack(SMSEngineFeedBack.smsSendingError);
	}
	
	//If we are here is because we have sent an sms
	//queue_mess.pop(); //If no error happens remove the sent message from the queue
	

	//If there is other sms to send send it;
	//if(queue_mess.length){
	//	return setTimeout(sendTimeOutedSingleSMS, 2000);
	//}

	//This function exist to create a local scope for the setTimeout call
	//function sendTimeOutedSingleSMS(){
	//	return sendSingleSMS(queue_mess,number);
	//}

	//There is no sms to send
	return engineFeedBack(SMSEngineFeedBack.smsSent);

}


//----------------------------------------------------------------------------------
// Check Functions
//----------------------------------------------------------------------------------

function getSMSisSent(html){
	
//Init vars
    var first = -1;
    var second = -1;
    var difference = -1;
	var maxDistance = 50;	
	
    //German check
    first = html.indexOf("SMS wurde");
    second = html.indexOf("gesendet",first);
    difference = second -first;
    if (first!= -1 && second != -1 && difference < maxDistance) {
			return true;
	}
    
    //Franch check
    first = html.indexOf("Un SMS");
    second = html.indexOf("envoy&#233;",first);
    difference = second -first;
    if (first!= -1 && second != -1 && difference < maxDistance) {
			return true;
	}

     //Italian check
    first = html.indexOf("SMS");
    second = html.indexOf("inviato",first);
    difference = second -first;
    if (first!= -1 && second != -1 && difference < maxDistance) {
			return true;
	}


	return false;
}


function getIsLogedIn(html){
	
	if (html.indexOf("AuthnContext") != -1) { //By authentication
			return true;
	}
	
	if (html.indexOf("SMSCommand") != -1) { //By sms sending
			return true;
	}	
	
	
	
	return false;
}


function getSessionID(header){

	var sessionDetecStr = "JSESSIONID=";
	
	if (header.indexOf(sessionDetecStr) == -1) {
		return innerSessionID; //If a new sessionID is not detected return the old one
	}
	
	var begin  = header.indexOf(sessionDetecStr) + sessionDetecStr.length;
	var end = header.indexOf(";",begin);
	
	return header.substring(begin, end);

}


function getSMSCount(html){
		
	var smsDetecStr1 = "<!-- SMS counters -->";
	var smsDetecStr2 = "Gratis ";
	
	if (html.indexOf(smsDetecStr1) == -1) {
		alert("Unable to retreive session id!");
		return null;
	}
	
	var begin  = html.indexOf(smsDetecStr1) + smsDetecStr1.length;
		begin  = html.indexOf(smsDetecStr2,begin) + smsDetecStr2.length;
		
	var end = html.indexOf("\r",begin);
	
	if (end - begin  > 200 || end - begin  < 0) {
		alert("Unable to retreive remaining free sms from html!");
		return 0;
	}
	
	var gratisSMS = html.substring(begin, end).trim();
	
	begin  = html.indexOf("Bezahlt ",end) + "Bezahlt ".length;
	end = html.indexOf("\r",begin);
	
	if (end - begin  > 200 || end - begin  < 0) {
		alert("Unable to retreive remaining payed sms from html!");
		return gratisSMS;
	}
	
	var payedSMS = html.substring(begin, end).trim();
	
	innerSMSCount = parseInt(gratisSMS) + parseInt(payedSMS);

	return parseInt(gratisSMS) + parseInt(payedSMS) + " SMS left";
}

}
var actualVersion = "3.7";

//The check method is very simple, try to access the current version file on the web server
//The update is not always made, only 1/3 time its work this to minimize the traffic.
function checkForUpdate(){
	Math.random(); //The initialization of the random method is strange therefore I call it two time
	var rand_no = Math.ceil(15*Math.random())
	if(rand_no < 6) return;


	var currentVersionFileUrl = "http://code.google.com/p/smswiss/wiki/CurrentVersion";
	
	var onloadHandler = function() {versionResponseHandler(xmlRequest); };
	var xmlRequest = new XMLHttpRequest();
	xmlRequest.onload = onloadHandler;
	xmlRequest.open("GET",currentVersionFileUrl,true);					    		
	xmlRequest.send(null);
}


function versionResponseHandler(xmlRequest){
	
	var versionDetecStrStart = "-&gt;"; //Equal to -> in HTML
	var versionDetecStrEnd = "&lt;-"; //Equal to <- in HTML
	
	
	if (xmlRequest.status != 200) {
		alert("Error fetching actual widget version from internet" + xmlRequest.status);
		return 0;
	}
	
	var html = xmlRequest.responseText;
	
		
	var begin  = html.indexOf(versionDetecStrStart) + versionDetecStrStart.length;
		
	var end = html.indexOf(versionDetecStrEnd,begin);
	
	if (end - begin  > 200 || end - begin  < 0) {
		alert("Error fetching actual widget version inside the HTML wiki page");
		return 0;
	}
	
	var version = html.substring(begin, end);
	
	if(actualVersion != version)
		return needUpdateFeedBack(version); //only if update is needed call the method
		
}
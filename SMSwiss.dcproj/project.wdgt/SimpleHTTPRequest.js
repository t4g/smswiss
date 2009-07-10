function SimpleHTTPRequest() {

this.onload=null;
this.status=100;
this.responseText="";
this.header="";

var innerURL =null;
var innerData = null;
var innerCookie = null;
var callBackFunction = null;


var SimpleHTTPRequestObject = this;


this.getAllResponseHeaders = function(){
	return this.header;
}


this.open = function(method,url,asink){
	innerURL=url;
	innerData = null;
	innerCookie = null;
}

this.setRequestHeader = function(header,value){
	
	if(header.toLowerCase() == "cookie"){
		innerCookie = value;
	}
}


this.send = function(data){
	innerData=data;
	
	if(innerURL == null)return;
    
    var proxy = settingsEngine.getProxy();
    var proxyport = settingsEngine.getProxyPort();
    
	
	var cmd = "/usr/bin/curl -q -b --silent --include --location --max-redirs 20 --header 'X-Widget-Request: true'";
	cmd=cmd +' --url "' + innerURL + '"';
	if(innerCookie !=null) cmd= cmd +' --cookie "' + innerCookie +'"';
	if(data !=null) cmd= cmd +' --data "' + data + '"';
    if(proxy !=null) cmd = cmd + ' --proxy "'+proxy+':'+proxyport+'"';
	
	callBackFunction= this.onload;
	
	//Very triky work around the widget.system command only read 4k from the output string
	//Therefore we have to save the result in a temp file and read it later 
	var command = widget.system(cmd + " > SMSwissWidgetHTMLResult.txt", system_handler);
	command.close();
}




function system_handler(systemCommand) {

		
	//4k widget.system limitation workaround
	//var stdout = systemCommand.outputString;
	var stdout = readInFile("SMSwissWidgetHTMLResult.txt") 
	var stderr = systemCommand.errorString;

	SimpleHTTPRequestObject.status=100;
	SimpleHTTPRequestObject.responseText="";
	SimpleHTTPRequestObject.header="";
	
	if (systemCommand.status != 0) {
			return callBackFunction();
	}
	
    //Header check
    if(stdout == null || stdout.indexOf("HTTP") ==-1)  return callBackFunction();
    
    var content = stdout;
    //Header Remover
    while(content.indexOf("HTTP") == 0){
    
        var headerend=content.indexOf("\r\n\r\n");
        if(headerend<0) return callBackFunction();
        content = content.substring(headerend+4, content.length);
    }
                    		
			
	SimpleHTTPRequestObject.responseText=content;    
	SimpleHTTPRequestObject.header=stdout.substring(0, stdout.length - content.length);  
			
		
	SimpleHTTPRequestObject.status=200;
	callBackFunction();
	
}

function readInFile(filename) 
{ 
    req = new XMLHttpRequest(); 
    req.open("GET", filename ,false); 
    req.send(null); 
    response = req.responseText; 
    if (response) 
    { 
        return response; 
    } 
    return null 
} 





}




function SettingsEngine() {


// Contructor
//-----------------------------------------------------------

// Put here initialization code.

//This code here typically check that all preference key are
//existing if not he add the default values, and so on...

var defaultPreferenceValues = {
                accountsNames : ["-", "-", "-", "-", "-"],
                userNames: ["", "", "", "", ""],
                passwords: ["", "", "", "", ""],
                providers: [0, 0, 0,0,0],
                xtras: ["", "", "", "", ""],
                ruuningAccount:0,
                proxy:null,
                proxyPort:null,
                vibrate:true,
                clearAfterSend:true,
                phoneBookFiltering:false,
                phoneBookFilterType:"mobile"
                
    };

//No need to instanciate the variables with some valued since the lodings methods will init then with the default pref. values
var smsEngine = null;
var proxy = null;
var proxyPort = null;
var vibrate = null;
var clearAfterSend = null;
var phoneBookFiltering  = null;
var phoneBookFilterType = null;

//Public methods, Setting Engine Interface 
//-----------------------------------------------------------

this.getAccountNames = function (){
    var accountsNames = getPreferenceForKey("accountsNames");
    return accountsNames;
}


this.loadAccountData= function(accountID){
            var id = document.getElementById("accountID");
            var accountName = document.getElementById("accountNameText");
            var provider = document.getElementById("providerList");
            var userName = document.getElementById("userNameText");
            var password = document.getElementById("passwordText");
            var xtraText = document.getElementById("xtraAccountSettingText");
            
            
            var accountsNames = getPreferenceForKey("accountsNames");
            var userNames = getPreferenceForKey("userNames");
            var passwords = getPreferenceForKey("passwords");
            var providers = getPreferenceForKey("providers");
            var extras = getPreferenceForKey("xtras");
            
            id.value=accountID;
            accountName.value = accountsNames[accountID];
            provider.object.setSelectedIndex(providers[accountID]);
            userName.value=userNames[accountID];
            password.value=passwords[accountID];
            xtraText.value = extras[accountID];
            
            globalSetXtraAccountSettings(null); //The methos is called to hidden the xtravalue field if not necessary
}

//call this method to read from the selectedAccount list the selected item and store it
//as the new account to use for sending sms
this.setRunningAccount = function(){
        var accountSelectList = document.getElementById("selectedAccount").object;
        var ruuningAccount = accountSelectList.getSelectedIndex();
        setPreferenceForKey(ruuningAccount, "ruuningAccount");
        initSMSEngine(); //Reload the SMSengine
}

//Call this method to retreive the SMS engine
//NOTE: Since the SMS engine can change at any time, you should always call this method to use it
//and never store or create a local copy of the SMSengine object.
this.getSMSEngine = function(){
    return smsEngine;
}

//Get the name of the current selected SMS provide
this.getCurrentProviderName = function(){

 var provider =getCurrentProvider();

 if(provider == 0) //Sunrise
        return "Sunrise";           
    
 if(provider == 1) //Cablecom
        return "Cablecom";
                        
 if(provider == 2) //Yallo
        return  "Yallo";
        
 if(provider == 3) //ETHZ
        return "ETHZ";

 
 return provider; //Default case should never happens

}


//Return the proxy for the requested accountID
this.getProxy = function () {
    return proxy;
};

//Return the proxy user name for the requested accountID
this.getProxyPort = function () {
    return proxyPort;
};

//Return null if the phone book filter is disabled or the filter type label
this.getPhoneBookFilterType = function () {
    if(phoneBookFiltering == false) return null;
    else return phoneBookFilterType;
};


this.getDoVibrate = function () {
    return vibrate;
};

//Return the proxy user name for the requested accountID
this.getDoClear = function () {
    return clearAfterSend;
};


//Return the actual SMS account to use
this.getSelectedAccount = function () {
		
};


//Return null if the filter is off otherwise a string
this.getPhoneBookFilter = function () {
		
};


//Return a string with the skin image file name
this.getSkin = function () {
		
};

//Return a bool
this.isVibrationOn = function () {
		
};

//Return a bool
this.isClearMessageOn = function () {
		
};

// Called when the widget has been synchronized with .Mac
this.sync = function (){

	// Retrieve any preference values that you need to be synchronized here
    // Use this for an instance key's value:
    // instancePreferenceValue = widget.preferenceForKey(null, createInstancePreferenceKey("your-key"));
    //
    // Or this for global key's value:
    // globalPreferenceValue = widget.preferenceForKey(null, "your-key");
}

// Called when the widget has been removed from the Dashboard
this.remove = function (){
	// Remove any preferences as needed
    // widget.setPreferenceForKey(null, createInstancePreferenceKey("your-key"));

    //We do not have any instance preference key!!
}

// Called when the back of the widget is shown
this.loadSettings = function (){
    loadSelectAccountList(); //Set up the front selection list
    loadAccountsNames();
    loadProxySetting();
    loadMixSettings();  //Settings + PhoneBook filer
    initSMSEngine(); //Load the SMSengine;
}

// Called when the back of the widget is hidden and the done button was pressed
this.saveSettings = function (){
    saveAccountData();
}


//Private method
//-----------------------------------------------------------

//This is a privat method used to initialize the privat smsEngine object.
//Any thame the running account is changed or user mofify some setting the engine 
//has to be reinitialized.
function initSMSEngine(){

    smsEngine = null;
    //Check if the current account is valid
    //-------------------------------------- 
        var userName = getCurrentUserName();
        var password = getCurrentPassword();
        var extra    = getCurrentExtra();
        var provider = getCurrentProvider();
    
        if(userName == undefined || userName.length == 0)//A username as to be difined
            return;
    //--------------------------------------    
    
        
    if(provider == 0) //Sunrise
        smsEngine = new SMSEngineSunriseMail(userName,password,extra);           
    
    if(provider == 1) //Cablecom
        smsEngine = new SMSEngineCablecom(userName,password,extra);
                        
    if(provider == 2) //Yallo
        smsEngine = new SMSEngineYallo(userName,password,extra);
        
    if(provider == 3) //ETHZ
        smsEngine = new SMSEngineETHZ(userName,password,extra);
    
    //Start the authentication process and get the available sms count
    smsEngine.getAvailSMS();
        
}




function saveAccountData(){
            var id = document.getElementById("accountID");
            var accountName = document.getElementById("accountNameText");
            var provider = document.getElementById("providerList");
            var userName = document.getElementById("userNameText");
            var password = document.getElementById("passwordText");
            var xtra = document.getElementById("xtraAccountSettingText");
            
            var accountID = id.value;
            var accountsNames = getPreferenceForKey("accountsNames");
            var userNames = getPreferenceForKey("userNames");
            var passwords = getPreferenceForKey("passwords");
            var providers = getPreferenceForKey("providers");
            var xtras = getPreferenceForKey("xtras");
            
            var proxy = document.getElementById("proxyText").value;
            var proxyPort = document.getElementById("proxyPortText").value;
            var vibrate = checkboxVibrate.checked;
            var clearAfterSend = checkboxClear.checked;
            
            var phoneBookFiltering = phoneBookFilteringCheckBox.checked;
            var phoneBookFilterType = document.getElementById("phoneBookFilterType").value;
            
            if(proxy == ""){
                proxy = undefined;
                proxyPort = undefined;
            }else if(proxyPort == ""){
                proxyPort = "80";
            }
            
            
            accountsNames[accountID]=accountName.value;
            providers[accountID]=provider.object.getSelectedIndex();
            userNames[accountID]=userName.value;
            passwords[accountID]=password.value;
            xtras[accountID] = xtra.value;
            
            setPreferenceForKey(providers, "providers");
            setPreferenceForKey(passwords, "passwords");
            setPreferenceForKey(userNames, "userNames");
            setPreferenceForKey(accountsNames, "accountsNames");
            setPreferenceForKey(xtras, "xtras");
            setPreferenceForKey(proxy, "proxy");
            setPreferenceForKey(proxyPort, "proxyPort");
            setPreferenceForKey(vibrate, "vibrate");
            setPreferenceForKey(clearAfterSend, "clearAfterSend");
            
            setPreferenceForKey(phoneBookFiltering, "phoneBookFiltering");
            setPreferenceForKey(phoneBookFilterType, "phoneBookFilterType");
}

//This function load the current proxy settings
function loadProxySetting(){

    proxy = getPreferenceForKey("proxy");
    proxyPort = getPreferenceForKey("proxyPort");
    
}

function loadMixSettings(){
    vibrate = getPreferenceForKey("vibrate");
    clearAfterSend = getPreferenceForKey("clearAfterSend");
    
    phoneBookFiltering  = getPreferenceForKey("phoneBookFiltering");
    phoneBookFilterType = getPreferenceForKey("phoneBookFilterType");
        
    checkboxVibrate.checked=vibrate;
    checkboxClear.checked=clearAfterSend;
    
    phoneBookFilteringCheckBox.checked = phoneBookFiltering;
    document.getElementById("phoneBookFilterType").value= phoneBookFilterType;
}


//This method generate the account list used in the front panel of the widget
//it also select the running account
function loadSelectAccountList(){
                        
        var accountSelectList = document.getElementById("selectedAccount").object;
        var accountsNames = getPreferenceForKey("accountsNames");
             
        accountSelectList.select[0].text=accountsNames[0];
        accountSelectList.select[1].text=accountsNames[1];
        accountSelectList.select[2].text=accountsNames[2];
        accountSelectList.select[3].text=accountsNames[3];
        accountSelectList.select[4].text=accountsNames[4];
        
        var ruuningAccount = getPreferenceForKey("ruuningAccount");
      
        accountSelectList.setSelectedIndex(ruuningAccount);
}

//Return the user names attacched to the running account
function getCurrentUserName(){
    var ruuningAccount = getPreferenceForKey("ruuningAccount");
    var userNames = getPreferenceForKey("userNames");
    return userNames[ruuningAccount];
}
//Return the password attacched to the running account
function getCurrentPassword(){

    var ruuningAccount = getPreferenceForKey("ruuningAccount");
    var passwords = getPreferenceForKey("passwords");
    return passwords[ruuningAccount];
}

function getCurrentExtra(){
    var ruuningAccount = getPreferenceForKey("ruuningAccount");
    var extras = getPreferenceForKey("xtras");
    return extras[ruuningAccount];
}


//Return the SMS provider attacched to the running account
function getCurrentProvider(){
    var ruuningAccount = getPreferenceForKey("ruuningAccount");
    var providers = getPreferenceForKey("providers");
    return Number(providers[ruuningAccount]);
}


//Load the account names from SettingsEngine and reload the list used into the account setting page
function loadAccountsNames(){
    accountDataSource._rowData= settingsEngine.getAccountNames();
    document.getElementById("accountList").object.reloadData();
}



//We have only instance preference key this because users can add multiple times the same widget to set up more
//than only five accounts.
function setPreferenceForKey(value,key){
    var result;
    if(typeof(value) == "object"){
        result = "ARRAY/\|/";
        for(i=0;i<value.length;i++)
            result = result + value[i] + "/\|/";
    }else{
        result = value;
    }
    widget.setPreferenceForKey(result,createInstancePreferenceKey(key));
    widget.setPreferenceForKey(result,key);
}
//We have only instance preference key this because users can add multiple times the same widget to set up more
//than only five accounts.
function getPreferenceForKey(key) {
    var result = widget.preferenceForKey(createInstancePreferenceKey(key));
    //check global setting
    if (result == undefined) { 
        result = widget.preferenceForKey(key);
    }
  
    if (result == undefined) { //If undefined return the default value
		result = defaultPreferenceValues[key];
        return result;
	}
    
    if(typeof(result) != "string") return result;
    if(result.indexOf("ARRAY/\|/") == -1) return result;
    var parts = result.split("/\|/");
    
    return  [parts[1],parts[2],parts[3],parts[4],parts[5]];
}



}

// This object implements the dataSource methods for the list.
var accountDataSource = {
	
	// Sample data for the content of the list. 
	// Your application may also fetch this data remotely via XMLHttpRequest.
	_rowData: [],
	
	// The List calls this method to find out how many rows should be in the list.
	numberOfRows: function() {
		return this._rowData.length;
	},
	
	// The List calls this method once for every row.
	prepareRow: function(rowElement, rowIndex, templateElements) {
		// templateElements contains references to all elements that have an id in the template row.
		// Ex: set the value of an element with id="label".
		if (templateElements.label) {
			templateElements.label.innerText = this._rowData[rowIndex];
		}

		// Assign a click event handler for the row.
		rowElement.onclick = function(event) {
			// Do something interesting
            //rowElement.innerText="";
            
            //First save the old loaded data in case the user has changed some data
            settingsEngine.saveSettings();
            settingsEngine.loadSettings();
            //Once saved load the selected account data
            settingsEngine.loadAccountData(rowIndex);
            document.getElementById("accountList").object.rows[rowIndex].setAttribute("class", "listRowActive");
		};
	}
};


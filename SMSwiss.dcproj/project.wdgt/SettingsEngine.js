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
                ruuningAccount:0
    };


//var accountsNames = ["Sunrise", "Cablecom", "ETHZ", "-", "-"];
//var userNames = ["Elia", "Elia", "Elia", "-", "-"];
//var passwords = ["123", "123", "123", "-", "-"];
//var providers = [0, 1, 2,0,0];
//var ruuningAccount = 0;

//Public methods, Setting Engine Interface 
//-----------------------------------------------------------

this.getAccountNames = function (){
    var accountsNames = preferenceForKey("accountsNames");
    return accountsNames;
}


this.loadAccountData= function(accountID){
            var id = document.getElementById("accountID");
            var accountName = document.getElementById("accountNameText");
            var provider = document.getElementById("providerList");
            var userName = document.getElementById("userNameText");
            var password = document.getElementById("passwordText");
            
            var accountsNames = preferenceForKey("accountsNames");
            var userNames = preferenceForKey("userNames");
            var passwords = preferenceForKey("passwords");
            var providers = preferenceForKey("providers");
            
            id.value=accountID;
            accountName.value = accountsNames[accountID];
            provider.object.setSelectedIndex(providers[accountID]);
            userName.value=userNames[accountID];
            password.value=passwords[accountID];
}

//call this method to read from the selectedAccount list the selected item and store it
this.selectRunningAccount = function(){
        var accountSelectList = document.getElementById("selectedAccount").object;
        var ruuningAccount = accountSelectList.getSelectedIndex();
        setPreferenceForKey(ruuningAccount, "ruuningAccount");
}


//Return the proxy for the requested accountID
this.getProxyURL = function (accountID) {
		
};

//Return the proxy user name for the requested accountID
this.getProxyUserName = function (accountID) {
		
};

//Return the proxy password name for the requested accountID
this.getProxyUserName = function (accountID) {
		
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
}

// Called when the back of the widget is hidden and the done button was pressed
this.saveSettings = function (){
    saveAccountData();
}


//Private method
//-----------------------------------------------------------
function saveAccountData(){
            var id = document.getElementById("accountID");
            var accountName = document.getElementById("accountNameText");
            var provider = document.getElementById("providerList");
            var userName = document.getElementById("userNameText");
            var password = document.getElementById("passwordText");
            
            var accountID = id.value;
            var accountsNames = preferenceForKey("accountsNames");
            var userNames = preferenceForKey("userNames");
            var passwords = preferenceForKey("passwords");
            var providers = preferenceForKey("providers");
            
            accountsNames[accountID]=accountName.value;
            providers[accountID]=provider.object.getSelectedIndex();
            userNames[accountID]=userName.value;
            passwords[accountID]=password.value;
            
            setPreferenceForKey(providers, "providers");
            setPreferenceForKey(passwords, "passwords");
            setPreferenceForKey(userNames, "userNames");
            setPreferenceForKey(accountsNames, "accountsNames");
}

function loadSelectAccountList(){
                        
        var accountSelectList = document.getElementById("selectedAccount").object;
        var accountsNames = preferenceForKey("accountsNames");
             
        accountSelectList.select[0].text=accountsNames[0];
        accountSelectList.select[1].text=accountsNames[1];
        accountSelectList.select[2].text=accountsNames[2];
        accountSelectList.select[3].text=accountsNames[3];
        accountSelectList.select[4].text=accountsNames[4];
        
        var ruuningAccount = getPreferenceForKey("ruuningAccount");
      
        accountSelectList.setSelectedIndex(ruuningAccount);

}

function loadAccountsNames(){
    //Load the account names from SettingsEngine and reload the list
    accountDataSource._rowData= settingsEngine.getAccountNames();
    document.getElementById("accountList").object.reloadData();
}


function preferenceForKey(key) {
	var result;
	
    result = getPreferenceForKey(key);
	
	if (!result) {
		result = defaultPreferenceValues[key];
        setPreferenceForKey(result,key);
	}
	return result;
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
}
//We have only instance preference key this because users can add multiple times the same widget to set up more
//than only five accounts.
function getPreferenceForKey(key){
    var result = widget.preferenceForKey(createInstancePreferenceKey(key));
    if(!result) return result; //If undefined
    if(typeof(result) != "string") return result;
    if(result.indexOf("ARRAY/\|/") == -1) return result;
    var parts = result.split("/\|/");
    
    return  [parts[1],parts[2],parts[3],parts[4],parts[5]];
}

}

//This is a global function used to handel events rising from the front list to choise the current account
function selectRunningAccount(event){
    settingsEngine.selectRunningAccount();
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
		};
	}
};

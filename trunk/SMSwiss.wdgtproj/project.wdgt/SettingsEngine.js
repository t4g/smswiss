function SettingsEngine() {


// Contructor
//-----------------------------------------------------------

// Put here initialization code.

//This code here typically check that all preference key are
//existing if not he add the default values, and so on...



//Public methods, Setting Engine Interface 
//-----------------------------------------------------------



this.getAccountNames = function (){

    return "dfasd";
 
}


//Return the user name for the requested account
this.getUserName = function (accountID) {
		
};

//Return the password for the requested accountID
this.getPassword = function (accountID) {
		
};

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

}


// Called when the back of the widget is shown
this.loadSettings = function (){
	
}

// Called when the back of the widget is hidden and the done button was pressed
this.saveSettings = function (){
	
}


//Private method
//-----------------------------------------------------------
//Here implement internal methods


// function XY(){
//
//};




}
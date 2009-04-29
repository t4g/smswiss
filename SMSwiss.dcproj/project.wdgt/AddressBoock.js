
function addressBoock(){

    var selectedContatcIndex=0;
    var displayedContact=0;
    var lastSearch="";
    var performSearch = true;

    //Thsi method search for contacts and shows the result bar
    this.searchContacts = function(){
        
        if(!performSearch) return; //Some thimes when the user type enter or tab the search has not to be performed.
        
        displayedContact=0;
        selectedContatcIndex = 0; //reset the current selected contact index;

        if(receiverNumberField.value ==""){
                receiverAutoComplete.style.visibility="hidden";
                return;
        }
        
        if(lastSearch == receiverNumberField.value) return;  //Do to search again if nothig changes
        lastSearch = receiverNumberField.value;


        AddressBookPlugin.searchForStringWithoutBestMatch(receiverNumberField.value);  
        
        receiverAutoComplete.innerHTML = "</br></br>";
        
        
        for (var i=0; i < AddressBookPlugin.count(); i++) {
                
                AddressBookPlugin.displayCardAtIndex(i);
                for (var j = 0; j < AddressBookPlugin.displayedItemCount(); j++){
                      
                      if(AddressBookPlugin.displayedPropertyAtIndex(j) =="Phone"){
                            receiverAutoComplete.appendChild(createContactDiv(AddressBookPlugin.displayedName(),
                                                             AddressBookPlugin.displayedValueAtIndex(j),
                                                             displayedContact));
                            displayedContact++;
                            if(displayedContact>4)break;
                        }
                }
                if(displayedContact>4)break;   
        }
        
        if(displayedContact>0){
            receiverAutoComplete.style.visibility="visible";
            this.highlightContact(selectedContatcIndex);
        }else{
            receiverAutoComplete.style.visibility="hidden";
        }
    }
    
    //This metod catch the key event before the search method, some times depending on the pressed key the search is disabled.
    this.searchKeyPressed = function(event){
        
        if(event == null){
            receiverAutoComplete.style.visibility="hidden";
            return
        }
        
        performSearch = true; //by default the search has to be performed
        
        if(event.keyCode==40){  //down key   
                this.highlightContact(selectedContatcIndex+1);
                event.bubbles=false;
                event.cancelBubble=true;
                event.stopPropagation();  
        }
        
        if(event.keyCode==38){ //up key
                this.highlightContact(selectedContatcIndex-1);
                event.bubbles=false;
                event.cancelBubble=true;
                event.stopPropagation();  
        }
        
 
        if(event.keyCode==13 ){ //Enter key
                firstContact = document.getElementById("contact-" + selectedContatcIndex)
                if(firstContact!=null){
                        firstContactNum = firstContact.getAttribute('number');
                        firstContactName = firstContact.getAttribute('name');
                        this.selctedContact(firstContactName,firstContactNum);
                }             
                receiverAutoComplete.style.visibility="hidden";
                performSearch = false;
                focusMessage();
                return;
        }

        if(event.keyCode==9){  //I need to catch the Tab before the key is thrated
                firstContact = document.getElementById("contact-" + selectedContatcIndex)
                if(firstContact!=null){
                        firstContactNum = firstContact.getAttribute('number');
                        firstContactName = firstContact.getAttribute('name');
                        return this.selctedContact(firstContactName,firstContactNum);
                }
                receiverAutoComplete.style.visibility="hidden";
                performSearch = false;
                focusMessage();
                return;
        }
    }
    
    
    this.highlightContact = function(index){
        if(displayedContact==0) return;
        
        if(index < 0) index=displayedContact-1;
        if(index >= displayedContact) index=0;
        
        unhighlight(selectedContatcIndex);
        selectedContatcIndex=index;
        
        document.getElementById("contact-" + index).style.backgroundImage="url(images/searchBarActive.png)";
        document.getElementById("contact-link-" + index).style.color= "#FFFFFF";
    }



    function unhighlight(index){
        document.getElementById("contact-" + index).style.backgroundImage="url(images/searchBar.png)";
        document.getElementById("contact-link-" + index).style.color= "#333333";
    }


    this.selctedContact = function(name,number){
        receiverNumberField.value=number+" ("+name +")";
        receiverAutoComplete.style.visibility="hidden";       
    }


    function createContactDiv(name, number,index){
       
        var enclosingDiv= document.createElement('div');
        
        enclosingDiv.setAttribute('class', 'receiverAutoCompleteItem');
        enclosingDiv.setAttribute('id', 'contact-' + index);
        enclosingDiv.setAttribute('number', '' + number);
        enclosingDiv.setAttribute('name', '' + name);
        
        var html = "<A HREF=\"#\" id=\"contact-link-" + index + "\" onMouseOver=\"addressBoockEngine.highlightContact(" + index + ");\""+
                    "onMouseUP=\"addressBoockEngine.selctedContact('" + name + "','"+number+"');focusMessage();\">" + name + " (" + number + ")</A>";
        
        enclosingDiv.innerHTML = html;
        
        return enclosingDiv;     
    }
}










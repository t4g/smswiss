//----------------------------------------------------------------------------------
// Tools Functions
//----------------------------------------------------------------------------------

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

function URLEncode (clearString) {

	return encodeURIComponent(clearString).replace("\'", '%27');
  
 /* var output = '';
  var x = 0;
  clearString = clearString.toString();
  var regex = /(^[a-zA-Z0-9_.]*)/;
  while (x < clearString.length) {
    var match = regex.exec(clearString.substr(x));
    if (match != null && match.length > 1 && match[1] != '') {
    	output += match[1];
      x += match[1].length;
    } else {
      if (clearString[x] == ' ')
        output += '+';
      else {
        var charCode = clearString.charCodeAt(x);
        var hexVal = charCode.toString(16);
        output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
      }
      x++;
    }
  }
  return output;*/
}

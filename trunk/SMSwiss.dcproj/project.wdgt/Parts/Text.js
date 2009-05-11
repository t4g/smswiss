/* 
 This file was generated by Dashcode and is covered by the 
 license.txt included in the project.  You may edit this file, 
 however it is recommended to first turn off the Dashcode 
 code generator otherwise the changes will be lost.
 */

function CreateText(elementOrID, spec)
{
    var text = spec.text || '';
    if (window.dashcode && dashcode.getLocalizedString) text = dashcode.getLocalizedString(text);

    var element = elementOrID;
    if (elementOrID.nodeType != Node.ELEMENT_NODE) {
        element = document.getElementById(elementOrID);
    }
    element.innerText = text; 
}

function OSType() {
	var OSName="Unknown OS";
	if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
	if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
	if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
	if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

	return OSName;
}

/*
Windows XP - C:\Documents and Settings\*UserName*\Local Settings\Application Data\Google\Chrome\User Data\Default\Extensions
Windows 7\8 - C:\Users\*UserName*\AppData\Local\Google\Chrome\User Data\Default\Extensions
Linux - ~/.config/google-chrome/Default/Extensions/
Mac - /Users/`username`/Library/Application Support/Google/Chrome/Default/Extensions
Chromium on Linux - ~/.config/chromium/Default/Extensions
*/
///// TODO
// Support Unix
// Support installation to non-default location
// Add support to Windows XP
// Add support to Chromium - problematic since it can run from any folder
function getChromeExtPath(username) {
	var OsName = OSType();
	var path;
		
	switch (OsName) {
	case "MacOS":
		path = "/Users/" + username + "/Library/Application Support/Google/Chrome/Default/Extensions";
		break;
	case "UNIX":
		//not supported yet
		break;
	case "Linux":
		path = "~/.config/google-chrome/Default/Extensions/";
		break;
	case "Windows":
	default: //fallthrough from windows
		path = "C:/Users/" + username + "/AppData/Local/Google/Chrome/User Data/Default/Extensions/";
	}
	return path;
}

var getAllExtFunc = function (listOfExt) {
//Used http://paul.kinlan.me/creating-a-new-new-tab-page-for-chrome/ as reference
	var len = listOfExt.length;
	var path = getChromeExtPath(username);
	var img ="";
	var fullPath;
	for(var i=0; i< len; i++)
	{
		console.log("processing " + i);
		//console.log('<p>' + listOfExt[i].name + '</p>');
		if (listOfExt[i].installType === "development")
			fullPath="#";
		else
			fullPath = path + listOfExt[i].id + "/";
		if ('icons' in listOfExt[i] && listOfExt[i].icons.length > 0)
		{
			img = "<img src='" + listOfExt[i].icons[0].url + "' width='16px' height='16px'/>";
		}
		else
		{
		}
		var clipboard = '<button id="copyUrl" data-href="' + fullPath +'">Copy to clipboard</button>';
		$(".chrome-ext-list").append(img + '<a href="' + /*+ 'file://' + fullPath +*/ '">' + listOfExt[i].name + '</a>' + clipboard + '<br/>');
	}
};

var Storage = {
	storageOption: function(type) {
		//For now only use localStoage		
		return localStorage;
	},
	save: function (type, key, data) {
		Storage.storageOption(type).setItem(key,data);/*, function () {
		console.log("saved data");
		});*/
	},
	load: function (type, key) {
		return Storage.storageOption(type).getItem(key);/*, function (object) {
			console.log("read : " +object + object[key]);
			return object[key];
		})*/}
};//End of Storage

// Copy to clipboard helper function
//http://www.pakzilla.com/2012/03/20/how-to-copy-to-clipboard-in-chrome-extension/
function copyToClipboard( text ){
	var copyDiv = document.createElement('div');
	copyDiv.contentEditable = true;
	document.body.appendChild(copyDiv);
	copyDiv.innerHTML = text;
	copyDiv.unselectable = "off";
	copyDiv.focus();
	document.execCommand('SelectAll');
	document.execCommand("Copy", false, null);
	document.body.removeChild(copyDiv);
}

/* UI Elements and General startup sequence*/
//The div to populate with all the information
var $extTable = $('.chrome-ext-list');
var username = (typeof Storage.load(null,'path') != "undefined"?Storage.load(null,'path'):"");
console.log(" username is " + username);
//Attach the event listener for the click event after document loads
$(document).ready( function() {
	//check if we have a username saved
	var dbdata = Storage.load(null,"path");
	if (typeof dbdata != "undefined" || OSType === "Linux")
	{
		$(".windows").hide();
		chrome.management.getAll(getAllExtFunc);
	}
	$('#regular-ext').click(function() {
		console.log("clicked regualr view");
		chrome.tabs.update({url:"chrome-internal://newtab/"});
		return false;
	});
	$("#save").click(function() {
		username = $("input").val();
		//Get the list of all chrome extensions with their information
		chrome.management.getAll(getAllExtFunc);
		Storage.save(null,'path',username);
	});
});

$("#copyUrl").live('click',function() {
	console.log($(this), $(this).data("href"));
	copyToClipboard($(this).data("href"));
});






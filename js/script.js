//The div to populate with all the information
var $extTable = $('.chrome-ext-list');

//Used http://paul.kinlan.me/creating-a-new-new-tab-page-for-chrome/ as reference
var getAllExtFunc = function (listOfExt) {
	var len = listOfExt.length;
	for(var i=0; i< len; i++)
	{
		//console.log("processing " + i);
		//console.log('<p>' + listOfExt[i].name + '</p>');
		href="file://C:/Users/Shai/AppData/Local/Google/Chrome/User Data/Default/Extensions/" + listOfExt[i].id + "/";
		$('.chrome-ext-list').append('<a href="' + href + '">' + listOfExt[i].name + '</a><br/>');
	}
};

//Get the list of all chrome extensions with their information
chrome.management.getAll(getAllExtFunc);
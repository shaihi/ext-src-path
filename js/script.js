//The div to populate with all the information
var $extTable = $('.chrome-ext-list');
var username = "";
//Used http://paul.kinlan.me/creating-a-new-new-tab-page-for-chrome/ as reference
var getAllExtFunc = function (listOfExt) {
	var len = listOfExt.length;
	for(var i=0; i< len; i++)
	{
		console.log("processing " + i);
		//console.log('<p>' + listOfExt[i].name + '</p>');
		if (listOfExt[i].installType === "development")
			href="#";
		else
			href="file://C:/Users/" + username + "/AppData/Local/Google/Chrome/User Data/Default/Extensions/" + listOfExt[i].id + "/";
		$(".chrome-ext-list").append('<a href="' + href + '">' + listOfExt[i].name + '</a><br/>');
	}
};

/* UI Elements */
//Attach the event listener for the click event after document loads
$(document).ready( function() {
/*on('.hrome-ext-list a', 'click', function() {
	console.log("Fuck!");
	chrome.tabs.create({'url': this.href}, function(tab) {
		// Tab opened.
	});
});*/
	$('#regular-ext').click(function() {
		console.log("clicked regualr view");
		chrome.tabs.update({url:"chrome-internal://newtab/"});
		return false;
	});
	$("#save").click(function(e) {
		username = $("input").val();
		//Get the list of all chrome extensions with their information
		chrome.management.getAll(getAllExtFunc);
		e.preventDefault();
	});
});






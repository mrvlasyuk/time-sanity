var REDIRECT_URL = "https://www.arxiv-sanity.com/";

var blacklist = ["youtube.com"];
var is_on = true;

chrome.storage.sync.get(['config'], function(result) {
	if (result && result.config){
		blacklist = result.config.blacklist;
		is_on = result.config.is_on;
	}
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if ("config" in changes){
    	let config = changes["config"].newValue;
    	blacklist = config.blacklist;
    	is_on = config.is_on;
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (!changeInfo.url || !is_on){
    	return;
    }
    for (const badurl of blacklist){
    	if (badurl.length <= 3){
    		continue;
    	}
    	if (changeInfo.url.includes(badurl)){
    		console.log("Blocking " + changeInfo.url);
    		chrome.tabs.update(tabId, {url: REDIRECT_URL});
    	}
	}
 });
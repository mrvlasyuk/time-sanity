var DEFAULT_CONFIG = {
	blacklist: ["youtube.com"],
	is_on: true,
	redirect_url: "http://www.arxiv-sanity.com/"
}

var CONFIG = DEFAULT_CONFIG;

chrome.storage.sync.get(['config'], function(result) {
	if (result && result.config){
		CONFIG = result.config;
	}
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if ("config" in changes){
		CONFIG = changes["config"].newValue;
    }
});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (!changeInfo.url || !CONFIG.is_on){
    	return;
    }
	for (const badurl of CONFIG.blacklist){
    	if (badurl.length <= 3){
    		continue;
    	}
    	if (changeInfo.url.includes(badurl)){
    		console.log("Blocking " + changeInfo.url);
    		chrome.tabs.update(tabId, {url: CONFIG.redirect_url});
    	}
	}
 });
var blacklist = [];
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


chrome.webRequest.onBeforeRequest.addListener(
	function(info) {
		for (var elem in blacklist) {
			if (info.url.includes(blacklist[elem])) {
				console.log('Blocking ' + info.url);
				return {cancel: true};
			}
		}	
		return;
	},
	{urls: ["http://*/*", "https://*/*"]},
	["blocking"]
);

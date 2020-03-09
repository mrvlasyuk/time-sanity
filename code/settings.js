var DEFAULT_BLACKLIST = ["youtube.com"]; 

chrome.storage.sync.get(['config'], function(result) {
	if (!result || !result.config){
		console.log("Setting empty settings");
		config = {blacklist: DEFAULT_BLACKLIST, is_on: true};
		chrome.storage.sync.set({config: config});
	}
});

document.addEventListener('DOMContentLoaded',
	function () {
		var is_on, blacklist;

		chrome.storage.sync.get(['config'], function(result) {
			if (result && result.config){
			  blacklist = result.config.blacklist;
			  is_on = result.config.is_on;
			  console.log("Loaded", blacklist, is_on);
			  document.getElementById('enabled').checked = (is_on !== false);
			  document.getElementById('blacklist').value = blacklist.join("\n");
			}
		});

		document.getElementById("btn").addEventListener("click", 
			function(){
				is_on = document.getElementById('enabled').checked;
				blacklist = document.getElementById('blacklist').value.split("\n");
				config = {blacklist, is_on};
				chrome.storage.sync.set({config: config});
				console.log("Saved", blacklist, is_on);
			}
		);
	});

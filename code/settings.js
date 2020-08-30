var DEFAULT_CONFIG = {
	blacklist: ["youtube.com"],
	is_on: true,
	redirect_url: "http://www.arxiv-sanity.com/"
}

chrome.storage.sync.get(['config'], function(result) {
	if (!result || !result.config){
		console.log("Setting empty settings");
		chrome.storage.sync.set({config: DEFAULT_CONFIG});
	}
});

function get_elem(id) {
	return document.getElementById(id);
}

document.addEventListener('DOMContentLoaded',
	function () {
		chrome.storage.sync.get(['config'], function(result) {
			if (result && result.config){
				let C = result.config;
				console.log("Loaded", C.blacklist, C.is_on);
				get_elem('enabled').checked = (C.is_on !== false);
				get_elem('blacklist').value = C.blacklist.join("\n");
				get_elem('redirect_url').value = C.redirect_url;
			}
		});
		var btn = get_elem("btn");
		btn.addEventListener("click", 
			function(){
				let is_on = get_elem('enabled').checked;
				let blacklist = get_elem('blacklist').value.split("\n");
				let redirect_url = get_elem('redirect_url').value;
				config = { blacklist, is_on, redirect_url};
				chrome.storage.sync.set({config: config});
				console.log("Saved config", config);
				
				btn.innerText = "Saved";
				setTimeout(() => {
					btn.innerText = "Save";
				}, 500);
			}
		);
	});

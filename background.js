chrome.browserAction.onClicked.addListener(
	function(tab) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tab.id, {message: "cleanAll"});
		});
	});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		amplitude.getInstance().logEvent(request.event);
	});

amplitude.getInstance().init("77685d9e75c120a740136a4affe5d41f");

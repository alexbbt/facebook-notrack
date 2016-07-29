(function() {
	var removeTrackingCode = function(el) {

		var links = []
		
		if (el.target.nodeName.toLowerCase() == "a") {
			links.push(el.target);
		} else {
			try {
				links = el.target.getElementsByTagName('a');
			} 
			catch (e) {
			}
		}

		interateOverLinks(links);

	}

	var removetrackingCodeFromAllLinks = function() {
		interateOverLinks(document.getElementsByTagName('a'));
	}

	var interateOverLinks = function(links) {
		for (var i = 0; i < links.length; i++) {
			links[i] = cleanLink(links[i]);
		}
	}

	var cleanLink = function(link) {
		if (link.href && link.href.indexOf("http://l.facebook.com/l.php?u=") != -1) {
			link.href = cleanUrl(link.href);
			link.removeAttribute("onmouseover");
			link.removeAttribute("onclick");
			chrome.runtime.sendMessage({event: "Link Cleaned"});
		}
		return link;
	}

	var cleanUrl = function(url) {
		url = url.replace("http://l.facebook.com/l.php?u=", "")
		url = decodeURIComponent(url);
		return url;
	}

	window.addEventListener('DOMNodeInserted', removeTrackingCode);
	window.addEventListener('DOMSubtreeModified', removeTrackingCode);
	window.addEventListener('DOMContentLoaded', removeTrackingCode);

	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			switch(request.message) {
				case "cleanAll":
				default:
					removetrackingCodeFromAllLinks();
					break;
			}
		});
})()
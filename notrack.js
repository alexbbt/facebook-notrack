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
		}
		return link;
	}

	var cleanUrl = function(url) {
		url = url.replace("http://l.facebook.com/l.php?u=", "")
		url = decodeURIComponent(url);
		return url;
	}

	window.notrack = removetrackingCodeFromAllLinks;
	window.addEventListener('DOMNodeInserted', removeTrackingCode);
	window.addEventListener('DOMSubtreeModified', removeTrackingCode);
	window.addEventListener('DOMContentLoaded', removeTrackingCode);
})()
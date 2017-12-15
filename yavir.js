const XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
const xhttp = new XHR();

const root = this;

function x(p) {
	return new X(p)
}

function X(p) {
	root.el = p
}

function fix(callback) {
	if (typeof(root.el) !== "object") {
		document.querySelectorAll(root.el).forEach(function (e) {
			callback(e)
		});
	} else {
		callback(root.el)
	}
	return x(root.el)
}

X.prototype.fix = function (callback) {
	fix(callback)
};

X.prototype.on = function (type, callback) {
	fix(e => e.addEventListener(type, callback))
};

X.prototype.html = function (html) {
	let tmp = '';
	if (typeof(html) !== "undefined")
		fix(e => e.innerHTML = html);
	else
		fix(e => tmp = e.innerHTML);
	return tmp
};

X.prototype.val = function () {
	fix(e => this.val = e.value);
	return this.val
};

X.prototype.addClass = function (cls) {
	return fix(e => e.classList.add(cls));
};

X.prototype.removeClass = function (cls) {
	return fix(e => e.classList.remove(cls))
};

X.prototype.hasClass = function (cls) {
	let hasClass = false;
	fix(e => hasClass = e.classList.contains(cls));
	return hasClass
};

X.prototype.style = function (style) {
	return fix(e => e.style(style))
};

X.prototype.createElement = function (element) {
	return fix(e => e.createElement(element));
};

X.prototype.appendChild = function (child) {
	return fix(e => e.appendChild(child));
};

function setCookie(name, value, options) {
	options = options || {};

	let expires = options.expires;

	if (typeof expires === "number" && expires) {
		let d = new Date();
		d.setTime(d.getTime() + expires * 1000);
		expires = options.expires = d;
	}

	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	}

	value = encodeURIComponent(value);

	let updatedCookie = name + "=" + value;

	for (let propName in options) {
		updatedCookie += "; " + propName;
		let propValue = options[propName];
		if (propValue !== true) {
			updatedCookie += "=" + propValue;
		}
	}

	document.cookie = updatedCookie;
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function request(params) {

	if ("undefined" !== typeof params.headers) {
		if (params.headers.length !== 0) {
			params.headers.forEach(function (e) {
				xhttp.setRequestHeader(e.a, e.b)
			});
		}
	}

	if ("undefined" !== typeof params.async) params.async = true;

	xhttp.open(params.method, params.url, params.async);
	xhttp.send();

	if ("undefined" !== typeof params.onStart) {
		xhttp.onloadstart = function () {
			params.onStart(xhttp)
		}
	}

	if ("undefined" !== typeof params.onProgress) {
		xhttp.onprogress = function (event) {
			params.onProgress(event)
		}
	}

	if ("undefined" !== typeof params.onAbort) {
		xhttp.onabort = function () {
			params.onAbort(xhttp)
		}
	}

	if ("undefined" !== typeof params.onError) {
		xhttp.onerror = function () {
			params.onError(xhttp)
		}
	}

	if ("undefined" !== typeof params.onSuccess) {
		xhttp.onload = function () {
			params.onSuccess(xhttp)
		}
	}

	if ("undefined" !== typeof params.onTimeout) {
		xhttp.ontimeout = function () {
			params.onTimeout(xhttp)
		}
	}

	if ("undefined" !== typeof params.onComplete) {
		xhttp.onloadend = function () {
			params.onComplete(xhttp)
		}
	}
}

function Yavir(prms) {
	root.Yavor = prms;
}


Yavir.prototype.run = function () {

	if (root.Yavor.mode === 'hash' && window.location.hash === "") {
		history.replaceState({}, '', '#/');
	}

	render();
	renderActive();

	x(window).on(root.Yavor.mode === 'hash' ? 'hashchange' : 'popstate', function () {
		renderActive()
	});

	function render() {
		for (const e of root.Yavor.components) {
			if (e.route === undefined) {
				x(e.selector).html(e.template);
				if (e.script !== undefined)
					e.script()
			}
		}
	}

	function renderActive() {
		const found = root.Yavor.components.find(function (e) {
			return root.Yavor.mode === 'hash' ? e.route === window.location.hash.substr(1, window.location.hash.length) : e.route === window.location.pathname;
		});

		if (found) {
			x('view').html('<' + found.selector + '>' + '</' + found.selector + '>');
			x(found.selector).html(found.template);
			x('script[load]').fix(x => {
				eval(x.innerHTML)
			});

			x('title[load]').fix(x => {
				window.document.title = x.innerHTML
			});

			if (found.script !== undefined)
				found.script()
		} else {
			x('view').html('404')
		}
	}
};

function url(href) {
	if (root.Yavor.mode === 'hash') {
		window.location.hash = href
	} else {
		history.pushState({}, '', href);
		window.dispatchEvent(new Event('popstate'));
	}
}

function log(text) {
	console.log(text)
}

function page(file) {
	let rawFile = new XMLHttpRequest();
	let s;
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status === 0) {
				s = rawFile.responseText;
			}
		}
	};
	rawFile.send(null);
	return s;
}

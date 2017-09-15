var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest
var xhttp = new XHR()

const _ = this

function x(p) {
    return new X(p)
}

function X(p) {
    _.params = p
}

function fix(callback) {
    if (typeof(_.params) !== "object") {
        var e = document.querySelectorAll(_.params)
        for (var i = 0; i < e.length; i++) {
            callback(e.item(i))
        }
    } else {
        callback(_.params)
    }
}

X.prototype.on = function (type, callback) {
    fix(e => e.addEventListener(type, callback))
}

X.prototype.html = function (html) {
    fix(e => e.innerHTML = html)
}

X.prototype.val = function () {
    fix(e => vals = e.value)
    return vals
}

X.prototype.addClass = function (cls) {
    fix(e => e.classList.add(cls))
}

X.prototype.removeClass = function (cls) {
    fix(e => e.classList.remove(cls))
}

X.prototype.hasClass = function (cls) {
    fix(e => vaebat = e.classList.contains(cls))
    return vaebat
}

X.prototype.request = function (params) {
    log(params)

    if ("undefined" !== typeof params.headers) {
        if (params.headers.length !== 0) {
            for (var i = 0; i < params.headers.length; i++) {
                xhttp.setRequestHeader(params.headers[i].a, params.headers[i].b)
            }
        }
    }

    xhttp.open(params.method, params.url)
    xhttp.send()

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

function log(text) {
    console.log(text)
}
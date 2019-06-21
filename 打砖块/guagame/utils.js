var log = console.log.bind(console)

var e = selector => document.querySelector(selector)

var es = selector => document.querySelectorAll(selector)

var appendHtml = (element, html) => element.insertAdjacentHTML('beforeend', html)

var bindEvent = (element, eventName, callback) => element.addEventListener(eventName, callback)

var bindAll = (selector, eventName, callback) => {
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var imageFromPath = (path) => {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = (a, b) => {
    var o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}

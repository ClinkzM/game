var e = selector => document.querySelector(selector)

var es = selector => document.querySelectorAll(selector)

var appendHtml = (element, html) => element.insertAdjacentHTML('beforeend', html)

var bindEvent = (element, eventName, callback) => element.addEventListener(eventName, callback)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}

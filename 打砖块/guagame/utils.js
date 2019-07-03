var log = console.log.bind(console)

var e = selector => document.querySelector(selector)

// var log = function(...args) {
//     let v = e('#id-text-log').value
//     e('#id-text-log').value = v + '\n' + args
// }

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
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

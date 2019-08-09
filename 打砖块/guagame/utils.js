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
    if (b.y > a.y && b.y < a.y + a.texture.height) {
        if (b.x > a.x && b.x < a.x + a.texture.width) {
            return true
        }
    }
    return false
}

var aInb = function(x, x1, x2) {
    return x >= x1 && x <= x2
}

var locateBlock = function(block, width, height, x, y) {
    var o = block
    var xIn = x > o.x && x <= o.x + width
    var yIn = y > o.y && y <= o.y + height
    return xIn && yIn
}

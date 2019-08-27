const log = console.log.bind(console)

const imageFromPath = function(path) {
    const img = new Image()
    img.src = path
    return img
}

const e = sel => document.querySelector(sel)

const es = sel => document.querySelectorAll(sel)

const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const bindAll = function(selector, eventName, callback) {
    const elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        const e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

const rectIntersects = function(a, b) {
    const o = a
    if (b.y > o.y && b.y < o.y + o.texture.height) {
        if (b.x > o.x && b.x < o.x + o.texture.width) {
            return true
        }
    }
    return false
}


var collide = function(collideThing, collidedThing) {
    var c = rectIntersects(collideThing, collidedThing) || rectIntersects(collidedThing, collideThing)
    return c
}


const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

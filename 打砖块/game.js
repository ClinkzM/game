var log = console.log.bind(console)

// 32:49
var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

// 31:50
var Paddle = function() {
    var image = imageFromPath('paddle.png')
    var o = {
        image: image,
        x: 100,
        y: 200,
        speed: 5,
    }
    o.moveLeft = function() {
        o.x = o.x - o.speed
    }
    o.moveRight = function() {
        o.x = o.x + o.speed
    }
    return o
}

var __main = function() {
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')

    var paddle = Paddle()

    var leftDown = false
    var rightDown = false

    // events
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k == 'a') {
            leftDown = true
        } else if (k == 'd') {
            rightDown = true
        }
    })

    window.addEventListener('keyup', function(event) {
        var k = event.key
        if (k == 'a') {
            leftDown = false
        } else if (k == 'd') {
            rightDown = false
        }
    })

    setInterval(function() {
        // update
        if (leftDown) {
            paddle.moveLeft()
        } else if (rightDown) {
            paddle.moveRight()
        }
        // 24:23, 待办：做一个判断，挡板不能超过 canvas 边界

        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(paddle.image, paddle.x, paddle.y)
    }, 1000/30)
}

__main()

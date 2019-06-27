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
        y: 250,
        speed: 15,
    }
    o.moveLeft = function() {
        o.x = o.x - o.speed
    }
    o.moveRight = function() {
        o.x = o.x + o.speed
    }
    o.collide = function(ball) {
        if (ball.y + ball.image.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                log('相撞')
                return true
            }
        }
        return false
    }
    // 24:23, 待办：做一个判断，挡板不能超过 canvas 边界
    return o
}

// 01:02:45
var Ball = function() {
    var image = imageFromPath('ball.png')
    var o = {
        image: image,
        x: 100,
        y: 200,
        // 01:06:28
        speedX: 10,
        speedY: 10,
        fired: false,
    }

    o.move = function() {
        if (o.fired) {
            // log('ball move')
            // 01:07:16
            if (o.x < 0 || o.x > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY
            }
            // move
            o.x = o.x + o.speedX
            o.y = o.y + o.speedY

        }
    }

    o.fire = function() {
        o.fired = true
    }
    // 24:23, 待办：做一个判断，挡板不能超过 canvas 边界
    return o
}


// 43:02
var Guagame = function() {
    // 50:00
    var g = {
        actions: {},
        // 51:20 因为我要存储哪个按键被按下来了
        keydowns: {},
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context

    g.drawImage = function(guaImage) {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }

    // events
    window.addEventListener('keydown', function(event) {
        // 51:20 因为我要存储哪个按键被按下来了
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(event) {
        // 51:37 我就可以通过这个设置一个状态了，你这个按键被按下来了，我就有了
        g.keydowns[event.key] = false
    })
    // 51:58
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }

    // 44:40
    setInterval(function() {
        // events
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()
    }, 1000/30)

    return g
}

var __main = function() {
    var game = Guagame()

    var paddle = Paddle()
    // 01:01:40
    var ball = Ball()

    var leftDown = false
    var rightDown = false

    // events
    game.registerAction('a', function() {
        paddle.moveLeft()
    })
    game.registerAction('d', function() {
        paddle.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
    })

    game.update = function() {
        ball.move()
        // 判断球和挡板相撞
        if (paddle.collide(ball)) {
            ball.speedY = -ball.speedY
        }
    }

    game.draw = function() {
        game.drawImage(paddle)
        game.drawImage(ball)
    }

}

__main()

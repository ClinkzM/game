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

var Paddle = function() {
    var image = imageFromPath('paddle.png')
    var o = {
        image: image,
        x: 100,
        y: 250,
        speed: 15,
    }
    o.move = function(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.image.width) {
            x = 400 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function() {
        var left = o.x - o.speed
        o.move(left)
    }
    o.moveRight = function() {
        var right = o.x + o.speed
        o.move(right)
    }
    o.collide = function(ball) {
        if (ball.y + ball.image.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                // log('相撞')
                return true
            }
        }
        return false
    }
    return o
}

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
    o.rebound = function() {
        o.speedY = -o.speedY
        // o.speedX = -o.speedX
    }

    // 直播 - 1 24:23, 待办：做一个判断，挡板不能超过 canvas 边界
    return o
}

var Block = function() {
    var image = imageFromPath('block.png')
    var o = {
        image: image,
        x: 100,
        y: 100,
        w: 40,
        h: 19,
        alive: true,
    }
    o.kill = function() {
        o.alive = false
    }
    o.collide = function(b) {
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }

    return o
}

var Guagame = function() {
    var g = {
        actions: {},
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
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(event) {
        g.keydowns[event.key] = false
    })

    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }

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
    var ball = Ball()

    var blocks = []
    for (var i = 0; i < 3; i++) {
        var b = Block()
        b.x = i * 100
        b.y = i * 50
        blocks.push(b)
    }

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
            ball.rebound()
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                block.kill()
                ball.rebound()
            }
        }
    }

    game.draw = function() {
        game.drawImage(paddle)
        game.drawImage(ball)
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
    }

}

__main()

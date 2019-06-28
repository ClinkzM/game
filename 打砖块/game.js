var loadLevel = function(game, n) {
    var len = n - 1
    var level = levels[len]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k == 'p') {
            window.paused = !window.paused
        } else if ('123456789'.includes(k)) {
            blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    e('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}
var blocks = []
var __main = function() {

    var images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }

    var fps = 30

    var game = GuaGame(fps, images, function() {
        var paddle = Paddle(game)
        var ball = Ball(game)

        var score = 0

        blocks = loadLevel(game, 1)

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
            if (window.paused) {
                return
            }
            // log('fps', window.fps)
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
                    score = score + 100
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
            // draw labels
            game.context.fillText('分数：' + score, 10, 280)
        }
    })

    enableDebugMode(game, true)



}

__main()

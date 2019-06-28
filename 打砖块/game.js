var __main = function() {
    var fps = 30
    var game = GuaGame(fps)

    var paddle = Paddle()
    var ball = Ball()

    var blocks = []
    for (var i = 0; i < 3; i++) {
        var b = Block()
        b.x = i * 100
        b.y = i * 50
        blocks.push(b)
    }

    var paused = false

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
    // game.registerAction('p', function() {
    //     paused = !paused
    // })
    window.addEventListener('keydown', function(event) {
        if (event.key == 'p') {
            paused = !paused
        }
    })

    game.update = function() {
        if (paused) {
            return
        }
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

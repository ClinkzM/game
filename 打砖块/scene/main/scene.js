class Scene extends GuaScene {
    constructor(game) {
        super(game)

        this.paddle = Paddle.new(game)
        this.ball = Ball.new(game)
        this.score = 0
        this.blocks = loadLevel(game, 1)
        this.enableDrag = false
        this.editable = false

        var self = this

        // events
        game.registerAction('a', function() {
            self.paddle.moveLeft()
        })
        game.registerAction('d', function() {
            self.paddle.moveRight()
        })
        game.registerAction('f', function() {
            self.ball.fire()
        })
        game.registerAction('e', function() {
        })
        game.registerAction('s', function() {
        })

        // mouse event
        // self.enableDrag = false
        bindEvent(game.canvas, 'mousedown', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            // 检查是否点中了 ball
            if (self.ball.hasPoint(x, y)) {
                // 设置拖拽状态
                self.enableDrag = true
            }
        })
        bindEvent(game.canvas, 'mousemove', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            if (self.enableDrag) {
                self.ball.x = x
                self.ball.y = y
            }
        })
        bindEvent(game.canvas, 'mouseup', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            self.enableDrag = false
        })
    }

    draw() {
        var game = this.game
        var paddle = this.paddle
        var ball = this.ball
        var blocks = this.blocks
        var score = this.score
        // draw 背景
        game.context.fillStyle = '#554'
        game.context.fillRect(0, 0, 400, 300)
        //
        game.drawImage(paddle)
        game.drawImage(ball)
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // draw labels
        game.context.fillStyle = 'white'
        game.context.fillText('分数：' + score, 10, 280)
        game.context.fillText('按 f 发球', 100, 280)
        game.context.fillText('按 a 或 d 左右移动挡板', 175, 280)
        game.context.fillText('按 p 暂停游戏', 300, 280)
        game.context.fillText('按数字选择关卡', 100, 295)
        // game.context.fillText('按 e 编辑砖块', 175, 295)
        // game.context.fillText('按 s 保存砖块', 300, 295)
    }

    update() {
        var game = this.game
        var paddle = this.paddle
        var ball = this.ball
        var blocks = this.blocks
        var score = this.score

        if (window.paused) {
            return
        }

        if (window.blocks) {
            this.blocks = window.blocks
        }

        ball.move()
        if (ball.y > paddle.y) {
            // 跳转到游戏结束的场景
            log('游戏结束跳转暂时注释掉了，之后记得注释回来在 scene.js 的 104 行')
            // var end = SceneEnd.new(game)
            // game.replaceScene(end)
        }
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
                this.score = score + 100
            }
        }
    }

    save() {
        log('blocks')
    }
}

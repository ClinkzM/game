class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game
        this.paddle = Paddle(this.game)
        this.ball = Ball(this.game)
        this.score = 0
        this.blocks = loadLevel(this.game, 1)
        this.enableDrag = false
        this.__init()
    }
    __init() {
        this.game.registerAction('a', function(){
            this.paddle.moveLeft()
        })
        this.game.registerAction('d', function(){
            this.paddle.moveRight()
        })
        this.game.registerAction('f', function(){
            this.ball.fire()
        })
    }
    draw() {
        this.drawBackground()

        this.drawPaddle()
        this.drawBall()

        this.drawBlocks()

        this.drawLabel()
    }

    drawBackground() {
        this.game.context.fillStyle = "#554"
        this.game.context.fillRect(0, 0, 400, 300)
    }

    drawPaddle() {
        this.game.drawImage(this.paddle)
    }

    drawBall() {
        this.game.drawImage(this.ball)
    }

    drawBlocks() {
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i]
            if (block.alive) {
                this.game.drawImage(block)
            }
        }
    }

    drawLabel() {
        this.game.context.fillStyle = "white"
        this.game.context.fillText('分数: ' + this.score, 10, 290)
    }
    update() {
        if (window.paused) {
            return
        }

        this.ball.move()
        // 判断游戏结束
        if (this.ball.y > this.paddle.y) {
            // 跳转到 游戏结束 的场景
            var end = SceneEnd.new(this.game)
            this.game.replaceScene(end)
        }
        // 判断相撞
        if (this.paddle.collide(this.ball)) {
            // 这里应该调用一个 this.ball.反弹() 来实现
            this.ball.反弹()
        }
        // 判断 this.ball 和 this.blocks 相撞
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i]
            if (block.collide(this.ball)) {
                // log('block 相撞')
                block.kill()
                this.ball.反弹()
                // 更新分数
                score += 100
            }
        }
    }

    mouseEvent() {
        // var this.game = this.this.game
        // var this.paddle = this.this.paddle
        // var this.ball = this.this.ball
        // var blocks = this.blocks


        this.game.canvas.addEventListener('mousedown', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, event)
            // 检查是否点中了 this.ball
            if (this.ball.hasPoint(x, y)) {
                // 设置拖拽状态
                this.enableDrag = true
            }
        })
        this.game.canvas.addEventListener('mousemove', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            // log(x, y, 'move')
            if (this.enableDrag) {
                log(x, y, 'drag')
                this.ball.x = x
                this.ball.y = y
            }
        })
        this.game.canvas.addEventListener('mouseup', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, 'up')
            this.enableDrag = false
        })
    }
}

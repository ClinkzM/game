class Scene extends GuaScene {
    constructor(game) {
        super(game)
        // var label = GuaLabel.new(game, 'Hello')
        // this.addElement(label)

        // bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        // 加入水管
        // this.pipe = Pipes.new(game)
        // this.addElement(this.pipe)
        // log('this.pipe', this.pipe)

        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 20; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 24
            g.y = 540
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 5

        // bird
        // this.setBird()

        // score initial
        // this.score = 0
        // this.scoreImage = GuaScore.new(this.game, this.score)
        // this.addElement(this.scoreImage)

        // 键盘控制小鸟
        this.setupInputs()

        // 游戏处于暂停时可以移动小鸟位置
        this.enableDrag = false
        this.debugBird()
    }
    debug() {
        // this.birdSpeed = config.bird_speed.value
    }
    update() {
        if (window.paused) {
            return
        }
        super.update()
        this.skipCount = this.skipCount - 1
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 5
            offset = 20
        }
        for (var i = 0; i < 20; i++) {
            var g = this.grounds[i]
            g.x = g.x + offset
        }

        // 不让鸟超过画布
        // this.birdMoveRange()

        // 更新分数图片
        // this.updateScore()

        // 穿过管子
        // this.getThroughPipes()

        // 判断鸟和管子相撞
        // this.collidePipe()
    }
    updateScore() {
        var newScoreImage = GuaScore.new(this.game, this.score)
        // log('素材数组里分数的位置', this.elements[23])
        var scoreIndex = 23
        this.elements.splice(scoreIndex, 1, newScoreImage)
    }
    getThroughPipes() {
        var pipes = this.pipe.pipes
        var pipeSpeed = this.pipe.pipeSpeed
        for (let i = 0; i < pipes.length; i++) {
            // 因为有上下两根管子，上下两根管子的 x 是一样的，取一个 x 就可以
            if (i % 2 == 0) {
                var birdX = this.bird.x
                var pipeX = pipes[i].x + pipes[i].w
                var pipePassBird = pipeX == birdX
                var birdPassPipe = birdX == pipeX
                if (((birdX - pipeX) >= 0) && ((birdX - pipeX) < pipeSpeed)) {
                    // log('通过了')
                    this.score = this.score + 1
                }
            } else {
                continue
            }
        }

    }
    collidePipe() {
        var self = this
        var c = self.pipe.collide(self.bird)
        if (c) {
            // log('撞到了管子')
            var endMessage = {
                score: this.score,
                pipe: this.pipe,
                bird: this.bird,
            }
            var end = SceneEnd.new(self.game, endMessage)
            self.game.replaceScene(end)
        }
    }
    setupInputs() {
        var self = this
        // var b = this.bird
        // 左右移动
        self.game.registerAction('a', function(keyStatus) {
            // b.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            // b.move(self.birdSpeed, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus) {
            // b.jump()
        })
    }
    setBird() {
        var self = this
        this.birdSpeed = 2
        var b = GuaAnimation.new(self.game)
        b.x = 180
        b.y = 200
        self.bird = b
        self.addElement(b)
    }
    birdMoveRange() {
        if (this.bird.x < 0) {
            this.bird.x = 0
        } else if ((this.bird.x + this.bird.w) > 400) {
            this.bird.x = 400 - this.bird.w
        }
    }
    debugBird() {
        var self = this
        var game = this.game
        bindEvent(game.canvas, 'mousedown', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            // 检查是否点中了 bird 并且游戏处于暂停状态
            if (self.bird.hasPoint(x, y) && window.paused) {
                // 设置拖拽状态
                self.enableDrag = true
            }
        })
        bindEvent(game.canvas, 'mousemove', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            if (self.enableDrag) {
                self.bird.x = x
                self.bird.y = y
                self.bird.vy = 0
                self.bird.gy = 10
                self.bird.rotation = 0
            }
        })
        bindEvent(game.canvas, 'mouseup', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            self.enableDrag = false
            window.paused = false
        })
    }
}

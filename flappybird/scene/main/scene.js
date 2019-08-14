class Scene extends GuaScene {
    constructor(game) {
        super(game)
        // var label = GuaLabel.new(game, 'Hello')
        // this.addElement(label)

        // bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
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
        this.setBird()

        // score initial
        var scoreImage = GuaScore.new(game, 0)
        this.addElement(scoreImage)

        this.setupInputs()

        this.enableDrag = false
        this.debugBird()
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
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

        // 更新分数
        // log('this.pipe', this.pipe)
    }
    setupInputs() {
        var self = this
        var b = this.bird
        self.game.registerAction('a', function(keyStatus) {
            b.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            b.move(self.birdSpeed, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus) {
            b.jump()
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
        })
    }
}

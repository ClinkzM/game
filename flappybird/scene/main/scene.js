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
        self.birdSpeed = 2
        var birdAnimation = {
            prefix: 'b',
            length: 3,
        }
        var b = GuaAnimation.new(self.game, birdAnimation)
        b.x = 180
        b.y = 200
        self.bird = b
        self.addElement(b)
    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

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

        this.setupInputs()
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    update() {
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
        // 起始的时候小鸟的角度应该是不变的
        this.bird.rotation = 0
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
            var main = Scene.new(self.game)
            self.game.replaceScene(main)
        })
    }
    setBird() {
        var self = this
        self.birdSpeed = 2
        var b = GuaAnimation.new(self.game)
        b.x = 180
        b.y = 200
        // 起始的时候小鸟是没有重力和角度的
        b.gy = 0
        b.rotation = 0
        self.bird = b
        self.addElement(b)
    }
}

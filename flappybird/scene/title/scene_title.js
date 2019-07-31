class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // var label = GuaLabel.new(game, 'Hello')
        // this.addElement(label)

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

        // player
        var r = GuaAnimation.new(game)
        r.x = 100
        r.y = 400
        this.r = r
        this.addElement(r)

        this.setupInputs()
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
    }
    setupInputs() {
        var self = this
        self.game.registerAction('a', function(keyStatus) {
            self.r.move(-2, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            self.r.move(2, keyStatus)
        })
    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, 'Hello')
        this.addElement(label)

        var r = GuaAnimation.new(game)
        r.x = 100
        r.y = 50
        this.r = r
        this.addElement(r)

        this.setupInputs()
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

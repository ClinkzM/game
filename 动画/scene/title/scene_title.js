class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, 'hello')
        this.addElement(label)

        var r = GuaAnimation.new(game)
        r.x = 100
        r.y = 200
        this.addElement(r)
    }
}

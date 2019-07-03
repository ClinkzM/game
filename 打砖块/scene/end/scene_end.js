class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        this.init(game)
    }
    init(game) {
        game.registerAction('r', function() {
            var title = SceneTitle.new(game)
            game.replaceScene(title)
        })
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    draw() {
        // draw labels
        this.game.context.fillStyle = 'red'
        this.game.context.fillText('按 r 开始游戏', 100, 200)
    }

}

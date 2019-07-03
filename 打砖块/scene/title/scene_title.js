class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function() {
            var main = Scene.new(game)
            game.replaceScene(main)
        })
    }

    draw() {
        // draw labels
        this.game.context.fillStyle = 'black'
        this.game.context.fillText('按 k 开始游戏', 100, 100)
    }

}

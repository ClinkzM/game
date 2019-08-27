class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.init(game)

    }
    init(game) {
        game.registerAction('k', function() {
            var main = Scene.new(game)
            game.replaceScene(main)
        })
        var text = {
            text: '按 k 开始游戏',
            color: 'black',
            font: '48px serif',
            x: 20,
            y: 200,
        }
        var label = GuaLabel.new(game, text)
        this.addElement(label)
    }
    // draw() {
    //     super.draw()
    // }
}

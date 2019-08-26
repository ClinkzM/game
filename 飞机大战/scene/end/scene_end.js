class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        this.init(game)
    }
    init(game) {
        game.registerAction('r', function() {
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
        var text = {
            text: '游戏结束, 按 r 返回标题界面',
            color: 'red',
            font: '24px serif'
        }
        var label = GuaLabel.new(game, text)
        this.addElement(label)
    }
    // draw() {
    //     // draw labels
    //     super.draw()
    // }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function() {
            var main = Scene.new(game)
            game.replaceScene(main)
        })
    }

    draw() {
        var game = this.game
        // draw labels
        game.context.fillStyle = 'black'
        game.context.fillText('按 k 开始游戏', 100, 100)
        // game.context.fillText('按数字选择关卡', 200, 100)
        // game.context.fillText('按 e 编辑砖块', 100, 200)
        // game.context.fillText('按 s 保存砖块', 200, 200)
    }

}

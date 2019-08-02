class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function() {
            var main = Scene.new(game)
            game.replaceScene(main)
        })
        game.registerAction('e', function() {
            var editor = SceneEditor.new(game)
            game.replaceScene(editor)
        })
    }

    draw() {
        var game = this.game
        // draw labels
        game.context.fillStyle = 'black'
        game.context.fillText('按 k 开始游戏', 100, 100)
        game.context.fillText('按 e 编辑砖块，如果不编辑则载入默认关卡数据', 100, 150)
        // game.context.fillText('点击屏幕设置砖块', 100, 250)
        // game.context.fillText('按 s 保存并设置下一关，', 300, 250)
    }

}

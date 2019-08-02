class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function() {
            var main = Scene.new(game)
            game.replaceScene(main)
        })
        game.registerAction('s', function() {
            log('保存')
        })

        bindEvent(game.canvas, 'mousedown', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            log('可以编辑', x, y)
        })
    }

    draw() {
        var game = this.game
        // draw 背景
        game.context.fillStyle = '#554'
        game.context.fillRect(0, 0, 400, 300)
        // draw labels
        game.context.fillStyle = 'white'
        game.context.fillText('按 k 开始游戏', 0, 280)
        game.context.fillText('点击屏幕设置砖块', 100, 280)
        game.context.fillText('按 s 保存并设置下一关，', 200, 280)
    }

}

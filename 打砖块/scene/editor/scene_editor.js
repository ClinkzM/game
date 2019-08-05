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
            log('可以编辑', x, y, event)

        })
        this.blocks = []
        this.baseX = 35
        this.baseY = 19
        this.l = []
        for (var i = 0; i < 10; i++) {

        }
        log('this.levels', this.levels)

        var level = [
            [0, 0],
            [35, 0],
            [70, 0],
            [105, 0],
            [140, 0],
            [175, 0],
            [210, 0],
            [245, 0],
            [280, 0],
            [315, 0],
            [350, 0],
            [0, 19],
            [35, 19],
            [70, 19],
            [105, 19],
            [140, 19],
            [175, 19],
            [210, 19],
            [245, 19],
            [280, 19],
            [315, 19],
            [350, 19],
            [0, 38],
            [35, 38],
            [70, 38],
            [105, 38],
            [140, 38],
            [175, 38],
            [210, 38],
            [245, 38],
            [280, 38],
            [315, 38],
            [350, 38],
        ]
        for (var i = 0; i < level.length; i++) {
            var p = level[i]
            var b = Block.new(game, p)
            this.blocks.push(b)
        }


        // 40 x 19
        // 400 x 300
        // 369 x 209

        // log(this.blocks)
    }

    draw() {
        var s = this
        var game = this.game
        var context = this.game.context
        // draw 背景
        context.fillStyle = '#554'
        context.fillRect(0, 0, 400, 300)
        // draw labels
        context.fillStyle = 'white'
        context.fillText('按 k 开始游戏', 20, 280)
        context.fillText('点击屏幕设置砖块', 100, 280)
        context.fillText('按 s 保存并设置下一关，', 200, 280)

        // draw path
        // context.beginPath()
        // context.moveTo(s.borderLeft, s.borderTop)
        // context.lineTo(s.borderLeft, s.borderBottom)
        // context.lineTo(s.borderRight, s.borderBottom)
        // context.lineTo(s.borderRight, s.borderTop)
        // context.closePath()
        // context.stroke()

        var blocks = this.blocks
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            game.drawImage(block)
        }
    }
    update() {
        // log('1223')

    }

}

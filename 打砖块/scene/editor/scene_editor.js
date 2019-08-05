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
        bindEvent(game.canvas, 'click', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            log('可以编辑', x, y, event)
        })



        // 40 x 19
        // 400 x 300
        // 369 x 209

        // 画出所有砖块
        this.baseX = 35
        this.baseY = 19
        this.allBlocks = []
        this.columns = 11
        this.rows = 10
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                // var p = []
                // p[0] = j * this.baseX
                // p[1] = i * this.baseY
                var p = {}
                p['x'] = j * this.baseX
                p['y'] = i * this.baseY
                this.allBlocks.push(p)
            }
        }
        log('this.allBlocks', this.allBlocks)

        this.blocks = []
        for (var i = 0; i < this.allBlocks.length; i++) {
            var p = this.allBlocks[i]
            var b = Block.new(game, p)
            this.blocks.push(b)
        }

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

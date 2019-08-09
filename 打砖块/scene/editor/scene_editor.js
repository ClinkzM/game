class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)
        // 画线的位置


        // 所有砖块的 x, y 位置
        this.baseX = 40
        this.baseY = 19
        this.positions = []
        this.columns = 10
        this.rows = 10
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                // var p = []
                // p[0] = j * this.baseX
                // p[1] = i * this.baseY
                var p = {}
                p['x'] = j * this.baseX
                p['y'] = i * this.baseY
                this.positions.push(p)
            }
        }

        this.blocks = []
        // 画出所有砖块 只是画出来看看。。
        // for (var i = 0; i < this.positions.length; i++) {
        //     var p = this.positions[i]
        //     var b = Block.new(game, p)
        //     this.blocks.push(b)
        // }
        var self = this
        bindEvent(self.game.canvas, 'click', function(event) {
            let x = event.offsetX
            let y = event.offsetY
            for (let i = 0; i < self.positions.length; i++) {
                let b = self.positions[i]
                if (locateBlock(b, self.baseX, self.baseY, x, y)) {
                    var p = {}
                    p['x'] = b['x']
                    p['y'] = b['y']
                    let block = Block.new(self.game, p)
                    self.blocks.push(block)
                }
            }
        })

        game.registerAction('k', function() {
            if (window.levels.length > 0) {
                window.localStorage['levels'] = JSON.stringify(window.levels)
                window.levels = []
            }

            var main = Scene.new(game)
            game.replaceScene(main)
        })

        game.registerAction('s', function() {
            // 做这个是为了过滤掉空的关卡，因为帧率的原因，你感觉按了一下键盘其实是按了好多下
            if (self.blocks.length > 0) {
                window.levels.push(self.blocks)
                self.blocks = []
                var newEditor = SceneEditor.new(game)
                game.replaceScene(newEditor)
            }
        })

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
        context.fillText('按 k 开始游戏', 20, 200)
        context.fillText('按 s 保存并设置下一关，', 20, 235)
        context.fillText('鼠标点击屏幕黑线以上设置砖块', 20, 270)

        // draw path
        context.beginPath()
        context.moveTo(0, 175)
        context.lineTo(400, 175)
        context.closePath()
        context.stroke()

        var blocks = this.blocks
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            game.drawImage(block)
        }
    }
    update() {
    }
}

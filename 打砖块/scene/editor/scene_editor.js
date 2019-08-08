var locateBlock = function(block, width, height, x, y) {
    var o = block
    var xIn = x > o.x && x <= o.x + width
    var yIn = y > o.y && y <= o.y + height
    return xIn && yIn
}

class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)

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
        // log('this.positions', this.positions.length)

        this.blocks = []
        // 画出所有砖块
        // for (var i = 0; i < this.positions.length; i++) {
        //     var p = this.positions[i]
        //     var b = Block.new(game, p)
        //     this.blocks.push(b)
        // }
        var num = 1
        var self = this
        bindEvent(self.game.canvas, 'click', function(event) {
            let x = event.offsetX
            let y = event.offsetY
            log('click', num++)
            for (let i = 0; i < self.positions.length; i++) {
                let b = self.positions[i]
                if (locateBlock(b, self.baseX, self.baseY, x, y)) {
                    // log('点到某格空白', b['x'], b['y'])
                    var p = {}
                    p['x'] = b['x']
                    p['y'] = b['y']
                    let block = Block.new(self.game, p)
                    self.blocks.push(block)
                }
            }
            log('self.blocks mouse click', self.blocks.length)
        })
        // log('window.levels', window.levels)
        // bindEvent(self.game.canvas, 'keydown', function(evnet) {
        //     var k = event.key
        //     if (k == 's') {
        //         window.levels.push(self.blocks)
        //         var newEditor = SceneEditor.new(game)
        //         game.replaceScene(newEditor)
        //         log('key downs blocks', self.blocks)
        //     } else if (k === 'k') {
        //         if (window.levels.length > 0) {
        //             window.localStorage['levels'] = JSON.stringify(window.levels)
        //             window.levels = []
        //         }
        //         var main = Scene.new(game)
        //         game.replaceScene(main)
        //     }
        // })
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
    }
}

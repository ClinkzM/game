var locateBlock = function(block, width, height, x, y) {
    var o = block
    var xIn = x >= o.x && x <= o.x + width
    var yIn = y >= o.y && y <= o.y + height
    return xIn && yIn
}

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

        // 所有砖块的 x, y 位置
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
        // 画出所有砖块
        // for (var i = 0; i < this.allBlocks.length; i++) {
        //     var p = this.allBlocks[i]
        //     var b = Block.new(game, p)
        //     this.blocks.push(b)
        // }

        this.hasBlock = false
        var self = this
        bindEvent(self.game.canvas, 'click', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            // log('可以编辑', x, y, event)
            // log('self', self)
            for (var i = 0; i < self.allBlocks.length; i++) {
                var b = self.allBlocks[i]
                if (locateBlock(b, self.baseX, self.baseY, x, y)) {
                    log('点到某个空白', b['x'], b['y'])
                    var p = []
                    p['x'] = b['x']
                    p['y'] = b['y']
                    var block = Block.new(self.game, p)
                    self.blocks.push(block)
                    if (self.blocks.length == 0) {
                        log('length')
                        p['lifes'] = 1
                        var block = Block.new(self.game, p)
                        self.blocks.push(block)
                    }
                    for (var j = 0; j < self.blocks.length; j++) {
                        var existedBlock = self.blocks[j]
                        log('existedBlock', existedBlock)
                        if (existedBlock == undefined) {
                            log('else')
                            p['lifes'] = 1
                            var block = Block.new(self.game, p)
                            self.blocks.push(block)
                        } else if (existedBlock.hasPoint(x, y)){
                            log('jjjj点到某个砖', existedBlock['x'], existedBlock['y'])
                            // self.hasBlock = true
                            // self.blocks.splice(i, 1)
                            existedBlock['lifes'] = 1 + i
                            // var block = Block.new(self.game, p)
                            // self.blocks.push(block)
                        }
                    }
                    // var block = Block.new(self.game, p)
                    // self.blocks.push(block)
                }
            }
            // for (var i = 0; i < self.blocks.length; i++) {
            //     var b = self.blocks[i]
            //     if (b.hasPoint(x, y)) {
            //         log('点到某个砖', b['x'], b['y'])
            //         self.hasBlock = true
            //         // self.blocks.splice(i, 1)
            //     }
            // }
            log('this.blocks', self.blocks)
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

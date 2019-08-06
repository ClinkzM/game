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
        this.positions = []
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
                this.positions.push(p)
            }
        }
        log('this.positions', this.positions)

        this.blocks = []
        // 画出所有位置所有砖块
        // for (var i = 0; i < this.positions.length; i++) {
        //     var p = this.positions[i]
        //     var b = Block.new(game, p)
        //     this.blocks.push(b)
        // }
        this.hasBlock = false
        var self = this
        bindEvent(self.game.canvas, 'click', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            // for (var i = 0; i < self.positions.length; i++) {
            //     var b = self.positions[i]
            //     if (locateBlock(b, self.baseX, self.baseY, x, y)) {
            //         log('点到某个空白', b['x'], b['y'])
            //         self.hasBlock = false
            //     }
            // }
            // for (var i = 0; i < self.blocks.length; i++) {
            //     var b = self.blocks[i]
            //     if (b.hasPoint(x, y)) {
            //         log('点到某个砖', b['x'], b['y'])
            //         self.hasBlock = true
            //     }
            // }
            for (var i = 0; i < self.positions.length; i++) {
                var p = self.positions[i]
                if (locateBlock(p, self.baseX, self.baseY, x, y)) {
                    if (self.blocks.length == 0) {
                        log('blocks 为零', self.hasBlock)
                        self.hasBlock = false
                        var newPosition = {}
                        newPosition['x'] = p['x']
                        newPosition['y'] = p['y']
                        newPosition['lifes'] = 1
                        var newBlock = Block.new(game, newPosition)
                        self.blocks.push(newBlock)
                    }
                    for (var j = 0; j < self.blocks.length; i++) {
                        var b = self.blocks[i]
                        log('b', b)
                        if (b.hasPoint(x, y)) {
                            log('点到某个砖',self.hasBlock, b['x'], b['y'])
                            self.hasBlock = true
                            b['lifes'] = b['lifes'] + 1
                        } else {
                            log('点到的只是空白处', self.hasBlock)
                            self.hasBlock = false
                            var newPosition = {}
                            newPosition['x'] = p['x']
                            newPosition['y'] = p['y']
                            newPosition['lifes'] = 1
                            var newBlock = Block.new(game, newPosition)
                            self.blocks.push(newBlock)
                        }
                    }
                }
            }

            log('this.hasBlock', self.hasBlock)
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
            if (s.hasBlock == false) {
                game.drawImage(block)
            }

        }
    }
    update() {
    }
}

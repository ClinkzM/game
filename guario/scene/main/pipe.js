class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 250
        this.管子横向间距 = 200
        this.columnsOfPipe = 3
        this.pipeSpeed = 5
        this.canvasW = this.game.canvas.width
        this.outlineX = -100
        for (var i = 0; i < this.columnsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.管子横向间距
            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)

        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-300, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    debug() {
        this.管子横向间距 = config.管子横向间距.value
        this.pipeSpace = config.pipe_space.value
        this.outlineX = config.outline_x.value
    }
    update() {
        var length = this.pipes.length / 2
        // var length = this.pipes.length - 1
        // var length = this.pipes.length
        for (var i = 0; i < length; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i + 1]
            // log('i', i)
            p1.x = p1.x - this.pipeSpeed
            p2.x = p2.x - this.pipeSpeed
            var 管子横向间距最小值 = (this.canvasW - this.outlineX ) / this.columnsOfPipe
            if (this.管子横向间距 < 管子横向间距最小值) {
                this.管子横向间距 = 管子横向间距最小值
            }
            if (p1.x < this.outlineX) {
                p1.x = p1.x + this.管子横向间距 * this.columnsOfPipe
                // log('p1.x', p1.x)
                // -100 + 85*3 = 155 < 400
                // -100 + this.管子横向间距 * this.columnsOfPipe = p1.x > 400
                // 100 + p1.x = this.管子横向间距 * this.columnsOfPipe
            }
            if (p2.x < this.outlineX) {
                p2.x = p2.x + this.管子横向间距 * this.columnsOfPipe
                this.resetPipesPosition(p1, p2)
            }

        }
    }
    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()

            var w2 = p.w / 2
            var h2 = p.h / 2

            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0)

            context.restore()
        }
    }
    collide(b) {
        var self = this
        var pipes = self.pipes
        for (let i = 0; i < pipes.length; i++) {
            let p = pipes[i]
            let c = (rectIntersects(p, b) || rectIntersects(b, p))
            if (c) {
                // log('鸟撞到了管子')
                return c
            }
        }
    }
}

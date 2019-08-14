class GuaScore {
    constructor(game, score) {
        this.game = game
        this.score = String(score)
        this.scoreImages = []
        // log('this.score', this.score, typeof this.score)
        for (var i = 0; i < 10; i++) {
            var name = `s${i}`
            var s = game.textureByName(name)
            this.scoreImages.push(s)
        }
        this.texture = this.scoreImages[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.canvasW = this.game.canvas.width
        this.canvasH = this.game.canvas.height
        this.space = 10
    }
    static new(game, score) {
        return new this(game, score)
    }
    draw() {
        var self = this
        // log('self.score', self.score)
        var context = this.game.context
        for (var i = 0; i < self.score.length; i++) {
            var s = self.score[i]
            var n = Number(s)
            var t = this.scoreImages[n]
            var len = self.score.length
            var x = self.positionX(i, len)
            // log('x', x)
            var y = 100
            context.drawImage(t, x, y)
        }
    }
    update() {

    }
    // 计算分数每一个字符的 X 位置
    positionX(index, length){
        var result = ((this.canvasW + this.space) / 2 - ((this.w + this.space) / 2) * length) + index * (this.w + this.space)
        return result
    }
}

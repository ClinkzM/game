class SceneEnd extends GuaScene {
    constructor(game, endMessage) {
        super(game)
        // bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        // 先画管子再画地面
        var pipe = endMessage.pipe
        var pipes = pipe.pipes
        this.pipe = pipe
        this.addElement(this.pipe)

        // 地面
        this.grounds = []
        for (var i = 0; i < 20; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 24
            g.y = 540
            this.addElement(g)
            this.grounds.push(g)
        }

        // 鸟最后的位置
        var bird = endMessage.bird
        this.bird = bird
        this.bird.move = function() {}
        this.bird.jump = function() {}
        this.addElement(this.bird)

        // 游戏结束
        var gameover = GuaImage.new(game, 'gameover')
        this.gameover = gameover
        this.gameover.x = 104
        this.gameover.y = 80
        this.addElement(this.gameover)

        // 最后分数
        var score = endMessage.score
        this.score = score
        log('score', score)
        this.scoreImage = GuaScore.new(this.game, this.score)
        this.scoreImage.y = 200
        this.addElement(this.scoreImage)

        // 历史分数
        var best = window.sessionStorage['best']
        if (best && Number(best) > Number(score)) {
            best = Number(best)
        } else {
            best = Number(score)
            window.sessionStorage['best'] = score
        }
        this.best = GuaScore.new(this.game, best)
        this.best.y = 300
        this.addElement(this.best)

        game.registerAction('r', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    static new(game, endMessage) {
        return new this(game, endMessage)
    }
    draw() {
        super.draw()
        // draw labels
        this.game.context.fillStyle = 'pink'
        this.game.context.font = "32px serif"
        this.game.context.textAlign = 'center'
        this.game.context.fillText('本次得分', 200, 185)
        this.game.context.fillText('历史得分', 200, 285)
        this.game.context.fillStyle = 'white'
        this.game.context.fillText('按 r 重新开始', 200, 400)
    }
    update() {

    }
}

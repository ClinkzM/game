class SceneEnd extends GuaScene {
    constructor(game, endMessage) {
        super(game)
        // bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        // 地面
        this.grounds = []
        for (var i = 0; i < 20; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 24
            g.y = 540
            this.addElement(g)
            this.grounds.push(g)
        }

        // 鸟扑街
        var bird = endMessage.bird
        bird.birdSpeed = 0
        this.bird = bird
        this.addElement(bird)

        // 扑街分数
        var score = endMessage.score
        this.score = score
        this.addElement(score)

        var pipe = endMessage.pipe
        this.pipe = pipe
        this.addElement(pipe)

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
        // this.game.context.fillText('游戏结束, 按 r 返回标题界面', 100, 290)
    }
}

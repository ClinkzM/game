class SceneEnd extends GuaScene {
    constructor(game, sucess) {
        super(game)
        this.init(game)
        this.sucess = false
    }
    init(game) {
        game.registerAction('r', function() {
            var title = SceneTitle.new(game)
            game.replaceScene(title)
        })
    }

    draw() {
        // if (this.sucess) {
        //     this.game.context.fillStyle = 'black'
        //     this.game.context.fillText('恭喜通关，按 r 开始游戏', 100, 200)
        // } else {
        //     this.game.context.fillStyle = 'red'
        //     this.game.context.fillText('游戏结束，按 r 开始游戏', 100, 200)
        // }
        this.game.context.fillStyle = 'red'
        this.game.context.fillText('游戏结束，按 r 开始游戏', 100, 200)
    }

}

class GuaParticle extends GuaImage {
    constructor() {
        super(game)
    }
}

class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        return new this(game)
    }
    setup() {
        this.x = 150
        this.y = 200
        this.numberOfParticles = 20
        this.particles = []
    }
    update() {
        // 添加小火花


        // 更新所有的小火花
        for(var p of this.particles) {
            p.update()
        }
    }
    draw() {
        for(var p of this.particles) {
            p.draw()
        }
    }
}


class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text) {
        return new this(game, text)
    }
    draw() {
        this.game.context.fillStyle = 'black'
        this.game.context.font = '48px serif'
        this.game.context.fillText(this.text, 100, 190)
    }
    update() {

    }
}


class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, 'hello')
        this.addElement(label)
    }
    // draw() {
    //     // draw labels
    //     // this.game.context.fillText('按 k 开始游戏', 100, 190)
    //     super.draw()
    // }
}

class GuaAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，在这里 hard code 一套动画
        this.animations = {
            idle: [],
            run: [],
        }
        for (var i = 0; i < 22; i++) {
            var name = `s${i}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        for (var i = 0; i < 12; i++) {
            var name = `run${i}`
            var t = game.textureByName(name)
            this.animations['run'].push(t)
        }

        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.frameIndex = 0
        this.frameCount = 3
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    frames() {
        return this.animations[this.animationName]
    }
    update() {
        this.frameCount = this.frameCount - 1
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }

    draw() {
        this.game.drawImage(this)
    }

    move(x, keyStatus) {
        this.x = this.x + x
        // log('move keyStatus', keyStatus)
        // if (keyStatus == 'down') {
        //     this.changeAnimation('run')
        // } else if (keyStatus == 'up') {
        //     this.changeAnimation('idle')
        // }
        var animationName = {
            down: 'run',
            up: 'idle',
        }
        var name = animationName[keyStatus]
        this.changeAnimation(name)
    }

    changeAnimation(name) {
        this.animationName = name
    }
}

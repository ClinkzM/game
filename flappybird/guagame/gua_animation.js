class GuaAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，在这里 hard code 一套动画
        this.animations = {
            idle: [],
        }
        for (var i = 1; i < 4; i++) {
            var name = `b${i}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }

        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3

        // 翻转
        this.flipX = false

        // 重力和加速度
        this.gy = 10
        this.vy = 0

    }
    static new(game) {
        var i = new this(game)
        return i
    }
    frames() {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -10
        // var top = 5
        // if (this.y < top && (this.y + this.vy) < top) {
        //     this.y = top
        // }
    }
    update() {
        // 更新受力
        this.y = this.y + this.vy
        this.vy = this.vy + this.gy * 0.2
        var h = 517
        if (this.y > h) {
            this.y = h
        }

        this.frameCount = this.frameCount - 1
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }

    draw() {
        var context = this.game.context
        context.save()

        var x = this.x + this.w / 2
        context.translate(x, 0)
        context.scale(-1, 1)
        context.translate(-x, 0)
        context.drawImage(this.texture, this.x, this.y)

        context.restore()
    }

    move(x, keyStatus) {
        this.flipX = (x < 0)
        this.x = this.x + x
        // log('move keyStatus', keyStatus)
        // if (keyStatus == 'down') {
        //     this.changeAnimation('run')
        // } else if (keyStatus == 'up') {
        //     this.changeAnimation('idle')
        // }
        // var animationName = {
        //     down: 'run',
        //     up: 'idle',
        // }
        // var name = animationName[keyStatus]
        // this.changeAnimation(name)
    }

    changeAnimation(name) {
        this.animationName = name
    }
}
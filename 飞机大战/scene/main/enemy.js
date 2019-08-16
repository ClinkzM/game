class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 2)
        var name = `enemy${type}`
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
        this.cooldown = randomBetween(6, 10) - this.speed
        this.w = this.texture.width
        this.h = this.texture.height
    }
    update() {
        this.y = this.y + this.speed
        if (this.y > 600) {
            this.setup()
        }
        // log('this.heigh', this.h)
        if (this.y + this.h > 0) {

            this.fire()
        }
        if (this.cooldown > 0) {
            this.cooldown = this.cooldown - 1
        } else {
            this.cooldown = randomBetween(6, 10) - this.speed
        }
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y + this.h
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            b.update = this.bulletDirection
            this.scene.addElement(b)
        }
    }
    bulletDirection() {
        this.y = this.y + this.speed
    }
}

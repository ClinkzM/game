class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 2)
        var name = `enemy${type}`
        super(game, name)
        this.setup()
    }
    setup() {
        this.name = 'enemy'
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
        this.cooldown = randomBetween(6, 10) - this.speed
        this.w = this.texture.width
        this.h = this.texture.height
        this.bullets = []
        this.gone = false
    }
    update() {
        this.y = this.y + this.speed
        if (this.y > 600) {
            this.setup()
        }
        if (this.y + this.h > 0) {
            this.fire()
        }
        if (this.cooldown > 0) {
            this.cooldown = this.cooldown - 1
        } else {
            this.cooldown = randomBetween(6, 10) - this.speed
        }
    }
    draw() {
        if (this.gone) {
            return
        }
        super.draw()
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.enemy_fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y + this.h
            var b = EnemyBullet.new(this.game, this.speed)
            b.x = x
            b.y = y
            this.bullets.push(b)
            this.scene.addElement(b)
        }
    }
    die() {
        this.gone = true
    }
}

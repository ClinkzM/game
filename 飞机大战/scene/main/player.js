class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = 10
        this.cooldown = 0
        this.gone = false
        this.bullets = []
    }
    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown = this.cooldown - 1
        }
    }
    draw() {
        if (this.gone) {
            return
        }
        super.draw()
    }
    die() {
        this.gone = true
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.player_fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = PlayerBullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
            this.bullets.push(b)
        }
        // log('this.bullets', this.bullets)
    }

    moveLeft() {
        this.x = this.x - this.speed
    }
    moveRight() {
        this.x = this.x + this.speed
    }
    moveUp() {
        this.y = this.y - this.speed
    }
    moveDown() {
        this.y = this.y + this.speed
    }

}

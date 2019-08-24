class PlayerBullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.speed = config.bullet_speed
        // this.speed = 1
    }
    update() {
        // this.speed = config.bullet_speed
        this.y = this.y - this.speed
    }
}

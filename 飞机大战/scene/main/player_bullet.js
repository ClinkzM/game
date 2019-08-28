class PlayerBullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.name = 'playerBullet'
        this.speed = config.bullet_speed
        // this.gone = false
        // this.speed = 1
    }
    update() {
        // this.speed = config.bullet_speed
        this.y = this.y - this.speed
    }
    // die() {
    //     this.gone = true
    // }
    // draw() {
    //     if (this.gone) {
    //         return
    //     }
    //     super.draw()
    // }
}

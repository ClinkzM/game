class EnemyBullet extends GuaImage {
    constructor(game, positionY) {
        super(game, 'bullet')
        this.y = positionY
        this.setup()
    }
    static new(game, positionY) {
        var i = new this(game, positionY)
        return i
    }
    setup() {
        this.name = 'enemyBullet'
        // this.gone = false
        // this.speed = config.bullet_speed
        this.speed = 6
    }
    update() {
        this.y = this.y + this.speed
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

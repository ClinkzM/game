class EnemyBullet extends GuaImage {
    constructor(game, enemySpeed) {
        super(game, 'bullet')
        this.enemySpeed = enemySpeed
        this.setup()
    }
    setup() {
        this.name = 'enemyBullet'
        this.gone = false
        this.speed = config.bullet_speed
        // this.speed = 1
    }
    update() {
        // this.speed = config.bullet_speed
        this.y = this.y + this.speed + this.enemySpeed
    }
    die() {
        this.gone = true
    }
    draw() {
        if (this.gone) {
            return
        }
        super.draw()
    }
}

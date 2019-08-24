class EnemyBullet extends GuaImage {
    constructor(game, enemySpeed) {
        super(game, 'bullet')
        this.enemySpeed = enemySpeed
        this.setup()
    }
    setup() {
        this.speed = config.bullet_speed
        // this.speed = 1
    }
    update() {
        // this.speed = config.bullet_speed
        this.y = this.y + this.speed + this.enemySpeed
    }
}

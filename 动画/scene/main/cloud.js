class Cloud extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 2)
        var name = `cloud${type}`
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = 1
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 600)
    }
    update() {
        this.speed = config.cloud_speed
        this.y = this.y + this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
    debug() {
        // this.speed = config.cloud_speed
    }
}

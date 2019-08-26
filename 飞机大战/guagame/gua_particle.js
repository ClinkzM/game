class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.life = 60
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life = this.life - 1
        this.x = this.x + this.vx
        this.y = this.y + this.vy
        var factor = 0.05
        this.vx = this.vx + factor * this.vx
        this.vy = this.vy + factor * this.vy
    }
}

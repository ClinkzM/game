class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text.text
        this.color = text.color
        this.font = text.font
    }
    static new(game, text) {
        return new this(game, text)
    }
    draw() {
        this.game.context.fillStyle = this.color
        this.game.context.font = this.font
        this.game.context.fillText(this.text, 20, 200)
    }
    update() {

    }
}

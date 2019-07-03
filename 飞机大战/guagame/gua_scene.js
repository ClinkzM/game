class GuaScene {
    constructor(game) {
        this.game = game
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    draw() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            this.game.drawImage(e)
        }
    }
    update() {

    }
}

var loadLevel = function(game, n) {
    var len = n - 1
    var level = levels[len]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k == 'p') {
            window.paused = !window.paused
        } else if ('123456789'.includes(k)) {
            blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    e('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}
var blocks = []
var __main = function() {

    var images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
    }

    var fps = 30

    var game = GuaGame(fps, images, function(g) {
        var s = new SceneTitle(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)

}

__main()

var loadLevel = function(game, n) {
    var len = n - 1
    var levels = defaultLevels
    log('levels', levels, len)
    var s = window.localStorage['levels']
    if (s && JSON.parse(s).length > 0) {
        levels = JSON.parse(s)
        log('localStorage levels', levels)
    }
    var level = levels[len]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block.new(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false

    bindEvent(window, 'keydown', function(evnet) {
        var k = event.key
        if (k == 'p') {
            window.paused = !window.paused
        } else if ('123456789'.includes(k)) {
            window.blocks = loadLevel(game, Number(k))
            log('window.blocks~', window.blocks)
        }
    })
    // 控制速度
    var speed = e('#id-input-speed')
    bindEvent(speed, 'input', function(event) {
        var input = event.target
        window.fps = Number(input.value)
    })
}

var __main = function() {

    var images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
    }

    var fps = 30

    window.levels = []

    var game = GuaGame.instance(fps, images, function(g) {
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        // var s = SceneEditor.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)

}

__main()

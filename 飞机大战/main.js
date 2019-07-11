var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        bullet: 'img/bullet.png',
        cloud0: 'img/cloud0.png',
        cloud1: 'img/cloud1.png',
        cloud2: 'img/cloud2.png',
        player: 'img/player.png',
        bg: 'img/background.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
    }
    var game = GuaGame.instance(30, images, function(g){
        // var s = SceneTitle.new(g)
        var s = Scene.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)

    bindAll('.gua-auto-slider', 'input', function(event) {
        var target = event.target
        var bindVal = target.dataset.value
        var v = target.value
        eval(bindVal + '=' + v)
        var label = target.closest('label').querySelector('.gua-label')
        label.innerText = v
    })
}

__main()

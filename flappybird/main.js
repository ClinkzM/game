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


        // 跑步动画
        run0: 'img/run/run0.png',
        run1: 'img/run/run1.png',
        run2: 'img/run/run2.png',
        run3: 'img/run/run3.png',
        run4: 'img/run/run4.png',
        run5: 'img/run/run5.png',
        run6: 'img/run/run6.png',
        run7: 'img/run/run7.png',
        run8: 'img/run/run8.png',
        run9: 'img/run/run9.png',
        run10: 'img/run/run10.png',
        run11: 'img/run/run11.png',

        // 闲置动画（站立动画）
        s0: 'img/stand/stand0.png',
        s1: 'img/stand/stand1.png',
        s2: 'img/stand/stand2.png',
        s3: 'img/stand/stand3.png',
        s4: 'img/stand/stand4.png',
        s5: 'img/stand/stand5.png',
        s6: 'img/stand/stand6.png',
        s7: 'img/stand/stand7.png',
        s8: 'img/stand/stand8.png',
        s9: 'img/stand/stand9.png',
        s10: 'img/stand/stand10.png',
        s11: 'img/stand/stand11.png',
        s12: 'img/stand/stand12.png',
        s13: 'img/stand/stand13.png',
        s14: 'img/stand/stand14.png',
        s15: 'img/stand/stand15.png',
        s16: 'img/stand/stand16.png',
        s17: 'img/stand/stand17.png',
        s18: 'img/stand/stand18.png',
        s19: 'img/stand/stand19.png',
        s20: 'img/stand/stand20.png',
        s21: 'img/stand/stand21.png',

        // flappy bird images
        bg: 'img/bird/bg.png',
        ground: 'img/bird/ground.png',
        b1: 'img/bird/b1.png',
        b2: 'img/bird/b2.png',
        b3: 'img/bird/b3.png',
    }
    var game = GuaGame.instance(30, images, function(g){
        var s = SceneTitle.new(g)
        // var s = Scene.new(g)
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

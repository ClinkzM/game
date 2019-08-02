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

var templateControl = function(key, item) {
    var t = `
        <div class="">
            <label>
                <input class="gua-auto-slider" type="range" value="${item.value}"
                max="300"
                data-value="config.${key}"
                >
                ${item._comment}：
                <span class="gua-label"></span>
            </label>
        </div>
    `
    return t
}

var insertControls = function() {
    var div = e('.gua-controls')
    var keys = Object.keys(config)
    for (var k of keys) {
        var item = config[k]
        var html = templateControl(k, item)
        div.insertAdjacentHTML('beforeend', html)
    }
}

var bindEvents = function() {
    bindAll('.gua-auto-slider', 'input', function(event) {
        var target = event.target
        var bindVal = target.dataset.value
        var v = target.value
        eval(bindVal + '.value=' + v)
        var label = target.closest('label').querySelector('.gua-label')
        label.innerText = v
    })
}

var __main = function() {
    var images = {
        // flappy bird images
        bg: 'img/bird/bg.png',
        pipe: 'img/bird/pipe.png',
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

    // 从配置文件生成 HTML 控件
    insertControls()
    // 绑定事件
    bindEvents()
}

__main()

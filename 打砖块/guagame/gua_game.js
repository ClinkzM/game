class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback

        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = e('#id-canvas')
        this.context = this.canvas.getContext('2d')
        this.init()

        var self = this
        bindEvent(window, 'keydown', function(event) {
            self.keydowns[event.key] = true
        })
        bindEvent(window, 'keyup', function(event) {
            self.keydowns[event.key] = false
        })
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawImage(img) {
        this.context.drawImage(img.texture, img.x, img.y)
    }
    // update
    update() {
        this.scene.update()
    }
    // draw
    draw() {
        this.scene.draw()
    }
    registerAction(key, callback) {
        var g = this
        g.actions[key] = callback
    }
    // draw
    runloop() {
        var g = this
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()
        // next runloop
        setTimeout(function() {
            g.runloop()
        }, 1000/window.fps)
    }
    init() {
        var g = this
        // 土办法
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                // 存入 g.images 中
                g.images[name] = img
                // 所有图片都载入之后，调用 g.run
                loads.push(1)
                // log('g.images', g.images)
                // log('123123', loads, names)
                if (loads.length == names.length) {
                    g.__start()
                }
            }
        }
    }

    imageByName(name) {
        var g = this
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    textureByName(name) {
        var g = this
        // log('image by name', g.images)
        var img = g.images[name]
        return img
    }

    runWithScene(scene) {
        var g = this
        g.scene = scene
        // 开始运行程序
        setTimeout(function() {
            g.runloop()
        }, 1000/window.fps)
    }

    replaceScene(scene) {
        this.scene = scene
    }

    __start() {
        this.runCallback(this)
    }
}

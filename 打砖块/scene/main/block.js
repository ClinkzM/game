class Block extends GuaImage{
    constructor(game, position) {
        super(game, 'block')
        var p = position
        // this.x = p[0]
        // this.y = p[1]
        // this.alive = true
        // this.lifes = p[2] || 1
        this.x = p['x']
        this.y = p['y']
        this.alive = true
        this.lifes = p['lifes'] || 1
    }

    kill() {
        var o = this
        log('球和砖块相撞')
        o.lifes = o.lifes - 1
        if (o.lifes < 1) {
            o.alive = false
        }
    }
    collide(b) {
        var o = this
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }
    // 用来判断点的位置在不在这个 block 里面
    hasPoint(x, y) {
        var o = this
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
}


// var Block = function(game, position) {
//     // position 是 [0, 0] 格式
//     var p = position
//     var o = game.imageByName('block')
//     // var image = imageByName('block')
//     // var o = {
//     //     image: image,
//     //     x: p[0],
//     //     y: p[1],
//     //     w: 40,
//     //     h: 19,
//     //     alive: true,
//     //     lifes: p[2] || 1
//     // }
//     o.x = p[0]
//     o.y = p[1]
//     o.alive = true
//     o.lifes = p[2] || 1
//     o.kill = function() {
//         log('球和砖块相撞')
//         o.lifes = o.lifes - 1
//         if (o.lifes < 1) {
//             o.alive = false
//         }
//     }
//     o.collide = function(b) {
//         return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
//     }
//
//     return o
// }

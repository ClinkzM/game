class Ball extends GuaImage{
    constructor(game) {
        super(game, 'ball')
        this.x = 100
        this.y = 200
        this.speedX = 10
        this.speedY = 10
        this.fired = false
    }
    move() {
        var o = this
        if (o.fired) {
            // log('ball move')
            // 01:07:16
            if (o.x < 0 || o.x > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY
            }
            // move
            o.x = o.x + o.speedX
            o.y = o.y + o.speedY

        }
    }
    fire() {
        this.fired = true
    }
    rebound() {
        this.speedY = -this.speedY
        // this.speedX = -this.speedX
    }
    hasPoint(x, y) {
        var o = this
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
}



// var Ball = function(game) {
//     var o = game.imageByName('ball')
//     o.x = 100
//     o.y = 200
//     o.speedX = 10
//     o.speedY = 10
//     o.fired = false
//     // var image = imageByName('ball')
//     // var o = {
//     //     image: image,
//     //     x: 100,
//     //     y: 200,
//     //     // 01:06:28
//     //     speedX: 10,
//     //     speedY: 10,
//     //     fired: false,
//     // }
//
//     o.move = function() {
//         if (o.fired) {
//             // log('ball move')
//             // 01:07:16
//             if (o.x < 0 || o.x > 400) {
//                 o.speedX = -o.speedX
//             }
//             if (o.y < 0 || o.y > 300) {
//                 o.speedY = -o.speedY
//             }
//             // move
//             o.x = o.x + o.speedX
//             o.y = o.y + o.speedY
//
//         }
//     }
//
//     o.fire = function() {
//         o.fired = true
//     }
//     o.rebound = function() {
//         o.speedY = -o.speedY
//         // o.speedX = -o.speedX
//     }
//     o.hasPoint = function(x, y) {
//         var xIn = x >= o.x && x <= o.x + o.w
//         var yIn = y >= o.y && y <= o.y + o.h
//         return xIn && yIn
//     }
//     return o
// }

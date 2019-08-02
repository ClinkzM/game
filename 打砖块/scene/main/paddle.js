class Paddle extends GuaImage {
    constructor(game) {
        super(game, 'paddle')
        this.x = 100
        this.y = 250
        this.speed = 15
    }
    move(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - this.texture.width) {
            x = 400 - this.texture.width
        }
        this.x = x
    }
    moveLeft() {
        var o = this
        var left = o.x - o.speed
        o.move(left)
    }
    moveRight() {
        var o = this
        var right = o.x + o.speed
        o.move(right)
    }
    collide(ball) {
        var a = this
        var b = ball
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
}


// var Paddle = function(game) {
//     var o = game.imageByName('paddle')
//     // var o = {
//     //     image: image,
//     //     x: 100,
//     //     y: 250,
//     //     speed: 15,
//     // }
//     o.x = 100
//     o.y = 250
//     o.speed = 15
//
//     o.move = function(x) {
//         if (x < 0) {
//             x = 0
//         }
//         if (x > 400 - o.image.width) {
//             x = 400 - o.image.width
//         }
//         o.x = x
//     }
//     o.moveLeft = function() {
//         var left = o.x - o.speed
//         o.move(left)
//     }
//     o.moveRight = function() {
//         var right = o.x + o.speed
//         o.move(right)
//     }
//     var aInb = function(x, x1, x2) {
//         return x >= x1 && x <= x2
//     }
//     o.collide = function(ball) {
//         // if (ball.y + ball.h > o.y) {
//         //     if (ball.x > o.x && ball.x < o.x + o.w) {
//         //         log('相撞')
//         //         return true
//         //     }
//         // }
//         // return false
//         var a = o
//         var b = ball
//         if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
//             if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
//                 return true
//             }
//         }
//         return false
//     }
//     return o
// }

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game
        this.numberOfEnemies = 5
        this.numberOfClouds = 5
        this.bg = GuaImage.new(game, 'bg')
        // this.cloud = Cloud.new(game)

        // this.player = GuaImage.new(game, 'player')
        // this.player.x = 100
        // this.player.y = 150

        this.player = Player.new(game)
        this.player.x = 100
        this.player.y = 450

        this.addElement(this.bg)
        this.addClouds()

        this.addElement(this.player)

        this.addEnemies()

        this.score = 0
    }


    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    addClouds() {
        var cs = []
        for (var i = 0; i < this.numberOfClouds; i++) {
            var e = Cloud.new(this.game)
            cs.push(e)
            this.addElement(e)
        }
        this.clouds = cs
    }

    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function() {
            s.player.moveLeft()
        })
        g.registerAction('d', function() {
            s.player.moveRight()
        })
        g.registerAction('w', function() {
            s.player.moveUp()
        })
        g.registerAction('s', function() {
            s.player.moveDown()
        })
        g.registerAction('j', function() {
            s.player.fire()
        })
        // g.registerAction('k', function() {
        //
        // })
        // g.registerAction('r', function() {
        //
        // })
    }

    update() {
        if (window.paused) {
            return
        }
        super.update()
        // this.playerDie()
        this.killEnemy()
        this.killBullets()
    }


    playerDie() {
        var player = this.player
        var es = this.enemies
        for (var i = 0; i < es.length; i++) {
            var e = es[i]
            var collideEnemy = collide(e, player)
            var bs = e.bullets
            for (var j = 0; j < bs.length; j++) {
                var b = bs[j]
                var collideEnemyBullets = collide(b, player)
                var particlesParams = {
                    x: player.x,
                    y: player.y,
                    number: 100,
                    duration: 50,
                }
                if (collideEnemy) {
                    // log('撞到敌机，敌机消失，敌机的子弹也消失', collideEnemy, e.x, e.y)
                    e.bullets = []
                    this.playerCrashed(e, particlesParams)
                } else if (collideEnemyBullets) {
                    // log('撞到子弹', collideEnemyBullets, b)
                    particlesParams.number = 50
                    this.playerCrashed(b, particlesParams)
                }
            }
        }
    }

    playerCrashed(element, particlesParams) {
        var player = this.player
        player.die()
        element.die()
        this.particles(particlesParams)
        this.endGame(particlesParams.duration)
    }


    particles(particlesParams) {
        var ps = GuaParticleSystem.new(this.game)
        var p = particlesParams
        ps.x = p.x
        ps.y = p.y
        ps.numberOfParticles = p.number
        ps.duration = p.duration
        this.addElement(ps)
    }

    endGame(delay) {
        var game = this.game
        var d = delay * 1000 * (1 / window.fps)
        setTimeout(() => {
            var end = SceneEnd.new(game)
            game.replaceScene(end)
        }, d)
    }


    // killEnemy() {
    //     var es = this.enemies
    //     var bs = this.player.bullets
    //     for (var i = 0; i < es.length; i++) {
    //         var e = es[i]
    //         for (var j = 0; j < bs.length; j++) {
    //             var b = bs[j]
    //             var hited = collide(e, b)
    //             if (hited) {
    //                 // log('子弹打到了敌机')
    //                 this.getScore()
    //                 var particlesParams = {
    //                     x: e.x,
    //                     y: e.y,
    //                     number: 100,
    //                     duration: 50,
    //                 }
    //                 this.particles(particlesParams)
    //                 e.die()
    //                 b.die()
    //                 // 修复分数一下加很多的问题
    //                 e.setup()
    //             }
    //         }
    //     }
    // }
    removeElement(element, elements) {
        if (element.y < 0 && element.y > 600) {
            elements.splice(k, 1)
        }
    }


    playerBulletsAttack(element) {
        var pbs = this.player.bullets
        for (var k = 0; k < pbs.length; k++) {
            var pb = pbs[k]
            var hited = collide(element, pb)
            if (hited) {
                // log('子弹打到了敌机')
                this.removeElement(pb, pbs)
                this.getScore()
                pb.die()
                pbs.splice(k, 1)
                element.die()
                log('element', element)
                var particlesParams = {
                    x: element.x,
                    y: element.y,
                    number: 100,
                    duration: 50,
                }
                this.particles(particlesParams)
                // 修复分数一下加很多的问题
                element.setup()
            }
        }
    }


    killEnemy() {
        var es = this.enemies
        for (var i = 0; i < es.length; i++) {
            var e = es[i]
            this.playerBulletsAttack(e)
        }
    }

    killBullets() {
        var es = this.enemies
        var pbs = this.player.bullets
        for (var i = 0; i < es.length; i++) {
            var e = es[i]
            var ebs = e.bullets
            for (var j = 0; j < ebs.length; j++) {
                var eb = ebs[j]
                this.playerBulletsAttack(eb)
            }
        }
    }

    getScore() {
        // log('得到分数')
        this.score = this.score + 100
    }

    draw() {
        super.draw()
        this.game.context.font = "24px serif";
        this.game.context.fillStyle = 'white'
        this.game.context.fillText(`当前得分： ${this.score}`, 10, 580)
    }
}

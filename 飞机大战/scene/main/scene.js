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
        var label = this.setScore()
        this.addElement(label)
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
        this.playerDie()
        this.killEnemy()
        // log('this.elemets', this.elements)
    }


    playerDie() {
        var player = this.player
        var es = this.enemies
        for (var i = 0; i < es.length; i++) {
            var e = es[i]
            var collideEnemy = collide(e, player)
            var bs = e.bullets
            // log('bullets before', bs.length)
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
                    this.playerCrashed(e, particlesParams)
                    // this.removeGoneElement(e)
                } else if (collideEnemyBullets) {
                    // log('撞到子弹', collideEnemyBullets, b)
                    this.playerCrashed(b, particlesParams)
                    // this.removeGoneElement(b)
                }
            }
            // log('bullets after', bs.length)
        }
    }

    playerCrashed(element, particlesParams) {
        if (element.name == 'enemy') {
            element.bullets = []
        } else if (element.name == 'enemyBullet') {
            particlesParams.number = 50
        }
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


    killEnemy() {
        var es = this.enemies
        var bs = this.player.bullets
        for (var i = 0; i < es.length; i++) {
            var e = es[i]
            for (var j = 0; j < bs.length; j++) {
                var b = bs[j]
                var hited = collide(e, b)
                if (hited) {
                    // log('子弹打到了敌机')
                    var particlesParams = {
                        x: e.x,
                        y: e.y,
                        number: 100,
                        duration: 50,
                    }
                    this.particles(particlesParams)
                    e.die()
                    e.bullets = []
                    var score = 10
                    this.getScore(score)
                }
            }
        }
    }

    setScore() {
        var text = {
            text: `当前得分：${this.score}`,
            color: 'white',
            font: '28px serif',
            x: 0,
            y: 580,
        }
        var scoreLabel = GuaLabel.new(this.game, text)
        return scoreLabel
    }

    getScore(score) {
        // log('得到分数')
        this.score = this.score + score
        var newScore = this.setScore()
        // log('this.elements', this.elements)
        // log('素材数组里分数的位置', this.elements[12], newScore)
        var scoreIndex = 12
        this.elements.splice(scoreIndex, 1, newScore)
    }
    //
    //
    // recycleElements(element) {
    //
    // }
    //
    //
    // removeGoneElement(elements) {
    //     var es = []
    //     for (var i = 0; i < elements.length; i++) {
    //         var e = elements[i]
    //         log(e.gone)
    //         if (!e.gone) {
    //             es.push(e)
    //         }
    //     }
    //     return es
    // }
}

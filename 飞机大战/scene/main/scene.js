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

        // 玩家死亡
        this.playerDie()

        // 去除超出画布的 玩家子弹 和 敌机子弹
        this.recyclePlayerBullet()
        this.recycleEnemyBullet()

        // 玩家成功攻击敌机和敌机子弹
        this.hitEnemy()
        this.hitEnemyBullet()
    }


    draw() {
        super.draw()
        this.game.context.font = "24px serif";
        this.game.context.fillStyle = 'white'
        this.game.context.fillText(`当前得分： ${this.score}`, 10, 580)
    }

    recyclePlayerBullet() {
        var bs = []
        var bullets = this.player.bullets
        for (var i = 0; i < bullets.length; i++) {
            var b = bullets[i]
            if ((b.y + b.h) < 0) {
                // log('player 子弹该回收了')
                this.recycleElement(b)
            } else {
                bs.push(b)
            }
        }
        this.player.bullets = bs
        // log('this.player.bullets', this.player.bullets)
    }

    recycleEnemyBullet() {
        var enemies = this.enemies
        for (var i = 0; i < enemies.length; i++) {
            var e = enemies[i]
            var bullets = e.bullets
            var bs = []
            for (var j = 0; j < bullets.length; j++) {
                var b = bullets[j]
                if (b.y > 600) {
                    // log('enemy 子弹该回收了')
                    this.recycleElement(b)
                } else {
                    bs.push(b)
                }
            }
            e.bullets = bs
        }
    }


    recycleElement(element) {
        var elements = []
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            var matched = (element.x == e.x) && (element.y == e.y)
            // if (matched) {
            //     log('this.elements', this.elements, i)
            // }
            if (!matched) {
                elements.push(e)
            }
        }
        this.elements = elements
        // log('this.elements', this.elements)
    }


    hitEnemy() {
        var enemies = this.enemies
        for (var i = 0; i < enemies.length; i++) {
            var e = enemies[i]
            this.playerAttack(e)
        }
    }

    hitEnemyBullet() {
        var enemies = this.enemies
        for (var i = 0; i < enemies.length; i++) {
            var e = enemies[i]
            var es = e.bullets
            for (var j = 0; j < es.length; j++) {
                var b = es[j]
                this.playerAttack(b)
            }
        }
    }


    playerAttack(element) {
        var bs = []
        var playerBullet = this.player.bullets
        for (var i = 0; i < playerBullet.length; i++) {
            var pb = playerBullet[i]
            var hited = collide(element, pb)
            var enemyHited = hited && (element.name == 'enemy')
            var enemyBulletHited = hited && (element.name == 'enemyBullet')
            var particlesParams = {
                x: element.x,
                y: element.y,
                number: 100,
                duration: 50,
            }
            if (enemyHited) {
                // log('打到了敌机')
                element.die()
                this.recycleElement(pb)
                this.particles(particlesParams)
                this.getScore()
            } else if (enemyBulletHited) {
                // log('打到了敌机子弹')
                this.enemyBulletHited(enemyBulletHited)
                this.recycleElement(element)
                this.recycleElement(pb)
                this.particles(particlesParams)
                this.getScore()
            } else if (!enemyHited && !enemyBulletHited) {
                bs.push(pb)
            }
        }
        this.player.bullets = bs
    }

    enemyBulletHited(isHit) {
        var enemies = this.enemies
        for (var i = 0; i < enemies.length; i++) {
            var e = enemies[i]
            var es = e.bullets
            var newES = []
            for (var j = 0; j < es.length; j++) {
                var b = es[j]
                if (!isHit) {
                    newES.push(b)
                }
            }
            e.bullets = newES
        }
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


    getScore() {
        // log('得到分数')
        this.score = this.score + 100
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
                    number: 200,
                    duration: 50,
                }
                if (collideEnemy) {
                    // log('撞到敌机，敌机消失，敌机的子弹也消失', collideEnemy, e.x, e.y)
                    e.die()
                    player.die()
                    this.particles(particlesParams)
                    this.endGame(particlesParams.duration)
                } else if (collideEnemyBullets) {
                    // log('撞到子弹', collideEnemyBullets, b)
                    this.enemyBulletHited(collideEnemyBullets)
                    this.recycleElement(b)
                    player.die()
                    this.particles(particlesParams)
                    this.endGame(particlesParams.duration)
                }
            }
        }
    }
}

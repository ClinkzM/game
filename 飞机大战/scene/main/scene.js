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

        // add particles
        // var ps = GuaParticleSystem.new(this.game)
        // this.addElement(ps)
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
    }

    update() {
        super.update()
        // this.removeBullets()
        this.playerDie()
    }
    playerDie() {
        // for e in self.enemies:
        //     for b in self.bullets:
        //     x, y = b.sprite.position
        //     # 如果碰撞到了，调用敌人的领盒饭方法
        //     if e.sprite.contains(x, y):
        //     # 这里只是改变了敌人是否去领盒饭的状态
        //     # 并没有删除去领盒饭的敌人
        //         e.lyhefj()
        //     # 碰撞检测完成后，删除去领盒饭的敌人
        //     # 调用函数，以免代码过长增加程序的复杂度
                // self.remove_gone_enemies()
        var player = this.player
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i]
            var collideEnemy = rectIntersects(e, player) || rectIntersects(player, e)
            for (var j = 0; j < e.bullets.length; j++) {
                var b = e.bullets[j]
                var collideEnemyBullets = rectIntersects(b, player) || rectIntersects(player, b)
                if (collideEnemy) {
                    log('撞到敌机', collideEnemy)
                } else if (collideEnemyBullets) {
                    log('撞到子弹', collideEnemyBullets)
                }
            }
            e.bullets = this.removeGoneElements(e.bullets)
        }
        this.enemies = this.removeGoneElements(this.enemies)
    }
    removeGoneElements(elements) {
        var es = []
        for (var i = 0; i < elements.length; i++) {
            var e = elements[i]
            if (!e.gone) {
                es.push(e)
            }
        }
        return es
    }
}

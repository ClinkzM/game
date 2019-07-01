var SceneTitle = function(game) {
    var s = {
        game: game,
    }

    game.registerAction('k', function() {
        var main = Scene(game)
        game.replaceScene(main)
    })

    s.draw = function() {
        // draw labels
        game.context.fillStyle = 'black'
        game.context.fillText('按 k 开始游戏', 100, 100)
    }
    s.update = function() {

    }

    return s
}

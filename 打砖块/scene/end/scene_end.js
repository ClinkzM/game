var SceneEnd = function(game) {
    var s = {
        game: game,
    }

    game.registerAction('r', function() {
        var title = SceneTitle.new(game)
        game.replaceScene(title)
    })

    s.draw = function() {
        // draw labels
        game.context.fillStyle = 'red'
        game.context.fillText('游戏结束，按 r 返回标题界面', 100, 280)
    }
    s.update = function() {

    }

    return s
}

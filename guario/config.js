var config = {
    bird_speed: {
        _comment: '小鸟的速度',
        value: 2,
        max: 60,
        min: 1,
    },
    pipe_space: {
        _comment: '2 根管子垂直方向的间距',
        value: 250,
        max: 300,
        min: 100,
    },
    '管子横向间距': {
        _comment: '管子横向间距（这个值与 outline_x 有关）',
        value: 200,
        max: 300,
        min: 150,
    },
    outline_x: {
        _comment: 'outline_x 最前面的管子超出画布后往左移多少才去画布最右边',
        value: -100,
        max: -50,
        min: -200,
    }
}

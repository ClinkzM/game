// var defaultLevels = [
//     // 第一关
//     [
//         [0, 0]
//     ],
//     // 第二关
//     [
//         // 第一个砖块
//         [0, 0],
//         // 第二个砖块
//         [100, 100]
//     ],
//     // 第三关
//     [
//         // 第一个砖块
//         [0, 0],
//         // 第二个砖块
//         [100, 100, 2],
//         // 第三个砖块
//         [200, 150, 3]
//     ]
// ]

var defaultLevels = [
    // 第一关
    [
        {
            x: 0,
            y: 0,
        }
    ],
    // 第二关
    [
        // 第一个砖块
        {
            x: 0,
            y: 0,
        },
        // 第二个砖块
        {
            x: 100,
            y: 100,
        }
    ],
    // 第三关
    [
        // 第一个砖块
        {
            x: 0,
            y: 0,
        },
        // 第二个砖块
        {
            x: 100,
            y: 100,
            lifes: 2,
        },
        // 第三个砖块
        {
            x: 200,
            y: 150,
            lifes: 3,
        },
    ]
]

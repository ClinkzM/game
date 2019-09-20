/*
8x8 像素的每个图块
2 bit 每个像素
16 bytes 一个图块

每页 8 x 8 个图块 就是 宽高 各 64 像素

*/
const e = sel => document.querySelector(sel)
const log = console.log.bind(console)


const ajax = request => {
    let r  = new XMLHttpRequest()
    r.open('GET', request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    r.send()
}

const drawBlock = (context, data, x, y, pixelWidth) => {
    // const colors = [
    //     'white',
    //     'gray',
    //     'blue',
    //     'black',
    // ]
    const colors = [
        'white',
        '#fe1000',
        '#ffb010',
        '#AA3030',
    ]
    let w = pixelWidth
    let h = pixelWidth
    let blockSize = 8
    for (let i = 0; i < blockSize; i++) {
        let p1 = data[i]
        let p2 = data[i + 8]
        for (let j = 0; j < blockSize; j++) {
            let c1 = (p1 >> (7 - j)) & 0b00000001
            let c2 = (p2 >> (7 - j)) & 0b00000001
            let pixel = (c2 << 1) + c1
            let color = colors[pixel]
            context.fillStyle = color
            let px = x + j * w
            let py = y + i * h
            context.fillRect(px, py, w, h)
        }
    }
}

const drawNes = bytes => {
    // 78 69
    // 0100 1110  0100 0101
    const canvas = e('#id-canvas')
    const context = canvas.getContext('2d')

    // 一个图块 8 像素
    const blockSize = 8
    const pixelSize = 8
    const pixelWidth = 10
    const numberOfBytesPerBlock = 16
    for (let i = 0; i < blockSize; i++) {
        for (let j = 0; j < blockSize; j++) {
            let x = j * pixelSize * pixelWidth
            let y = i * pixelSize * pixelWidth
            let index = window.offset + (i * 8 + j) * numberOfBytesPerBlock
            const data = bytes.slice(index)
            drawBlock(context, data, x, y, pixelWidth)
        }
    }
}
const actions = {
    change_offset(offset) {
        window.offset += offset
        e('h3').innerHTML = window.offset
        drawNes(window.bytes)
    },
}
const bindEvents = () => {
    e('.gua-controls').addEventListener('click', event => {
        let action = event.target.dataset.action
        let offset = Number(event.target.dataset.offset)
        actions[action] && actions[action](offset)
    })
}
const __main = () => {
    window.offset = 32784
    e('h3').innerHTML = window.offset
    let request = {
        url: 'mario.nes',
        callback(r) {
            let bytes = new Uint8Array(r)
            window.bytes = bytes
            log('bytes', bytes)
            drawNes(bytes)
        },
    }
    ajax(request)

    bindEvents()
}

__main()

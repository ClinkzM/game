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

const drawNes = bytes => {
    // 78 69
    // 0100 1110  0100 0101
    const canvas = e('#id-canvas')
    const context = canvas.getContext('2d')

    // 这是一个图块代表 8 个像素
    const blockSize = 8
    const pixelSize = 8
    const pixelWidth = 10
    const numberOfBytesPerBlock = 16
    for (let i = 0; i < blockSize; i++) {
        for (let j = 0; j < blockSize; j++) {
            // 算出 bytes

        }
    }

}

const __main = () => {
    let request = {
        url: 'mario.nes',
        callback(r) {
            let bytes = new Uint8Array(r)
            log('bytes', bytes)
        },
    }
    ajax(request)
}

__main()

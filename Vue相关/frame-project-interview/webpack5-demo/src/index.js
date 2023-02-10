// 引入 css
import './style/style1.css'
import './style/style2.less'

import _ from 'lodash'
console.log(_.each)

console.log('window.ENV', ENV)

const print = (info) => {
    console.log(info)
}
print('hello webpack 5')

import { sum } from './math'
const sumRes = sum(10, 20)
console.log('sumRes', sumRes)

// 引入图片
function insertImgElem(imgFile) {
    const img = new Image()
    img.src = imgFile
    document.body.appendChild(img)
}
import imgFile1 from './img/1.png'
insertImgElem(imgFile1)
import imgFile2 from './img/2.jpeg'
insertImgElem(imgFile2)


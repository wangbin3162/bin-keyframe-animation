let imgUrl = './demo/rabbit-big.png'
let positions = ['0 -854', '-174 -852', '-349 -852', '-524 -852', '-698 -851', '-873 -848']
let ele = document.getElementById('rabbit')

var animation = window.animation

var repeatAnimation = animation().loadImage([imgUrl]).changePosition(ele, positions, imgUrl).repeatForever()
repeatAnimation.start(80)
console.log(repeatAnimation)

// animation(el, positions, imgUrl)

// function animation (el, positions, imgUrl) {
//   el.style.backgroundImage = `url(${imgUrl})`
//   el.style.backgroundRepeat = 'no-repeat'
//   let index = 0
//
//   function run () {
//     let pos = positions[index].split(' ')
//     el.style.backgroundPosition = `${pos[0]}px ${pos[1]}px`
//     index++
//     if (index >= positions.length) {
//       index = 0
//     }
//     setTimeout(run, 80)
//   }
//
//   run()
// }

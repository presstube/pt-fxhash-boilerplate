import './src/style.css'

import bootCJS from './src/bootCJS.js'
import _ from 'lodash'

const cjs = createjs

// HELPERS
function fxrandInt(num) {
  return Math.floor(fxrand() * 3)
}

// init all data up front to be able to set the $fxhashFeatures
const range = 300
const numLibLurgies = 3
const lurgies = _.times(fxrandInt(5) + 5, () => {
  return "Lurgy_" + Number(fxrandInt(3)+1)
})

// wiring up features
window.$fxhashFeatures = {
  "Number of Lurgies": lurgies.length
}

const AALibURL = './some-lib.js'
const AALib = document.createElement("script")
let lib
const {
  canvas,
  stage, 
  container 
} = bootCJS('cjs-canvas')

// Loading external AA asset lib at runtime
AALib.setAttribute("src", AALibURL)
document.body.appendChild(AALib)
AALib.addEventListener("load", () => {
  // needs to have explicit knowledge of this ID?
  let comp = AdobeAn.getComposition("29216F8E6B4144E28C4BF1E97D45AAA5")
  lib = comp.getLibrary()
  kickoff()
}, false)

function kickoff() {
  cjs.Ticker.framerate = 30
  cjs.Ticker.addEventListener('tick', tick)

  makeLurgies()
}

function tick(e) {
  stage.update()
}

function makeLurgies() {
  _.each(lurgies, lurgyConstructor => {
    let lurgy = new lib[lurgyConstructor]()
    lurgy.x = fxrand() * range - fxrand() * range
    lurgy.y = fxrand() * range - fxrand() * range
    lurgy.rotation = fxrand() * 360
    container.addChild(lurgy)
  })
}

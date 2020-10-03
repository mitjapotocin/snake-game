// import CircularSlider from './CircularSlider'

function setAttributes(el, attributeAndValue) {
  Object.entries(attributeAndValue).forEach(([attribute, value]) => {
    el.setAttribute(attribute, value)
  })
}
const svgNS = 'http://www.w3.org/2000/svg'
const gameContainer = document.querySelector('.game-container')
const cellWH = 25
const gameW = 16
const gameH = 22
const svg = document.createElementNS(svgNS, 'svg')
const scoreContainer = document.querySelector('.score')
let scoreCount = 0
let direction = 1
let bodyCells = [createBodyCell(), createBodyCell(1, 0)]
let geico = createBodyCell(5, 5, true)

function createBodyCell(x = 0, y = 0, isGeico = false) {
  const cell = document.createElementNS(svgNS, 'rect')
  cell.setAttributeNS(null, 'x', x * cellWH)
  cell.setAttributeNS(null, 'y', y * cellWH)
  cell.setAttributeNS(null, 'height', cellWH)
  cell.setAttributeNS(null, 'width', cellWH)
  cell.setAttributeNS(null, 'opacity', 0.65)
  cell.setAttributeNS(null, 'fill', isGeico ? 'black' : 'hotpink')

  if (isGeico) {
    cell.classList.add('geico')
  }

  cell.position = { x, y }

  return cell
}

function createSvg() {
  setAttributes(svg, {
    viewBox: `0 0 ${gameW * cellWH} ${gameH * cellWH}`,
    width: gameW * cellWH,
    height: gameH * cellWH,
  })

  gameContainer.append(svg)
}

createSvg()
initialView()

setInterval(function () {
  updatePosition()
}, 140)

function getXdif() {
  if (direction === 1) {
    return 1
  }
  if (direction === 3) {
    return -1
  }
  return 0
}
function getYdif() {
  if (direction === 2) {
    return 1
  }
  if (direction === 4) {
    return -1
  }
  return 0
}

function updatePosition() {
  //Refactor this 2 functions

  bodyCells = [bodyCells[bodyCells.length - 1], ...bodyCells.slice(0, bodyCells.length - 1)]

  const snakeHead = bodyCells[0]
  const snakeNeck = bodyCells[1] || bodyCells[0]

  snakeHead.position.x = snakeNeck.position.x + getXdif()
  snakeHead.position.y = snakeNeck.position.y + getYdif()

  snakeHead.position.x = (snakeHead.position.x + gameW) % gameW
  snakeHead.position.y = (snakeHead.position.y + gameH) % gameH

  snakeHead.setAttributeNS(null, 'x', snakeHead.position.x * cellWH)
  snakeHead.setAttributeNS(null, 'y', snakeHead.position.y * cellWH)

  if (snakeHead.position.x === geico.position.x && snakeHead.position.y === geico.position.y) {
    const newCell = createBodyCell(geico.position.x + getXdif(), geico.position.y + getYdif())
    svg.append(newCell)
    bodyCells.unshift(newCell)
    scoreCount += 10

    scoreContainer.classList.add('active')

    setTimeout(() => {
      scoreContainer.classList.remove('active')
    }, 300)
    scoreContainer.innerHTML = `<span>Score: ${scoreCount}</span>`

    geico.position = { x: Math.floor(Math.random(1) * gameW), y: Math.floor(Math.random(1) * gameH) }
    geico.setAttributeNS(null, 'x', geico.position.x * cellWH)
    geico.setAttributeNS(null, 'y', geico.position.y * cellWH)
  }
}

function initialView() {
  bodyCells.forEach((el) => {
    svg.append(el)
  })
  svg.append(geico)
}

document.addEventListener('keydown', (e) => {
  const directions = {
    ArrowRight: 1,
    ArrowLeft: 3,
    ArrowDown: 2,
    ArrowUp: 4,
    ' ': 'stop',
  }

  if (directions[e.key] !== undefined) {
    direction = directions[e.key]
  }
})

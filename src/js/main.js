// import CircularSlider from './CircularSlider'

function setAttributes(el, attributeAndValue) {
  Object.entries(attributeAndValue).forEach(([attribute, value]) => {
    el.setAttribute(attribute, value)
  })
}
const svgNS = 'http://www.w3.org/2000/svg'
const gameContainer = document.querySelector('.game-container')
const cellWH = 22
const gameW = 20
const gameH = 30
const svg = document.createElementNS(svgNS, 'svg')
const scoreContainer = document.querySelector('.score-counter')
let scoreCount = 0
let direction = 1
let bodyCells = [createBodyCell(), createBodyCell(1, 0)]
let geico = createBodyCell(3, 3, true)

function createBodyCell(x = 0, y = 0, isGeico = false) {
  const cell = document.createElementNS(svgNS, 'rect')
  cell.setAttributeNS(null, 'x', x * cellWH)
  cell.setAttributeNS(null, 'y', y * cellWH)
  cell.setAttributeNS(null, 'height', cellWH)
  cell.setAttributeNS(null, 'width', cellWH)
  cell.setAttributeNS(null, 'opacity', 1)
  cell.setAttributeNS(null, 'fill', isGeico ? '#000000d9' : 'hotpink')

  if (isGeico) {
    cell.setAttributeNS(null, 'rx', `${cellWH / 2}`)
    cell.setAttributeNS(null, 'ry', `${cellWH / 2}`)
    cell.classList.add('geico')
  } else {
    cell.setAttributeNS(null, 'rx', '2')
    cell.setAttributeNS(null, 'ry', '2')
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

let gameInterval = setInterval(function () {
  updatePosition()
}, 110)

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
  bodyCells = [bodyCells[bodyCells.length - 1], ...bodyCells.slice(0, bodyCells.length - 1)]

  const snakeHead = bodyCells[0]
  const snakeNeck = bodyCells[1] || bodyCells[0]

  snakeHead.position.x = snakeNeck.position.x + getXdif()
  snakeHead.position.y = snakeNeck.position.y + getYdif()

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

  if (
    snakeHead.position.x < 0 ||
    snakeHead.position.x > gameW - 1 ||
    snakeHead.position.y < 0 ||
    snakeHead.position.y > gameH - 1
  ) {
    clearInterval(gameInterval)
    gameOver()
  } else {
    snakeHead.setAttributeNS(null, 'x', snakeHead.position.x * cellWH)
    snakeHead.setAttributeNS(null, 'y', snakeHead.position.y * cellWH)
  }
}

function initialView() {
  bodyCells.forEach((el) => {
    svg.append(el)
  })
  svg.append(geico)
}

document.addEventListener(
  'keydown',
  (e) => {
    const directions = {
      ArrowRight: 1,
      ArrowLeft: 3,
      ArrowDown: 2,
      ArrowUp: 4,
      ' ': 'stop',
    }

    if (directions[e.key] !== undefined) {
      e.preventDefault()
      direction = directions[e.key]
    }

    if (e.key === 'Enter' && gameOverEl.classList.contains('active')) {
      playAgain()
    }
  },
  { passive: false }
)

const gameOverEl = document.querySelector('.game-over')
function gameOver() {
  gameOverEl.classList.add('active')
  gameOverEl.querySelector('.score').innerHTML = `You scored <span>${scoreCount}</span> points`
}

document.querySelector('.play-again').addEventListener('click', playAgain)

function playAgain() {
  gameOverEl.classList.remove('active')
  scoreCount = 0
  scoreContainer.innerHTML = `<span>Score: ${scoreCount}</span>`
  bodyCells = [createBodyCell(), createBodyCell(1, 0)]
  geico = createBodyCell(3, 3, true)
  gameContainer.querySelector('svg').innerHTML = ''
  direction = 1
  initialView()
  gameInterval = setInterval(function () {
    updatePosition()
  }, 110)
}

const apiURL = 'https://sloenduro-results.herokuapp.com/api/snake-results'
let resultsObject
let sortedResultsList
let leaderboard = document.querySelector('.leaderboard')

async function getResults() {
  await fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      gameResults = data

      resultsObject = gameResults.reduce((acc, item) => {
        if (acc[item.name] === undefined || acc[item.name] < item.score) {
          acc[item.name] = item.score
        }

        return acc
      }, {})

      resultsList = [...Object.entries(resultsObject)]
        .map((item) => {
          let obj = {}
          obj[item[0]] = item[1]
          return obj
        })
        .sort((a, b) => Object.values(b)[0] - Object.values(a)[0])
    })
}

getResults().then(() => {
  // console.log(resultsObject)
  console.log(resultsList)

  updateLeaderboard()
})

function updateLeaderboard() {
  resultsList.forEach((el) => {
    let li = document.createElement('li')
    li.innerHTML = `${Object.keys(el)[0]}: ${Object.values(el)[0]}`

    leaderboard.appendChild(li)
  })
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: '', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  console.log(response.status)
  // return response.json() // parses JSON response into native JavaScript objects
}

// postData(apiURL, { name: 'Simon', score: 300 }).then((data) => {
//   console.log(data) // JSON data parsed by `data.json()` call
// })

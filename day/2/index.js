const parser = require('../../utils/parser')

const inputString = parser.fileToString('input-challenge.txt')
const roundsArray = inputString.split(/\n/)

const ROCK = 'rock'
const PAPER = 'paper'
const SCISSOR = 'scissor'

const LOSS = 'loss'
const DRAW = 'draw'
const WIN = 'win'

const VALUES = {
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSOR]: 3,
  [LOSS]: 0,
  [DRAW]: 3,
  [WIN]: 6
}

const determineOutcome = ([oShape, mShape]) => {
  if(oShape === ROCK && mShape === ROCK) return DRAW
  if(oShape === ROCK && mShape === PAPER) return WIN
  if(oShape === ROCK && mShape === SCISSOR) return LOSS

  if(oShape === PAPER && mShape === ROCK) return LOSS
  if(oShape === PAPER && mShape === PAPER) return DRAW
  if(oShape === PAPER && mShape === SCISSOR) return WIN

  if(oShape === SCISSOR && mShape === ROCK) return WIN
  if(oShape === SCISSOR && mShape === PAPER) return LOSS
  if(oShape === SCISSOR && mShape === SCISSOR) return DRAW

  console.error('Could not determine outcome.')
}

const determineShape = ([oShape, outcome]) => {
  if(oShape === ROCK && outcome === LOSS) return SCISSOR
  if(oShape === ROCK && outcome === DRAW) return ROCK
  if(oShape === ROCK && outcome === WIN) return PAPER

  if(oShape === PAPER && outcome === LOSS) return ROCK
  if(oShape === PAPER && outcome === DRAW) return PAPER
  if(oShape === PAPER && outcome === WIN) return SCISSOR

  if(oShape === SCISSOR && outcome === LOSS) return PAPER
  if(oShape === SCISSOR && outcome === DRAW) return SCISSOR
  if(oShape === SCISSOR && outcome === WIN) return ROCK

  console.error('Could not determine shape.')
}

const interpretWithDictionary = (inputs, dictionary) => inputs.map(input => dictionary[input])

const part1Dictionary = {
  A: ROCK,
  X: ROCK,
  B: PAPER,
  Y: PAPER,
  C: SCISSOR,
  Z: SCISSOR
}

const collection1 = roundsArray.map(element => {
  const inputs = element.split(/\s/)
  const interpreted = interpretWithDictionary(inputs, part1Dictionary)
  const outcome = determineOutcome(interpreted)
  return {
    opponentInput: interpreted[0],
    myInput: interpreted[1],
    outcome,
    score: VALUES[outcome] + VALUES[interpreted[1]]
  }
})

const part1 = collection1.reduce((result, currentRound) => result + currentRound.score, 0)
console.log(part1)

const part2Dictionary = {
  A: ROCK,
  X: LOSS,
  B: PAPER,
  Y: DRAW,
  C: SCISSOR,
  Z: WIN
}

const collection2 = roundsArray.map(element => {
  const inputs = element.split(/\s/)
  const interpreted = interpretWithDictionary(inputs, part2Dictionary)
  const myInput = determineShape(interpreted)
  return {
    rawInput: inputs,
    opponentInput: interpreted[0],
    myInput,
    outcome: interpreted[1],
    score: VALUES[interpreted[1]] + VALUES[myInput]
  }
})

const part2 = collection2.reduce((result, currentRound) => result + currentRound.score, 0)
console.log(collection2, part2)
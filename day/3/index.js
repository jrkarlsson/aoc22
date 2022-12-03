const parser = require('../../utils/parser')

const inputString = parser.fileToString('input-challenge.txt')
const sacksArray = inputString.split(/\n/)

const getScore = (character) => {
  const cPosition = character.charCodeAt()
  if(cPosition > 64 && cPosition < 91) {
    return cPosition - 38
  } else {
    return cPosition - 96
  }
}

const splitSack = (sack) => {
  const len = sack.length / 2
  const compartment1 = sack.slice(0, len)
  const compartment2 = sack.slice(len, sack.length)
  return [compartment1, compartment2]
}

const detectError = (sack) => sack[0].find(character => sack[1].includes(character))

const collection = sacksArray.map((sack, index) => {
  const sackArray = sack.split('')
  const compartments = splitSack(sackArray)
  const error = detectError(compartments)
  const score = getScore(error)

  return {
    id: index,
    sack: sackArray,
    compartments,
    error,
    score
  }
})

const part1 = collection.reduce((result, sack) => result + sack.score, 0)
console.log(part1)

const detectBadge = (sacks) => sacks[0].sack.find(character => sacks[1].sack.includes(character) && sacks[2].sack.includes(character))

const groupedCollection = collection.reduce((result, sack, index, collection) => {
  if(index % 3 === 0) {
    const start = result.length * 3
    const end = start + 3
    const sacks = collection.slice(start, end)
    const badge = detectBadge(sacks)
    const score = getScore(badge)
    
    return [
      ...result,
      {
        sacks,
        badge,
        score
      }
    ]
  }

  return result
}, [])

const part2 = groupedCollection.reduce((result, group) => result + group.score, 0)
console.log(part2)
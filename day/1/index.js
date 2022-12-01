const parser = require('../../utils/parser')

const inputString = parser.fileToString('input-challenge.txt')
const perElfArray = inputString.split(/\n\n/)

const elfCollection = perElfArray
  .map((calories, index) => {
    const caloriesAsAnNumberArray = calories
      .split(/\n/)
      .map(value => parseInt(value))

    const totalCalories = caloriesAsAnNumberArray.reduce((result, currentValue) => result += currentValue, 0)

    return {
      id: index,
      calories: caloriesAsAnNumberArray,
      total: totalCalories
    }
  })
  .sort((a, b) => b.total - a.total)

const part1 = elfCollection.reduce((mostPackedElf, currentElf) => currentElf.total > mostPackedElf.total ? currentElf : mostPackedElf, elfCollection[0]).total
console.log(part1)

const part2 = elfCollection.slice(0, 3).reduce((result, currentElf) => result += currentElf.total, 0)
console.log(part2)

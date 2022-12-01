const fs = require('fs')

const fileToString = (path) => {
  try {
    const result = fs.readFileSync(path).toString()

    return result
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  fileToString
}
require('colors')
const fs = require('fs')
const Diff = require('diff')

const snapshot = fs.readFileSync('./fixtures/output.snapshot.nt').toString()
const result = fs.readFileSync('./fixtures/output.nt').toString()

if (snapshot !== result) {
  console.warn('Test pipeline wrote something different than expected.')

  const diff = Diff.diffWords(result, snapshot)

  diff.forEach((part) => {
    const color = part.added ? 'green' : part.removed ? 'red' : 'grey'
    process.stderr.write(part.value[color])
  })
  process.exit(1)
}

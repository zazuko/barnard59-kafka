const Transform = require('readable-stream').Transform
const rdf = require('rdf-ext')

class AddTypeTransform extends Transform {
  constructor () {
    super({ objectMode: true })
    this.shouldAddType = true
  }

  _transform (chunk, e, next) {
    const { subject } = chunk
    if (this.shouldAddType && subject.termType === 'NamedNode') {
      const typeQuad = rdf.quad(
        subject,
        rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        rdf.namedNode('http://schema.org/Product')
      )

      this.push(typeQuad)
      this.shouldAddType = false
    }

    this.push(chunk)
    next()
  }
}

function addType () {
  return new AddTypeTransform()
}

module.exports = {
  addType
}

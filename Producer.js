const { Producer } = require('node-rdkafka')
const { Writable } = require('readable-stream')

class ProducerStream extends Writable {
  constructor (host, topic) {
    super({ objectMode: true })

    this.topic = topic

    this.producer = Producer.createWriteStream({
      'metadata.broker.list': host
    }, {}, { topic })

    this.producer.on('error', err => this.emit('error', err))
  }

  _write (chunk, encoding, callback) {
    this.producer.write(chunk)

    callback()
  }

  _final (callback) {
    this.producer.close()

    callback()
  }
}

module.exports = ProducerStream

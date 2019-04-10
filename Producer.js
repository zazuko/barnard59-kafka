const { Producer } = require('node-rdkafka')
const { Writable } = require('readable-stream')

class ProducerStream extends Writable {
  constructor ({ host, topic, logger }) {
    super({ objectMode: true })

    this.topic = topic

    this.producer = Producer.createWriteStream({
      'metadata.broker.list': host
    }, {}, { topic })

    this.producer.on('close', () => {
      logger.info('ProducerStream closed')
    })

    this.producer.on('error', (err) => {
      this.emit('error', err)
    })
  }

  _write (chunk, encoding, done) {
    this.producer.write(chunk)

    done()
  }

  _final (done) {
    this.producer.close()

    done()
  }
}

module.exports = ProducerStream

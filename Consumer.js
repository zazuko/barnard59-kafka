const { KafkaConsumer } = require('node-rdkafka')
const { Readable } = require('readable-stream')

class Consumer extends Readable {
  constructor ({ host, topics, logger, group, keepalive = true, raw = false } = {}) {
    super({ objectMode: true })

    this.consumer = KafkaConsumer.createReadStream({
      'group.id': group,
      'metadata.broker.list': host,
      'socket.keepalive.enable': keepalive
    }, {}, { topics })

    this.consumer.on('close', () => {
      logger.info('KafkaConsumerStream closed')
    })

    this.consumer.on('data', async (message) => {
      if (raw) {
        this.push(message)
      } else if (message.value) {
        this.push(message.value)
      }
    })
  }

  _read () {}

  _destroy () {
    this.consumer.close()
  }
}

module.exports = Consumer

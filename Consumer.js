const { ConsumerGroupStream } = require('kafka-node')
const { Readable } = require('readable-stream')

class Consumer extends Readable {
  constructor (host, topics, { group, raw = false } = {}) {
    super({ objectMode: true })

    this.consumer = new ConsumerGroupStream({
      kafkaHost: host,
      groupId: group
    }, topics)

    this.consumer.on('data', async message => {
      if (raw) {
        this.push(message)
      } else {
        if (message.value) {
          this.push(message.value)
        }
      }
    })
  }

  _read () {}

  _destroy () {
    this.consumer.close()
  }
}

module.exports = Consumer

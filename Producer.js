const { KafkaClient, ProducerStream } = require('kafka-node')
const { Writable } = require('readable-stream')

class Producer extends Writable {
  constructor (host, topic) {
    super({ objectMode: true })

    this.topic = topic
    this.client = new KafkaClient({ kafkaHost: host })
    this.producer = new ProducerStream(this.client)
  }

  _write (chunk, encoding, callback) {
    this.producer.write({ topic: this.topic, messages: chunk }, encoding, callback)
  }

  _final (callback) {
    this.producer.close()
    this.client.close()

    callback()
  }
}

module.exports = Producer

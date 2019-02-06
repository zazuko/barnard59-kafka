const Consumer = require('./Consumer')
const Producer = require('./Producer')

function consumer (host, topics, group) {
  return new Consumer(host, Array.isArray(topics) ? topics : [topics], { group })
}

function consumerRaw (host, topics, group) {
  return new Consumer(host, Array.isArray(topics) ? topics : [topics], { group, raw: true })
}

function producer (host, topic) {
  return new Producer(host, topic)
}

module.exports = {
  consumer,
  consumerRaw,
  producer
}

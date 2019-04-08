const Consumer = require('./Consumer')
const Producer = require('./Producer')

function consumer (host, topics, { group } = {}) {
  const logger = this.log
  return new Consumer({ host, topics, group, logger })
}

function consumerRaw (host, topics, { group }) {
  const logger = this.log
  return new Consumer({ host, topics, group, raw: true, logger })
}

function producer (host, topic) {
  const logger = this.log
  return new Producer({ host, topic, logger })
}

module.exports = {
  consumer,
  consumerRaw,
  producer
}

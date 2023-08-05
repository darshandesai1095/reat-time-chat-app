const redis = require("redis")

const redisURL = 'redis://127.0.0.1:6379'
const client = redis.createClient(redisURL)

const connectRedis = () => {
  return new Promise((resolve, reject) => {
    client.connect()
    client.on('connect', () => {
      console.log('Connected to Redis server...')
      resolve()
    })
    client.on('error', (err) => {
      console.error('Error connecting to Redis:', err)
      reject(err)
    })
  })
}

module.exports = { client, connectRedis }
const redis = require("redis")
// const { promisify } = require('util');

// const redisURL = 'redis://127.0.0.1:6379' // local env
const redisURL = 'redis://red-cjqu2c61208c73fcnbd0:6379'
const hostname = 'redis://red-cjqu2c61208c73fcnbd0'
const client = redis.createClient({
      url: redisURL
})

client.on('error', err => console.log('Redis Client Error', err))

const connectToRedis = async () => {
    console.log("connecting to redis...")
    try {
      await client.connect()
        console.log('Connected to Redis server...')
    } catch (error) {
      console.error('Error connecting to Redis:', error)
    }
}

// const hgetAsync = promisify(client.hGet).bind(client)
// const hsetAsync = promisify(client.hSet).bind(client)

module.exports = { client, connectToRedis }
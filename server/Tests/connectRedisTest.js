// const redis = require("redis")

// const client = redis.createClient()

// const connectRedis = () => {
//   return new Promise((resolve, reject) => {
//     client.connect()
//     client.on('connect', () => {
//       console.log('Connected to Redis server...')
//       resolve()
//     })
//     client.on('error', (err) => {
//       console.error('Error connecting to Redis:', err)
//       reject(err)
//     })
//   })
// }

// const redisTest = async () => {
//   try {
//     console.log("running redis test...")
//     await client.set("test", "val")
//     const value = await client.get("test")
//     console.log("Worked: " + value)
//   } catch (error) {
//     console.log("Redis error", error)
//   } finally {
//     client.quit(); // Close the Redis client after the test is complete.
//   }
// }

// // Usage: Connect to Redis first and then execute the test
// connectRedis()
//   .then(redisTest)
//   .catch((err) => {
//     console.error("Error in Redis test:", err)
//     client.quit() // Close the Redis client if there is an error during connection or test.
// })

// client.on('error', err => console.log('Redis Client Error', err))
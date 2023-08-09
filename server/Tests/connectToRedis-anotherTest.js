// const redis = require("redis")

// const redisURL = 'redis://127.0.0.1:6379'
// const client = redis.createClient(redisURL)

// // const connectToRedis = () => {
// //   return new Promise((resolve, reject) => {
// //     client.connect()
// //     client.on('connect', () => {
// //       console.log('Connected to Redis server...')
// //       resolve()
// //     })
// //     client.on('error', (err) => {
// //       console.error('Error connecting to Redis:', err)
// //       reject(err)
// //     })
// //   })
// // }

// client.on('error', err => console.log('Redis Client Error', err))

// const connectToRedis = async () => {
//     try {
//       await client.connect()
//         console.log('Connected to Redis server...')
//     } catch (error) {
//       console.error('Error connecting to Redis:', error)
//     }
// }

// const runTest = async () => {
//   console.log("running test")
//   try {
//     await client.HSET('userInfo', 'nombre1', 'darshan')
//     const val = await client.HGET('userInfo', 'nombre1')
//     console.log("nombre1", val)
//   } catch (error) {
//     console.log("error", error)
//   }
// }


// connectToRedis().then(() => runTest())
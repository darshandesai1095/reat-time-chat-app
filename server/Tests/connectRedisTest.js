const redis = require("redis")
const { client, connectRedis } = require('../config/connectRedis')

const redisTest = async () => {
  try {
    console.log("running redis test...")
    await client.set("test", "val")
    const value = await client.get("test")
    console.log("Worked: " + value)
  } catch (error) {
    console.log("Redis error", error)
  } finally {
    client.quit(); // Close the Redis client after the test is complete.
  }
}

connectRedis()
  .then(redisTest)
  .catch((err) => {
    console.error("Error in Redis test:", err)
    client.quit() // Close the Redis client if there is an error during connection or test.
})

client.on('error', err => console.log('Redis Client Error', err))
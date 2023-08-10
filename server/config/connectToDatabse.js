const mongoose = require("mongoose")

const connectionString = process.env.ATLAS_URI_1 || "mongodb+srv://darshandesai1095:VGNXfgAIG7jb9uRQ@chat-app-cluster.zcrus8j.mongodb.net/?retryWrites=true"

const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "chatAppDB"
    })
    console.log("CONNECTED TO THE DATABASE")
  } catch (error) {
    console.error("ERROR CONNNECTING TO THE DATABASE:", error)
  }
}

module.exports =  { connectToDatabase }
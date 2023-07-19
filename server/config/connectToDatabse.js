const mongoose = require("mongoose")

const connectionString = process.env.ATLAS_URI_2 || "mongodb+srv://darshandesai1095:VGNXfgAIG7jb9uRQ@chat-app-cluster.zcrus8j.mongodb.net/?retryWrites=true&w=majority/"

const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "chatAppDB"
    })
    console.log("Connected to the database")
  } catch (error) {
    console.error("Error connecting to the database:", error)
  }
}

module.exports =  connectToDatabase;
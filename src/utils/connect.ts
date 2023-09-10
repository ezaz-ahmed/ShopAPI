import mongoose from "mongoose"
import config from 'config'

async function connect() {
  const dbUri = config.get<string>('dbUri')

  try {
    await mongoose.connect(dbUri)
    console.log("Database connected")
  } catch (error) {
    console.error("Couldn't connect to db")
    process.exit(1)
  }
}

export default connect
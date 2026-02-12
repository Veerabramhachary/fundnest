import mongoose from "mongoose"

export const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log("Database connected")
    }catch {
        console.log("Database connection failed")
        process.exit(1)
    }
}
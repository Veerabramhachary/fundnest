import mongoose from "mongoose"

export const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.LOCAL_URI!)
        console.log("Database connected")
    }catch {
        console.log("Database connection failed")
        process.exit(1)
    }
}
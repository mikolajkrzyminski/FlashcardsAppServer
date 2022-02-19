import mongoose from "mongoose";

async function connectDB(url: string) {
    try {
        await mongoose.connect(url);
        console.log("connected to database")
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export default connectDB;
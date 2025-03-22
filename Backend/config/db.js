import mongoose from "mongoose";

export const connectDB = async () =>{
    mongoose.connection.on("connected" , () => console.log("Database connected"))
    await mongoose.connect(`${process.env.MONGO_URI}/fullstack`)
}
import mongoose from "mongoose";

export const connectMongoDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to mongodb");
    }catch(error){
        console.log("Error Connecting  to mongodb",error);
    }
}
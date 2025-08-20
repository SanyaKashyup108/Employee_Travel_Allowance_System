import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try{
      await mongoose.connect(process.env.MONGO_URL)
      .then(()=>{
        console.log("mongodb connected")
      })

    }catch(err){
        console.log("mongoDB err", err);
    }
}

export default connectDB;
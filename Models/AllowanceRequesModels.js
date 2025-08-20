import mongoose from "mongoose";

const  AllowanceRequestSchema = new mongoose.Schema({
    user : {
        type: String,
        required:true,
    },
    amount : {
        type: Number,
        required: true,
       
    },
    description: {
        type : String ,

    },
    date : {
        type: Date,
        default :  Date.now,
    },
    status :{
        type : String,
       enum: ["Pending", "Approved", "Rejected"],
       default:"pending",
    }
})

export default  mongoose.model(  " AllowanceRequest",  AllowanceRequestSchema)
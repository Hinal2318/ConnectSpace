import mongoose from "mongoose";

const detailSchema = new mongoose.Schema({
    name: 
    { type: String,
    required: true },
     email: 
    { type: String,
     required: true },
     description:
    { type: String,
     required: true },
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    comments:[
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text:String,
        createdAt:{
            type:Date,
            default:Date.now,
        },
    },
]
},
 { timestamps: true });
export default mongoose.model("Detail", detailSchema);

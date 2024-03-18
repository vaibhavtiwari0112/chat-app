import mongoose from "mongoose";
import User from "./user.models.js";
const messageSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true,
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true}); // by this mongoose will automatically create two fields createdAt and updatedAt

const Message = mongoose.model("Message", messageSchema);

export default Message;
import { response } from "express";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.models.js";


export const sendMessage = async(req,res)=>{
   try{
const {message} = req.body;
const {id: receiverId} = req.params;
const senderId = req.user._id;

let conversation = await Conversation.findOne({
    participants: { $all:[senderId,receiverId]},
})

if(!conversation){
    conversation = await Conversation.create({
        participants: [senderId,receiverId],
        messages:[],
    })
}
const newMessage = new Message({
    senderId,
    receiverId,
    message
})
if(newMessage){
    conversation.messages.push(newMessage) 
}
// SOCKET IO functionality

// this will not run parallel
// await conversation.save();
// await newMessage.save();

// This will run in parallel
await Promise.all([conversation.save(),newMessage.save()]);
res.status(201).json(newMessage);
}catch(error){
    console.log("Error in sendMessage :" , error.message);
    res.status(400).json({error:"Internal Server Error"})
   }
}


export const getMessage = async (req,res) =>{
    try{
const {id:userToChatId} = req.params;
const senderId = req.user._id;

const conversation = await Conversation.findOne({
    participants: { $all:[senderId,userToChatId]},
}).populate('messages');

if(!conversation) res.status(200).json([]);
const messages = conversation.messages;

res.status(200).json(messages);
    }catch(error){
        console.log("Error in getMessage :" , error);
        res.status(400).json({error:"Internal Server Error"})
    }
}
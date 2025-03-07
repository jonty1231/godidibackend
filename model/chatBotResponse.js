import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    address: { type: String, required: true ,trim:true},
    contact: { type: String, required: true,trim:true },
    email: { type: String, required: true,unque:false },
    name: { type: String, required: true ,trim:true},
    service: { type: String, required: true ,trim:true},
    userResponse: { type: Object ,default: {}} 
}, { timestamps: true });

const ChatBotResponse= mongoose.model("chatbotresponse",userSchema)

export default ChatBotResponse;
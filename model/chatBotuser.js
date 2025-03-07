import mongoose from "mongoose";

const ChatbotuserSchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    contact:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    address:{
        type:String,
        trim:true,
        required:true
    },
    service:{
        type:String,
        trim:true,
        required:true
    }
})



  const ChatBotUser= mongoose.model("chatbotuser",ChatbotuserSchema)

  export default ChatBotUser;



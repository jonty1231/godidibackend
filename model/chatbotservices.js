import mongoose from "mongoose";

const chatbotServiceSchema = new mongoose.Schema({
    services:{type : String,
        trim:true,
    }
})




const Chatbotservices= mongoose.model("chatbotservices",chatbotServiceSchema)

export default Chatbotservices;
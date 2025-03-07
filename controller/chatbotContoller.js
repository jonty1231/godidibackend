import ChatBotResponse from "../model/chatBotResponse.js";
import Chatbotservices from "../model/chatbotservices.js";
import ChatBotUser from "../model/chatBotuser.js";


 export const registerUser=async(req,res)=>{
try {
    const {name,contact,email,address,service} =req.body

    if(!name || !contact || !email || !address || !service){
        return res.status(301).json({success:false,message:"Enter all details"})
    }

    await ChatBotUser.create({name,contact,email,address,service})

    return res.status(201).json({success:true,message:"send user"})

} catch (error) {
    return res.status(400).json({success:false,message:error.message})

}



 }

 export const addChatbotService=async (req,res)=>{
const {services }=req.body;
if(!services.trim()){
    return res.status(301).json({success:false,message:"add data"})

}

const allreasyService = await Chatbotservices.findOne({services})
if(allreasyService){
    return res.status(301).json({success:false,message:"service allReady Exist"})

}

const data= await  Chatbotservices.create({services})
return res.status(201).json({success:true,message:"add success",data})

 }

 export const getallservice=async(req,res)=>{
const allservice =await Chatbotservices.find();
return res.status(200).json({success:true,allservice})

 }


 export const addChatbotController=async(req,res)=>{
    try {
         const {name,email,service,userResponse,address,contact} =req.body;


         if(!name || !email || !service || !userResponse  || !address || !contact){
return res.status(300).json({success:false,message:"send all data"})
         }


       await   ChatBotResponse.create({name,email,service,userResponse,address,contact})  
         
       return res.status(200).json({success:true,message:"send all data"})


    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
 }


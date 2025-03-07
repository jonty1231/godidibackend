
import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./helper/dbConfig.js"
import userRouter from "./router/userRouter.js"
import driverRouter from "./router/driverRouter.js"
import botRouter from "./router/chatbotRouter.js"
import cors from "cors";


dotenv.config()
const app= express()
app.use(express.json())

const frontendLink="https://vishal.futuretouch.org/"

app.use(cors({
    origin: frontendLink,  
    methods: ["GET", "POST"],
    credentials: true 
}));

app.use("/api/user",userRouter)
app.use("/api/driver",driverRouter)
app.use("/api/bot",botRouter)










const Port = process.env.PORT || 8080;
connectDB()
app.listen(Port,()=>{
    console.log(`server are running on port ${Port}`)
})

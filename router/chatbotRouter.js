import { registerUser,addChatbotService,getallservice ,addChatbotController} from "../controller/chatbotContoller.js";
import express from "express";
const router= express.Router();

router.post("/registerbotuser",registerUser)
router.post("/allbotservice",addChatbotService)
router.get("/getbotservice",getallservice)
router.post("/addbotData",addChatbotController)

export default router;


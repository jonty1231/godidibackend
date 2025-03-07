import express from "express"
import { createDriver,loginDriver,getDrivers,getDriverById ,deleteDriver} from "../controller/DriverController.js";

const router = express.Router();

router.post("/signup",createDriver)
router.post("/login",loginDriver)
router.get("/getalldriver",getDrivers)
router.get("/getdriver/:id",getDriverById)
router.delete("/delete/:id",deleteDriver)


export default router
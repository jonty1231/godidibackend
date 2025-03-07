import Driver from "../model/driverModel.js";
import bcrypt from "bcrypt"

export const createDriver = async (req, res) => {
    try {
        const {name,email,phone,password,licenseNumber,make,model,year,plateNumber,color,insuranceNumber,latitude,longitude} =req.body;

  if(!name || !email || !phone || !password || !licenseNumber || !make || !model || !year || !plateNumber || !color || !insuranceNumber || !latitude || !longitude){
    return res.status(301).json({message:"enter all detail",success:false})
  }
const alreadyuser= await Driver.findOne({$or:[
  { email },
        { phone },
        { licenseNumber },
        { "vehicleDetails.plateNumber": plateNumber },
        { insuranceNumber }
]})
if(alreadyuser){
  return res.status(301).json({message:alreadyuser.email==email?"Email allready exist":alreadyuser.licenseNumber==licenseNumber?"licenseNumber allready Exist ":alreadyuser.insuranceNumber===insuranceNumber?"insuranceNumber allready Exist":alreadyuser.vehicleDetails.plateNumber==plateNumber?"Number Plate Allready exist":"Phone Number allready Exist"  ,success:false})
}
      const driver = await Driver.create({
        name,email,phone,password,licenseNumber,vehicleDetails:{make,model,year,plateNumber,color,insuranceNumber},latitude,longitude
      })

   
      res.status(201).json({ success: true, message: "Driver created successfully", driver });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error creating driver", error });
    }
  };


export const loginDriver=async(req,res)=>{
    try {
        const {email,password} =req.body;
        if(!email || !password ){
            return res.status(400).json({success:false,message:"enter all info"})
        }
        const checkdriver  = await Driver.findOne({email});
        if(!checkdriver){
            return res.status(400).json({success:false,message:"enter valid info"})

        }
        const checkpassword= await bcrypt.compare(password,checkdriver.password);
        if(!checkdriver){
            return res.status(400).json({success:false,message:"enter valid info"})}

            return res.status(200).json({success:true,message:"login success",checkdriver})

    } catch (error) {
        return res.status(400).json({success:false,message:error.message})

    }
}
  
  export const getDrivers = async (req, res) => {
    try {
      const drivers = await Driver.find();
      res.status(200).json({ success: true, drivers });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching drivers", error });
    }
  };
  
  export const getDriverById = async (req, res) => {
    try {
        const {id} =req.params;
      const driver = await Driver.findById(id);
      if (!driver) {
        return res.status(404).json({ success: false, message: "Driver not found" });
      }
      res.status(200).json({ success: true, driver });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching driver", error });
    }
  };



  
//   export const updateDriver = async (req, res) => {
//     try {
//       const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
//       if (!driver) {
//         return res.status(404).json({ success: false, message: "Driver not found" });
//       }
//       res.status(200).json({ success: true, message: "Driver updated successfully", driver });
//     } catch (error) {
//       res.status(500).json({ success: false, message: "Error updating driver", error });
//     }
//   };
  




  export const deleteDriver = async (req, res) => {
      try {
const {id}=req.params
     

      const driver = await Driver.findByIdAndDelete(id);
      if (!driver) {
        return res.status(404).json({ success: false, message: "Driver not found" });
      }
      res.status(200).json({ success: true, message: "Driver deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting driver", error });
    }
  };
  
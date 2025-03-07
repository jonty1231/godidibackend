import axios from "axios";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import { createJWToken } from "../helper/jwtoken.js";



export const handelAlreadyUsername = async (req, res) => {
    try {
      const { user_name } = req.params;
      if (!user_name || user_name.length <=3) {
        return res.status(400).json({ message: "Username is required",success:false });
      }
  
      const existingUser = await User.findOne({ user_name });
  
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists",success:false });
      }
  
      return res.status(200).json({ message: "Username is available",success:true });
    } catch (error) {
      console.error("Error checking username:", error);
      return res.status(500).json({ message: "Internal server error",success:false });
    }

  };








export  const signUpController=async(req,res)=>{

try {
    const {email,name,password,user_name}=req.body;

    if (!email || !name || !password || !user_name) {
        return res.status(400).json({ message: "All fields are required", success: false });
      }

    const existingUser = await User.findOne({ $or:[{email},{user_name}] });
  
    if (existingUser) {
      return res.status(409).json({ message:existingUser.email==email?"Email already exists":"Username already exists" ,success:false });
    }

  const createduser=  await  User.create({email,name,password,user_name})
 
  res.cookie("godidi",createJWToken(createduser._id),{
    path:"/",
    httpOnly:true,
    expires:new Date(Date.now()+60*60*60*24*90 ),
    sameSite:'none',
    secure:true,
  })

 return res.status(201).json({ message: "Signup user",success:true, createduser})



} catch (error) {
    return res.status(500).json({ message: "Internal server error",success:false });
 
}


}




export const signupSocialAuth=async(req,res)=>{
try {
  const { provider, accessToken } = req.body;
  let userData;

  if (provider === "google") {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
    );
    userData = response.data;
  } else if (provider === "facebook") {
    const response = await axios.get(
      `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
    );
    userData = response.data;
  }else if (provider === "apple") {
    userData = {}; 
  }
  let user = await User.findOne({ "socialAuth.providerId": userData.sub || userData.id });
  if (!user) {
    const user_name= `${userData.name}${Date.now()}${Math.floor(Math.random()*200)}`

    user = new User({
      name: userData.name,
      email: userData.email,
      user_name,
      phone: "",
      socialAuth: {
        provider: provider,
        providerId: userData.sub || userData.id,
      },
    });
    await user.save();
  
  res.cookie("godidi",createJWToken(user._id),{
    path:"/",
    httpOnly:true,
    expires:new Date(Date.now()+60*60*60*24*90 ),
    sameSite:'none',
    secure:true,
  })

  return res.status(201).json({ message: "signup success",success:true,user });
}

} catch (error) {
  return res.status(500).json({ message: "Internal server error",success:false, error:error.message});

}
}



export const loginController =async(req,res)=>{
  try {
    const {email,password}=req.body;
if(!email || !password){
  return res.status(400).json({success:false,message:"enter valid info"})
}   

const getUser = await User.findOne({ $and:[{email},{status:true}]});
if(!getUser){
  return res.status(400).json({success:false,message:"enter valid email"})

}

const verifypassword= await bcrypt.compare(password,getUser.password);

if(!verifypassword)  return res.status(400).json({success:false,message:"enter valid email"})



  res.cookie("godidi",createJWToken(getUser._id),{
    path:"/",
    httpOnly:true,
    expires:new Date(Date.now()+60*60*60*24*90 ),
    sameSite:'none',
    secure:true,
  })

  return res.status(200).json({success:true,message:"login Success Full",getUser})







  } catch (error) {
        return res.status(500).json({ message: "Internal server error",success:false });

  }
}

export const logoutUser=async(req,res)=>{
  res.cookie("godidi",createJWToken(getUser._id),{
    path:"/",
    httpOnly:true,
    expires:new Date(Date.now()),
    sameSite:'none',
    secure:true,
  })

  return res.status(200).json({success:true,message:"logout Success Full"})
}


export const deleteUser =async(req,res)=>{
  try {
    const {id,password}=req.body;
if(!id || !password){
  return res.status(400).json({success:false,message:"enter valid info"})
}   

const getUser = await User.findOne({ $and:[{_id:id},{status:true}]});
if (!getUser) {
  return res.status(404).json({ success: false, message: "User not found or already deleted." });
}

const verifypassword= await bcrypt.compare(password,getUser.password);

if(!verifypassword)  return res.status(400).json({success:false,message:"Invalid password"})

  await getUser.deleteOne();

  return res.status(200).json({success:true,message:"Delete Account SuccessFull"})







  } catch (error) {
        return res.status(500).json({ message: "Internal server error",success:false });

  }
}

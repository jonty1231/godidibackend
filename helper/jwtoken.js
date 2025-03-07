import JWT from "jsonwebtoken";

export const createJWToken=(id)=>{
    const token =  JWT.sign({_id:id},process.env.SECRET_KEY,{expiresIn:"90d"})
    return token;
}
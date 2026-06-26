import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

export const adminLogin = async (req , res) => {
    try{
        const {email , password} = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            return
            res.status(400).json({success:false , message:"user Not Found"})

        }
        if(user.role !== "admin"){
            return
            res.status(403).json({success:false , message:"Not An Admin"})

        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return
            res.status(400).json({success:false , message:"Invalid password"})
        }

        const token= jwt.sign(
            {id:user._id , isAdmin:user.isAdmin},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )
        res.json({success:true , user:{name:user.name ,email:user.email}})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:error.message})

    }
}

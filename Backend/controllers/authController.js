import bcrypt from "bcryptjs";
import { JsonWebTokenError } from "jsonwebtoken";
import userModel from "../models/user.model";

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing Detail" })
    }

    try {
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.json({ success: false, message: "User aldready exists" })
        }

        const hashedPassword = await bcrypt.bash(password, 10);

        const user = new userModel({ name, email, password: hashedPassword })
        await user.save();

        const token = Jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:"7d"});

        res.cookie("token", token , {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:   process.env.NODE_ENV === "pruct" ? "none" : "stric",
            maxAge:7 * 24 * 60 * 60 * 1000
        })

        return res.json({success:true})
   
    } catch (error) {
        res.json({ success: false, message: error.message } )
    }
}
export const login = async (req, res)=>{
  const {email, password} = req.body;

  if(!email || !password){
    return res.json({success:false, message:"Email and Password are required"})
  }

  try{
    const user = await userModel.findOne({email})

    if(!user){
        return res.json({success:false , message:"invalid password"})
    }

    const isMatch = await bcrypt.compare(password , user.password)

    if(!isMatch){
        return res.json({success:false , message:"invalid password"})
    }

    const token = Jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:"7d"});

    res.cookie("token", token , {
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:   process.env.NODE_ENV === "pruct" ? "none" : "stric",
        maxAge:7 * 24 * 60 * 60 * 1000
    });

    return res.json({success:true})
   
  }catch(error){
     return res.json({ success: false, message: error.message});
  }
}
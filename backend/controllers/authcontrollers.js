import User from "../models/user.models.js"; 
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login = async(req,res) =>{
try{
const {username,password}=req.body;
const user = await User.findOne({username});
const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "");
		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}
generateTokenAndSetCookie(user._id,res)

res.status(201).json({message : "User logged in successfully",
 username:user.username,
 firstName:user.firstName,
 lastName:user.lastName,
 profilePicture:user.profilePicture,
});

}catch(error){
    console.log(error);
    res.status(500).json({error:"Internal Server Error"});
}
}

export const logout = async (req,res) =>{
    try{
res.cookie("jwt","",{
    maxAge:0
})
res.status(200).json({message:"Successfully logged out"});
    }catch(error){
        console.log(error);
    res.status(500).json({error:"Internal Server Error"});
    }
}

export const signup = async(req,res) =>{
   try{
const {firstName , lastName, username , password , confirmPassword , gender} = req.body;
if(password !== confirmPassword){
    return res.status(400).json({error:"Passwords do not match"})
}  
const user = await User.findOne({username})
if(user){
    return res.status(400).json({error:"User already exists"})
}

// Hash the password
const salt = await bcryptjs.genSalt(10);
const hashedPassword =await bcryptjs.hash(password,salt);

const profilePic = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`

const newUser = new User({
    firstName,
    lastName,
    username,
    password:hashedPassword,
    profilePicture:profilePic,
    gender,
})

if(newUser){
    // generate jwtToken
     generateTokenAndSetCookie(newUser._id,res)
    await newUser.save();
    res.status(201).json({message : "User created successfully",
    _id:newUser._id,
     username:newUser.username,
     firstName:newUser.firstName,
     lastName:newUser.lastName,
     gender:newUser.gender,
     profilePicture:newUser.profilePicture,
    });
}else{
    res.status(400).json({error : "Invalid user data"})
}


}catch(error){
    console.log(error)
res.status(500).json({message : "Internal Server Error"});
   }
}
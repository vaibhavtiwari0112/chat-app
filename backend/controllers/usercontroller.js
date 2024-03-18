import User from "../models/user.models.js";

export const getUsersForSidebar = async(req,res) =>{
    try{

        const loggedInUserId = req.user._id;
        const allUsers = await User.find({_id: {$in: loggedInUserId}}).select("-password"); // finds all users except the one who is logged in
        res.status(200).json(allUsers);
    }catch(error){
        console.log("Error in getUsersForSidebar:",error);
        res.status(500).json({error : "Internal Server Error"});
    }
}
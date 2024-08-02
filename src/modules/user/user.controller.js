import { User } from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const profile = asyncHandler( async (req,res,next) =>
{
    const id = req.user._id
    const user = await User.findByIdAndUpdate(id,{profilePic:req.file.path})
    res.json({success :true , message : "profile pic uploaded"})
})
export const cover = asyncHandler( async (req,res,next) =>
{
    const id = req.user._id
    const user = await User.findById(id)
    // save paths 
    req.files.forEach((file) => {
        user.coverPic.push(file.path)
    } );
    await user.save()
    res.json({success :true , message : "covers pics uploaded"})
})
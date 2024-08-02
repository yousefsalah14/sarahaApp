import { User } from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import cloudinary from "../../utils/cloud.js";

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
} )


export const profileCloud = asyncHandler( async ( req, res, next ) =>
{
    const id = req.user._id
    // upload img on cloudinary
    const {secure_url , public_id} = await cloudinary.uploader.upload( req.file.path,{folder :`users/${id}/profile`} )
    // save url and public id in db 
    const user = await User.findByIdAndUpdate(id,{profilePic:{secure_url,public_id}})
    res.json({success :true , message : "profile pic uploaded"})
} )

export const updateProfileCloud = asyncHandler( async ( req, res, next ) =>
{
    const id = req.user._id
    const user = await User.findById(id)
    // upload img on cloudinary
    const { secure_url, public_id } = await cloudinary.uploader.upload( req.file.path,
        { public_id: user.profilePic.public_id } )
    // save url and public id in db 
    user.profilePic ={secure_url , public_id}
    await user.save()
    res.json({success :true , message : "profile pic updated successfully"})
} )

export const coverCloud = asyncHandler( async (req,res,next) =>
{
    const id = req.user._id
    const user = await User.findById(id)
    // upload imgs on cloudinary
    for (let i = 0; i < req.files.length; i++) {
        const { secure_url, public_id } = await cloudinary.uploader.upload( req.files[ i ].path, {
            folder :`users/${id}/cover`
        })
        
        // save url and public id in db 
        user.coverPic.push({secure_url,public_id})
    }
    await user.save()
    res.json({success :true , message : "covers pics uploaded"})
} )
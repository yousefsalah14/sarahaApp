import { Message } from "../../../DB/models/message.model.js";
import { User } from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const sendMessage = asyncHandler( async (req,res,next) =>
{
    // check reciever 
    const user= await User.findById( req.body.reciever )
    if ( !user ) return next( new Error( "reciever not Found", { cause: 404 } ) )
    // send message 
    await Message.create( req.body )
    res.json({success :true , message : "message sent ✅"})
} )
export const userMessages = asyncHandler( async ( req, res, next ) =>
{
    const messages = await Message.find( { reciever: req.user._id } )
    if ( !messages ) return next( new Error( "no messages found", { cause: 404 } ) )
    res.json({success:true , result :{messages}})
 
})
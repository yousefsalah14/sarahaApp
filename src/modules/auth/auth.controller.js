import { User } from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import joi from "joi";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Token } from "../../../DB/models/token.model.js";
export const signup = asyncHandler( async ( req, res,next ) =>
{
    
const existUser = await User.findOne( { email: req.body.email } )
if(existUser) return next(new Error("user already exist ",{cause:404}))
    // hash password
    const hashPassword = bcryptjs.hashSync(req.body.password)
    const user = await User.create( {...req.body,password :hashPassword })
    res.json({ sucess : true , message : "user created successfully"})

} )

export const login = asyncHandler( async ( req, res,next ) =>
{
    // check user 
    const user = await User.findOne( { email: req.body.email } )
    if(!user) return next(new Error("user not found",{cause:404}))
    //check password
    const match = bcryptjs.compareSync( req.body.password, user.password )
    if ( !match ) return next( new Error( "password invalid", { cause: 400 } ) )
    const token = jwt.sign( { id: user._id, email: user.email }, process.env.SECERT_KEY )
    await Token.create({token , user:user._id})
    res.json({success :true , result :{token}})
})
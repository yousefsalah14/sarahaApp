import { User } from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import randomstring from 'randomstring'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Token } from "../../../DB/models/token.model.js";
import { sendEmail } from "../../utils/sendEmails.js";
import { resetPassTemp, signUpTemp } from "../../utils/htmlTemplate.js";
export const signup = asyncHandler( async ( req, res,next ) =>
{
    
const existUser = await User.findOne( { email: req.body.email } )
if(existUser) return next(new Error("user already exist ",{cause:404}))
    // hash password
    const hashPassword = bcryptjs.hashSync(req.body.password)
    const user = await User.create( { ...req.body, password: hashPassword } )
    // token
    const token = jwt.sign({email :user.email},process.env.SECERT_KEY)
    // test send email
    const html = signUpTemp(`http://localhost:3000/auth/activate_accout/${token}`)
    const messageSent = await sendEmail( { 
        to: user.email,
        subject: "Account Activation",
        html
    } )
        if(!messageSent) return next(new Error("invalid Email",{cause:404}))
    res.json({ sucess : true , message : "user created successfully"})

} )

export const login = asyncHandler( async ( req, res,next ) =>
{
    // check user 
    const user = await User.findOne( { email: req.body.email } )
    if ( !user ) return next( new Error( "user not found", { cause: 404 } ) )
    // check activation
    if(!user.isConfirmed)return next( new Error( "account not activated ", { cause: 400 } ) )
    //check password
    const match = bcryptjs.compareSync( req.body.password, user.password )
    if ( !match ) return next( new Error( "password invalid", { cause: 400 } ) )
    const token = jwt.sign( { id: user._id, email: user.email }, process.env.SECERT_KEY )
    await Token.create( { token, user: user._id } )

    res.json({success :true , result :{token}})
} )

// activate accout
export const Activate = asyncHandler( async (req,res,next) =>
{
    const { token } = req.params
    // payload 
    const payload = jwt.verify( token, process.env.SECERT_KEY )
    // update 
    await User.findOneAndUpdate( { email: payload.email }, { isConfirmed: true } )
    return res.send("accout Activated ✅")
} )
//forget code 
export const sendForgetCode = asyncHandler( async (req,res,next) =>
{
    // check user 
    const user = await User.findOne( { email: req.body.email } )
    if ( !user ) return next( new Error( "user not found", { cause: 404 } ) )
       // check activation
    if ( !user.isConfirmed ) return next( new Error( "account not activated ", { cause: 400 } ) )
    // generate forget code 
    const code = randomstring.generate( {
        length: 5,
        charset:"numeric"
    })
    // save code in db
    user.forgetCode = code 
    await user.save()
    // send mail
    const html = resetPassTemp(code)
    const messageSent = await sendEmail( {
        to: user.email,
        subject: "Reset Password",
        html
    } )
    if ( !messageSent ) return next( new Error( "invalid Email", { cause: 400 } ) )
    return res.send("you can reset your password now")
} )
// reset password 
export const resetPassword = asyncHandler( async (req,res,next) =>
{
 // check user 
    const user = await User.findOne( { email: req.body.email } )
    if ( !user ) return next( new Error( "user not found", { cause: 404 } ) )
    // check code 
    if ( user.forgetCode !== req.body.code ) return next( new Error( "invalid Code ", { cause: 400 } ) )

    // hash password and update
    user.password = bcryptjs.hashSync( req.body.password, parseInt( process.env.SALT_ROUND ) )
    await user.save()
    // invalidate token
    const tokens = await Token.find( { user: user._id } )
    tokens.forEach( async (token) =>
    {
        token.isValid = false
        await token.save()
    } )
    res.json({ success : true , message :"password updated✅"})
} )

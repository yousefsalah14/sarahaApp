import express from 'express'
import dotev from "dotenv"
import { connectDB } from './DB/connection.js'
import authRouter from './src/modules/auth/auth.routes.js'
import messageRouter from './src/modules/messages/message.routes.js'
dotev.config()
const app = express()
const port = process.env.PORT
//parse 
app.use(express.json())
// db connection
await connectDB()
// routers
app.use("/auth",authRouter)
app.use("/message",messageRouter)
// page not found hanle
app.all('*',(req,res,next)=>{
    return next( new Error("page not Found",{cause:404}))
})

// global error handler
app.use((error,req,res,next)=>{
    const statusCode = error.cause || 500
    return res.status(statusCode).json({
        sucess : false ,
        message : error.message,
        stack: error.stack

    })
})

app.listen(port, () => console.log(` App listening on port ${port}!`))
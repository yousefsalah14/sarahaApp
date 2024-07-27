import { Schema, Types, model } from "mongoose";


const messageSchema = new Schema( {
    content: {
        type: String,
        required: true 
    },
    reciever: {
        type: Types.ObjectId,
        ref: "User",
        required:true
    }
}, { timestamps: true } )

// model
export const Message = model("Message",messageSchema)
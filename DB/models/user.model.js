import { Schema, model } from "mongoose";


const userSchema = new Schema( {
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 16,
        max : 70
    },
    name: {
        type: String,
        min: 5,
        max:20,
        required: true
    }
},{timestamps:true} )

//model
export const User = model("User",userSchema)
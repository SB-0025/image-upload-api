import mongoose from "mongoose";

const imgSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true 
    },
     imageUrl: {
        type: String,
        required: true
     },
     path: {
        type: String,
     },
     size: {
        type: Number
     }
}, {timestamps: true})

export const Image = mongoose.model("Image", imgSchema)

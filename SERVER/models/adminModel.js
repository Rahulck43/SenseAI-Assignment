import mongoose, { Schema } from "mongoose";



const adminSchema = Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const adminModel = mongoose.model('Admin', adminSchema)
export default adminModel
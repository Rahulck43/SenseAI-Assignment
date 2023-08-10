import mongoose, { Schema } from "mongoose";



const requestSchema = Schema({
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    token: {
        type: String,
        unique: true
    }
})

const requestModel = mongoose.model('Request', requestSchema)


export default requestModel
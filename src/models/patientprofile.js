const mongoose = require('mongoose')
const validator = require('validator')

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: String
    },
    userType: {
        type:String,
        required: true
    },
    address: {
        type: String,
        trim: true
    },
    phone: {
        type: String
    },
    weight: {
        type: Number
    },
    bloodGroup: {
        type: String,
        trim: true
    },
    disease: {
        type: String
    },
    description: {
        type: String
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }

},{
    timestamps: true
})


const PatientProfile = mongoose.model('PatientProfile', ProfileSchema)
module.exports = PatientProfile
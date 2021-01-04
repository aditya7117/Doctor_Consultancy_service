const mongoose = require('mongoose')
const validator = require('validator')

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    userType: {
        type:String,
        required: true
    },
    hospital: {
        type: String,
        trim: true
    },
    department: {
        type: String,
        trim: true
    },
    qualification : {
        type: String,
        trim: true
    },
    specialization: {
        type: String
    },
    address : {
        type: String,
        required: true
    },
    fee: {
        type: Number
    },
    account: {
        type: String,
        trim: true
    },
    holder: {
        type: String,
        trim: true
    },
    ifsc: {
        type: String,
        trim: true
    },
    feevalidity: {
        type: Number
    },
    phone: {
        type: String,
        trim: true
    },
    scheduleday: {
        type: String
    },
    scheduletime: {
        type: String
    },
    maxapp:{
        type: Number
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }

},{
    timestamps: true
})


const DoctorProfile = mongoose.model('DoctorProfile', profileSchema)
module.exports = DoctorProfile
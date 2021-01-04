const mongoose = require('mongoose')
const validator = require('validator')

const prescriptionSchema = new mongoose.Schema({
    appointmentId: {
        type: String
    },
    prescriptions: {
       type:String
   }

},{
    timestamps: true
})


const Prescription = mongoose.model('Prescription', prescriptionSchema)
module.exports = Prescription
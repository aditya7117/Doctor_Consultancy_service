const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Timestamp } = require('mongodb')


const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dp:{
        type:String,
        required: true
    },
    paymentDate:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    doctorId: {
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    patientId: {
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    doctorname: {
        type: String,
        required: true
    },
    transactionId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    }
},{
    Timestamp:true
})

appointmentSchema.statics.findByActiveCall = async (id) => {
    const appointment = await Appointment.find({ $or:[ {'patientId':id}, {'doctorId':id} ]})
    if(!appointment) {
        return appointment
    }
    return appointment
}

appointmentSchema.statics.findByTodaysAppointment = async (id, ad) => {
    const todayAppointment = await Appointment.find({ $and:[ {'doctorId':id}, {'dp':ad} ]})
    if(!todayAppointment) {
        return todayAppointment
    }
    return todayAppointment
}

appointmentSchema.statics.findByAllAppointment = async (id) => {
    const allAppointment = await Appointment.find({doctorId:id})
    if(!allAppointment){
        return allAppointment
    }
    return allAppointment
}

const Appointment = mongoose.model('Appointment',appointmentSchema)
module.exports = Appointment
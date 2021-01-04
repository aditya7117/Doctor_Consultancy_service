const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Timestamp } = require('mongodb')


const transactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount:{
        type: Number,
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
        type:String,
        required:true
    }
},{
    Timestamp:true
})

const Transaction = mongoose.model('Transaction',transactionSchema)
module.exports = Transaction
const express = require('express')
require('../db/mongoose')
const Prescription = require('../models/prescription')
const auth = require('../middleware/auth')
const { prescriptionMail } = require('../emails/account')


const routers = new express.Router()

routers.post('/prescription', auth, async (req, res) => {
    const prescription = new Prescription(req.body)
    try {
        await prescription.save()
        console.log(req.body)
        await prescriptionMail(req.user.email,req.body.prescriptions)
        console.log(req.user.email,req.body.prescriptions)
        res.status(201).send(prescription)
    }
    catch(e) {
        res.status(201).send(prescription)
    }

})


routers.get('/Getprescription/:id', auth, async (req, res) => {
    
    try{
        const prescription = await Prescription.find({appointmentId:req.params.id})
        if(!prescription){
            return res.status(200).send({prescription:'Message not found Not Found!'})
        }
        res.status(200).send(prescription)
    } catch(e){
        res.status(200).send(e)
    }

})



module.exports = routers
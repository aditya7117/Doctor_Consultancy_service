const express = require('express')
require('../db/mongoose')
const PatientProfile = require('../models/patientprofile')
const DoctorProfile = require('../models/doctorprofile')
const auth = require('../middleware/auth')
const Users = require('../models/users')

const routers = new express.Router()

routers.get('/publicdoctorprofiles', async (req, res) => {
    try{
        const doctors = await DoctorProfile.find({})
        if(!doctors){
            return res.status(404).send('No Doctor Found')
        }
        res.status(200).send(doctors)
    } catch(e){
        res.status(500).send(e)
    }
})

routers.get('/publicdoctorprofile/:id', async (req, res) => {
    try{
        const doctors = await DoctorProfile.findById(req.params.id)
        if(!doctors){
            return res.status(404).send('Doctor Not Found!')
        }
        res.status(200).send(doctors)
    } catch(e){
        res.status(500).send(e)
    }
})

routers.get('/publicpatientprofiles', async (req, res) => {
    try{
        const patient = await PatientProfile.find({})
        if(!patient){
            return res.status(404).send('No Patient Found')
        }
        res.status(200).send(patient)
    } catch(e){
        res.status(500).send(e)
    }
})

routers.get('/publicpatientprofile/:id', async (req, res) => {
    try{
        const patient = await PatientProfile.findById(req.params.id)
        if(!patient){
            return res.status(404).send('patient Not Found!')
        }
        res.status(200).send(patient)
    } catch(e){
        res.status(500).send(e)
    }
})

module.exports = routers
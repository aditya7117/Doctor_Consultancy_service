const express = require('express')
require('../db/mongoose')
const PatientProfile = require('../models/patientprofile')
const auth = require('../middleware/auth')
const { update } = require('../models/patientprofile')

const routers = new express.Router()

//create profile
routers.post('/patientprofile', auth, async (req, res) => {
    const patientprofile = new PatientProfile({
        ...req.body,
        owner: req.user._id
    })
    try{
        await patientprofile.save()
        res.status(201).send(patientprofile)
    } catch(e) {
        res.status(400).send(e)
    }

})

//edit profile


//get profile
routers.get('/patientprofile', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if(req.query.userType) {
        match.userType = req.query.userType === 'patient'
    }
    if(req.query.sortBy) {
        const part = req.query.sortBy.split(":")
        sort[part[0]] = part[1] === 'desc' ? -1 : 1
    }
    try{
        await req.user.populate({
            path: 'PatientProfile',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.PatientProfile)
    } catch(e) {
        res.status(500).send(e)
    }
})

routers.patch('/patientProfile/:id', auth, async (req,res) => {
    try{
       const patientprofile = await PatientProfile.findByIdAndUpdate(req.params.id, req.body,{new: true, runValidators:true})
       res.status(200).send(patientprofile)
    } catch(e){
        res.status(500).send(e)
    }  
})

routers.delete('/patientProfile/:id',auth, async (req, res) => {
    try{
        const patientprofile = await PatientProfile.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!patientprofile) {
            return res.status(404).send({error: 'Patient Not Found!'})
        }

        res.status(200).send(patientprofile)
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = routers
const express = require('express')
require('../db/mongoose')
const DoctorProfile = require('../models/doctorprofile')
const auth = require('../middleware/auth')

const routers = new express.Router()

//create profile
routers.post('/doctorprofile', auth, async (req, res) => {
    const doctorprofile = new DoctorProfile({
        ...req.body,
        owner: req.user._id
    })
    try{
        await doctorprofile.save()
        res.status(201).send(doctorprofile)
    } catch(e) {
        res.status(400).send(e)
    }

})

//edit profile


//get profile
routers.get('/doctorprofile', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if(req.query.userType) {
        match.userType = req.query.userType === 'doctor'
    }
    if(req.query.sortBy) {
        const part = req.query.sortBy.split(":")
        sort[part[0]] = part[1] === 'desc' ? -1 : 1
    }
    try{
        await req.user.populate({
            path: 'DoctorProfile',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.DoctorProfile)
    } catch(e) {
        res.status(500).send(e)
    }
})

routers.patch('/doctorProfile/:id', auth, async (req,res) => {
    try{
       const doctorprofile = await DoctorProfile.findByIdAndUpdate(req.params.id, req.body,{new: true, runValidators:true})
       res.status(200).send(doctorprofile)
    } catch(e){
        res.status(500).send(e)
    }  
})

routers.post('/filterDoctor', auth, async (req,res) => {
    try{
        const fdoctor = await DoctorProfile.find({specialization:req.body.specialization})
        if(!fdoctor){
            res.status(200).send(fdoctor)
        }
        res.status(200).send(fdoctor)
        
    }catch(e) {
        res.status(200).send({err: 'No Doctor Found'})
    }
})

routers.delete('/doctorProfile/:id',auth, async (req, res) => {
    try{
        const doctorprofile = await DoctorProfile.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!doctorprofile) {
            return res.status(404).send({error: 'Patient Not Found!'})
        }

        res.status(200).send(doctorprofile)
    } catch(e) {
        res.status(500).send(e)
    }
})



module.exports = routers
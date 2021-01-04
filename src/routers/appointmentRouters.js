const express = require('express')
require('../db/mongoose')
const PatientProfile = require('../models/patientprofile')
const DoctorProfile = require('../models/doctorprofile')
const Appointment = require('../models/appointment')
const auth = require('../middleware/auth')
const Users = require('../models/users')

const routers = new express.Router()

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

routers.get('/ActiveCallList', auth, async(req, res) => {
    try {
        const appointment = await Appointment.findByActiveCall(req.user._id)
        console.log(appointment)
        res.send(appointment)
    } catch {
        res.send({err: "No Active call found"})
    }
})


routers.get('/TodaysAppointment', auth, async(req, res) => {
    try{
        var datetime = new Date();
        
        var donly = await formatDate(datetime)

        var dstr = donly.toString()
        console.log(dstr);
        //console.log(dop)

        const tappointment = await Appointment.findByTodaysAppointment(req.user._id,dstr)
        console.log(tappointment)
        res.send(tappointment)
    } catch(e){
        res.send({err: "No Appointment found"})
    }
})

routers.get('/AllAppointment', auth, async(req,res) => {
    try{
        const allappointment = await Appointment.findByAllAppointment(req.user._id)
        console.log(allappointment)
        res.send(allappointment)
    } catch(e){
        res.send({err: "No Appointment found"})
    }
})

routers.patch('/ModifyAppointment', auth, async (req,res) => {
    try{
       const appointment = await Appointment.findById(req.body._id)
       console.log(typeof(req.body.dp))
       console.log(req.body._id)
       console.log(appointment)
       console.log(typeof(appointment.dp))
       appointment.dp=req.body.dp

       await appointment.save()
       res.status(200).send(appointment)
    } catch(e){
       res.status(500).send(e)
    }  
})

routers.post('/AvailableAppoinment', auth, async (req,res) => {
    try{
        
        var total = await Appointment.find({$and:[ {'doctorId':req.body.doctorId}, {'dp':req.body.dp} ]}).count()
        if(total < req.body.maxapp){
            res.status(200).send({result: 'Yes Appointment Available!'})
        }
        res.status(200).send({result: 'Sorry appointment not available please select other day'})

    } catch(e) {
        res.status(200).send({result: 'Not Available'})
    }
})

module.exports = routers
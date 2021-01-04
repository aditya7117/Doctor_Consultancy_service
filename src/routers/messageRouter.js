const express = require('express')
require('../db/mongoose')
const Message = require('../models/message')
const auth = require('../middleware/auth')

const routers = new express.Router()

routers.post('/message', auth, async (req, res) => {
    req.body.mesage = req.body
    req.body.owner = req.user._id
    const message = new Message(req.body)
    try {
        await message.save()
        console.log(req.body)
        res.status(201).send(message)
    }
    catch(e) {
        res.status(201).send(message)
    }

})


routers.get('/Getmessage', auth, async (req, res) => {
    
    try{
        const message = await Message.find({owner:req.user._id})
        if(!message){
            return res.status(200).send({message:'Message not found Not Found!'})
        }
        res.status(200).send(message)
    } catch(e){
        res.status(200).send(e)
    }

})



module.exports = routers
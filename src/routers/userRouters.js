const express = require('express')
const Users = require('../models/users')
require('../db/mongoose')
const { sendWelcomeMail, sendCancelMail, forgotPasswordMail} = require('../emails/account')
const auth = require('../middleware/auth')
const routers = new express.Router()

let otp;

// SignUp User
routers.post('/users/signup', async (req, res) => {
    const users = new Users(req.body)
    otp = Math.floor(Math.random()*90000) + 10000;
    try {
        await users.save()

        await sendWelcomeMail(users.email, otp)

        const token = await users.generateToken()
        res.status(201).send({users, token,otp})
    }
    catch(e) {
        res.status(400).send(e)
    }
})

routers.post('/users/otpVerify', async (req, res) => {
    const clientotp = Number(req.body.otp);
    if(clientotp === otp){
        return res.status(200).send({ serverotp:otp, clientotp:clientotp, result: true })
    }
    res.status(400).send({ serverotp:otp, clientotp:clientotp, result: false })
})

routers.post('/users/login', async (req, res) => {
    try{
        const users = await Users.findByCredentials(req.body.email, req.body.password)
        const token = await users.generateToken()
        res.status(201).send({ users, token })
    } catch(e) {
        res.status(400).send(e)
    }
})

routers.get('/users/me', auth, async (req, res) => {
    res.status(200).send(req.user)
})

routers.post('/users/logout', auth, async (req,res) => {
    try{
       req.user.tokens = req.user.tokens.filter((token) => {
           return token.token != req.token
       }) 
       await req.user.save()
       res.status(200).send({message:'You have succesfully logout'})
    } catch(e){
        res.status(500).send()
    }
})

routers.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.status(200).send({message:'Succesfully logout from all devices'})
    } catch(e) {
        res.status(500).send()
    }
})

routers.delete('/users/me', auth, async (req,res) => {
    try{
        await sendCancelMail(req.user.email, req.user.firstName)
        await req.user.remove()
        res.status(200).send({message: 'You Successfully removed'})
    } catch(e) {
        res.status(500).send(e)
    }
})

routers.post('/users/sendforgotmail', async (req, res) => {
    otp = Math.floor(Math.random()*90000) + 10000;
    try{
        const users = await Users.findByEmail(req.body.email)
        if(!users){
            return res.status(404).send({message: 'Email is not Register with us'})
        }
        await sendWelcomeMail(req.body.email, otp)
        res.status(200).send({message: otp})
    } catch (e) {
        res.status(500).send({message: 'Email is not Register with us.'})
    }
})

routers.patch('/users/me', async (req, res) => {
    try{
        const users = await Users.findByEmail(req.body.email)
        console.log(users)
        if(!users){
            return res.status(404).send({message: 'Email is not Register with us'})
        }
        users.password = req.body.password
        await users.save()
        res.status(200).send(users)
    } catch(e) {
        res.status(500).send({message: 'Email is not Register with us.'})
    }
})

module.exports = routers
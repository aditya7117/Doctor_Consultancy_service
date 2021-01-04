const express = require('express')
const Transaction = require('../models/transaction')
const Appointment = require('../models/appointment')
require('../db/mongoose')
var Razorpay = require('razorpay');
const auth = require('../middleware/auth')
const {appointmentMail} = require('../emails/account')

const routers = new express.Router()

var instance = new Razorpay({
  key_id:'rzp_test_Nz2S0TWQ6SI3kr',
  key_secret: 'VCgO5xh3Nsdhky3FVdKP8FO9'
})

routers.post('/razorPayOrder', auth,(req,res,next) => {
  var options = {
    amount: req.body.amount*100,
    currency: "INR",
    receipt: "Order0141",
    payment_capture: 0,
  };
  instance.orders.create(options, async (err,order) => {
    if(err){
      console.log(err);
      next(err);
    }
    if(order){
      console.log("payment Successfully")
      console.log(req.body)
      console.log(req.user._id)
      console.log(typeof(req.body))
      req.body.patientId=req.user._id
      console.log(req.body)
      console.log(typeof(req.body))
      const transaction = new Transaction(req.body)
      try{
        const tran = await transaction.save()
        console.log("transaction saved")
        req.body.transactionId=tran._id
        req.body.paymentDate=req.body.dp
        console.log(req.body)
        const appointment = new Appointment(req.body)
        await appointment.save()
        await appointmentMail(req.body.email, req.body.dp)
      } catch(e){
        res.status(400).send(e)
      }
      res.json({success: true, status:"Order created Successfully", value: order,key:"rzp_test_Nz2S0TWQ6SI3kr"})
    }
  })
});


module.exports = routers
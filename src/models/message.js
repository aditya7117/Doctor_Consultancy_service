const mongoose = require('mongoose')
const validator = require('validator')

const messageSchema = new mongoose.Schema({
    owner: {
        type: String
    },
    mesage:[{
        msg: String,
        user:String,
        date:String,
        from:String
    }] 

},{
    timestamps: true
})


const Message = mongoose.model('Message', messageSchema)
module.exports = Message
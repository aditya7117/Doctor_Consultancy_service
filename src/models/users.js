const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const DoctorProfile = require('./doctorprofile')
const PatientProfile = require('./patientprofile')


const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Invalid Mail')
            }
        }
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userType: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value) {
            if(value.includes('password')){
                throw new Error('password can\'t contains password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

},{
    timestamps : true
})

userSchema.virtual('DoctorProfile', {
    ref: 'DoctorProfile',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('PatientProfile',{
    ref: 'PatientProfile',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//Method to generate token 
userSchema.methods.generateToken = async function() {
    const user = this
    const token = await jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })

    await user.save()

    return token
}

//Checking email is register with us or not
userSchema.statics.findByCredentials = async (email,password) => {
    const users = await Users.findOne({email: email})

    if(!users) {
        throw new Error ('This Email id is not register with us')
    }
    const isMatch = await bcrypt.compareSync(password, users.password)

    if(!isMatch) {
        throw new Error('Email id and password doesn\'t match')
    }

    return users
}

userSchema.statics.findByEmail = async (email) => {
    const users = await Users.findOne({email: email})
    if(!users) {
        throw new Error ('This Email id is not register with us')
    }
    return users
}

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hashSync(user.password, 8)
    }
    next()
})

//Delete the profile when user leave the application

userSchema.pre('remove', async function (next) {
    const user = this
    await PatientProfile.deleteMany({ owner: user._id })
    await DoctorProfile.deleteMany({ owner: user._id })
    next()
})


const Users = mongoose.model('Users', userSchema)

module.exports = Users
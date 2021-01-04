const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeMail = (email, otp) => {
    sgMail.send({
        to: email,
        from: 'msanaullahmdb@gmail.com',
        subject: 'Welcome to DPCS',
        text: `Hi user your otp is ${otp} welcome to DPCS`
    })
}

const sendCancelMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'msanaullahmdb@gmail.com',
        subject: 'Successfully removed from DCS',
        text: `Hi ${name} hope i will see you back to DPCS`
    })
}

const forgotPasswordMail = (email, otp) => {
    sgMail.send({
        to: email,
        from: 'msanaullahmdb@gmail.com',
        subject: 'Forgot password OTP',
        text: `Hi user your otp is ${otp} to forgot your password`
    })
}

const appointmentMail = (email, date) => {
    sgMail.send({
        to:email,
        from: 'msanaullahmdb@gmail.com',
        subject: 'Successfully booked appointment',
        text: `Hii dear you have successfully booked your appointment on ${date} and i wish you will get well soon  `
    })
}

const prescriptionMail = (email, pres) => {
    sgMail.send({
        to:email,
        from: 'msanaullahmdb@gmail.com',
        subject: 'Successfully booked appointment',
        text: `Hii dear Thank you for choosing us your Prescription is ${pres} please follow it as per doctor instruction and i wish you will get well soon  `
    })
}

module.exports = {
    sendWelcomeMail,
    sendCancelMail,
    forgotPasswordMail,
    appointmentMail,
    prescriptionMail
}
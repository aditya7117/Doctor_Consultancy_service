const express = require('express') 
const cors = require('cors')
const UserRouters = require('./routers/userRouters')
const DoctorRouter = require('./routers/doctorprofileRouters')
const PatientRouter = require('./routers/patientprofileRouters')
const PublicRouter = require('./routers/publicRouter')
const PayRouter = require('./routers/pay')
const AppointmentRouter = require('./routers/appointmentRouters')
const MessageRouter = require('./routers/messageRouter')
const PrescriptionRouter = require('./routers/prescriptionRouter')

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(UserRouters)
app.use(DoctorRouter)
app.use(PatientRouter)
app.use(PublicRouter)
app.use(PayRouter)
app.use(AppointmentRouter)
app.use(MessageRouter)
app.use(PrescriptionRouter)

app.listen(port, () => {
    console.log('server up on port ' + port)
})
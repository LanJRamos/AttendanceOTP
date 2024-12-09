import express from "express"
import cors from 'cors'
import cookieSession from "cookie-session"
import employeeRouter from "./src/routes/employee.router.js"
import userRouter from "./src/routes/user.router.js"
import daySessionRouter from "./src/routes/daysession.router.js"
import holidaysRouter from "./src/routes/holiday.router.js"
import leavesRouter from "./src/routes/leaves.router.js"
import logsRouter from "./src/routes/logs.router.js"
import reasonRouter from "./src/routes/reason.router.js"
import shiftRouter from "./src/routes/shift.router.js"
import addressRouter from "./src/routes/address.router.js"
import leaveDaysRouter from './src/routes/leaveDays.router.js'

const app = express()

app.set('trust_proxy',1)

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieSession({
    name: 'sesssion',
    keys: ['7478c724-da6e-4a61-9cc1-1adb2edd983a','c84e8598-73a7-492a-9254-3800fb73d1e2'],
    secret: 'Hpj3T!nKPr1n3R',
    httpOnly: true,
    maxAge: 20 * 60 * 1000
}))

app.use('/employee',employeeRouter)
app.use('/user',userRouter)
app.use('/daysession',daySessionRouter)
app.use('/holidays',holidaysRouter)
app.use('/leaves',leavesRouter)
app.use('/logs',logsRouter)
app.use('/reasons',reasonRouter)
app.use('/shift',shiftRouter)
app.use('/address',addressRouter)
app.use('/leavedays',leaveDaysRouter)

app.get('*',(res,req)=>{
    req.send('404 Page not Found')
})
app.listen(8080,()=>{
    console.log(`Server is listening on port 8080`)
})
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const config = require('config')
const mysql = require('mysql')


const app = express()

const port = process.env.PORT || 3000


//import routes
// const authRouter = require('./api/users/auth')
const userRouter = require("./api/users/user.router")
const vehicleRouter = require("./api/vehicle/vehicle.router")

//router Middlewares
app.use(express.json()) 
app.use("/api/v1/users", userRouter)
app.use("/api/v1/vehicle", vehicleRouter)

// app.use('/api/v1/auth/', authRouter)


app.listen(port, () =>{
    console.log(`App started at the following port & URL http://localhost:${port}`)
})
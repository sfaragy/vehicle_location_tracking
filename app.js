const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const config = require('config')
const mysql = require('mysql')

// for admin dashboard login // 
const path = require('path')
const bodyparser = require('body-parser')
const session = require('express-session')
const cookieParser = require("cookie-parser")
const {v4:uuidv4} = require('uuid')
// ----------

const app = express()

const port = process.env.PORT || 3000

// for admin login (bodyparser + uuid)
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(cookieParser());

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))

// ------------
// dashboard template credit: https://www.tailwindtoolbox.com/templates/minimal-admin-template
// View Engine set as EJS
app.set('view engine', 'ejs')
// static asset
app.use('/static', express.static(path.join(__dirname, 'views/assets/public')))
app.use('/other_assets', express.static(path.join(__dirname, 'views/assets/public/other_assets')))



//import routes
// const authRouter = require('./api/users/auth')
const userRouter = require("./api/users/user.router")
const vehicleRouter = require("./api/vehicle/vehicle.router")
const adminRouter = require("./api/admin/admin.router")

//router Middlewares
app.use(express.json()) 
app.use("/api/v1/users", userRouter)
app.use("/api/v1/vehicle", vehicleRouter)
app.use("/admin", adminRouter) 




app.get('*', function(req, res){
    res.status(404).send("404 Not Found")
  });

app.listen(port, () =>{
    console.log(`App started at the following port & URL http://localhost:${port}`)
})
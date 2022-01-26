const express = require('express')
const config = require('config')


const app = express()

const port = process.env.PORT || 3000



app.listen(port, () =>{
    console.log(`App started at the following port & URL http://localhost/${port}`)
})


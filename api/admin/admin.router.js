const { adminLoginAuthentication } = require("../admin/admin.controller")

const router = require("express").Router()

const { validateToken } = require("../../api/auth/auth_verify_by_jwt")


// Prepare admin login view
router.get('/login', (req,res)=>{
    res.render('admin/login', {title:"Login Form"})
}) 

router.post("/adminLoginAuthentication", adminLoginAuthentication)
router.get("/dashboard", validateToken, (req, res)=>{
    
    res.render('admin/dashboard', {})
})

module.exports = router


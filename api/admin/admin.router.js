const { 
    adminLoginAuthentication, 
    getDashboardData,
    loginPage,
    logout,
    getAllVehicles,
    renderVehicles,
    getVehicleLocations
} = require("../admin/admin.controller")

const router = require("express").Router()
// const cookieParser = require("cookie-parser")

const { validateTokenForAdminWeb } = require("../../api/auth/auth_verify_by_jwt")

 


// Prepare admin login view
router.get(['/login', '/'], loginPage)
router.post("/adminLoginAuthentication", adminLoginAuthentication)
router.get("/dashboard", validateTokenForAdminWeb, getDashboardData)
// router.get("/vehicles", validateTokenForAdminWeb, renderVehicles)
router.get(["/vehicles/:page_id", "/vehicles"], validateTokenForAdminWeb, renderVehicles)
router.get("/vehicle_locations/:vehicle_id", validateTokenForAdminWeb, getVehicleLocations)
router.get('/logout', logout)
 
module.exports = router


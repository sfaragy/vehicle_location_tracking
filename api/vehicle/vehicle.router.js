const { 
    addVehicle,
    updateVehicle,
    deleteVehicle,
    getAllVehicles,
    getVehicleByid
} = require("../vehicle/vehicle.controller")

const router = require("express").Router()
// JWT token validation
const { validateToken } = require("../auth/auth_verify_by_jwt")

router.post("/addVehicle", validateToken, addVehicle)
router.patch("/updateVehicle", validateToken, updateVehicle)
router.delete("/deleteVehicle", validateToken, deleteVehicle)
router.get("/getAllVehicles", validateToken, getAllVehicles)
router.get("/getVehicleByid", validateToken, getVehicleByid)


module.exports = router
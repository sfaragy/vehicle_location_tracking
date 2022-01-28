const {
    addVehicleInList,
    updateVehicleByVehicleId,
    deleteVehicleById,
    getAllVehiclesOfUser,
    getVehicleByVehicleId
 } = require("../vehicle/vehicle.service")

const dotenv = require("dotenv")
const { create } = require("../users/user.service")

module.exports = {
    addVehicle: (req, res) =>{
        const body = req.body

        addVehicleInList(body, req.jwt_user_id, (err, results)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            } 

            if(!results){
                return res.status(400).json({
                    success: 0,
                    message: "Unable to add vehicle"
                })
            }
            console.log("Vehicle added to the list")
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    updateVehicle: (req, res) =>{
        const body = req.body
        updateVehicleByVehicleId(body, req.jwt_user_id, (err, results)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }

            if(!results){
                return res.status(400).json({
                    success: 0,
                    message: "Unable to update vehicle information"
                })
            }

            console.log("Vehicle information updated!")
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    deleteVehicle: (req, res) =>{
        const body = req.body

        deleteVehicleById(body, req.jwt_user_id, (err, results)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if(!results){
                return res.status(400).json({
                    success: 0,
                    message: "Unable to delete vehicle"
                })
            }

            console.log("Vehicle information deleted!")
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getAllVehicles: (req, res) =>{
        const body = req.body
        getAllVehiclesOfUser(body, req.jwt_user_id, (err, results)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if(!results){
                return res.status(400).json({
                    success: 0,
                    message: "Unable to get information"
                })
            }

            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getVehicleByid: (req, res)=>{
        const body = req.body
        getVehicleByVehicleId(body, req.jwt_user_id, (err, results) =>{
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if(!results){
                return res.status(400).json({
                    success: 0,
                    message: "Unable to get information"
                })
            }

            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    }
}
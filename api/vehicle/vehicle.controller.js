const {
    addVehicleInList,
    updateVehicleByVehicleId,
    deleteVehicleById,
    getAllVehiclesOfUser,
    getVehicleByVehicleId,
    logLocation,
    locationTestSlot,
    timeLocation,
    timeLocationUpdate
 } = require("../vehicle/vehicle.service")

//  Moment helps to formate the date as you we wish
const moment= require("moment") 

const fetch = require("cross-fetch")

const dotenv = require("dotenv")
const { create } = require("../users/user.service")

// To parse json object
const parseJsonAsync = (jsonString) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(JSON.parse(jsonString))
      })
    })
  }

  
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
        getAllVehiclesOfUser(req.jwt_user_id, (err, results)=>{
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
            if(results.length==0){
                return res.status(400).json({
                    success: 0,
                    message: "You have not added such a vehicle yet"
                })
            }

            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    logLocation: (req, res) =>{
       
        const body = req.body
        const vehicle_ids_array = Object.values(JSON.parse(JSON.stringify(req.custom_records)))
        // console.log(req.custom_records)
        // console.log(vehicle_ids_array)
        // console.log(body)
        var time_now = new Date()               
        time_now = moment(time_now).format('YYYY-MM-DD HH:mm:ss')

        const longitude_lat_data = {
            "longitude": body.longitude,
            "latitude": body.latitude,
            "time": time_now
        }

       
        
        let data_to_time_location = JSON.stringify(longitude_lat_data) 

        

        locationTestSlot(body.vehicle_id, vehicle_ids_array, (err, validateLocation)=>{
            if(err){
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }

            if(!validateLocation){
                return res.status(400).json({
                    success: 0,
                    message: "Unable to get information"
                })
            }

            // console.log(validateLocation)

            if(validateLocation.length==0){
                logLocation(body, vehicle_ids_array, (err, results)=>{
                        if(err){
                            return res.status(400).json({
                                success: 0,
                                message: err
                            })
                        }
                        if(!results){
                            return res.status(400).json({
                                success: 0,
                                message: "Unable to update information"
                            })
                        }
                           console.log(results.insertId)
                          
                        timeLocation(results.insertId, data_to_time_location, (err, results_inner)=>{
                            if(err){
                                return res.status(400).json({
                                    success: 0,
                                    message: err
                                })
                            }
        
                            if(!results_inner){
                                return res.status(400).json({
                                    success: 0,
                                    message: "Unable to update information"
                                })
                            }
        
                            return res.status(200).json({
                                success: 1,
                                data: results_inner
                            })
            
                        })
                    
                        
                })
            } else {
               
                try{
                    const response_last_location = Object.values(JSON.parse(JSON.stringify(validateLocation)))

                
                    let response_last_location_array = JSON.parse(response_last_location[0].time_log)
                    let longitude_str = response_last_location_array[0].longitude
                    let latitude_str = response_last_location_array[0].latitude
                    let main_long = body.longitude 
                    let main_lat = body.latitude
                
                    // console.log(response_last_location[0].time_log)

                    // console.log( longitude_str + " Stringfy " + latitude_str )
                    // console.log( main_long + " Non Stringfy " + main_lat )
            
                    if(longitude_str === main_long && latitude_str === main_lat){
                        console.log("Vehicle is in rest position")
                        return res.status(400).json({
                            success: 0,
                            message: "No location updates in rest position"
                        })
                    }
                    

                    data_to_time_location = "[" + data_to_time_location.concat(",", response_last_location[0].time_log.replace("[", "").replace("]", "")) + "]"

                

                    console.log(response_last_location)
                    timeLocationUpdate(response_last_location[0].time_log_id, data_to_time_location, (err, results_inner)=>{
                        if(err){
                            return res.status(400).json({
                                success: 0,
                                message: err
                            })
                        }

                        if(!results_inner){
                            return res.status(400).json({
                                success: 0,
                                message: "Unable to update information"
                            })
                        }

                        return res.status(200).json({
                            success: 1,
                            data: results_inner
                        })
        
                    })
                } catch(err){
                    return res.status(400).json({
                        success: 0,
                        message: "Unwanted issue occured"
                    }) 
                }
            }
    
        })


        // logLocation(body,
        //     vehicle_ids_array,
        //     (err, results)=>{
        //         if(err){
        //             return res.status(400).json({
        //                 success: 0,
        //                 message: err
        //             })
        //         }
        //         if(!results){
        //             return res.status(400).json({
        //                 success: 0,
        //                 message: "Unable to update information"
        //             })
        //         }
        //            console.log(results.insertId)
        //         //    return res.status(400).json({
        //         //     success: 0,
        //         //     message: "Unable to update information"
        //         // })
                

        //         timeLocation(results.insertId, (err, results_inner)=>{
        //             if(err){
        //                 return res.status(400).json({
        //                     success: 0,
        //                     message: err
        //                 })
        //             }

        //             if(!results_inner){
        //                 return res.status(400).json({
        //                     success: 0,
        //                     message: "Unable to update information"
        //                 })
        //             }

        //             return res.status(200).json({
        //                 success: 1,
        //                 data: results_inner
        //             })
    
        //         })
            
                
        // })
    }

    
}
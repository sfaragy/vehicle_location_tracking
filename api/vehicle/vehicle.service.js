const pool = require("../../config/database_connect")
// in future we can do PoolCluster


function getALlListsOfVehiclesByUserId(req, res, next ) {
    pool.query("SELECT vehicle_id FROM vehicle WHERE user_id=?",[req.jwt_user_id], function (err, rows) {
        req.custom_records = rows;
        next();
    })
}


function getLocationId(req, res, next ) {
    pool.query("SELECT location_id FROM locations WHERE vehicle_id=?",[req.body.vehicle_id], function (err, rows) {
        req.custom_location_id = rows;
        next();
    })
}

module.exports = {
    addVehicleInList: (data, jwt_user_id, callBack) =>{
    
        // let user_id = jwt_user_id
        pool.query(
            `INSERT INTO vehicle(type_id, user_id, gps_device_id, image, status)
             VALUES(?, ?, ?, ?, ?)`,
             [
                 data.type_id,
                 jwt_user_id,
                 data.gps_device_id,
                 data.image,
                 data.status
             ],
             (err, results, fields) =>{
                 if(err){
                     return callBack(err)
                 }
      
                 return callBack(null, results)
             
             }
        )
        
    },
    updateVehicleByVehicleId: (data, jwt_user_id, callBack)=>{
        pool.query(
            `UPDATE vehicle SET type_id=?, gps_device_id=?, image=?, status=? WHERE user_id=? AND vehicle_id=?`,
            [
                data.type_id,
                data.gps_device_id,
                data.image,
                data.status,
                jwt_user_id,
                data.vehicle_id
            ],
            (err, results, fields) =>{
                if(err){
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },
    deleteVehicleById: (data, jwt_user_id, callBack)=>{
        pool.query(
            `DELETE FROM vehicle WHERE user_id=? AND vehicle_id=?`,
            [
                jwt_user_id,
                data.vehicle_id
            ],
            (err, results, fields) =>{
                if(err){
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },
    getAllVehiclesOfUser: (jwt_user_id, callBack)=>{
        
        pool.query(
            `SELECT * FROM vehicle WHERE user_id= ?`,
            [
                jwt_user_id
            ],
            (err, results, fields)=>{
                if(err){
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },
    getVehicleByVehicleId: (data, jwt_user_id, callBack)=>{
        pool.query(
            `SELECT * FROM vehicle WHERE user_id=? AND vehicle_id=?`,
            [
                jwt_user_id,
                data.vehicle_id
            ],
            (err, results, fields) =>{
                if(err){
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },
    logLocation: (data, vehicle_id_array, callBack)=>{

        let authorized_vehicle_id = vehicle_id_array.some(function(item) {
            return item.vehicle_id === data.vehicle_id
          });

        if(authorized_vehicle_id==false){
            return callBack("Unauthorized vehicle trying to update timelog") 
        }

        
        pool.query(
            `INSERT INTO locations(vehicle_id, longitude, latitude) VALUES(?, ?, ?)`,
            [
                data.vehicle_id,
                data.longitude,
                data.latitude
            ],
            (err, results, fields)=>{
                if(err){
                    return callBack(err)
                }

                return callBack(null, results)


            }
        )

        pool.query(
            `INSERT INTO time_location(vehicle_id, longitude, latitude) VALUES(?, ?, ?)`,
            [
                data.vehicle_id,
                data.longitude,
                data.latitude
            ],
            (err, results, fields)=>{
                if(err){
                    return callBack(err)
                }

                return callBack(null, results)


            }
        )
    },
    getALlListsOfVehiclesByUserId: getALlListsOfVehiclesByUserId

}
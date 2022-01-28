const pool = require("../../config/database_connect")
// in future we can do PoolCluster
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
    getAllVehiclesOfUser: (data, jwt_user_id, callBack)=>{
        let user_id = data.user_id
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
    }

}
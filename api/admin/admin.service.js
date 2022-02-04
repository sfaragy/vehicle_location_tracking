const pool = require("../../config/database_connect")
const { getUserByEmail } = require("../users/user.service")
module.exports = {
    adminLogin: getUserByEmail,
    getDashboardData: (callBack)=>{        
        pool.query(
            `SELECT COUNT(*) as total_users FROM users WHERE 1`,
            [],
            (err, results, fields)=>{
                if(err){
                    console.log(err)
                    return callBack(err)
                }
                return callBack(null, results[0]['total_users']) 
            }
        ) 
    },
    getAllVehiclesList: (page_id, vehicle_per_page, callBack)=>{  
        const limit_low = ((page_id-1) * vehicle_per_page)      
        const limit_high = (page_id * vehicle_per_page)      
        pool.query(
            `SELECT DISTINCT V.*, U.first_name, U.last_name, U.email, U.mobile, U.address,
                (SELECT date 
                    FROM locations WHERE vehicle_id=V.vehicle_id ORDER BY id DESC LIMIT 0,1) as log_time,    
                    (SELECT CONCAT(longitude,',',latitude) 
                    FROM locations WHERE vehicle_id=V.vehicle_id ORDER BY id DESC LIMIT 0,1) as present_location, 
                (SELECT name FROM vehicle_type WHERE type_id=V.type_id) as vehicle_type, (SELECT COUNT(*) as total_rows FROM vehicle WHERE 1 ) as total_records
                FROM vehicle V LEFT JOIN users U 
                    ON V.user_id = U.user_id WHERE 1 AND U.user_id is not null ORDER BY V.vehicle_id LIMIT ?,? `,
            [
                limit_low,
                limit_high
            ],
            (err, results, fields)=>{ 
                if(err){
                    console.log(err)
                    return callBack(err)
                }
                return callBack(null, results) 
            }
        ) 
    },
    getTotalsOfAllVehiclesList: (callBack)=>{      
        pool.query(
            `SELECT COUNT(*) as total_record
                FROM vehicle V LEFT JOIN users U 
                    ON V.user_id = U.user_id WHERE 1 AND U.user_id is not null ORDER BY V.vehicle_id`,
            [
            ],
            (err, results, fields)=>{ 
                if(err){
                    console.log(err)
                    return callBack(err)
                }
                return callBack(null, results) 
            }
        ) 
    },
}

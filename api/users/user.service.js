// import pool
const pool = require("../../config/database_connect")

module.exports = {
   create: (data, callBack)=>{
       pool.query(
           `INSERT INTO users(group_id, email, mobile, password, first_name, last_name, address, status)
           VALUES(?,?,?,?,?,?,?,?)`,
           [
            data.group_id,
            data.email,
            data.mobile,
            data.password,
            data.first_name,
            data.last_name,
            data.address,
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
   getUsers: callBack =>{
        pool.query(
            `SELECT user_id,group_id, email, mobile, password, first_name, last_name, address, status from users`,
            [],
            (err, results, fields) =>{
                if(err){
                    return callBack(
                        err
                    )
                }
                return callBack(null, results)
            }

        )
    },
    getUserById: (user_id, callBack) =>{
         pool.query(
             `SELECT user_id,group_id, email, mobile, password, first_name, last_name, address, status FROM users WHERE user_id = ?`,
             [user_id],
             (err, results, fields) =>{
                 if(err){
                     return callBack(
                         err
                     )
                 }
                 return callBack(null, results[0])
             }
 
         )
     },
    updateUser: (user_id, data, callBack) =>{
        pool.query(
            `UPDATE users SET group_id = ?, email = ?, mobile = ?, first_name = ?, last_name = ?, address = ?, status = ? WHERE user_id = ?`,
            [ 
                data.group_id,
                data.email,
                data.mobile,
                data.first_name,
                data.last_name,
                data.address,
                data.status,
                user_id 
            ],
            (err, results, fields) =>{
                if(err){
                    return callBack(err)
                }
                return callBack(null, results[0])
            }

        )
    },
    updatePasswordByUserId: (user_id, data, callBack) =>{
        pool.query(
            `UPDATE users SET password = ? WHERE user_id = ?`,
           [
                data.password,
                user_id
            ],
            (err, results, fields) =>{
                if(err){
                    return callBack(err)
                }
                return callBack(null, results)
            }

        )
    },
    deleteUser: (user_id, callBack) =>{
        
        pool.query(
            `DELETE FROM users WHERE user_id = ?`,
        
            [user_id],
            (err, results, fields) =>{
                if(err){
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },
    getUserByEmail: (email, callBack) =>{
         pool.query(
             `SELECT user_id,group_id, email, mobile, password, first_name, last_name, address, status FROM users WHERE email = ?`,
             [email],
             (err, results, fields) =>{
                 if(err){
                     return callBack(
                         err
                     )
                 }
                 return callBack(null, results[0])
             }
 
         )
     }
}

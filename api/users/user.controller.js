const { 
    create, 
    getUsers, 
    getUserById,
    updateUser, 
    updatePasswordByUserId, 
    deleteUser, 
    getUserByEmail 
} = require("./user.service")

// bcrypt for data encryption
const { genSaltSync, hashSync, compareSync } = require("bcrypt")

// db connection
const pool = require("../../config/database_connect")

// Environment variable configuration
const { config } = require("dotenv")

// JWT for json web token
const { sign } = require("jsonwebtoken")


module.exports = {
    createUser: (req, res)=>{
        const body = req.body

        const salt = genSaltSync(11)
        console.log(salt)
        body.password = hashSync(body.password, salt)

        create(body, (err, results)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }             
            if(!results){
                return res.status(400).json({
                    success:0,
                    message:"Unable register new user!"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getUserBySelectedId: (req, res) =>{
        const user_id = req.params.user_id 
        getUserById(user_id, (err, results) =>{
            if(err){
                console.log(err)
                return;
            }

            if(!results){
                return res.status(400).json({
                    success:0,
                    message:"User not found"
                })
            }

            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getAllUsers: (req, res) =>{
        getUsers((err,results) =>{
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.status(400).json({
                    success: 0,
                    message: "No records found"
                })

            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    updateSelectedUser: (req, res) =>{
        const body = req.body
        // const salt = genSaltSync(11)
        // body.password = hashSync(body.password, salt)
        const user_id = req.params.user_id
        updateUser(user_id, body, (err, results)=>{
            if(err){
                console.log(err)
                return res.status(406).json({
                    success: 1,
                    message: "Not acceptable"
                })
            }
            
            if(!results){
                return res.status(400).json({
                    success:0,
                    message:"Unable to update user profile"
                })
            }
            return res.status(200).json({
                success: 1,
                message:"User Data Updated"
            })
        })
    },
    resetPassword: (req, res) =>{
        const body = req.body

        const salt = genSaltSync(11)
        body.password = hashSync(body.password, salt)
        const user_id = req.params.user_id
        updatePasswordByUserId(user_id, body, (err, results) => {
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.status(400).json({
                    success:0,
                    message:"Unable to reset password"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Password has been reset!"
            })
            
        })
    },
    deleteUser: (req, res) =>{
        const user_id = req.params.user_id
        deleteUser(user_id, (err, results)=>{
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.status(400).json({
                    success:0,
                    message:"User not found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: results
            })
        })
    },
    getAuthToken: (req, res) =>{
        const body = req.body
        getUserByEmail(body.email, (err, results)=>{
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.json({
                    success:0,
                    data: "Invalid email or password"
                })
            }
            const is_authorized = compareSync(body.password, results.password)
            if(is_authorized){
                results.password = undefined
                const current_jsonwebtoken = sign({result: results}, process.env.JWT_SECRET, {expiresIn: "1h"})
                return res.json({
                    success: 1,
                    message: "Successfully authenticated",
                    token: current_jsonwebtoken
                })
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid auth information (user or password)"
                })
            }
        })
    }
}
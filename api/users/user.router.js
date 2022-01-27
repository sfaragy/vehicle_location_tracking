const { 
    createUser, 
    getAllUsers, 
    getUserBySelectedId, 
    updateSelectedUser, 
    resetPassword, 
    deleteUser,
    getAuthToken
 } = require("./user.controller")
const { getUsers } = require("./user.service")


const router = require("express").Router()

// const { validateToken } = require("../../api/auth/auth_verify_by_jwt")
const { validateToken } = require("../../api/auth/auth_verify_by_jwt")

router.post("/register", validateToken, createUser)
router.get("/getAllUsers", validateToken, getAllUsers)
router.get("/getUser/:user_id", validateToken, getUserBySelectedId)
router.patch("/updateUser/:user_id", validateToken, updateSelectedUser)
router.patch("/resetPassword/:user_id", validateToken, resetPassword)
router.delete("/deleteUser/:user_id", validateToken, deleteUser)
router.post("/getAuthToken", getAuthToken)

module.exports = router
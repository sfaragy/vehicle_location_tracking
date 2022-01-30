const { 
    createUser, 
    getAllUsers, 
    getUserBySelectedId, 
    updateSelectedUser, 
    resetPassword, 
    deleteUser,
    getAuthToken
 } = require("./user.controller")
// const { getUsers } = require("./user.service")


const router = require("express").Router()

const { validateToken } = require("../../api/auth/auth_verify_by_jwt")

router.post("/register", createUser)
router.get("/getAllUsers", validateToken, getAllUsers)
router.get("/getUser", validateToken, getUserBySelectedId)
router.patch("/updateUser", validateToken, updateSelectedUser)
router.patch("/resetPassword", validateToken, resetPassword)
router.delete("/deleteUser", validateToken, deleteUser)
router.post("/getAuthToken", getAuthToken)

module.exports = router
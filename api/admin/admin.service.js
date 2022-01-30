const pool = require("../../config/database_connect")
const { getUserByEmail } = require("../users/user.service")
module.exports = {
    adminLogin: getUserByEmail
}

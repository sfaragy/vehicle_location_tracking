const {} = require("../admin/admin.service")
const { getAuthToken } = require("../users/user.controller")
module.exports = {
    adminLoginAuthentication: getAuthToken,
    
}
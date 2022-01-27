// middleware to validate JWT token for all router
const { verify } = require('jsonwebtoken')

module.exports = {
    validateToken: (req, res, next) =>{
        let token = req.get("authorization")
        if(token){
            const original_token = token.slice(7)
            verify(original_token, process.env.JWT_SECRET, (err, decoded_token) =>{
                if(err){
                    res.json({
                        success:0,
                        message: "Invalid token!"
                    })
                } else {
                    next()
                }
            })
        } else {
            return res.json({
                success: 0,
                message: "Access denied for unauthorized user!"
            })
        }
    }
}
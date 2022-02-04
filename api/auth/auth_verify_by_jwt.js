// middleware to validate JWT token for all router
const { verify } = require('jsonwebtoken')

module.exports = {
    validateToken: (req, res, next) =>{
        let token = req.get("authorization")
        if(!token){
            token  = req.session.present_web_token
        }
        console.log(token)
        if(token){
            const original_token = token.slice(7)
            verify(original_token, process.env.JWT_SECRET, (err, decoded_token) =>{
                if(err){
                    res.json({
                        success:0,
                        message: "Invalid token!"
                    })
                } else {
                    const usertoken = req.headers.authorization;
                    const token = usertoken.split(' ')
                    const decoded_token_i = verify(token[1], process.env.JWT_SECRET)
                    // console.log(decoded_token_i)
                    req.jwt_user_id = decoded_token_i.result.user_id; 
                    req.jwt_group_id = decoded_token_i.result.group_id; 
                    req.jwt_email = decoded_token_i.result.email; 
                    req.jwt_mobile = decoded_token_i.result.mobile; 
                    req.jwt_first_name = decoded_token_i.result.first_name; 
                    req.jwt_last_name = decoded_token_i.result.last_name; 
                    // console.log(req.jwt_email)
                    next()
                }
            })
        } else {
            return res.json({
                success: 0,
                message: "Access denied for unauthorized user!"
            })
        }
    },
    validateTokenForAdminWeb: (req, res, next) =>{
        let token = req.cookies.access_token;
        // console.log(token)
        // if(!token){
        //     token  = req.session.present_web_token
        // }
        // console.log(token)
        if(token){
            // const original_token = token.slice(7)
            verify(token, process.env.JWT_SECRET, (err, decoded_token) =>{
                if(err){
                    res.json({
                        success:0,
                        message: "Invalid token!"
                    })
                } else {
                                     
                    const decoded_token_i = verify(token, process.env.JWT_SECRET)
                    // console.log(decoded_token_i)
                    req.jwt_user_id = decoded_token_i.result.user_id; 
                    req.jwt_group_id = decoded_token_i.result.group_id; 
                    req.jwt_email = decoded_token_i.result.email; 
                    req.jwt_mobile = decoded_token_i.result.mobile; 
                    req.jwt_first_name = decoded_token_i.result.first_name; 
                    req.jwt_last_name = decoded_token_i.result.last_name; 
                    // console.log(req.jwt_email)
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
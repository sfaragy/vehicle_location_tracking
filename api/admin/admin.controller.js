const {} = require("../admin/admin.service")
const { getUserByEmail } = require("../users/user.service")
// bcrypt for data encryption
const { genSaltSync, hashSync, compareSync } = require("bcrypt")
const { validateToken } = require("../../api/auth/auth_verify_by_jwt")
// JWT for json web token
const { sign } = require("jsonwebtoken")

module.exports = {
    adminLoginAuthentication: (req, res) =>{
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

            if(results.status==0){
                return res.json({
                    success:0,
                    data: "Inactive User"
                })
            }
            const is_authorized = compareSync(body.password, results.password)
            if(is_authorized){
                results.password = undefined
                const current_jsonwebtoken = sign({result: results}, process.env.JWT_SECRET, {expiresIn: "1h"})
                // console.log(current_jsonwebtoken)
                // if(req.jwt_group_id == results.group_id){
                //     res.redirect('/route/dashboard')
                // } else {
                //     return res.json({
                //         success: 0,
                //         message: "Invalid auth information (user or password)"
                //     })
                // }
                res.session.present_web_token = current_jsonwebtoken
                res.redirect('/admin/dashboard', )

                
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid auth information (user or password)"
                })
            }
        })
    }

}
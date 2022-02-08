const { 
    getDashboardData, 
    getAllVehiclesList, 
    getTotalsOfAllVehiclesList,
    vehicleLocationsById
 } = require("../admin/admin.service")
const { getUserByEmail } = require("../users/user.service")
const { getAllVehicles } = require("../vehicle/vehicle.controller")
const Pagination = require("../admin/pagination")
const url = require('url');

// url.parse(req.url,true).query returns { foo: 'bad', baz: 'foo' 

// bcrypt for data encryption 
const { compareSync } = require("bcrypt")
// JWT for json web token
const { sign } = require("jsonwebtoken")
const { get } = require("config")

module.exports = {
    loginPage: (req,res)=>{
        const login_error = req.cookies.wrong_user
        if(req.cookies.wrong_user!=false){
            console.log(req.cookies.wrong_user) 
            const login_error = req.cookies.wrong_user
        } 
        res.render('admin/login', {title:"Login Form", login_error:login_error})
    },
    adminLoginAuthentication: (req, res) =>{
        const body = req.body
        getUserByEmail(body.email, (err, results)=>{
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.cookie("wrong_user", "Invalid email or password").redirect('/admin/login') 
            }

            if(results.status==0){
                return res.cookie("wrong_user", "User is disabled by admin").redirect('/admin/login') 
            }

            if(results.group_id!=1){
                return res.cookie("wrong_user", "Please contact with system administrator to get dashboard access").redirect('/admin/login') 
            }
            const is_authorized = compareSync(body.password, results.password)
            if(is_authorized){
                results.password = undefined
                const current_jsonwebtoken = sign({result: results}, process.env.JWT_SECRET, {expiresIn: "6h"})
                  return res.cookie("access_token", current_jsonwebtoken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                  }).redirect('/admin/dashboard')
                
            } else { 
                return res.cookie("wrong_user", "Invalid auth information (user or password)").redirect('/admin/login') 
            }
        })
    },
    getDashboardData:  (req, res)=>{
        getDashboardData((err, results)=>{
            if(err){
                console.log(err)
              
            }

            if(!results){
                res.cookie("total_users", 0)
            }
            console.log(results)
            res.cookie("total_users", results)
        
            res.render('admin/dashboard', {
                
                title:"Dashboard",
                user_email: req.jwt_email,
                user_full_name: req.jwt_first_name + " " + req.jwt_last_name,
                total_users: results
            })
        })
     },
     getAllVehicles: getAllVehicles,
     renderVehicles: (req, res)=>{
            const ITEMS_PER_PAGE = 5

            let page_no = req.params.page_id
            if(!req.params.page_id){
                page_no = 1 
            }
            getTotalsOfAllVehiclesList((err, results_total)=>{
                   let total_row = Object.values(JSON.parse(JSON.stringify(results_total)))[0].total_record

                   getAllVehiclesList(page_no, ITEMS_PER_PAGE, (err, results)=>{  
                       let filter_item = req.body.filter_item
                    const vehicles_list = Object.values(JSON.parse(JSON.stringify(results)));
                    // vehicles_list = vehicles_list.filter(function(filter_item) {
                    //     return (filter_item == vehicles_list.vehicle_id || filter_id==vehicles_list.first_name);
                    //   });
                    let pagination = new Pagination(total_row, page_no, '/admin/vehicles/', ITEMS_PER_PAGE)
                    let pagination_links = pagination.links()
                    // console.log(pagination)
              
                    res.render('admin/vehicles', {vehicles_list: vehicles_list, pagination_links: pagination_links, title:"Vehicle List",})
               })

            })   

     },
     getVehicleLocations: (req, res)=>{
        const ITEMS_PER_PAGE = 5

        let vehicle_id = req.params.vehicle_id
        if(!req.params.vehicle_id){
            res.status(404).send("404 Not Found")
        }

        vehicleLocationsById(vehicle_id, (err, results)=>{
            if(err){ 
                res.status(404).send("404 Not Found")
            }
            let location_list = Object.values(JSON.parse(JSON.stringify(results)));
            res.render('admin/vehicle_locations', {location_list: location_list, vehicle_id:vehicle_id, title:"Vehicle Locations Log",})
        })
     },
     logout: (req, res)=>{
        req.session.destroy(function(err){
            if(err){
                console.log(err)
                res.send("Error")
            } else {
                res.cookie("wrong_user", "Logout Successfully").redirect('/admin')
            }
            
        })
    }
    

}
const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../app")

//Assertion style
chai.should()

chai.use(chaiHttp)

describe("User API Test", () =>{
    // Test the GET route
    describe("GET /api/v1/users/getAllUsers", () =>{
        it("It should get all the users list", (done)=>{
            chai.request(server)
            .get("/api/v1/users/getAllUsers")
            .end((err, response)=>{
                response.should.have.status(200)
                response.body.should.be.a('array')
                done()
            })

        })
    }) 


    // Test GET by ID route
    describe("GET /api/v1/users/getAllUsers", () =>{
        it("It should get all the users list", (done)=>{
            chai.request(server)
            .get("/api/v1/users/getAllUsersasdfsd")
            .end((err, response)=>{
                response.should.have.status(200)
                response.body.should.be.a('array')
                done()
            })

        })
    }) 

    // Test the POST


    //Test the PATCH route

    //Test the DELETE route
})
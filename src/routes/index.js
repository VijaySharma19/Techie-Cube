const route = require('express').Router();


route.use('/users',require("./users").userRoute)
route.use('/posts',require('./posts').route)


exports =module.exports={
    route
}
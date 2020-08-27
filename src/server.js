const express = require('express');
const app = express();

const session = require("express-session")
app.use(session({
    resave : true,
    saveUninitialized:true,
    secret:"sbdckjshfiuwgdws863"
}))

const { db } = require('./db/models.js');

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',express.static(__dirname+'/public'))
app.use('/api',require("./routes").route)

const Server_Port = process.env.PORT || 3232

db.sync().then(()=>{
    app.listen(Server_Port,()=>{
        console.log("server started at http://localhost:3232")
    })
}).catch((err)=>{
    console.log(new Error('failed to connect to database'))
    console.log(err)
})
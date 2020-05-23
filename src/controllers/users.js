const { Users } = require('../db/models.js')

// const { getRandomUsers} = require('../utils/getRandomUser.js')

async function  createUser(username,email,contact,password){
    const user = await Users.create({
        // username : getRandomUsers()
        username : username,
        email : email,
        contact : contact,
        password : password
    })
    return user
}

async function authenticateUser(username,password){
    const user=await Users.findOne({
        where : { username : username }
    }) ;
    if(!user){
        let msg= {status : 404}
        return msg;
    }
    if(user.password!=password){
        let msg = {status : 401}
        return msg
    }
    return user;
}

async function findUserbyId(id){
    return await Users.findOne({ where : {id} })
    
}
async function findUserByUsername(username){
    const user = await Users.findOne({ where : { username } })
    return user;
}

async function findAllUsers(){
    const user= await Users.findAll()
    return user;
}




exports =module.exports={
    createUser,
    findUserbyId,
    findUserByUsername,
    findAllUsers,
    authenticateUser
}
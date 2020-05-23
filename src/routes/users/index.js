const userRoute = require('express').Router()

const { createUser ,findUserByUsername,findUserbyId, findAllUsers , authenticateUser}= require('../../controllers/users.js')

userRoute.get('/',async (req,res) =>{
  console.log("hii")
  console.log(req.session.userId)
  if(!req.session.userId){
    res.send({error : "No user logged in"})
  }
  else{
    const user = await findUserbyId(req.session.userId)
    res.status(202).send(user)
  }
})

userRoute.get('/logout',(req,res)=>{
  req.session.userId = null;
  console.log("logged out")
  res.status(201).send("Logged Out")
})


userRoute.get('/:id', async (req, res) => {
    let user;
    console.log(req.params.id)
  
    if (isNaN(parseInt(req.params.id))) {
      // when param is username
      user = await findUserByUsername(req.params.id)
    } else {
      // when param is user id
      user = await findUserbyId(req.params.id)
    }
  
    console.log(user)
  
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).send({
        error: 'No such user id or username'
      })
    }
  })

userRoute.post('/signup',async (req,res)=>{

    let user = await createUser(
      req.body.username,
      req.body.email,
      req.body.contact,
      req.body.password,
    )
    res.status(201).send(user)
})
userRoute.post('/login',async(req,res)=>{
  let user = await authenticateUser(req.body.username,req.body.password)
  if(user.status){
    if(user.status==404){
      res.status(404).send({error:"No such user found . Please signup first"})
    }
    if(user.status==401){
      res.status(401).send({error:"Invalid user name or password"})
    }
  }
  else{
    req.session.userId = user.id
    res.status(202).send(user)
  }
})


exports= module.exports ={
    userRoute
}
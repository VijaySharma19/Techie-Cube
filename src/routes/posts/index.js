const route = require('express').Router()

const { createPost,findAllPosts,findPostsByUserid,findPostsByUsername,findPostByPostId }=require("../../controllers/post")

route.get('/',async (req,res)=>{
    const post = await findAllPosts()
    
        res.status(200).send(post)
    
    
})
route.get('/:x', async (req, res) => {
    let posts;
    
  
    if (isNaN(parseInt(req.params.x))) {
      // when param is username
      
      posts = await findPostsByUsername(req.params.x).catch((err)=>{
          console.log(err)
      })
    } else {
      // when param is user id
      
      posts = await findPostsByUserid(parseInt(req.params.x)).catch((err)=>{
          console.log(err)
      })
       
    }
  
    
  
    if (posts) {
      res.status(200).send(posts)
    } else {
      res.status(404).send({
        error: 'No Posts found'
      })
    }
  })

route.get('/postId/:x',async (req,res)=>{
  let post = await findPostByPostId(req.params.x)
  res.status(201).send(post)
})

route.post('/',async (req,res)=>{
    let userId=parseInt(req.body.userId);
    let title=req.body.title;
    let body=req.body.body
    if(userId&&title&&body){
        let post= await createPost(userId,title,body)
        res.status(201).send(post)
    }
    else{
        res.status(400).send({
            error: "Need userid, title and body to create post"
        })
    }
})

route.use("/comments",require("./comments").route)

exports=module.exports={
    route
}
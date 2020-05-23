const { findComments,createComment } = require("../../controllers/comments.js")
const route = require("express").Router();

route.get("/:id",async ( req,res)=>{
    const comments= await findComments(req.params.id)
    if(comments){
        res.status(201).send(comments)
    }
    else{
        res.status(404).send("NO comments Found for this post")
    }
})

route.post("/",async(req,res)=>{
    const comment = await createComment(
        req.body.userId,
        req.body.postId,
        req.body.title,
        req.body.body
    )
    res.status(201).send(comment)
})

exports = module.exports ={
    route
}
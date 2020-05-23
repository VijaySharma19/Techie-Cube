const { Users,Posts,Comments } = require("../db/models.js");

async function createComment (userId,postId,title,body){
    const comment = await Comments.create({
        title,
        body,
        userId,
        postId
    })
    return comment;
}

async function findComments(postId){
    const comments= await Comments.findAll({
        where : { postId : postId },
        
        include : [Users],
        
    })
    return comments;
}

exports = module.exports={
    findComments,
    createComment
}
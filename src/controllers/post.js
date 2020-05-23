const { Posts,Users } = require('../db/models.js')


async function  createPost(userId,title,body){
    const post = await Posts.create({
        title,
        body,
        userId
    })
    return post;
}

async function findPostByPostId(id){
    id = parseInt(id)
    const post = await Posts.findOne({
        where : { id : id },
        include : [Users]
    })
    return post;
}

async function findPostsByUserid(userId){
    console.log(userId)
    console.log(typeof userId)
    const post = await Posts.findAll({ where : { userId },include : [Users] }).catch((err)=>{
        console.log(err)
    })
    return post;
}

async function findPostsByUsername(username){
    let user = await Users.findOne({
         where : { username },
         include : [Users]
         })
    user = user.id;
    let posts = findPostsByUserid(user)
    return posts;
}

/**
 * showAllPosts({username: ''})
 * showAllPosts({title: ''})
 */

async function findAllPosts(query){
    // TO DO QUERY PARAMS
    return await Posts.findAll({
        include : [Users]
    })
}

// async function task (){
    
//     console.log('==========================================')
//     console.log(await findPostByPostId(1)); 
// }

// task()

exports =module.exports={
    createPost,
    findAllPosts,
    findPostsByUsername,
    findPostsByUserid,
    findPostByPostId
}
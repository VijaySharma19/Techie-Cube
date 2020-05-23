function loadAllPosts(){
    return new Promise((resolve,reject)=>{
        $.get('/api/posts',{},(posts)=>{
            let length = posts.length 
            let noOfPosts = length<=15 ? 0 : length-15;
            for(let p=length-1;p>=noOfPosts;p--){
                $('#posts-container').append(
                    `
                    <div class="col-4 ">
                        <div class="card m-2" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${posts[p].title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${posts[p].user.username}</h6>
                                <p class="card-text">${posts[p].body.substr(0,200)}....<a href="#" data-toggle="modal" data-target="#exampleModalScrollable" class="readMore" id="${posts[p].id}">Read More</a></p>
                                <a href="#" class="card-link">Like</a>
                                <a href="#" class="card-link btnComment" data-toggle="modal" data-component="${posts[p].id}" data-target="#writeComment" >Comment</a>
                                
                            </div>
                        </div>      
                    </div>
                    `
                )
            }
            resolve()
        })
        
    })

    
}
loadAllPosts().then(()=>{
    let modalBody=$("#modalBody")
    let author=$("#author")
    let modalTitle=$("#title")
    let readMore = $(".readMore") 
    readMore.click((ev)=>{
        let postId = $(ev.target).attr('id')
        
        $.get(`/api/posts/postId/${postId}`,{},(post)=>{
            
            modalBody.text(post.body)
            modalTitle.text(post.title)
            author.text(`By - ${post.user.username}`)

        })
        let comment= $("#comments")
        $.get(`/api/posts/comments/${postId}`,{},(comments)=>{
            comment[0].innerHTML=''
            if(comments==0){
                comment[0].innerHTML="NO Comments yet :("
            }
            else{
                for(c of comments){
                   
                    console.log(c);
                    comment.append(
                        `
                        <h5>${c.user.username}</h5>
                        <p>${c.body}</p><br>
                        `
                    )
                        
                    
                }
            }
        })
        
    })

    let btnComment = $(".btnComment")
    btnComment.click((ev)=>{
        if(currentUser){
            let postId = $(ev.target).attr("data-component")
            writeComment(postId)
        }
        else{
            window.alert("You must be logged in to add Comments otherwise your comment wont get submitted")
        }

    })
    
})



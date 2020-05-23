function writeComment(postId){
    let userId = currentUser.id;
    let submitComment= $("#submitComment")
    
    submitComment.click(()=>{
        let commentInp= $("#commentInp")[0].value
        if(commentInp==""){
            window.alert("Comment can't be empty")
        }
        else{

            $.post("/api/posts/comments",{
                userId : userId,
                postId : postId,
                title : "",
                body: commentInp
            },(data)=>{
                console.log(data)
            })
        } 
        
    })
}
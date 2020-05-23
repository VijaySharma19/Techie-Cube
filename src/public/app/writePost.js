$(()=>{
    
    let btnWritePost = $('#btnWritePost')


    btnWritePost.click(()=>{
        if(currentUser){
            let body =$('#body')[0].value
            let title =$('#title')[0].value
            let userId= currentUser.id;
            $.post('/api/posts',{
                userId,
                title,
                body
            })
            $('#content').load('/components/allPosts.html')
        }
        else{
            window.alert("You Must Be LoggedIn to Submit The Comment :(")
        }
    })
})


$("#btnLoginSubmit").click(()=>{
    let inpUsername=$("#inpUsername").val()
    let inpPassword =$("#inpPass").val()
    if(inpPassword&&inpUsername){
        userAuthentication(inpUsername,inpPassword)
    }
    
    
})

function userAuthentication(username,password) {
    $.ajax("/api/users/login", {
     method: 'POST',
     data: {username: username, password: password},
     crossDomain: true,
     success: (data)=>{
        resumingSession()
        $("#content").load("/components/allPosts.html")
     },
     error: (err)=>{
         window.alert(err.responseJSON.error)
         $("#content").load("/components/login.html")
         
     }
  });
}
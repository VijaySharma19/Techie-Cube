$(()=>{
    resumingSession()
})


function resumingSession(){
    $.ajax({
        type: "GET",    
        url: "/api/users",
        cache: false,
        crossDomain: true,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (user) {
            if(user.error){
                window.currentUser=null;
                loginAsGuest()
            }
            else{
                $("#notLoggedIn").hide()
                $("#loggedIn").show()
    
                window.currentUser=user;
                $('#username').text(user.username);
                
                
            }
        }
    })
        

    }
   
   
    
    function loginAsGuest(){
        $("#notLoggedIn").show()
        $("#loggedIn").hide()
    }
    
    $("#btnLogin").click(()=>{
        $('#content').load('/components/login.html')
    })
    $("#btnSignUp").click(()=>{
        $('#content').load('/components/signup.html')
    })
    $("#logout").click(()=>{
        $.get('/api/users/logout',{},()=>{
            resumingSession()
            $('#content').load(`/components/allPosts.html`)
        })
    }) 

    
    
    let navlinks = $(".navbar-nav .nav-link");
    navlinks.click((ev)=>{
        let urLOfComponent=$(ev.target).attr('data-component')
        if(urLOfComponent=='writePost'||urLOfComponent=="myPost")
        {
            if(currentUser){
                $('#content').load(`/components/${urLOfComponent}.html`)
            }
            else{
                window.alert("You must be Logged In to Use this Feautre")
            }
        }
        else{
            $('#content').load(`/components/${urLOfComponent}.html`)
        }
        
    }
    )
    
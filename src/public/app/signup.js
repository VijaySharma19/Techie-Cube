$("#btnSignupSubmit").click(()=>{
    let inpUsername = $("#inpUsername").val()
    let inpPass = $("#inpPass").val()
    let inpContact = $("#inpContact").val()
    let inpEmail = $("#inpEmail").val()
    if(inpUsername&&inpPass&&inpEmail&&inpContact){
        if(validateEmail(inpEmail)){
            if(inpContact.length==10){
                createNewUser(inpUsername,inpEmail,inpContact,inpPass)
                $('#content').load('/components/login.html')
            }
            else{
                window.alert("enter phone number of 10 digits")
            }
        }
        else{
            window.alert("enter valid email id")
        }
    }
})

function createNewUser(username,email,contact,password){
    $.post("/api/users/signup",{
        username : username,
        email : email,
        contact : contact,
        password : password
    },(data)=>{
        window.alert(`${data.username} Signed Up. Now you may Login`)
    })
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
function register(event){
    event.preventDefault();

    var loginform = document.getElementById("register")
    var username = loginform.elements["username"].value
    var password = loginform.elements["password"].value
    var email = loginform.elements["email"].value


    if(username == "" || password == ""){
        alert("You need to enter both username and password")
    }else if(email.length >=12 && email.includes("@") && email.includes(".") && 
    password.length >=8){

        loginform.submit(); 
        // alert('Go away,'+ (username) + '! You are not a valid user.')
    }
    
}
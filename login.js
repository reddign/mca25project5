function login(event){
    event.preventDefault();

    loginform = document.getElementById("login")
    var username = loginform.elements["username"].value
    var password = loginform.elements["password"].value


    if(username == "" || password == ""){
        alert("enter correct username and password")
    }else{

        loginform.submit();
        // alert('Go away,'+ (username) + '! You are not a valid user.')
    }
}
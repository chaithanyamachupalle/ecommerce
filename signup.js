function saveUserData(event){
    event.preventDefault();
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var data={
        username: username,
        email: email,
        password: password
    } 
    localStorage.setItem(email,JSON.stringify(data));
    document.getElementById('username').value = "";
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
    location.href="login.html";    
}
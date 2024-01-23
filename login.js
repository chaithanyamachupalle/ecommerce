function validateLogin(event) {
    event.preventDefault(); 
    var enteredEmail = document.getElementById('email').value;
    var enteredPassword = document.getElementById('password').value;
    var storedUserData = localStorage.getItem(enteredEmail);
    var validation=document.getElementById("validation");
    if (enteredEmail!="" && enteredPassword!="" &&storedUserData) {
        var userData = JSON.parse(storedUserData);
        if ( enteredEmail=== userData.email && enteredPassword === userData.password) {
            validation.textContent="login successfull";
            setTimeout(function(){
                validation.textContent=""
            },2000);
            location.href="products.html";
        }
        else if(enteredEmail!=userData.email){
            validation.textContent="Invalid email address";
            setTimeout(function(){
                validation.textContent=""
            },2000);
        } 
        else if(enteredPassword!=userData.password) {
            validation.textContent="Invalid Password";
            setTimeout(function(){
                validation.textContent=""
            },2000);
    }
     else {
        validation.textContent="Invalid Email and Password";
        setTimeout(function(){
            validation.textContent="";
        },2000);
        set
    }
}
else{
    validation.textContent="invalid email ";
    setTimeout(function(){
        validation.textContent="";
    },2000);
}
}
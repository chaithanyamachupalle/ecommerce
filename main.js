var slideIndex = 0;
function pleaseSignUp(){
    window.alert("sign Up before before shopping");
    location.href="signup.html";
}
function showSlides() {
 var i;
 var slides = document.getElementsByClassName("mySlides");
 for (i = 0; i < slides.length; i++) {
     slides[i].style.display = "none";
 }
 slideIndex++;
 if (slideIndex > slides.length) {
     slideIndex = 1;
 }
 slides[slideIndex - 1].style.display = "block";
 setTimeout(showSlides, 2000);
 }
 function moveToTop() {
         window.scrollTo({
             top: 0,
             behavior: 'smooth'
         });
     }
     document.addEventListener("DOMContentLoaded", function () {
        showSlides();
        if(localStorage.length===0){
        setTimeout( function(){
            pleaseSignUp();
     }, 2000);
     }
    });
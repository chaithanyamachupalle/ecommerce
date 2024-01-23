document.addEventListener("DOMContentLoaded", function () {
    var body = document.getElementById("body");
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "https://fakestoreapi.com/products");
    ajax.send();
    ajax.onload = function () {
        var data = JSON.parse(ajax.response);
        data.forEach(function (element) {
            var div = document.createElement("div");
            div.classList.add("product-container");
            div.innerHTML = `<img src="${element.image}" style="width:220px;height:220px;" onclick="itemDetails(${element.id})">
                <span>${element.title}</span>
                <h2><sup>&#8377;</sup>${element.price}</h2>
                <button onclick="addToCart(${element.id}, this)">Cart</button>`;
            body.appendChild(div);
        });
    };
});

var arr = [];
var j = 0;

function addToCart(productId, button) {
    var pid = productId;
    arr[j] = pid;
    j++;
    localStorage.setItem("cartItem", JSON.stringify(arr));
    console.log(JSON.parse(localStorage.getItem("cartItem")));
    buy();

    // Change button text to indicate that the product has been added to the cart
    button.textContent = "Added";
    button.disabled = true; // Optionally, disable the button after adding to the cart
}

function buy() {
    var countDisplay = document.getElementById("cartCount");
    var storedArray = localStorage.getItem("cartItem");
    var cartArr = JSON.parse(storedArray);
    var cartList = cartArr.length;
    countDisplay.textContent = cartList;
}

function logout() {
    alert('Logged out successfully!');
    location.href = "signup.html";
    localStorage.clear();
}

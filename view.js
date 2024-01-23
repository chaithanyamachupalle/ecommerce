document.addEventListener("DOMContentLoaded", function() {
    var selectedItem = JSON.parse(sessionStorage.getItem("selectedItem"));
    var image = document.getElementById("image");
    var details = document.getElementById("details");

    if (!selectedItem) {
        console.error("No selectedItem found in sessionStorage");
        return;
    }

    var url = `https://fakestoreapi.com/products/${selectedItem.id}`;
    var ajax = new XMLHttpRequest();
    ajax.open("GET", url);
    ajax.send();

    ajax.onload = function() {
        if (ajax.status === 200) {
            var data = JSON.parse(ajax.responseText);
            console.log(data);
            image.innerHTML = `<img src="${data.image}" style="width:500px;height:500px;">`;
            details.innerHTML = `<h2>${data.title}</h2>
                               <h2><sup>&#8377;</sup>${data.price}</h2>
                               <h3>Rating: ${data.rating.rate}</h3>
                               <h3>No.of Items sold: ${data.rating.count} ratings</h3>
                               <h3>Product Details:</h3>
                               <h5>Description: ${data.description}</h5>
                               <h5>Category: ${data.category}</h5>
                               <button onclick="itemDetails(${data.id})">Add to cart</button>
                               &nbsp;&nbsp;&nbsp;<a href="products.html"><button>Cancel</button></a>`;
        } else {
            console.error("Failed to fetch data. Status code: " + ajax.status);
        }
    };
});

var arr=[];
var j=0;
function itemDetails(productId) {
    var pid = productId;
    arr[j] = pid;
    j++;
    localStorage.setItem("cartItem", JSON.stringify(arr));
    console.log(JSON.parse(localStorage.getItem("cartItem")));
    
}

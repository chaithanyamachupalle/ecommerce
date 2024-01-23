document.addEventListener("DOMContentLoaded", function () {
    var table = document.getElementById("items");
    var totalAmountElement = document.getElementById("totalAmount");
    var total = 0;

    // Retrieve the cart items from local storage
    var storedArray = localStorage.getItem("cartItem");
    var cartArr = JSON.parse(storedArray) || [];

    // Display cart items and calculate total
    for (var i = 0; i < cartArr.length; i++) {
        displayCartItem(cartArr[i]);
    }

    // Calculate and display the total amount after displaying cart items
    for(var i = 0; i < cartArr.length; i++){
    calculateTotal();
    }
    // Implement increase and decrease quantity
    table.addEventListener("input", function (event) {
        if (event.target.classList.contains("quantity")) {
            updateQuantity(event.target);
            calculateTotal();
        }
    });
});

function displayCartItem(productId) {
    var table = document.getElementById("items");
    var totalAmountElement = document.getElementById("totalAmount");
    var total=totalAmountElement.textContent;
    var ajax = new XMLHttpRequest();
    var url = `https://fakestoreapi.com/products/${productId}`;
    ajax.open("GET", url);
    ajax.send();
    ajax.onload = function () {
        if (ajax.status === 200) {
            var data = JSON.parse(ajax.responseText);
            var sec = document.createElement("tr");
            sec.innerHTML = `<td><img src=${data.image}></img></td>
                           <td style="color:black;">${data.title}</td>
                           <td style="color:red;"><sup>&#8377;</sup>${data.price}</td>
                           <td>
                               <input type="number" min="1" class="quantity" value="1" data-product-id="${productId}" style="width:50px;">
                               <button onclick="increaseQuantity(this)" data-product-id="${productId}">+</button>
                               <button onclick="decreaseQuantity(this)" data-product-id="${productId}">-</button>
                           </td>`;
            table.appendChild(sec);
            total=total+data.price;
            totalAmountElement.textContent=total;
        } else {
            console.error("Failed to fetch data. Status code: " + ajax.status);
        }
    };
}

function updateQuantity(inputElement) {
    var productId = inputElement.dataset.productId;
    var quantity = parseInt(inputElement.value);

    // If quantity is less than 1, remove the item from local storage
    if (quantity < 1) {
        removeCartItem(productId);
    }
}

function increaseQuantity(button) {
    var productId = button.dataset.productId;
    var inputElement = document.querySelector(`.quantity[data-product-id="${productId}"]`);
    inputElement.value = parseInt(inputElement.value) + 1;
    calculateTotal();
}

function decreaseQuantity(button) {
    var productId = button.dataset.productId;
    var inputElement = document.querySelector(`.quantity[data-product-id="${productId}"]`);
    var quantity = parseInt(inputElement.value);

    // If quantity is greater than 1, decrease it; otherwise, remove the item
    if (quantity > 1) {
        inputElement.value = quantity - 1;
    } else {
        var listItem=button.parentNode.parentNode;
        listItem.remove();
    }

    calculateTotal();
}

function calculateTotal() {
    var table = document.getElementById("items");
    var totalAmountElement = document.getElementById("totalAmount");
    var total = 0;

    // Loop through rows to calculate total
    for (var i = 0; i < table.rows.length; i++) {
        var price = parseFloat(table.rows[i].cells[2].textContent.replace("₹", ""));
        var quantity = parseInt(table.rows[i].cells[3].querySelector(".quantity").value);
        total += price * quantity;
    }

    totalAmountElement.textContent = total.toFixed(2);
}
function checkout() {
    // Implement checkout logic
    var totalAmountElement = document.getElementById("totalAmount");
    var total=totalAmountElement.textContent;
    if(total>0){
    var cartArr = [];
    localStorage.setItem("cartItem", JSON.stringify(cartArr));
    alert('Thank you for your purchase!');
    location.href = 'index.html';
    localStorage.clear();
    }
    else{
      location.href="index.html";  
    }
}
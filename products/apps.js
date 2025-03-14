document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("productForm");
    const productList = document.getElementById("productList");

    productForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const imageLink = document.getElementById("imageLink").value;
        const price = document.getElementById("price").value;

        // Create product card
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${imageLink}" alt="${title}">
            <h3>${title}</h3>
            <p>${description}</p>
            <span>$${price}</span>
        `;

        // Append product to list
        productList.appendChild(productCard);

        // Clear form fields
        productForm.reset();
    });
});




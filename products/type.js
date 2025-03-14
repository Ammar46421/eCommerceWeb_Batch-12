// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase configuration (Replace with your Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyAYai12ElU9KX7BNz45Spj2j8sII",
    authDomain: "e-commerce-4e9d6.firebaseapp.com",
    projectId: "e-commerce-4e9d6",
    storageBucket: "e-commerce-4e9d6.firebasestorage.app",
    messagingSenderId: "148778708550",
    appId: "1:148778708550:web:e0570bfaf8c7691b162447",
    measurementId: "G-DNEEL4FEK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference form and product list
document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("productForm");
    const productList = document.getElementById("productList");

    productForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Get form values
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const imageLink = document.getElementById("imageLink").value;
        const price = document.getElementById("price").value;

        try {
            // Store data in Firestore
            const docRef = await addDoc(collection(db, "products"), {
                title: title,
                description: description,
                imageLink: imageLink,
                price: price,
                timestamp: new Date()
            });

            console.log("Document written with ID:", docRef.id);

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
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    });
});

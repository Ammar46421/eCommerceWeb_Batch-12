import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase Configuration
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
const auth = getAuth();

// DOM Elements
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const adminSection = document.getElementById("adminSection");

// Check User Authentication & Show Admin Section
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRole = localStorage.getItem("userRole");
        if (userRole === "admin") {
            adminSection.style.display = "block";
        }
    }
    await displayProducts(); // Load products
});

// Add Product to Firestore
if (productForm) {
    productForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const imageLink = document.getElementById("imageLink").value;
        const price = parseFloat(document.getElementById("price").value) || 0;

        if (!title || !description || !imageLink || price <= 0) {
            alert("Please fill in all fields correctly.");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "products"), {
                title,
                description,
                imageLink,
                price
            });

            alert("Product added successfully!");
            productForm.reset();
            await displayProducts(); // Refresh product list
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product. Please try again.");
        }
    });
}

// Display Products from Firestore
async function displayProducts() {
    if (!productList) return;
    productList.innerHTML = ""; // Clear previous products

    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        if (querySnapshot.empty) {
            productList.innerHTML = "<p>No products found.</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img src="${product.imageLink}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <span>$${product.price.toFixed(2)}</span>
                <button onclick="addToCart('${doc.id}')">Add to Cart</button>
            `;

            productList.appendChild(productCard);
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to load products.");
    }
}

// Load products on page load
document.addEventListener("DOMContentLoaded", displayProducts);

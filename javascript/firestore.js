// import { auth, db, onAuthStateChanged, signInWithEmailAndPassword, signOut, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from './../javascript/firebaseAuth.js';
// // import { supabase } from './supabase-config.js';

// // // Check Auth State
// // onAuthStateChanged(auth, (user) => {

  
// //   if (!user && !window.location.pathname.includes('index.html')) {
// //     window.location.href = 'index.html';
// //   }
// // });



// // const loginForm = document.getElementById('login-form');


// // if (loginForm) {

// //   loginForm.addEventListener('submit', async (e) => {
// //     e.preventDefault();
// //     const email = document.getElementById('email').value;
// //     const password = document.getElementById('password').value;
// //     try {
// //       await signInWithEmailAndPassword(auth, email, password);
// //       window.location.href = 'products.html';
// //     } catch (error) {
// //       document.getElementById('error-message').textContent = error.message;
// //     }
// //   });
  
// // }

// // const logoutBtn = document.getElementById('logout-btn');

// // if (logoutBtn) {
// //   logoutBtn.addEventListener('click', async () => {
// //     await signOut(auth);
// //     window.location.href = 'index.html';
// //   });
// // }


// const productsContainer = document.getElementById('products-container');
// if (productsContainer) {
//   const fetchProducts = async () => {
//     const querySnapshot = await getDocs(collection(db, 'products'));
//     querySnapshot.forEach((doc) => {
//       const product = doc.data();
//       productsContainer.innerHTML += `
//         <div class="product">
//           <img src="${product.imageUrl}" alt="${product.name}">
//           <h3>${product.name}</h3>
//           <p>${product.price}</p>
//           <button onclick="addToCart('${doc.id}')">Add to Cart</button>
//           <button onclick="addToFavorites('${doc.id}')">❤️</button>
//         </div>
//       `;
//     });
//   };
//   fetchProducts();
// }

// const productForm = document.getElementById('product-form'); 
// if (productForm) {
//   productForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const name = document.getElementById('product-name').value;
//     const price = document.getElementById('product-price').value;
//     const imageUrl = document.getElementById('product-image').value;
    
//     const productsContainer = document.getElementById('products-container');

//     // Try adding the product
//     try {
//       // addDoc returns a DocumentReference, which contains the new document's ID.
//       const docRef = await addDoc(collection(db, 'products'), {
//         name: name,
//         price: price,
//         imageUrl: imageUrl
//       });
//       alert('Product added successfully!');
//       productForm.reset(); // Clear the form

//       // Immediately update the UI by appending the new product
//       if (productsContainer) {
//         productsContainer.innerHTML += `
//           <div class="product">
//             <img src="${imageUrl}" alt="${name}">
//             <h3>${name}</h3>
//             <p>${price}</p>
//             <button onclick="addToCart('${docRef.id}')">Add to Cart</button>
//             <button onclick="addToFavorites('${docRef.id}')">❤️</button>
//           </div>
//         `;
//         alert('c')
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert('Failed to add product.');
//       return; // Stop further execution if adding fails
//     }
//   });
// }






// window.addToCart = (productId) => {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const existingItem = cart.find(item => item.id === productId);
    
//     if (existingItem) {
//       // Increase quantity if the product is already in the cart
//       existingItem.quantity += 1;
//     } else {
//       // Add new product with quantity 1
//       cart.push({ id: productId, quantity: 1 });
//     }
    
//     localStorage.setItem('cart', JSON.stringify(cart));
//     alert('Product added to cart!');
//   };
  


// import { db } from "./../javascript/firebaseAuth.js"; 
// import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// Reference to the "products" collection

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAYai12ElU9K5E0kQKX7BNz45Spj2j8sII",
    authDomain: "e-commerce-4e9d6.firebaseapp.com",
    projectId: "e-commerce-4e9d6",
    storageBucket: "e-commerce-4e9d6.firebasestorage.app",
    messagingSenderId: "148778708550",
    appId: "1:148778708550:web:e0570bfaf8c7691b162447",
    measurementId: "G-DNEEL4FEK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const productsCollection = collection(db, "products");

document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("productList");

    if (!productList) {
        console.error("❌ Error: Product list container not found!");
        return;
    }

    // Function to fetch and display products
    const fetchProducts = async () => {
        productList.innerHTML = ""; // Clear existing products

        try {
            const querySnapshot = await getDocs(productsCollection);

            if (querySnapshot.empty) {
                productList.innerHTML = "<p>No products available.</p>";
                return;
            }

            querySnapshot.forEach((doc) => {
                const product = doc.data();
                const productCard = document.createElement("div");
                productCard.classList.add("product-card");
                productCard.innerHTML = `
                    <img src="${product.imageLink}" alt="Product Image">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <span>Price: $${product.price}</span>
                `;
                productList.appendChild(productCard);
            });

        } catch (error) {
            console.error("❌ Error fetching products:", error);
        }
    };

    fetchProducts();
});

import { db, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

const createTestProduct = async () => {
    try {
        await addDoc(collection(db, "products"), {
            title: "Sample Product",
            imageLink: "https://via.placeholder.com/150",
            price: 200
        });
        console.log("✅ Sample product added!");
    } catch (error) {
        console.error("❌ Error adding product:", error);
    }
};

// Run this function once to create the collection
createTestProduct();


import { db, auth, onAuthStateChanged, collection, addDoc, getDocs } from "./firebaseAuth.js";
console.log('import')

const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const adminSection = document.getElementById("adminSection");

// Check user role and display admin section if admin
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRole = localStorage.getItem("userRole");
        if (userRole === "admin") {
            adminSection.style.display = "block";
        }
    }
    displayProducts();
});

// Add product to Firestore
productForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const imageLink = document.getElementById("imageLink").value;
    const price = document.getElementById("price").value;
    
    try {
        await addDoc(collection(db, "products"), {
            title,
            description,
            imageLink,
            price: parseFloat(price)
        });
        alert("Product added successfully!");
        productForm.reset();
        displayProducts();
    } catch (error) {
        console.error("Error adding product: ", error);
    }
});

// Display products from Firestore
async function displayProducts() {
    productList.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        const product = doc.data();
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.imageLink}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <span>$${product.price}</span>
        `;
        productList.appendChild(productCard);
    });
}

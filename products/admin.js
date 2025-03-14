import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYai12ElU9K5E0kQKX7BNz45Spj2j8sII",
    authDomain: "e-commerce-4e9d6.firebaseapp.com",
    projectId: "e-commerce-4e9d6",
    storageBucket: "e-commerce-4e9d6.firebasestorage.app",
    messagingSenderId: "148778708550",
    appId: "1:148778708550:web:e0570bfaf8c7691b162447",
    measurementId: "G-DNEEL4FEK4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Specific user UID allowed to access the form
const ALLOWED_UID = "k4mHcZJs4cSS9GzwGbVjcljNxFv2";

onAuthStateChanged(auth, (user) => {
    if (user) {
        if (user.uid === ALLOWED_UID) {
            document.getElementById("adminSection").style.display = "block";
            // document.getElementById("accessDenied").style.display = "none";
        } else {
            document.getElementById("adminSection").style.display = "none";
            document.getElementById("accessDenied").innerText = "Access Denied: You are not authorized.";
            document.getElementById("accessDenied").style.display = "block";
        }
    } else {
        document.getElementById("adminSection").style.display = "none";
        document.getElementById("accessDenied").innerText = "Please log in to access this content.";
        document.getElementById("accessDenied").style.display = "block";
    }
});
